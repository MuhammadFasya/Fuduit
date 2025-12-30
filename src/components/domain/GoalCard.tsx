import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../ui";
import { theme } from "../../config/theme";
import { Goal } from "../../types";

interface GoalCardProps {
  goal: Goal;
  onPress?: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onPress }) => {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const progressClamped = Math.min(Math.max(progress, 0), 100);

  return (
    <Card style={styles.card}>
      <Text style={styles.name}>{goal.name}</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${progressClamped}%`,
                backgroundColor: goal.color || theme.colors.primary,
              },
            ]}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.amount}>
          ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
        </Text>
        <Text style={styles.percentage}>{progressClamped.toFixed(0)}%</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
  },
  name: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  progressContainer: {
    marginBottom: theme.spacing.sm,
  },
  progressBackground: {
    height: 8,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.sm,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: theme.borderRadius.sm,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  percentage: {
    ...theme.typography.body,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
});
