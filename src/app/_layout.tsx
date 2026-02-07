import "../global.css";

import { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { onAuthStateChanged, User } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";
import { initializeDatabase } from "@/db/migrations";

/**
 * Loading screen shown during app initialization
 */
function LoadingScreen({ message }: { message?: string }): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
      }}
    >
      <ActivityIndicator size="large" color="#a3e635" />
      {message && (
        <Text style={{ color: "#a3e635", marginTop: 16 }}>{message}</Text>
      )}
    </View>
  );
}

export default function RootLayout(): JSX.Element {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const segments = useSegments();
  const { user, setUser, isAuthenticated } = useAuthStore();

  // Initialize app
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let timeoutId: NodeJS.Timeout;

    const init = async () => {
      try {
        console.log("[App] Starting initialization...");

        // Initialize database
        try {
          await initializeDatabase();
          console.log("[App] Database initialized");
        } catch (dbError) {
          console.warn("[App] Database init warning:", dbError);
          // Continue anyway - database might work on retry
        }

        // Setup Firebase auth listener
        unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
          console.log(
            "[App] Auth state:",
            firebaseUser?.email ?? "not logged in"
          );
          setUser(firebaseUser);
          setIsReady(true);
        });

        // Fallback timeout in case Firebase doesn't respond
        timeoutId = setTimeout(() => {
          if (!isReady) {
            console.log("[App] Auth timeout - continuing without auth");
            setIsReady(true);
          }
        }, 5000);
      } catch (err) {
        console.error("[App] Init error:", err);
        setError(String(err));
        setIsReady(true);
      }
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Handle navigation based on auth state
  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    console.log(
      "[App] Navigation check - isAuthenticated:",
      isAuthenticated,
      "inAuthGroup:",
      inAuthGroup
    );

    if (isAuthenticated && inAuthGroup) {
      // Logged in user in auth screens -> go to tabs
      router.replace("/(tabs)");
    } else if (!isAuthenticated && inTabsGroup) {
      // Not logged in user in tabs -> go to login
      router.replace("/(auth)/login");
    } else if (!isAuthenticated && !inAuthGroup && !inTabsGroup) {
      // Not logged in and not in any group -> go to login
      router.replace("/(auth)/login");
    }
  }, [isReady, isAuthenticated, segments, router]);

  if (!isReady) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LoadingScreen message="Loading..." />
      </GestureHandlerRootView>
    );
  }

  if (error) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#121212",
            padding: 20,
          }}
        >
          <Text style={{ color: "#ef4444", fontSize: 16, textAlign: "center" }}>
            Error: {error}
          </Text>
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Slot />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
