import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Card } from "../ui";
import { theme } from "../../config/theme";
import { CategoryData } from "../../types";

interface CategoryDonutChartProps {
  data: CategoryData[];
}

export const CategoryDonutChart: React.FC<CategoryDonutChartProps> = ({
  data,
}) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <Text style={styles.emptyText}>No category data available</Text>
      </Card>
    );
  }

  const chartData = data.map((item, index) => ({
    name: item.name,
    amount: item.amount,
    color: item.color,
    legendFontColor: theme.colors.textSecondary,
    legendFontSize: 12,
  }));

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Spending by Category</Text>
      <PieChart
        data={chartData}
        width={Dimensions.get("window").width - 64}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[10, 0]}
        hasLegend={true}
        absolute
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: "center",
    paddingVertical: theme.spacing.xl,
  },
});
