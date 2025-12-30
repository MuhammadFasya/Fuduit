import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../config/theme";
import { Card } from "../../components/ui";
import { APP_CONFIG } from "../../config/constants";

export const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.row}>
            <Text style={styles.label}>App Version</Text>
            <Text style={styles.value}>{APP_CONFIG.version}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Theme</Text>
            <Text style={styles.value}>Dark Mode</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Data Storage</Text>
            <Text style={styles.value}>Local (SQLite)</Text>
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Offline Mode</Text>
            <Text style={styles.value}>✓ Enabled</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Auto Insights</Text>
            <Text style={styles.value}>✓ Enabled</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Haptic Feedback</Text>
            <Text style={styles.value}>✓ Enabled</Text>
          </View>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Fuduit - Local-first personal finance tracker
          </Text>
          <Text style={styles.footerText}>
            No authentication • Fully offline • Privacy-focused
          </Text>
        </View>
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
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.textPrimary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
  },
  label: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
  },
  value: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  footer: {
    marginTop: theme.spacing.xl,
    alignItems: "center",
  },
  footerText: {
    ...theme.typography.caption,
    color: theme.colors.textTertiary,
    textAlign: "center",
    marginBottom: theme.spacing.xs,
  },
});
