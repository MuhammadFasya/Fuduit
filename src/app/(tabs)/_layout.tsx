import { Tabs } from "expo-router";
import { View, Pressable } from "react-native";
import { Home, Clock, Plus, PieChart, User } from "lucide-react-native";
import { router } from "expo-router";

import { colors } from "@/constants/colors";

export default function TabsLayout(): JSX.Element {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#ffffff66",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: `${colors.surface}E6`,
          borderTopWidth: 0,
          paddingTop: 12,
          paddingBottom: 24,
          height: 80,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <View className="items-center">
              <Home color={color} size={24} strokeWidth={focused ? 2.5 : 2} />
              {focused && (
                <View className="w-1 h-1 bg-primary rounded-full mt-1" />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "History",
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <View className="items-center">
              <Clock color={color} size={24} strokeWidth={focused ? 2.5 : 2} />
              {focused && (
                <View className="w-1 h-1 bg-primary rounded-full mt-1" />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="add-transaction"
        options={{
          title: "",
          tabBarIcon: () => (
            <Pressable
              onPress={() => router.push("/(tabs)/add-transaction")}
              className="w-16 h-16 rounded-full bg-primary items-center justify-center -mt-6 shadow-lg"
              style={{
                shadowColor: "#a3e637",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 8,
              }}
            >
              <Plus color="#121212" size={28} strokeWidth={3} />
            </Pressable>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Stats",
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <View className="items-center">
              <PieChart
                color={color}
                size={24}
                strokeWidth={focused ? 2.5 : 2}
              />
              {focused && (
                <View className="w-1 h-1 bg-primary rounded-full mt-1" />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Profile",
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <View className="items-center">
              <User color={color} size={24} strokeWidth={focused ? 2.5 : 2} />
              {focused && (
                <View className="w-1 h-1 bg-primary rounded-full mt-1" />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
