import React from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
} from "react-native";
import { theme } from "../../config/theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={theme.colors.textTertiary}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: theme.colors.textPrimary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  inputError: {
    borderColor: theme.colors.danger,
  },
  error: {
    ...theme.typography.small,
    color: theme.colors.danger,
    marginTop: theme.spacing.xs,
  },
});
