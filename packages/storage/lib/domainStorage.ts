import { StorageType, createStorage } from "./base";

type DomainStorage = {
  domains: string[];
};

const initialStorage: DomainStorage = {
  domains: [],
};

const storage = createStorage("domain-storage", initialStorage, {
  storageType: StorageType.Sync,
  liveUpdate: true,
});

export const domainStorage = {
  ...storage,
  addDomain: async (domain: string) => {
    await storage.set((currentStorage) => {
      // Check if the domain already exists
      if (currentStorage.domains.includes(domain)) {
        console.log(`Domain ${domain} already exists.`);
        return currentStorage; // Return the current storage without changes
      }

      // Add the domain if it does not exist
      return {
        domains: [...currentStorage.domains, domain],
      };
    });
  },
  removeDomain: async (domain: string) => {
    await storage.set((currentStorage) => {
      return {
        domains: currentStorage.domains.filter((d) => d !== domain),
      };
    });
  },
};
