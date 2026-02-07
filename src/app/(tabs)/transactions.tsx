import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { useEffect, useState, useCallback, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown, Layout } from "react-native-reanimated";
import {
  Bell,
  ShoppingBag,
  Film,
  Briefcase,
  Coffee,
  CreditCard,
  Utensils,
  Car,
  Home as HomeIcon,
  Zap,
} from "lucide-react-native";
import { router } from "expo-router";

import { useTransactions } from "@/features/transactions/hooks";
import { Transaction } from "@/db/schema";
import { AnimatedButton } from "@/components/ui/Animated";
import { useSettingsStore, formatAmount } from "@/store/settingsStore";

type FilterType = "all" | "income" | "expense";

export default function TransactionsScreen() {
  const { transactions, isLoading, fetchTransactions, deleteTransaction } =
    useTransactions();
  const { currency } = useSettingsStore();
  const [filter, setFilter] = useState<FilterType>("all");

  const formatCurrency = (amount: number) => formatAmount(amount, currency);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: Transaction[] } = {};

    filteredTransactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let dateKey: string;

      if (date.toDateString() === today.toDateString()) {
        dateKey = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateKey = "Yesterday";
      } else {
        dateKey = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(transaction);
    });

    return groups;
  }, [filteredTransactions]);

  const handleEditTransaction = (id: number): void => {
    router.push({
      pathname: "/(tabs)/add-transaction",
      params: { editId: id.toString() },
    });
  };

  const handleDeleteTransaction = useCallback(
    (id: number, category: string) => {
      Alert.alert(
        "Delete Transaction",
        `Are you sure you want to delete this ${category} transaction?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              const result = await deleteTransaction(id);
              if (!result.success) {
                Alert.alert(
                  "Error",
                  result.error || "Failed to delete transaction"
                );
              }
            },
          },
        ]
      );
    },
    [deleteTransaction]
  );

  const getCategoryIcon = (category: string, type: string) => {
    const color = type === "income" ? "#a3e637" : "#ffffff";
    const iconProps = { size: 24, color };

    switch (category.toLowerCase()) {
      case "shopping":
      case "groceries":
        return <ShoppingBag {...iconProps} />;
      case "entertainment":
      case "subscription":
        return <Film {...iconProps} />;
      case "salary":
      case "freelance":
      case "work":
        return <Briefcase {...iconProps} />;
      case "food":
      case "dining":
        return <Utensils {...iconProps} />;
      case "coffee":
        return <Coffee {...iconProps} />;
      case "transport":
      case "transportation":
        return <Car {...iconProps} />;
      case "utilities":
      case "bills":
        return <Zap {...iconProps} />;
      case "rent":
      case "housing":
        return <HomeIcon {...iconProps} />;
      default:
        return <CreditCard {...iconProps} />;
    }
  };

  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-dark items-center justify-center">
        <ActivityIndicator size="large" color="#a3e637" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-dark">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-4">
        <View className="w-10 h-10 rounded-xl overflow-hidden">
          <Image
            source={require("../../../assets/icon.png")}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <Text className="text-xl font-bold text-white">History</Text>
        <Pressable
          className="w-10 h-10 items-center justify-center rounded-full bg-surface"
          onPress={() =>
            Alert.alert(
              "Coming Soon",
              "Notifications feature will be available in a future update."
            )
          }
        >
          <Bell size={20} color="#ffffff" />
        </Pressable>
      </View>

      {/* Filters */}
      <View className="px-6 py-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        >
          <Pressable
            onPress={() => setFilter("all")}
            className={`h-10 px-6 rounded-full items-center justify-center ${
              filter === "all"
                ? "bg-primary"
                : "bg-surface border border-white/20"
            }`}
            style={
              filter === "all"
                ? {
                    shadowColor: "#a3e637",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    shadowRadius: 15,
                  }
                : {}
            }
          >
            <Text
              className="text-sm font-bold"
              style={{ color: filter === "all" ? "#121212" : "#ffffff" }}
            >
              All
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter("income")}
            className={`h-10 px-6 rounded-full items-center justify-center ${
              filter === "income"
                ? "bg-primary"
                : "bg-surface border border-white/20"
            }`}
          >
            <Text
              className="text-sm font-medium"
              style={{ color: filter === "income" ? "#121212" : "#ffffff" }}
            >
              Income
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter("expense")}
            className={`h-10 px-6 rounded-full items-center justify-center ${
              filter === "expense"
                ? "bg-primary"
                : "bg-surface border border-white/20"
            }`}
          >
            <Text
              className="text-sm font-medium"
              style={{ color: filter === "expense" ? "#121212" : "#ffffff" }}
            >
              Spent
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Transactions List */}
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(groupedTransactions).length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-white/60 text-lg mb-2">
              No transactions yet
            </Text>
            <Text className="text-white/40 text-sm text-center">
              Add your first transaction to get started
            </Text>
          </View>
        ) : (
          Object.entries(groupedTransactions).map(
            ([dateKey, dateTransactions]) => (
              <View key={dateKey} className="mb-6">
                <Text className="px-2 text-sm font-bold text-white/60 uppercase tracking-wider mb-3">
                  {dateKey}
                </Text>
                <View className="gap-3">
                  {dateTransactions.map((transaction, index) => (
                    <Animated.View
                      key={transaction.id}
                      entering={FadeInDown.delay(index * 50).springify()}
                      layout={Layout.springify()}
                    >
                      <AnimatedButton
                        onPress={() => handleEditTransaction(transaction.id)}
                        onLongPress={() =>
                          handleDeleteTransaction(
                            transaction.id,
                            transaction.category
                          )
                        }
                        className="bg-surface p-4 rounded-3xl flex-row items-center gap-4"
                      >
                        <View
                          className={`w-14 h-14 rounded-2xl items-center justify-center ${
                            transaction.type === "income"
                              ? "bg-primary/10"
                              : "bg-secondary/10"
                          }`}
                        >
                          {getCategoryIcon(
                            transaction.category,
                            transaction.type
                          )}
                        </View>
                        <View className="flex-1">
                          <Text
                            className="font-bold text-base text-white"
                            numberOfLines={1}
                          >
                            {transaction.category}
                          </Text>
                          <Text className="text-xs font-medium text-white/50 mt-0.5">
                            {transaction.note ? `${transaction.note} • ` : ""}
                            {formatTime(transaction.date)}
                          </Text>
                        </View>
                        <Text
                          className={`font-extrabold text-lg ${
                            transaction.type === "income"
                              ? "text-primary"
                              : "text-secondary"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </Text>
                      </AnimatedButton>
                    </Animated.View>
                  ))}
                </View>
              </View>
            )
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
