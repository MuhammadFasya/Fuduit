import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "../config/theme";
import { HomeScreen } from "../screens/HomeScreen";
import { TransactionsScreen } from "../screens/TransactionsScreen";
import { InsightsScreen } from "../screens/InsightsScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <HomeIcon color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Transactions"
          component={TransactionsScreen}
          options={{
            tabBarLabel: "Transactions",
            tabBarIcon: ({ color, size }) => (
              <TransactionIcon color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Insights"
          component={InsightsScreen}
          options={{
            tabBarLabel: "Insights",
            tabBarIcon: ({ color, size }) => (
              <InsightIcon color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <SettingsIcon color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Simple icon components (replace with react-native-vector-icons in production)
const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size / 4,
    }}
  />
);

const TransactionIcon = ({ color, size }: { color: string; size: number }) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size / 4,
    }}
  />
);

const InsightIcon = ({ color, size }: { color: string; size: number }) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size / 4,
    }}
  />
);

const SettingsIcon = ({ color, size }: { color: string; size: number }) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size / 4,
    }}
  />
);

import { View } from "react-native";
