import { useAuthStore } from "@/store/authStore";
import type { User } from "firebase/auth";

// Reset store before each test
beforeEach(() => {
  useAuthStore.setState({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
});

// Mock user object
const mockUser = {
  uid: "user123",
  email: "test@example.com",
  displayName: "Test User",
  photoURL: null,
  emailVerified: true,
} as User;

describe("authStore", () => {
  describe("initial state", () => {
    it("should have null user initially", () => {
      const { user } = useAuthStore.getState();
      expect(user).toBeNull();
    });

    it("should be loading initially", () => {
      const { isLoading } = useAuthStore.getState();
      expect(isLoading).toBe(true);
    });

    it("should not be authenticated initially", () => {
      const { isAuthenticated } = useAuthStore.getState();
      expect(isAuthenticated).toBe(false);
    });
  });

  describe("setUser", () => {
    it("should set user and update authenticated state", () => {
      const { setUser } = useAuthStore.getState();

      setUser(mockUser);

      const { user, isAuthenticated, isLoading } = useAuthStore.getState();
      expect(user).toEqual(mockUser);
      expect(isAuthenticated).toBe(true);
      expect(isLoading).toBe(false);
    });

    it("should set user to null and update states", () => {
      const { setUser } = useAuthStore.getState();

      // First login
      setUser(mockUser);
      // Then logout
      setUser(null);

      const { user, isAuthenticated } = useAuthStore.getState();
      expect(user).toBeNull();
      expect(isAuthenticated).toBe(false);
    });
  });

  describe("setLoading", () => {
    it("should set loading to true", () => {
      const { setLoading } = useAuthStore.getState();

      setLoading(true);

      const { isLoading } = useAuthStore.getState();
      expect(isLoading).toBe(true);
    });

    it("should set loading to false", () => {
      const { setLoading } = useAuthStore.getState();

      setLoading(false);

      const { isLoading } = useAuthStore.getState();
      expect(isLoading).toBe(false);
    });
  });

  describe("logout", () => {
    it("should clear user and reset states", () => {
      const { setUser, logout } = useAuthStore.getState();

      // Login first
      setUser(mockUser);

      // Verify logged in
      expect(useAuthStore.getState().isAuthenticated).toBe(true);

      // Logout
      logout();

      const { user, isAuthenticated, isLoading } = useAuthStore.getState();
      expect(user).toBeNull();
      expect(isAuthenticated).toBe(false);
      expect(isLoading).toBe(false);
    });
  });
});
