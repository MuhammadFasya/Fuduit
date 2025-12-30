import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../ui";
import { theme } from "../../config/theme";
import { Insight } from "../../types";

interface InsightCardProps {
  insight: Insight;
  onDismiss?: () => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  onDismiss,
}) => {
  const severityColor = {
    info: theme.colors.primary,
    warning: theme.colors.warning,
    success: theme.colors.success,
  }[insight.severity];

  return (
    <Card style={[styles.card, { borderLeftColor: severityColor }]}>
      <View style={styles.content}>
        <View style={[styles.indicator, { backgroundColor: severityColor }]} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{insight.title}</Text>
          <Text style={styles.description}>{insight.description}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
    borderLeftWidth: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.md,
    marginTop: 6,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
});
