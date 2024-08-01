import { ArtConfigTypes } from "../../../pages/content-ui/src/context/ArtboardContext";
import { StorageType, createStorage } from "./base";

type PresetType = {
  id: string;
  name: string;
  prompt: string;
  artConfig: ArtConfigTypes;
  customText: string;
  position: string;
  customPosition: string;
};

type AppStorage = {
  domains: string[];
  presets: PresetType[];
};

const initialStorage: AppStorage = {
  domains: [],
  presets: [],
};

const storage = createStorage("promptpen-app-storage", initialStorage, {
  storageType: StorageType.Sync,
  liveUpdate: true,
});

export const appStorage = {
  ...storage,

  /** Domain operations */
  addDomain: async (domain: string) => {
    await storage.set((currentStorage) => {
      // Check if the domain already exists
      if (currentStorage.domains.includes(domain)) {
        console.log(`Domain ${domain} already exists.`);
        return currentStorage; // Return the current storage without changes
      }

      // Add the domain if it does not exist
      return {
        ...currentStorage,
        domains: [...currentStorage.domains, domain],
      };
    });
  },
  removeDomain: async (domain: string) => {
    await storage.set((currentStorage) => {
      return {
        ...currentStorage,
        domains: currentStorage.domains.filter((d) => d !== domain),
      };
    });
  },

  /** Preset operations */
  addPreset: async (preset: PresetType) => {
    await storage.set((currentStorage) => {
      return {
        ...currentStorage,
        presets: [...currentStorage.presets, preset],
      };
    });
  },
  removePreset: async (preset: PresetType) => {
    await storage.set((currentStorage) => {
      return {
        ...currentStorage,
        presets: currentStorage.presets.filter((p) => p.id !== preset.id),
      };
    });
  },
  updatePreset: async (preset: PresetType) => {
    await storage.set((currentStorage) => {
      return {
        ...currentStorage,
        presets: currentStorage.presets.map((p) =>
          p.id === preset.id ? preset : p,
        ),
      };
    });
  },
};
