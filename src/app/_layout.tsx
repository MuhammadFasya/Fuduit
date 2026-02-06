import "../global.css";

import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";
import { initializeDatabase } from "@/db/migrations";

/**
 * Auth guard component that handles route protection
 */
function AuthGuard({ children }: { children: React.ReactNode }): JSX.Element {
  const { isAuthenticated, isLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login if not authenticated and not in auth group
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to home if authenticated and in auth group
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isLoading, segments, router]);

  return <>{children}</>;
}

/**
 * Loading screen shown during app initialization
 */
function LoadingScreen(): JSX.Element {
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
    </View>
  );
}

export default function RootLayout(): JSX.Element {
  const [isInitialized, setIsInitialized] = useState(false);
  const { setUser, setLoading, isLoading } = useAuthStore();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initialize = async () => {
      try {
        // Initialize database
        await initializeDatabase();
        console.log("[App] Database initialized");

        // Setup auth state listener
        unsubscribe = onAuthStateChanged(auth, (user) => {
          console.log("[App] Auth state changed:", user ? user.email : "null");
          setUser(user);
          setIsInitialized(true);
        });

        // Set a timeout in case Firebase auth doesn't respond
        setTimeout(() => {
          if (!isInitialized) {
            console.log("[App] Auth timeout - proceeding without auth");
            setLoading(false);
            setIsInitialized(true);
          }
        }, 5000);
      } catch (error) {
        console.error("[App] Initialization error:", error);
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initialize();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Show loading screen while initializing
  if (!isInitialized) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LoadingScreen />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <AuthGuard>
          <Slot />
        </AuthGuard>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
