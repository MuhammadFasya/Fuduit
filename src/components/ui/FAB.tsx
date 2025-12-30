import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { theme } from "../../config/theme";

interface FABProps {
  onPress: () => void;
  icon?: string;
}

export const FAB: React.FC<FABProps> = ({ onPress, icon = "+" }) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <View style={styles.horizontal} />
        <View style={styles.vertical} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.lg,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    position: "absolute",
    width: 20,
    height: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  vertical: {
    position: "absolute",
    width: 3,
    height: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
});
