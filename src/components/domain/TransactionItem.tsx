import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "../ui";
import { theme } from "../../config/theme";
import { Transaction } from "../../types";
import { format, parseISO } from "date-fns";

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
  categoryName?: string;
  incomeSourceName?: string;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onPress,
  categoryName,
  incomeSourceName,
}) => {
  const isIncome = transaction.type === "income";
  const displayName = isIncome ? incomeSourceName : categoryName;

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.leftSection}>
            <Text style={styles.description}>
              {transaction.description || displayName || "No description"}
            </Text>
            <Text style={styles.date}>
              {format(parseISO(transaction.date), "MMM dd, yyyy")}
            </Text>
          </View>
          <View style={styles.rightSection}>
            <Text
              style={[styles.amount, isIncome ? styles.income : styles.expense]}
            >
              {isIncome ? "+" : "-"}${transaction.amount.toFixed(2)}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    marginLeft: theme.spacing.md,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  date: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  amount: {
    ...theme.typography.h3,
    fontWeight: "600",
  },
  income: {
    color: theme.colors.income,
  },
  expense: {
    color: theme.colors.expense,
  },
});
