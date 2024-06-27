import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserDataStore = create(
  persist(
    (set) => ({
      userData: {},
      setStoreUserData: (newUserData) => set({ userData: newUserData }),
    }),
    {
      name: "userDataBankApp",
    }
  )
);
