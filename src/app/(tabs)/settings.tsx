import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
  Alert,
  Image,
  Linking,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bell,
  DollarSign,
  Moon,
  Lock,
  RotateCcw,
  Info,
  HelpCircle,
  LogOut,
  ChevronRight,
  ExternalLink,
  User,
} from "lucide-react-native";

import { useAuth } from "@/features/auth/hooks";
import { useAuthStore } from "@/store/authStore";
import { useTransactionStore } from "@/store/transactionStore";

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  destructive?: boolean;
}

function SettingItem({
  icon,
  label,
  rightElement,
  onPress,
  destructive,
}: SettingItemProps): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between p-4 active:bg-white/5"
    >
      <View className="flex-row items-center gap-3">
        <View
          className={`h-10 w-10 items-center justify-center rounded-full ${
            destructive ? "bg-secondary/10" : "bg-primary/10"
          }`}
        >
          {icon}
        </View>
        <Text
          className={`text-base font-medium ${
            destructive ? "text-secondary" : "text-white"
          }`}
        >
          {label}
        </Text>
      </View>
      {rightElement}
    </Pressable>
  );
}

function Divider(): JSX.Element {
  return <View className="h-px w-full bg-white/5 ml-16" />;
}

export default function SettingsScreen(): JSX.Element {
  const { user } = useAuthStore();
  const { logout, isLoading } = useAuth();
  const { clearTransactions } = useTransactionStore();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [appearance, setAppearance] = useState("Dark");

  const handleLogout = (): void => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          clearTransactions();
          await logout();
        },
      },
    ]);
  };

  const handleResetData = (): void => {
    Alert.alert(
      "Reset All Data",
      "This will permanently delete all your transactions and settings. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            clearTransactions();
            Alert.alert("Success", "All data has been reset.");
          },
        },
      ]
    );
  };

  const handleCurrencyPress = (): void => {
    Alert.alert("Select Currency", "Choose your preferred currency", [
      { text: "USD ($)", onPress: () => setCurrency("USD") },
      { text: "EUR (€)", onPress: () => setCurrency("EUR") },
      { text: "GBP (£)", onPress: () => setCurrency("GBP") },
      { text: "JPY (¥)", onPress: () => setCurrency("JPY") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleAppearancePress = (): void => {
    Alert.alert("Appearance", "Choose your preferred theme", [
      { text: "Dark", onPress: () => setAppearance("Dark") },
      { text: "Light", onPress: () => setAppearance("Light") },
      { text: "System", onPress: () => setAppearance("System") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handlePrivacyPolicy = (): void => {
    Linking.openURL("https://fuduit.app/privacy");
  };

  const handleHelp = (): void => {
    Linking.openURL("https://fuduit.app/help");
  };

  const userName = user?.displayName || user?.email?.split("@")[0] || "User";

  return (
    <SafeAreaView className="flex-1 bg-dark" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 pt-6 pb-2">
          <Text className="text-3xl font-bold tracking-tight text-white">
            Settings
          </Text>
        </View>

        <View className="px-4 pt-4 gap-6">
          {/* Profile Card */}
          <Pressable className="flex-row items-center gap-4 bg-surface p-5 rounded-2xl border border-white/5">
            <View className="relative">
              <View className="h-16 w-16 rounded-full bg-surface-light items-center justify-center border-2 border-primary/20 overflow-hidden">
                {user?.photoURL ? (
                  <Image
                    source={{ uri: user.photoURL }}
                    className="h-full w-full"
                  />
                ) : (
                  <User size={32} color="#a3e637" />
                )}
              </View>
              {/* Online indicator */}
              <View className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-primary border-2 border-surface" />
            </View>

            <View className="flex-1">
              <Text className="text-xl font-bold text-white">{userName}</Text>
              <View className="flex-row items-center gap-2 mt-1">
                <View className="bg-primary/20 px-2.5 py-0.5 rounded-full">
                  <Text className="text-xs font-semibold text-primary">
                    Free Plan
                  </Text>
                </View>
                <Text className="text-xs text-gray-400">Edit Profile</Text>
              </View>
            </View>

            <ChevronRight size={20} color="#9ca3af" />
          </Pressable>

          {/* Preferences Section */}
          <View className="gap-2">
            <Text className="px-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Preferences
            </Text>
            <View className="rounded-2xl bg-surface border border-white/5 overflow-hidden">
              {/* Notifications */}
              <SettingItem
                icon={<Bell size={22} color="#a3e637" />}
                label="Notifications"
                rightElement={
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: "#4b5563", true: "#a3e637" }}
                    thumbColor="#ffffff"
                  />
                }
              />
              <Divider />

              {/* Currency */}
              <SettingItem
                icon={<DollarSign size={22} color="#a3e637" />}
                label="Currency"
                onPress={handleCurrencyPress}
                rightElement={
                  <View className="flex-row items-center gap-2">
                    <Text className="text-sm font-medium text-white">
                      {currency}
                    </Text>
                    <ChevronRight size={20} color="#9ca3af" />
                  </View>
                }
              />
              <Divider />

              {/* Appearance */}
              <SettingItem
                icon={<Moon size={22} color="#a3e637" />}
                label="Appearance"
                onPress={handleAppearancePress}
                rightElement={
                  <View className="flex-row items-center gap-2">
                    <Text className="text-sm font-medium text-white">
                      {appearance}
                    </Text>
                    <ChevronRight size={20} color="#9ca3af" />
                  </View>
                }
              />
            </View>
          </View>

          {/* Security & Data Section */}
          <View className="gap-2">
            <Text className="px-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Security & Data
            </Text>
            <View className="rounded-2xl bg-surface border border-white/5 overflow-hidden">
              {/* Privacy Policy */}
              <SettingItem
                icon={<Lock size={22} color="#d1d5db" />}
                label="Privacy Policy"
                onPress={handlePrivacyPolicy}
                rightElement={<ExternalLink size={20} color="#6b7280" />}
              />
              <Divider />

              {/* Reset Data */}
              <SettingItem
                icon={<RotateCcw size={22} color="#f472b6" />}
                label="Reset Data"
                onPress={handleResetData}
                destructive
              />
            </View>
          </View>

          {/* About Section */}
          <View className="gap-2">
            <Text className="px-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
              About
            </Text>
            <View className="rounded-2xl bg-surface border border-white/5 overflow-hidden">
              {/* App Info */}
              <SettingItem
                icon={<Info size={22} color="#d1d5db" />}
                label="App Info"
                rightElement={
                  <Text className="text-sm text-gray-500">v1.0.0</Text>
                }
              />
              <Divider />

              {/* Help & Support */}
              <SettingItem
                icon={<HelpCircle size={22} color="#d1d5db" />}
                label="Help & Support"
                onPress={handleHelp}
                rightElement={<ChevronRight size={20} color="#6b7280" />}
              />
            </View>
          </View>

          {/* Logout Button */}
          <View className="mt-4 px-2 pb-8">
            <Pressable
              onPress={handleLogout}
              disabled={isLoading}
              className="flex-row items-center justify-center gap-2 rounded-full border border-secondary/30 bg-transparent py-4 active:bg-secondary/10"
            >
              {isLoading ? (
                <ActivityIndicator color="#f472b6" />
              ) : (
                <>
                  <LogOut size={20} color="#f472b6" />
                  <Text className="text-base font-bold text-secondary">
                    Log Out
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
