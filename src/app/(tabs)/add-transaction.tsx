import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  X,
  DollarSign,
  Tag,
  FileText,
  TrendingUp,
  TrendingDown,
  Check,
  Coffee,
  ShoppingBag,
  Car,
  Home,
  Utensils,
  Briefcase,
  Gift,
  Heart,
  Zap,
} from "lucide-react-native";

import { useTransactions } from "@/features/transactions/hooks";

type TransactionType = "income" | "expense";

const EXPENSE_CATEGORIES = [
  { name: "Food", icon: Utensils },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Transport", icon: Car },
  { name: "Coffee", icon: Coffee },
  { name: "Bills", icon: Zap },
  { name: "Home", icon: Home },
];

const INCOME_CATEGORIES = [
  { name: "Salary", icon: Briefcase },
  { name: "Freelance", icon: TrendingUp },
  { name: "Gift", icon: Gift },
  { name: "Other", icon: Heart },
];

export default function AddTransactionScreen(): JSX.Element {
  const params = useLocalSearchParams<{ editId?: string }>();
  const editId = params.editId ? parseInt(params.editId, 10) : null;
  const isEditMode = editId !== null;

  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<TransactionType>("expense");
  const [note, setNote] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isInitializing, setIsInitializing] = useState<boolean>(isEditMode);

  const { addTransaction, updateTransaction, getTransactionById, isLoading } =
    useTransactions();

  useEffect(() => {
    const loadTransaction = async () => {
      if (editId) {
        const transaction = await getTransactionById(editId);
        if (transaction) {
          setAmount(transaction.amount.toString());
          setCategory(transaction.category);
          setType(transaction.type);
          setNote(transaction.note || "");
        } else {
          Alert.alert("Error", "Transaction not found");
          router.back();
        }
        setIsInitializing(false);
      }
    };
    loadTransaction();
  }, [editId, getTransactionById]);

  const validateInputs = (): boolean => {
    if (!amount.trim()) {
      setError("Please enter an amount");
      return false;
    }
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid amount");
      return false;
    }
    if (!category.trim()) {
      setError("Please select a category");
      return false;
    }
    return true;
  };

  const handleSave = async (): Promise<void> => {
    setError("");
    if (!validateInputs()) return;

    const transactionData = {
      amount: parseFloat(amount),
      category: category.trim(),
      type,
      note: note.trim() || null,
      date: new Date(),
    };

    const result =
      isEditMode && editId
        ? await updateTransaction(editId, transactionData)
        : await addTransaction(transactionData);

    if (result.success) {
      router.back();
    } else {
      setError(result.error || "Failed to save transaction");
    }
  };

  const categories =
    type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  if (isInitializing) {
    return (
      <SafeAreaView className="flex-1 bg-dark items-center justify-center">
        <ActivityIndicator size="large" color="#a3e637" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-dark" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 border-b border-white/5">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full bg-surface"
          >
            <X size={20} color="#9ca3af" />
          </Pressable>
          <Text className="text-lg font-bold text-white">
            {isEditMode ? "Edit Transaction" : "New Transaction"}
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 px-5"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Error Message */}
          {error ? (
            <View className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
              <Text className="text-red-400 text-sm text-center">{error}</Text>
            </View>
          ) : null}

          {/* Type Toggle */}
          <View className="mt-6">
            <Text className="text-sm font-medium text-gray-400 mb-3">Type</Text>
            <View className="flex-row bg-surface rounded-xl p-1">
              <Pressable
                onPress={() => {
                  setType("expense");
                  setCategory("");
                }}
                disabled={isLoading}
                className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-lg ${
                  type === "expense" ? "bg-red-500/20" : ""
                }`}
              >
                <TrendingDown
                  size={18}
                  color={type === "expense" ? "#ef4444" : "#6b7280"}
                />
                <Text
                  className={
                    type === "expense"
                      ? "text-red-400 font-semibold"
                      : "text-gray-500"
                  }
                >
                  Expense
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setType("income");
                  setCategory("");
                }}
                disabled={isLoading}
                className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-lg ${
                  type === "income" ? "bg-primary/20" : ""
                }`}
              >
                <TrendingUp
                  size={18}
                  color={type === "income" ? "#a3e637" : "#6b7280"}
                />
                <Text
                  className={
                    type === "income"
                      ? "text-primary font-semibold"
                      : "text-gray-500"
                  }
                >
                  Income
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Amount Input */}
          <View className="mt-6">
            <Text className="text-sm font-medium text-gray-400 mb-3">
              Amount
            </Text>
            <View className="flex-row items-center bg-surface rounded-xl px-4 border border-white/5">
              <DollarSign size={20} color="#a3e637" />
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor="#6b7280"
                keyboardType="decimal-pad"
                editable={!isLoading}
                className="flex-1 py-4 pl-3 text-2xl font-bold text-white"
              />
            </View>
          </View>

          {/* Category Selection */}
          <View className="mt-6">
            <Text className="text-sm font-medium text-gray-400 mb-3">
              Category
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.name;
                return (
                  <Pressable
                    key={cat.name}
                    onPress={() => setCategory(cat.name)}
                    disabled={isLoading}
                    className={`flex-row items-center gap-2 px-4 py-3 rounded-xl border ${
                      isSelected
                        ? type === "income"
                          ? "bg-primary/20 border-primary"
                          : "bg-red-500/20 border-red-500"
                        : "bg-surface border-white/5"
                    }`}
                  >
                    <Icon
                      size={16}
                      color={
                        isSelected
                          ? type === "income"
                            ? "#a3e637"
                            : "#ef4444"
                          : "#9ca3af"
                      }
                    />
                    <Text
                      className={
                        isSelected
                          ? type === "income"
                            ? "text-primary font-medium"
                            : "text-red-400 font-medium"
                          : "text-gray-400"
                      }
                    >
                      {cat.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Custom Category */}
            <View className="flex-row items-center bg-surface rounded-xl px-4 mt-3 border border-white/5">
              <Tag size={18} color="#6b7280" />
              <TextInput
                value={category}
                onChangeText={setCategory}
                placeholder="Or type custom category..."
                placeholderTextColor="#6b7280"
                editable={!isLoading}
                className="flex-1 py-3 pl-3 text-white"
              />
            </View>
          </View>

          {/* Note Input */}
          <View className="mt-6">
            <Text className="text-sm font-medium text-gray-400 mb-3">
              Note (optional)
            </Text>
            <View className="flex-row items-start bg-surface rounded-xl px-4 border border-white/5">
              <FileText size={18} color="#6b7280" style={{ marginTop: 14 }} />
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="Add a note..."
                placeholderTextColor="#6b7280"
                multiline
                numberOfLines={3}
                editable={!isLoading}
                className="flex-1 py-3 pl-3 text-white min-h-[80px]"
                textAlignVertical="top"
              />
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-4 bg-dark border-t border-white/5">
          <Pressable
            onPress={handleSave}
            disabled={isLoading}
            className={`flex-row items-center justify-center gap-2 py-4 rounded-full ${
              type === "income" ? "bg-primary" : "bg-red-500"
            } active:opacity-80`}
          >
            {isLoading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <>
                <Check size={20} color="#000" />
                <Text className="text-base font-bold text-black">
                  {isEditMode ? "Update" : "Save"}{" "}
                  {type === "income" ? "Income" : "Expense"}
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
