import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ModalContainer, Input, Button } from "../ui";
import { theme } from "../../config/theme";
import { useTransactionStore } from "../../stores/transactionStore";
import { useCategoryStore } from "../../stores/categoryStore";
import { useIncomeSourceStore } from "../../stores/incomeSourceStore";
import * as Haptics from "expo-haptics";

interface QuickAddModalProps {
  visible: boolean;
  onClose: () => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  visible,
  onClose,
}) => {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

  const { addTransaction } = useTransactionStore();
  const { categories } = useCategoryStore();
  const { incomeSources } = useIncomeSourceStore();

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    await addTransaction({
      type,
      amount: parseFloat(amount),
      description,
      categoryId: type === "expense" ? selectedCategory : undefined,
      incomeSourceId: type === "income" ? selectedSource : undefined,
      date: new Date().toISOString(),
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setSelectedCategory("");
    setSelectedSource("");
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} title="Quick Add">
      <View style={styles.typeSelector}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "expense" && styles.typeButtonActive,
          ]}
          onPress={() => setType("expense")}
        >
          <Text
            style={[
              styles.typeText,
              type === "expense" && styles.typeTextActive,
            ]}
          >
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "income" && styles.typeButtonActive,
          ]}
          onPress={() => setType("income")}
        >
          <Text
            style={[
              styles.typeText,
              type === "income" && styles.typeTextActive,
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>
      </View>

      <Input
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        placeholder="0.00"
      />

      <Input
        label="Description (Optional)"
        value={description}
        onChangeText={setDescription}
        placeholder="What was this for?"
      />

      {type === "expense" && categories.length > 0 && (
        <View style={styles.categoryGrid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryItem,
                selectedCategory === cat.id && styles.categoryItemActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {type === "income" && incomeSources.length > 0 && (
        <View style={styles.categoryGrid}>
          {incomeSources.map((source) => (
            <TouchableOpacity
              key={source.id}
              style={[
                styles.categoryItem,
                selectedSource === source.id && styles.categoryItemActive,
              ]}
              onPress={() => setSelectedSource(source.id)}
            >
              <Text style={styles.categoryIcon}>{source.icon}</Text>
              <Text style={styles.categoryName}>{source.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Button title="Add Transaction" onPress={handleSubmit} />
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  typeSelector: {
    flexDirection: "row",
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
  },
  typeButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: "center",
    borderRadius: theme.borderRadius.sm,
  },
  typeButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  typeText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  typeTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  categoryItem: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  categoryItemActive: {
    borderColor: theme.colors.primary,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  categoryName: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
});
