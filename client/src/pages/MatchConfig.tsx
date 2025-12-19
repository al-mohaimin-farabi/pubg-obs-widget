import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/layouts/PageHeader";
import { Save, Upload } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
import { EVENTS, NAMESPACES } from "@/utils/constants";
import {
  useGetSkinsQuery,
  useUploadSkinMutation,
  useGetConfigQuery,
  useUpdateConfigMutation,
} from "@/services/ConfigurationApi";
import toast from "react-hot-toast";

interface Config {
  matchNumber: number;
  skin: string;
}

export default function MatchConfig() {
  const [config, setConfig] = useState<Config>({
    matchNumber: 85,
    skin: "default",
  });
  const [previewSkin, setPreviewSkin] = useState<string>("/skin.png");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // RTK Query
  const { data: skinsData } = useGetSkinsQuery();
  const { data: remoteConfig } = useGetConfigQuery();
  const [uploadSkin, { isLoading: isUploading }] = useUploadSkinMutation();
  const [updateConfig, { isLoading: isSaving }] = useUpdateConfigMutation();

  // Combine default with fetched skins
  const skins = skinsData || [
    { name: "Default", value: "default", url: "/skin.png" },
  ];

  // Sync remote config to local state
  useEffect(() => {
    if (remoteConfig) {
      setConfig(remoteConfig);
      updatePreview(remoteConfig.skin);
    }
  }, [remoteConfig]);

  const updatePreview = (skinValue: string) => {
    if (skinValue === "default") {
      setPreviewSkin("/skin.png");
    } else if (skinValue.startsWith("/uploads")) {
      const baseUrl =
        import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
      setPreviewSkin(`${baseUrl}${skinValue}`);
    } else {
      setPreviewSkin(skinValue);
    }
  };

  const socketEvents = useMemo(
    () => ({
      [EVENTS.CONFIG.UPDATE]: (newConfig: any) => {
        const typedConfig = newConfig as Config;
        setConfig(typedConfig);
        updatePreview(typedConfig.skin);
      },
    }),
    []
  );

  const onConnect = useCallback((s: any) => {
    s.emit(EVENTS.CONFIG.REQUEST);
  }, []);

  useSocket({
    namespace: NAMESPACES.LEADERBOARD,
    events: socketEvents,
    onConnect: onConnect,
  });

  const handleSave = async () => {
    try {
      await updateConfig(config).unwrap();
      // Save local preference just in case
      localStorage.setItem("matchConfig", JSON.stringify(config));
      toast.success("Configuration saved successfully!");
    } catch (err) {
      console.error("Save failed", err);
      toast.error("Failed to save configuration.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadConfirm = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("skin", selectedFile);

    try {
      // Use RTK Query mutation
      const res = await uploadSkin(formData).unwrap();

      const newSkinValue = `/uploads/${res.filename}`;

      // Auto-select the uploaded skin
      setConfig((prev) => ({ ...prev, skin: newSkinValue }));
      updatePreview(newSkinValue);
      setSelectedFile(null);

      toast.success("Skin uploaded successfully!");
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Failed to upload skin. Check file size or connection.");
    }
  };

  return (
    <div className="h-full overflow-auto bg-gray-50 dark:bg-gray-950">
      <PageHeader
        title="Match Configuration"
        description="Configure match number and visual appearance for the leaderboard widget"
      />

      <div className="p-8">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Main Configuration Card */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column: Controls */}
            <div className="space-y-6 lg:col-span-2">
              {/* Match Number Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Match Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Match Number
                      </label>
                      <Input
                        type="number"
                        value={config.matchNumber}
                        className="[appearance:textfield] text-lg font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            matchNumber: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Set the match number to fetch statistics for.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skin Selection & Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Appearance & Skins</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Skin Grid */}
                  <div>
                    <label className="mb-3 block text-sm font-bold text-gray-700 dark:text-gray-300">
                      Select Leaderboard Theme
                    </label>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {skins.map((skin) => {
                        const isSelected = config.skin === skin.value;
                        const skinUrl =
                          skin.value === "default"
                            ? "/skin.png"
                            : `${import.meta.env.VITE_SOCKET_URL || "http://localhost:5000"}${skin.value}`;

                        return (
                          <div
                            key={skin.value}
                            onClick={() => {
                              setConfig({ ...config, skin: skin.value });
                              updatePreview(skin.value);
                            }}
                            className={`group relative cursor-pointer rounded-xl border-2 p-2 transition-all hover:shadow-md ${
                              isSelected
                                ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600 dark:border-indigo-400 dark:bg-indigo-900/10"
                                : "border-gray-200 bg-white hover:border-indigo-300 dark:border-gray-800 dark:bg-gray-900"
                            } `}
                          >
                            <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                              <img
                                src={skinUrl}
                                alt={skin.name}
                                className="h-full w-full object-contain transition-transform group-hover:scale-105"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "/skin.png";
                                }}
                              />
                            </div>
                            <div className="mt-2 flex items-center justify-between px-1">
                              <span
                                className={`text-xs font-semibold ${isSelected ? "text-indigo-700 dark:text-indigo-300" : "text-gray-600 dark:text-gray-400"}`}
                              >
                                {skin.name}
                              </span>
                              {isSelected && (
                                <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Upload New Skin
                    </label>
                    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3 transition-colors hover:border-gray-400 sm:flex-row dark:border-gray-700 dark:bg-gray-900/50">
                      <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 sm:w-auto dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                        <Upload className="h-4 w-4" />
                        <span>Choose Image</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileSelect}
                        />
                      </label>

                      <div className="w-full flex-1 truncate text-center text-sm text-gray-500 sm:text-left">
                        {selectedFile
                          ? selectedFile.name
                          : "No file selected (Max 50MB)"}
                      </div>

                      {selectedFile && (
                        <Button
                          size="sm"
                          onClick={handleUploadConfirm}
                          disabled={isUploading}
                          className="w-full sm:w-auto"
                        >
                          {isUploading ? "Uploading..." : "Confirm Upload"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Bar */}
              <div className="sticky bottom-4 z-10">
                <Button
                  onClick={handleSave}
                  className="w-full bg-indigo-600 py-6 text-lg shadow-lg hover:bg-indigo-700"
                  disabled={isSaving}
                >
                  <Save className="mr-2 h-5 w-5" />
                  {isSaving ? "Saving Configuration..." : "Save All Changes"}
                </Button>
              </div>
            </div>

            {/* Right Column: Live Preview */}
            <div className="space-y-6">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-black shadow-2xl">
                    {/* Aspect Ratio Container (16:9 usually for screens) */}
                    <div className="relative aspect-video bg-[url('https://transparent-textures.patterns.s3.amazonaws.com/carbon_fibre.png')]">
                      <img
                        src={previewSkin}
                        alt="Skin Preview"
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/skin.png";
                        }}
                      />
                      {/* Mock Text overlay to show how it looks with data */}
                      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white/20 uppercase select-none">
                        Preview
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                    <p className="mb-1 font-semibold">Current Configuration:</p>
                    <ul className="list-inside list-disc space-y-1 opacity-80">
                      <li>Match: {config.matchNumber}</li>
                      <li>
                        Skin:{" "}
                        {skins.find((s) => s.value === config.skin)?.name ||
                          "Custom"}
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
