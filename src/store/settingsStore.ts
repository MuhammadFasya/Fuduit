import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Currency = "USD" | "IDR";

interface SettingsState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      currency: "USD",
      setCurrency: (currency: Currency) => set({ currency }),
    }),
    {
      name: "fuduit-settings",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Helper function to format currency - use this with the currency from the store
export const formatAmount = (amount: number, currency: Currency): string => {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const prefix = isNegative ? "-" : "";

  if (currency === "IDR") {
    return `${prefix}Rp${absAmount.toLocaleString("id-ID")}`;
  }
  return `${prefix}$${absAmount.toFixed(2)}`;
};
