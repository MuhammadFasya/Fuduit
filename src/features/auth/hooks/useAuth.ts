import { useEffect, useCallback } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";

interface AuthError {
  code: string;
  message: string;
}

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: AuthError }>;
  register: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<{ success: boolean; error?: AuthError }>;
  logout: () => Promise<{ success: boolean; error?: AuthError }>;
}

/**
 * Get user-friendly error message from Firebase error code
 */
const getErrorMessage = (code: string): string => {
  const errorMessages: Record<string, string> = {
    "auth/invalid-email": "Invalid email address format.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/operation-not-allowed": "This operation is not allowed.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed":
      "Network error. Please check your connection.",
    "auth/invalid-credential": "Invalid email or password.",
  };
  return (
    errorMessages[code] || "An unexpected error occurred. Please try again."
  );
};

/**
 * Hook to manage Firebase authentication
 * Provides login, register, logout functions and auth state
 */
export const useAuth = (): UseAuthReturn => {
  const {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setLoading,
    logout: clearAuth,
  } = useAuthStore();

  // Listen to auth state changes
  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [setUser, setLoading]);

  /**
   * Login with email and password
   */
  const login = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ success: boolean; error?: AuthError }> => {
      try {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true };
      } catch (error: unknown) {
        const firebaseError = error as { code: string };
        const errorCode = firebaseError.code || "unknown";
        return {
          success: false,
          error: {
            code: errorCode,
            message: getErrorMessage(errorCode),
          },
        };
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  /**
   * Register a new user with email and password
   */
  const register = useCallback(
    async (
      email: string,
      password: string,
      displayName?: string
    ): Promise<{ success: boolean; error?: AuthError }> => {
      try {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Update display name if provided
        if (displayName && userCredential.user) {
          await updateProfile(userCredential.user, { displayName });
        }

        return { success: true };
      } catch (error: unknown) {
        const firebaseError = error as { code: string };
        const errorCode = firebaseError.code || "unknown";
        return {
          success: false,
          error: {
            code: errorCode,
            message: getErrorMessage(errorCode),
          },
        };
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  /**
   * Logout the current user
   */
  const logout = useCallback(async (): Promise<{
    success: boolean;
    error?: AuthError;
  }> => {
    try {
      setLoading(true);
      await signOut(auth);
      clearAuth();
      return { success: true };
    } catch (error: unknown) {
      const firebaseError = error as { code: string };
      const errorCode = firebaseError.code || "unknown";
      return {
        success: false,
        error: {
          code: errorCode,
          message: getErrorMessage(errorCode),
        },
      };
    } finally {
      setLoading(false);
    }
  }, [setLoading, clearAuth]);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };
};
