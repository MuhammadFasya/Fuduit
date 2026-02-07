import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useState, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bell,
  TrendingDown,
  TrendingUp,
  MoreHorizontal,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Coffee,
  Utensils,
  Film,
  ShoppingBag,
  CreditCard,
} from "lucide-react-native";

import {
  useTransactions,
  useTransactionStats,
  filterCurrentMonth,
  filterLastNDays,
} from "@/features/transactions/hooks";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore, formatAmount } from "@/store/settingsStore";

type InsightType = "win" | "income" | "alert" | "info";
type FilterType = "all" | "habits" | "income" | "wins";

interface Insight {
  id: string;
  type: InsightType;
  emoji: string;
  label: string;
  title: string;
  subtitle?: string;
  amount?: string;
  amountLabel?: string;
  extraInfo?: string;
  actionLabel?: string;
}

export default function InsightsScreen() {
  const { user } = useAuthStore();
  const { currency } = useSettingsStore();
  const { transactions, isLoading, fetchTransactions } = useTransactions();
  const [filter, setFilter] = useState<FilterType>("all");

  const formatCurrency = (amount: number) => formatAmount(amount, currency);

  const allTimeStats = useTransactionStats(transactions);
  const monthlyStats = useTransactionStats(filterCurrentMonth(transactions));
  const weeklyStats = useTransactionStats(filterLastNDays(transactions, 7));
  const lastWeekStats = useTransactionStats(
    filterLastNDays(transactions, 14).filter((t) => {
      const date = new Date(t.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return date < weekAgo;
    })
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Generate smart insights based on transaction data
  const insights = useMemo((): Insight[] => {
    const generated: Insight[] = [];

    if (transactions.length === 0) {
      return generated;
    }

    // Get category breakdowns
    const expenseCategories = Object.entries(allTimeStats.categoryBreakdown)
      .filter(([, data]) => data.type === "expense")
      .sort((a, b) => b[1].total - a[1].total);

    const weeklyExpenseCategories = Object.entries(
      weeklyStats.categoryBreakdown
    ).filter(([, data]) => data.type === "expense");

    const lastWeekExpenseCategories = Object.entries(
      lastWeekStats.categoryBreakdown
    ).filter(([, data]) => data.type === "expense");

    // Check for coffee/food spending reduction (Weekly Win)
    const coffeeCats = ["coffee", "cafe", "starbucks"];
    const foodCats = ["food", "dining", "restaurant", "uber eats", "doordash"];

    weeklyExpenseCategories.forEach(([cat, data]) => {
      const lastWeekCat = lastWeekExpenseCategories.find(
        ([c]) => c.toLowerCase() === cat.toLowerCase()
      );
      if (lastWeekCat && data.total < lastWeekCat[1].total) {
        const saved = lastWeekCat[1].total - data.total;
        if (saved > 5) {
          const isCoffee = coffeeCats.some((c) =>
            cat.toLowerCase().includes(c)
          );
          const isFood = foodCats.some((c) => cat.toLowerCase().includes(c));
          generated.push({
            id: `win-${cat}`,
            type: "win",
            emoji: isCoffee ? "☕" : isFood ? "🍕" : "🎉",
            label: "Weekly Win",
            title: `You spent less on ${cat} this week!`,
            amount: `Saved ${formatCurrency(saved)}`,
            amountLabel: "vs. last week",
          });
        }
      }
    });

    // Recent income notification
    const recentIncome = transactions
      .filter((t) => t.type === "income")
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];

    if (recentIncome) {
      const daysSince = Math.floor(
        (Date.now() - new Date(recentIncome.date).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      if (daysSince <= 3) {
        generated.push({
          id: "recent-income",
          type: "income",
          emoji: "🚀",
          label: "Income",
          title: `${recentIncome.category} just landed.`,
          subtitle: recentIncome.note || recentIncome.category,
          amount: `+${formatCurrency(recentIncome.amount)}`,
          actionLabel: "Stash for Taxes",
        });
      }
    }

    // Top spending category alert
    if (expenseCategories.length > 0) {
      const [topCat, topData] = expenseCategories[0];
      const weeklyTopCat = weeklyExpenseCategories.find(([c]) => c === topCat);
      const weeklyCount = weeklyTopCat ? weeklyTopCat[1].count : 0;

      if (weeklyCount >= 3) {
        generated.push({
          id: "spending-alert",
          type: "alert",
          emoji: foodCats.some((c) => topCat.toLowerCase().includes(c))
            ? "🍕"
            : "💳",
          label: "Spending Alert",
          title: `${topCat} is your top spend category.`,
          extraInfo: `${weeklyCount} transactions this week`,
        });
      }
    }

    // Subscription info
    const subscriptionCats = [
      "subscription",
      "netflix",
      "spotify",
      "youtube",
      "hulu",
      "disney",
    ];
    const subscriptions = transactions.filter((t) =>
      subscriptionCats.some(
        (s) =>
          t.category.toLowerCase().includes(s) ||
          (t.note && t.note.toLowerCase().includes(s))
      )
    );

    if (subscriptions.length > 0) {
      const monthlySubTotal = subscriptions
        .filter((s) => {
          const date = new Date(s.date);
          const now = new Date();
          return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          );
        })
        .reduce((sum, s) => sum + s.amount, 0);

      if (monthlySubTotal > 0) {
        generated.push({
          id: "subscriptions",
          type: "info",
          emoji: "📺",
          label: "Subscription",
          title: "Monthly subscriptions paid.",
          subtitle: `${formatCurrency(monthlySubTotal)} total this month ✔`,
        });
      }
    }

    // Positive balance win
    if (monthlyStats.balance > 100) {
      generated.push({
        id: "positive-balance",
        type: "win",
        emoji: "💰",
        label: "Money Win",
        title: "You're in the green this month!",
        amount: `+${formatCurrency(monthlyStats.balance)}`,
        amountLabel: "net positive",
      });
    }

    // Spending warning if expense > income
    if (
      monthlyStats.totalExpense > monthlyStats.totalIncome &&
      monthlyStats.totalIncome > 0
    ) {
      const overspend = monthlyStats.totalExpense - monthlyStats.totalIncome;
      generated.push({
        id: "overspend-warning",
        type: "alert",
        emoji: "⚠️",
        label: "Budget Alert",
        title: "You're spending more than you earn this month.",
        extraInfo: `${formatCurrency(overspend)} over budget`,
      });
    }

    // Filter based on selected filter
    if (filter === "habits") {
      return generated.filter(
        (i) =>
          i.type === "alert" || i.id.includes("coffee") || i.id.includes("food")
      );
    } else if (filter === "income") {
      return generated.filter(
        (i) => i.type === "income" || i.id.includes("balance")
      );
    } else if (filter === "wins") {
      return generated.filter((i) => i.type === "win");
    }

    return generated;
  }, [
    transactions,
    allTimeStats,
    monthlyStats,
    weeklyStats,
    lastWeekStats,
    filter,
  ]);

  const getInsightColors = (type: InsightType) => {
    switch (type) {
      case "win":
        return {
          bg: "bg-primary/10",
          text: "text-primary",
          icon: TrendingDown,
        };
      case "income":
        return {
          bg: "bg-blue-500/10",
          text: "text-blue-400",
          icon: TrendingUp,
        };
      case "alert":
        return {
          bg: "bg-secondary/10",
          text: "text-secondary",
          icon: AlertTriangle,
        };
      case "info":
        return { bg: "bg-white/10", text: "text-gray", icon: CheckCircle };
    }
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
        <Text className="text-xl font-bold text-white">Insights</Text>
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

      {/* Filter Chips */}
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
                : "bg-surface-light border border-white/5"
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
              style={{ color: filter === "all" ? "#1a1a1a" : "#ffffff" }}
              className={`text-sm font-bold`}
            >
              All
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter("habits")}
            className={`h-10 px-6 rounded-full items-center justify-center ${
              filter === "habits"
                ? "bg-primary"
                : "bg-surface-light border border-white/5"
            }`}
          >
            <Text
              style={{ color: filter === "habits" ? "#1a1a1a" : "#ffffff" }}
              className={`text-sm font-medium`}
            >
              ☕ Habits
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter("income")}
            className={`h-10 px-6 rounded-full items-center justify-center ${
              filter === "income"
                ? "bg-primary"
                : "bg-surface-light border border-white/5"
            }`}
          >
            <Text
              style={{ color: filter === "income" ? "#1a1a1a" : "#ffffff" }}
              className={`text-sm font-medium`}
            >
              💸 Income
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter("wins")}
            className={`h-10 px-6 rounded-full items-center justify-center ${
              filter === "wins"
                ? "bg-primary"
                : "bg-surface-light border border-white/5"
            }`}
          >
            <Text
              style={{ color: filter === "wins" ? "#1a1a1a" : "#ffffff" }}
              className={`text-sm font-medium`}
            >
              🎉 Wins
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Insights Feed */}
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 120, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {insights.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <View className="w-16 h-16 rounded-full bg-surface items-center justify-center mb-4">
              <Sparkles size={32} color="#a3e637" />
            </View>
            <Text className="text-white text-lg font-bold mb-2">
              No insights yet
            </Text>
            <Text className="text-gray text-sm text-center px-8">
              Add more transactions to see smart insights about your money flow
            </Text>
          </View>
        ) : (
          insights.map((insight) => {
            const colors = getInsightColors(insight.type);
            const IconComponent = colors.icon;

            return (
              <Pressable
                key={insight.id}
                className="bg-surface rounded-3xl p-6 gap-4"
              >
                {/* Header Row */}
                <View className="flex-row items-start justify-between">
                  <View className="flex-row items-center gap-2">
                    <View
                      className={`w-8 h-8 rounded-full ${colors.bg} items-center justify-center`}
                    >
                      <Text className="text-lg">{insight.emoji}</Text>
                    </View>
                    <Text
                      className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}
                    >
                      {insight.label}
                    </Text>
                  </View>
                  {insight.type === "income" && (
                    <Pressable>
                      <MoreHorizontal size={20} color="#6B7280" />
                    </Pressable>
                  )}
                </View>

                {/* Title */}
                <Text className="text-white text-xl font-bold leading-tight">
                  {insight.title}
                </Text>

                {/* Subtitle */}
                {insight.subtitle && (
                  <Text className="text-gray text-sm">{insight.subtitle}</Text>
                )}

                {/* Amount Row (for wins) */}
                {insight.amount && insight.type === "win" && (
                  <View className="flex-row items-center gap-3 mt-2">
                    <TrendingDown size={20} color="#a3e637" />
                    <Text className="text-primary text-lg font-bold">
                      {insight.amount}
                    </Text>
                    {insight.amountLabel && (
                      <Text className="text-gray text-sm">
                        {insight.amountLabel}
                      </Text>
                    )}
                  </View>
                )}

                {/* Income Card Footer */}
                {insight.type === "income" && insight.amount && (
                  <View className="flex-row items-center justify-between border-t border-white/5 pt-4 mt-2">
                    <Text className="text-white text-2xl font-bold">
                      {insight.amount}
                    </Text>
                    {insight.actionLabel && (
                      <Pressable
                        onPress={() =>
                          Alert.alert(
                            "Coming Soon",
                            "This feature will be implemented in the future."
                          )
                        }
                        className="flex-row items-center gap-2 bg-primary px-5 py-2.5 rounded-full"
                      >
                        <Sparkles size={16} color="#121212" />
                        <Text
                          style={{ color: "#121212" }}
                          className="text-sm font-bold"
                        >
                          {insight.actionLabel}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                )}

                {/* Alert Extra Info */}
                {insight.type === "alert" && insight.extraInfo && (
                  <View className="flex-row items-center gap-3 p-3 rounded-2xl bg-secondary/5 mt-1">
                    <Text className="text-secondary font-bold">
                      {insight.extraInfo.split(" ")[0]}
                    </Text>
                    <Text className="text-gray text-sm">
                      {insight.extraInfo.split(" ").slice(1).join(" ")}
                    </Text>
                  </View>
                )}

                {/* Info Card Layout */}
                {insight.type === "info" && (
                  <View className="flex-row items-center gap-4 -mx-2 -mb-2 mt-2">
                    <View className="w-20 h-20 rounded-2xl bg-surface-light overflow-hidden items-center justify-center">
                      <Film size={32} color="#ffffff50" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray text-xs uppercase">
                        {insight.label}
                      </Text>
                      <Text className="text-white text-base font-bold">
                        {insight.title}
                      </Text>
                      <Text className="text-gray text-sm">
                        {insight.subtitle}
                      </Text>
                    </View>
                  </View>
                )}
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
