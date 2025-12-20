import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/layouts/PageHeader";
import { Save, Upload, Trash2, Palette, Type, Settings2 } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
import { EVENTS, NAMESPACES } from "@/utils/constants";
import {
  useGetSkinsQuery,
  useUploadSkinMutation,
  useDeleteSkinMutation,
  useGetConfigQuery,
  useUpdateConfigMutation,
} from "@/services/ConfigurationApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

interface Config {
  matchNumber: number;
  skin: string;
  tournamentName?: string;
  title?: string;
  headerBg?: string;
  headerText?: string;
  headerIsGradient?: boolean;
  headerGradient?: string;
  titleText?: string;
  titleIsGradient?: boolean;
  titleGradient?: string;
}

export default function MatchConfig() {
  const [config, setConfig] = useState<Config>({
    matchNumber: 85,
    skin: "default",
    headerBg: "#FAD48A",
    headerText: "#4D64D1",
    headerIsGradient: false,
    headerGradient: "linear-gradient(to right, #FAD48A, #F87171)",
    titleText: "#FFFFFF",
    titleIsGradient: true,
    titleGradient:
      "linear-gradient(to bottom, hsl(43 94% 72%) 0%, hsl(43 94% 72%) 5%, hsl(4 86% 66%) 100%)",
  });
  const [previewSkin, setPreviewSkin] = useState<string>("/skin.png");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [skinName, setSkinName] = useState<string>("");

  // RTK Query
  const { data: skinsData } = useGetSkinsQuery();
  const { data: remoteConfig } = useGetConfigQuery();
  const [uploadSkin, { isLoading: isUploading }] = useUploadSkinMutation();
  const [deleteSkin, { isLoading: isDeleting }] = useDeleteSkinMutation();
  const [updateConfig, { isLoading: isSaving }] = useUpdateConfigMutation();

  const skins = skinsData || [
    { name: "Default", value: "default", url: "/skin.png" },
  ];

  useEffect(() => {
    if (remoteConfig) {
      setConfig((prev) => ({ ...prev, ...remoteConfig }));
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

  const onConnect = useCallback((s: any) => s.emit(EVENTS.CONFIG.REQUEST), []);

  useSocket({
    namespace: NAMESPACES.LEADERBOARD,
    events: socketEvents,
    onConnect,
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      await updateConfig(config).unwrap();
      toast.success("Saved!");
    } catch (err) {
      toast.error("Error.");
    }
  };

  const handleDeleteSkin = async () => {
    if (config.skin === "default") return;
    const filename = config.skin.split("/").pop();
    if (!filename) return;
    if (
      !confirm(`Delete "${skins.find((s) => s.value === config.skin)?.name}"?`)
    )
      return;
    try {
      await deleteSkin(filename).unwrap();
      setConfig((prev) => ({ ...prev, skin: "default" }));
      updatePreview("default");
      toast.success("Deleted");
    } catch (err) {
      toast.error("Failed");
    }
  };

  const handleUploadConfirm = async () => {
    if (!selectedFile || !skinName.trim()) {
      toast.error("Missing name/file");
      return;
    }
    const formData = new FormData();
    formData.append("name", skinName);
    formData.append("skin", selectedFile);
    try {
      const res = await uploadSkin(formData).unwrap();
      const newVal = `/uploads/${res.filename}`;
      setConfig((prev) => ({ ...prev, skin: newVal }));
      updatePreview(newVal);
      setSelectedFile(null);
      setSkinName("");
      toast.success("Uploaded");
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <div className="h-full overflow-auto bg-white dark:bg-black">
      <PageHeader
        title="Match Configuration"
        description="Customize visuals and data settings"
      >
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="h-9 bg-indigo-600 shadow-md hover:bg-indigo-700"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save All Changes"}
        </Button>
      </PageHeader>

      <div className="p-8">
        <div className="w-full">
          <div className="grid gap-4 lg:grid-cols-12">
            {/* Left aligned settings */}
            <div className="space-y-4 lg:col-span-8">
              {/* Header Visuals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-4 w-4 text-indigo-600" /> Header & Title
                    Styling
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                        Tournament Name
                      </label>
                      <Input
                        value={config.tournamentName || ""}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            tournamentName: e.target.value,
                          })
                        }
                        placeholder="e.g. GRAND FINALS DAY 3"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                        Widget Title
                      </label>
                      <Input
                        value={config.title || ""}
                        onChange={(e) =>
                          setConfig({ ...config, title: e.target.value })
                        }
                        placeholder="e.g. OVERALL RANKINGS"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Tournament Badge Styling */}
                    <div className="flex flex-col gap-3 rounded-lg border bg-gray-50 p-3 dark:bg-gray-900/50">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2 dark:border-gray-800">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase">
                          Tournament Badge
                        </span>
                        <div className="flex items-center gap-3">
                          <label className="flex cursor-pointer items-center gap-1.5 text-xs">
                            <input
                              type="checkbox"
                              checked={config.headerIsGradient}
                              onChange={(e) =>
                                setConfig({
                                  ...config,
                                  headerIsGradient: e.target.checked,
                                })
                              }
                              className="h-3.5 w-3.5 accent-indigo-600"
                            />
                            Gradient
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">
                            Text
                          </span>
                          <input
                            type="color"
                            value={config.headerText}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                headerText: e.target.value,
                              })
                            }
                            className="h-6 w-6 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                          />
                        </div>
                        {!config.headerIsGradient && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">
                              BG
                            </span>
                            <input
                              type="color"
                              value={config.headerBg}
                              onChange={(e) =>
                                setConfig({
                                  ...config,
                                  headerBg: e.target.value,
                                })
                              }
                              className="h-6 w-6 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                            />
                          </div>
                        )}
                      </div>
                      {config.headerIsGradient && (
                        <Input
                          value={config.headerGradient}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              headerGradient: e.target.value,
                            })
                          }
                          className="h-8 font-mono text-[10px]"
                          placeholder="linear-gradient(...)"
                        />
                      )}
                    </div>

                    {/* Title Styling */}
                    <div className="flex flex-col gap-3 rounded-lg border bg-gray-50 p-3 dark:bg-gray-900/50">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2 dark:border-gray-800">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase">
                          Main Title Text
                        </span>
                        <div className="flex items-center gap-3">
                          <label className="flex cursor-pointer items-center gap-1.5 text-xs">
                            <input
                              type="checkbox"
                              checked={config.titleIsGradient}
                              onChange={(e) =>
                                setConfig({
                                  ...config,
                                  titleIsGradient: e.target.checked,
                                })
                              }
                              className="h-3.5 w-3.5 accent-indigo-600"
                            />
                            Gradient
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                          Text
                        </span>
                        <input
                          type="color"
                          value={config.titleText}
                          onChange={(e) =>
                            setConfig({ ...config, titleText: e.target.value })
                          }
                          className="h-6 w-6 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                        />
                      </div>
                      {config.titleIsGradient && (
                        <Input
                          value={config.titleGradient}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              titleGradient: e.target.value,
                            })
                          }
                          className="h-8 font-mono text-[10px]"
                          placeholder="linear-gradient(...)"
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Themes & Settings */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-indigo-600" />{" "}
                      Leaderboard Theme
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Select
                        value={config.skin}
                        onValueChange={(val) => {
                          setConfig({ ...config, skin: val });
                          updatePreview(val);
                        }}
                      >
                        <SelectTrigger className="h-9 flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {skins.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {config.skin !== "default" && (
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={handleDeleteSkin}
                          disabled={isDeleting}
                          className="h-9 w-9"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-3 rounded-lg border border-dashed bg-gray-50/50 p-3 dark:bg-gray-900/30">
                      <Input
                        placeholder="Theme Name"
                        value={skinName}
                        onChange={(e) => setSkinName(e.target.value)}
                        className="h-8 text-xs"
                      />
                      <div className="flex gap-2">
                        <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border bg-white px-3 py-1.5 text-xs font-medium shadow-sm transition-colors hover:bg-gray-50 dark:bg-gray-800">
                          <Upload className="h-3.5 w-3.5 text-indigo-600" />
                          <span>
                            {selectedFile ? "File Selected" : "Browse Image"}
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileSelect}
                          />
                        </label>
                        {selectedFile && (
                          <Button
                            onClick={handleUploadConfirm}
                            disabled={isUploading}
                            size="sm"
                            className="h-8 px-3"
                          >
                            Upload
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings2 className="h-4 w-4 text-indigo-600" /> Data
                      Synchronization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                        Match Data ID
                      </label>
                      <Input
                        type="number"
                        value={config.matchNumber}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            matchNumber: parseInt(e.target.value) || 0,
                          })
                        }
                        className="h-10 text-xl font-bold text-indigo-600"
                      />
                    </div>
                    <p className="text-[11px] leading-tight text-gray-500 italic">
                      This ID is used to fetch live statistics for the widget
                      rankings.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sticky Preview */}
            <div className="lg:col-span-4 lg:pl-0">
              <Card className="sticky top-4 border-gray-800 bg-black shadow-2xl">
                <CardHeader className="border-b-gray-800 bg-gray-900/80 py-2">
                  <CardTitle className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Skin Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-[url('https://transparent-textures.patterns.s3.amazonaws.com/carbon_fibre.png')]">
                    <img
                      src={previewSkin}
                      alt="Preview"
                      className="relative z-10 max-h-full max-w-full object-contain p-2"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src = "/skin.png")
                      }
                    />
                  </div>
                </CardContent>
                <div className="flex items-center justify-between border-t border-gray-800 bg-gray-950 p-3 px-4">
                  <div className="text-[11px] font-bold text-indigo-500">
                    {skins.find((s) => s.value === config.skin)?.name ||
                      "Current Skin"}
                  </div>
                  <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
