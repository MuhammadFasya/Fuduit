import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../config/theme";
import { TransactionItem } from "../../components/domain/TransactionItem";
import { useTransactionStore } from "../../stores/transactionStore";
import { useCategoryStore } from "../../stores/categoryStore";
import { useIncomeSourceStore } from "../../stores/incomeSourceStore";

export const TransactionsScreen = () => {
  const { transactions } = useTransactionStore();
  const { categories, getCategoryById } = useCategoryStore();
  const { incomeSources, getIncomeSourceById } = useIncomeSourceStore();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            categoryName={
              item.categoryId
                ? getCategoryById(item.categoryId)?.name
                : undefined
            }
            incomeSourceName={
              item.incomeSourceId
                ? getIncomeSourceById(item.incomeSourceId)?.name
                : undefined
            }
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No transactions yet</Text>
            <Text style={styles.emptyHint}>
              Tap + to add your first transaction
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.textPrimary,
  },
  list: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 100,
  },
  empty: {
    paddingVertical: theme.spacing.xxl,
    alignItems: "center",
  },
  emptyText: {
    ...theme.typography.h3,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  emptyHint: {
    ...theme.typography.body,
    color: theme.colors.textTertiary,
  },
});
