import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { theme } from "../../config/theme";

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  elevated = false,
}) => {
  return (
    <View style={[styles.card, elevated && styles.cardElevated, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  cardElevated: {
    ...theme.shadows.md,
  },
});
