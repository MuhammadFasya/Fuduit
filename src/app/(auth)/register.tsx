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
} from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { GoogleIcon, AppleIcon } from "@/components/ui/SocialIcons";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
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
    const result = await register(email, password);
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
            <View className="gap-5">
              {/* Email Input */}
              <View className="gap-2">
                <Text className="text-white text-sm font-semibold pl-2">
                  Email
                </Text>
                <View className="flex-row items-center bg-surface border border-border rounded-full h-[56px] px-5">
                  <Mail size={20} color="#b3c794" />
                  <TextInput
                    className="flex-1 ml-3 text-white text-base"
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
              <View className="gap-2">
                <Text className="text-white text-sm font-semibold pl-2">
                  Password
                </Text>
                <View className="flex-row items-center bg-surface border border-border rounded-full h-[56px] px-5">
                  <Lock size={20} color="#b3c794" />
                  <TextInput
                    className="flex-1 ml-3 text-white text-base"
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
              <View className="gap-2">
                <Text className="text-white text-sm font-semibold pl-2">
                  Confirm Password
                </Text>
                <View className="flex-row items-center bg-surface border border-border rounded-full h-[56px] px-5">
                  <Lock size={20} color="#b3c794" />
                  <TextInput
                    className="flex-1 ml-3 text-white text-base"
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
              {error && (
                <Text className="text-error text-center text-sm">{error}</Text>
              )}

              {/* Register Button */}
              <Pressable
                className="bg-primary h-[56px] rounded-full items-center justify-center mt-3"
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#1b2111" />
                ) : (
                  <Text className="text-dark text-lg font-bold">Register</Text>
                )}
              </Pressable>
            </View>

            {/* Divider */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-px bg-border" />
              <Text className="text-gray mx-4 text-xs uppercase tracking-wider">
                Or continue with
              </Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* Social Buttons */}
            <View className="flex-row justify-center gap-4">
              <Pressable
                className="w-14 h-14 rounded-full bg-surface border border-border items-center justify-center opacity-50"
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
                className="w-14 h-14 rounded-full bg-surface border border-border items-center justify-center opacity-50"
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
            <View className="flex-row justify-center mt-auto pt-8 pb-4">
              <Text className="text-gray text-sm">
                Already have an account?{" "}
              </Text>
              <Link href="/login" asChild>
                <Pressable>
                  <Text className="text-primary text-sm font-bold">Login</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
