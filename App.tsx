import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { initDatabase } from "./src/database/database";
import { useTransactionStore } from "./src/stores/transactionStore";
import { useCategoryStore } from "./src/stores/categoryStore";
import { useIncomeSourceStore } from "./src/stores/incomeSourceStore";
import { useGoalStore } from "./src/stores/goalStore";
import { theme } from "./src/config/theme";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const { loadTransactions } = useTransactionStore();
  const { loadCategories } = useCategoryStore();
  const { loadIncomeSources } = useIncomeSourceStore();
  const { loadGoals } = useGoalStore();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize database
      await initDatabase();

      // Load all data from database
      await Promise.all([
        loadCategories(),
        loadIncomeSources(),
        loadTransactions(),
        loadGoals(),
      ]);

      setIsReady(true);
    } catch (error) {
      console.error("Failed to initialize app:", error);
      setIsReady(true); // Still show app even if init fails
    }
  };

  if (!isReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
});
