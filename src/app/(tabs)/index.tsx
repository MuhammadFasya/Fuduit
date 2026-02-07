import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import {
  Bell,
  Heart,
  ShoppingBag,
  Film,
  Briefcase,
  ArrowDown,
  ArrowUp,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import {
  useTransactions,
  useTransactionStats,
  filterCurrentMonth,
} from "@/features/transactions/hooks";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore, formatAmount } from "@/store/settingsStore";
import { AnimatedProgress, AnimatedButton } from "@/components/ui/Animated";

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { currency } = useSettingsStore();
  const { transactions, isLoading, fetchTransactions } = useTransactions();

  const currentMonthTransactions = filterCurrentMonth(transactions);
  const stats = useTransactionStats(currentMonthTransactions);
  const totalStats = useTransactionStats(transactions);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const formatCurrency = (amount: number) => formatAmount(amount, currency);

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getUserName = (): string => {
    if (user?.displayName) return user.displayName.split(" ")[0];
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  // Calculate HP percentage based on remaining budget
  const calculateHP = (): number => {
    if (stats.totalIncome === 0) return 100;
    const remaining = stats.totalIncome - stats.totalExpense;
    const percentage = (remaining / stats.totalIncome) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  const hp = calculateHP();

  // Get icon for transaction category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "shopping":
      case "groceries":
        return <ShoppingBag size={24} color="#ffffff" />;
      case "entertainment":
      case "subscription":
        return <Film size={24} color="#ffffff" />;
      case "salary":
      case "freelance":
      case "work":
        return <Briefcase size={24} color="#a3e637" />;
      default:
        return <ShoppingBag size={24} color="#ffffff" />;
    }
  };

  const recentTransactions = transactions.slice(0, 3);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-dark items-center justify-center">
        <ActivityIndicator size="large" color="#a3e637" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-4">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl overflow-hidden">
              <Image
                source={require("../../../assets/icon.png")}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-xl font-bold text-white">Fuduit</Text>
          </View>
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

        {/* Greeting Section */}
        <View className="px-6 pb-4">
          <Text className="text-white/60 text-sm font-medium">
            {getGreeting()},
          </Text>
          <Text className="text-white text-2xl font-bold">{getUserName()}</Text>
        </View>

        {/* Balance Section */}
        <View className="items-center py-6 px-6">
          <Text className="text-white/50 text-sm font-medium mb-1 uppercase tracking-wider">
            Total Balance
          </Text>
          <Text className="text-white text-5xl font-bold tracking-tight">
            {formatCurrency(totalStats.balance)}
          </Text>
        </View>

        {/* HP Bar */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="px-6 gap-2"
        >
          <View className="flex-row justify-between items-end px-1">
            <View className="flex-row items-center gap-1.5">
              <Heart size={18} color="#a3e637" fill="#a3e637" />
              <Text className="text-primary text-sm font-bold">
                HP {hp.toFixed(0)}%
              </Text>
            </View>
            <Text className="text-white/40 text-xs font-medium">
              {new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                0
              ).getDate() - new Date().getDate()}{" "}
              days left
            </Text>
          </View>
          <View className="h-6 w-full bg-surface rounded-full p-1 overflow-hidden border border-white/5">
            <AnimatedProgress
              progress={hp / 100}
              color="#a3e637"
              backgroundColor="transparent"
              height={16}
            />
          </View>
          <Text className="text-center text-white/40 text-xs mt-1">
            {hp >= 80
              ? "You're surviving comfortably this month!"
              : hp >= 50
                ? "Keep an eye on your spending!"
                : "Budget is running low!"}
          </Text>
        </Animated.View>

        {/* Monthly Summary Cards */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          className="flex-row px-6 gap-4 mt-6"
        >
          {/* Income Card */}
          <AnimatedButton className="flex-1 bg-surface rounded-2xl p-5 gap-8 border border-white/5">
            <View className="flex-row justify-between items-start">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                <ArrowDown size={20} color="#a3e637" />
              </View>
              <View className="bg-primary/10 px-2 py-1 rounded-full">
                <Text className="text-primary text-[10px] font-bold uppercase">
                  Income
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-white/60 text-sm font-medium">
                This Month
              </Text>
              <Text className="text-primary text-2xl font-bold">
                +{formatCurrency(stats.totalIncome)}
              </Text>
            </View>
          </AnimatedButton>

          {/* Expense Card */}
          <AnimatedButton className="flex-1 bg-surface rounded-2xl p-5 gap-8 border border-white/5">
            <View className="flex-row justify-between items-start">
              <View className="w-10 h-10 rounded-full bg-secondary/10 items-center justify-center">
                <ArrowUp size={20} color="#f472b6" />
              </View>
              <View className="bg-secondary/10 px-2 py-1 rounded-full">
                <Text className="text-secondary text-[10px] font-bold uppercase">
                  Spent
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-white/60 text-sm font-medium">
                This Month
              </Text>
              <Text className="text-secondary text-2xl font-bold">
                -{formatCurrency(stats.totalExpense)}
              </Text>
            </View>
          </AnimatedButton>
        </Animated.View>

        {/* Recent Transactions */}
        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          className="mt-8 px-6"
        >
          <View className="flex-row items-center justify-between mb-4 px-1">
            <Text className="text-lg font-bold text-white">
              Recent Transactions
            </Text>
            <Pressable onPress={() => router.push("/(tabs)/transactions")}>
              <Text className="text-xs font-bold text-primary">View All</Text>
            </Pressable>
          </View>

          {transactions.length === 0 ? (
            <View className="bg-surface rounded-xl p-8 items-center border border-white/5">
              <Text className="text-white/60 text-base mb-2">
                No transactions yet
              </Text>
              <Text className="text-white/40 text-sm text-center">
                Add your first transaction to get started
              </Text>
            </View>
          ) : (
            <View className="gap-3">
              {recentTransactions.map((transaction) => (
                <Pressable
                  key={transaction.id}
                  className="flex-row items-center justify-between p-4 rounded-xl bg-surface border border-white/5"
                >
                  <View className="flex-row items-center gap-4">
                    <View className="w-12 h-12 rounded-full bg-[#2A2A2A] items-center justify-center">
                      {getCategoryIcon(transaction.category)}
                    </View>
                    <View>
                      <Text className="text-white font-bold text-base">
                        {transaction.note || transaction.category}
                      </Text>
                      <Text className="text-white/40 text-xs">
                        {new Date(transaction.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            hour: "numeric",
                            minute: "2-digit",
                          }
                        )}
                      </Text>
                    </View>
                  </View>
                  <Text
                    className={`font-bold ${transaction.type === "income" ? "text-primary" : "text-white"}`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
