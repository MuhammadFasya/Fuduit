import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../config/theme";
import { InsightCard } from "../../components/domain/InsightCard";
import { CategoryDonutChart } from "../../components/charts/CategoryDonutChart";
import { useInsightStore } from "../../stores/insightStore";

export const InsightsScreen = () => {
  const { insights, generateInsights, isLoading } = useInsightStore();

  useEffect(() => {
    generateInsights();
  }, []);

  const handleRefresh = () => {
    generateInsights();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Insights</Text>
        <TouchableOpacity onPress={handleRefresh} disabled={isLoading}>
          <Text style={styles.refreshButton}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {insights.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Financial Insights</Text>
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </View>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No insights available yet</Text>
            <Text style={styles.emptyHint}>
              Add more transactions to generate insights
            </Text>
          </View>
        )}

        <CategoryDonutChart data={[]} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.textPrimary,
  },
  refreshButton: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  empty: {
    paddingVertical: theme.spacing.xxl,
    alignItems: "center",
  },
  emptyText: {
    ...theme.typography.h3,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    textAlign: "center",
  },
  emptyHint: {
    ...theme.typography.body,
    color: theme.colors.textTertiary,
    textAlign: "center",
  },
});
