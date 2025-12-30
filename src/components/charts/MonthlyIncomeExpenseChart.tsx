import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Card } from "../ui";
import { theme } from "../../config/theme";
import { MonthlyData } from "../../types";

interface MonthlyIncomeExpenseChartProps {
  data: MonthlyData[];
}

export const MonthlyIncomeExpenseChart: React.FC<
  MonthlyIncomeExpenseChartProps
> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <Text style={styles.emptyText}>No data available</Text>
      </Card>
    );
  }

  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        data: data.map((d) => d.income),
        color: (opacity = 1) => theme.colors.income,
        strokeWidth: 3,
      },
      {
        data: data.map((d) => d.expense),
        color: (opacity = 1) => theme.colors.expense,
        strokeWidth: 3,
      },
    ],
    legend: ["Income", "Expense"],
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Monthly Overview</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 64}
        height={220}
        chartConfig={{
          backgroundColor: theme.colors.surface,
          backgroundGradientFrom: theme.colors.surface,
          backgroundGradientTo: theme.colors.surface,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => theme.colors.textSecondary,
          style: {
            borderRadius: theme.borderRadius.md,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
          },
        }}
        bezier
        style={styles.chart}
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
  chart: {
    marginVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: "center",
    paddingVertical: theme.spacing.xl,
  },
});
