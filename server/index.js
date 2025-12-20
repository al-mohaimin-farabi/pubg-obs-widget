require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { handleLeaderboardConnection } = require("./namespaces/leaderboard");
const { NAMESPACES, EVENTS } = require("./utils/constants");
const { getConfig, updateConfig } = require("./services/configService");

const app = express();
const server = createServer(app);
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Use provided name or default to unique suffix
    const name = req.body.name
      ? req.body.name.replace(/[^a-z0-9]/gi, "_").toLowerCase()
      : file.fieldname;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, name + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all for simplicity locally
    methods: ["GET", "POST", "PUT", "PATCH"],
  },
});

// Middleware for logging connections
io.use((socket, next) => {
  console.log(`Socket connecting: ${socket.id}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/upload/skin", upload.single("skin"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  // Return the URL to access the file
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl, filename: req.file.filename });
});

app.get("/api/skins", (req, res) => {
  const uploadDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadDir)) {
    return res.json([]);
  }
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).send("Error reading skins");
    const images = files.filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file));
    // Add default skin
    const result = [{ name: "Default", url: "/skin.png", value: "default" }];
    images.forEach((file) => {
      result.push({
        name: file,
        url: `/uploads/${file}`,
        value: `/uploads/${file}`,
      });
    });
    res.json(result);
  });
});

app.delete("/api/skins/:filename", (req, res) => {
  const filename = req.params.filename;
  if (filename === "default" || filename === "skin.png") {
    return res.status(400).send("Cannot delete default skin.");
  }
  const filePath = path.join(__dirname, "uploads", filename);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      res.json({ message: "Skin deleted successfully" });
    } catch (err) {
      res.status(500).send("Error deleting file");
    }
  } else {
    res.status(404).send("Skin not found");
  }
});

app.get("/api/config", (req, res) => {
  res.json(getConfig());
});

app.post("/api/config", (req, res) => {
  const newConfig = updateConfig(req.body);
  // Broadcast update to leaderboard namespace
  io.of(NAMESPACES.LEADERBOARD).emit(EVENTS.CONFIG.UPDATE, newConfig);
  res.json(newConfig);
});

// Set up namespaces
const leaderboardNamespace = io.of(NAMESPACES.LEADERBOARD);
leaderboardNamespace.on("connection", handleLeaderboardConnection);

const PORT = process.env.PORT || 5000;
if (!global.serverStarted) {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  global.serverStarted = true;
}
