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
import { GoogleIcon } from "@/components/ui/SocialIcons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setError(null);
    setLoading(true);
    const result = await login(email, password);
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
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] opacity-40">
            <LinearGradient
              colors={["#4ADE80", "transparent"]}
              style={{
                width: 300,
                height: 300,
                borderRadius: 150,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>

          <View className="flex-1 px-6 justify-center">
            <View className="items-center mb-10">
              <View className="w-20 h-20 rounded-2xl overflow-hidden mb-4">
                <Image
                  source={require("../../../assets/icon.png")}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <Text className="text-5xl font-bold text-white mb-2">Fuduit</Text>
              <Text className="text-gray text-base">
                Money aimed at your future
              </Text>
            </View>

            <View className="gap-4">
              <View className="flex-row items-center bg-surface rounded-full h-[56px] px-5">
                <Mail size={20} color="#9CA3AF" />
                <TextInput
                  className="flex-1 ml-3 text-white text-base"
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View className="flex-row items-center bg-surface rounded-full h-[56px] px-5">
                <Lock size={20} color="#9CA3AF" />
                <TextInput
                  className="flex-1 ml-3 text-white text-base"
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff size={20} color="#9CA3AF" />
                  ) : (
                    <Eye size={20} color="#9CA3AF" />
                  )}
                </Pressable>
              </View>

              <View className="items-end">
                <Pressable>
                  <Text className="text-primary text-sm">Forgot Password?</Text>
                </Pressable>
              </View>

              {error && (
                <Text className="text-red-500 text-center text-sm">
                  {error}
                </Text>
              )}

              <Pressable
                className="bg-primary h-[56px] rounded-full items-center justify-center mt-2"
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#121212" />
                ) : (
                  <Text className="text-dark text-lg font-semibold">Login</Text>
                )}
              </Pressable>

              <View className="flex-row items-center my-4">
                <View className="flex-1 h-px bg-border" />
                <Text className="text-gray mx-4 text-sm">or</Text>
                <View className="flex-1 h-px bg-border" />
              </View>

              <Pressable
                className="bg-surface h-[56px] rounded-full flex-row items-center justify-center opacity-50"
                onPress={() =>
                  Alert.alert(
                    "Coming Soon",
                    "Google sign-in will be available in a future update."
                  )
                }
              >
                <View className="mr-3">
                  <GoogleIcon size={20} />
                </View>
                <Text className="text-white text-base font-medium">
                  Continue with Google
                </Text>
              </Pressable>
            </View>

            <View className="flex-row justify-center mt-8">
              <Text className="text-gray text-base">
                Don't have an account?{" "}
              </Text>
              <Link href="/register" asChild>
                <Pressable>
                  <Text className="text-primary text-base font-semibold">
                    Create account
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
