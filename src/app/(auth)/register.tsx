import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { GoogleIcon, AppleIcon } from "@/components/ui/SocialIcons";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (name.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null);
    setLoading(true);
    const result = await register(email, password, name.trim());
    setLoading(false);
    if (!result.success && result.error) {
      setError(result.error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Background Glow Effects */}
        <View className="absolute top-[-150px] left-[-100px] w-[300px] h-[300px] opacity-20">
          <LinearGradient
            colors={["#a3e637", "transparent"]}
            style={{ width: 300, height: 300, borderRadius: 150 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </View>
        <View className="absolute bottom-[-50px] right-[-50px] w-[200px] h-[200px] opacity-10">
          <LinearGradient
            colors={["#a3e637", "transparent"]}
            style={{ width: 200, height: 200, borderRadius: 100 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </View>

        {/* Header with Logo */}
        <View className="items-center px-4 py-4">
          <View className="w-16 h-16 rounded-2xl overflow-hidden mb-2">
            <Image
              source={require("../../../assets/icon.png")}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-white text-xl font-bold">Fuduit</Text>
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="flex-1"
        >
          <View className="flex-1 px-6 pt-4">
            {/* Title Section */}
            <View className="items-center mb-8">
              <Text className="text-white text-3xl font-bold mb-3">
                Create Account
              </Text>
              <Text className="text-gray text-base text-center max-w-[280px]">
                Track your cash, even when it fluctuates like crazy.
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={styles.inputContainer}>
                  <User size={20} color="#b3c794" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="John Doe"
                    placeholderTextColor="#b3c794"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    editable={!loading}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputContainer}>
                  <Mail size={20} color="#b3c794" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="hello@freelancer.com"
                    placeholderTextColor="#b3c794"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!loading}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputContainer}>
                  <Lock size={20} color="#b3c794" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Min. 8 characters"
                    placeholderTextColor="#b3c794"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!loading}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff size={20} color="#b3c794" />
                    ) : (
                      <Eye size={20} color="#b3c794" />
                    )}
                  </Pressable>
                </View>
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.inputContainer}>
                  <Lock size={20} color="#b3c794" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Re-enter password"
                    placeholderTextColor="#b3c794"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    editable={!loading}
                  />
                  <Pressable
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color="#b3c794" />
                    ) : (
                      <Eye size={20} color="#b3c794" />
                    )}
                  </Pressable>
                </View>
              </View>

              {/* Error Message */}
              {error && <Text style={styles.errorText}>{error}</Text>}

              {/* Register Button */}
              <Pressable
                style={styles.registerButton}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#1b2111" />
                ) : (
                  <Text style={styles.registerButtonText}>Register</Text>
                )}
              </Pressable>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialContainer}>
              <Pressable
                style={styles.socialButton}
                onPress={() =>
                  Alert.alert(
                    "Coming Soon",
                    "Google sign-in will be available in a future update."
                  )
                }
              >
                <GoogleIcon size={24} />
              </Pressable>
              <Pressable
                style={styles.socialButton}
                onPress={() =>
                  Alert.alert(
                    "Coming Soon",
                    "Apple sign-in will be available in a future update."
                  )
                }
              >
                <AppleIcon size={24} color="#FFFFFF" />
              </Pressable>
            </View>

            {/* Login Link */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginLinkText}>
                Already have an account?{" "}
              </Text>
              <Link href="/login" asChild>
                <Pressable>
                  <Text style={styles.loginLinkAction}>Login</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    paddingLeft: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e2b15",
    borderWidth: 1,
    borderColor: "#3c5a26",
    borderRadius: 28,
    height: 56,
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 1,
    marginLeft: 12,
    color: "#ffffff",
    fontSize: 16,
  },
  errorText: {
    color: "#f472b6",
    textAlign: "center",
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: "#a3e637",
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  registerButtonText: {
    color: "#1b2111",
    fontSize: 18,
    fontWeight: "700",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#3c5a26",
  },
  dividerText: {
    color: "#b3c794",
    marginHorizontal: 16,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1e2b15",
    borderWidth: 1,
    borderColor: "#3c5a26",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
    paddingTop: 32,
    paddingBottom: 16,
  },
  loginLinkText: {
    color: "#b3c794",
    fontSize: 14,
  },
  loginLinkAction: {
    color: "#a3e637",
    fontSize: 14,
    fontWeight: "700",
  },
});
