import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../config/theme";
import { Card, FAB } from "../../components/ui";
import { QuickAddModal } from "../../components/domain/QuickAddModal";
import { GoalCard } from "../../components/domain/GoalCard";
import { MonthlyIncomeExpenseChart } from "../../components/charts/MonthlyIncomeExpenseChart";
import { useTransactionStore } from "../../stores/transactionStore";
import { useGoalStore } from "../../stores/goalStore";

export const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { transactions, getTotalIncome, getTotalExpense } =
    useTransactionStore();
  const { goals } = useGoalStore();
  const [balance, setBalance] = useState({ income: 0, expense: 0, net: 0 });

  useEffect(() => {
    loadBalance();
  }, [transactions]);

  const loadBalance = async () => {
    const income = await getTotalIncome();
    const expense = await getTotalExpense();
    setBalance({
      income,
      expense,
      net: income - expense,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView style={styles.content}>
        <Text style={styles.header}>Fuduit</Text>

        <Card style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Net Balance</Text>
          <Text
            style={[
              styles.balanceAmount,
              balance.net >= 0 ? styles.positive : styles.negative,
            ]}
          >
            ${Math.abs(balance.net).toFixed(2)}
          </Text>
          <View style={styles.balanceRow}>
            <View>
              <Text style={styles.miniLabel}>Income</Text>
              <Text style={[styles.miniAmount, styles.income]}>
                ${balance.income.toFixed(2)}
              </Text>
            </View>
            <View>
              <Text style={styles.miniLabel}>Expense</Text>
              <Text style={[styles.miniAmount, styles.expense]}>
                ${balance.expense.toFixed(2)}
              </Text>
            </View>
          </View>
        </Card>

        <MonthlyIncomeExpenseChart data={[]} />

        {goals.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Goals</Text>
            {goals.slice(0, 3).map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </View>
        )}
      </ScrollView>

      <FAB onPress={() => setModalVisible(true)} />
      <QuickAddModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  header: {
    ...theme.typography.h1,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  balanceCard: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
  },
  balanceLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  balanceAmount: {
    ...theme.typography.h1,
    fontSize: 40,
    fontWeight: "700",
    marginBottom: theme.spacing.md,
  },
  positive: {
    color: theme.colors.success,
  },
  negative: {
    color: theme.colors.danger,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: theme.spacing.md,
  },
  miniLabel: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginBottom: theme.spacing.xs,
  },
  miniAmount: {
    ...theme.typography.body,
    fontWeight: "600",
    textAlign: "center",
  },
  income: {
    color: theme.colors.income,
  },
  expense: {
    color: theme.colors.expense,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
});
