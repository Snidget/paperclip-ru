import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";

const PLUGIN_ID = "plugin.paperclip.ru";
const PLUGIN_VERSION = "1.0.5";

const manifest: PaperclipPluginManifestV1 = {
  id: PLUGIN_ID,
  apiVersion: 1,
  version: PLUGIN_VERSION,
  displayName: "Russian Language Pack",
  description:
    "Russian UI localization for Paperclip. Switch between the original English interface and Russian without modifying the host application.",
  author: "Snidget",
  categories: ["ui"],
  capabilities: ["ui.action.register", "instance.settings.register"],
  entrypoints: {
    worker: "./dist/worker.js",
    ui: "./dist/ui",
  },
  ui: {
    slots: [
      {
        type: "globalToolbarButton",
        id: "lang-switcher",
        displayName: "Language",
        exportName: "LangSwitcher",
      },
      {
        type: "settingsPage",
        id: "lang-settings",
        displayName: "Russian Language Pack",
        exportName: "LangSettingsPage",
      },
    ],
  },
};

export default manifest;
