import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen(): JSX.Element {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center bg-background p-5">
        <Text className="text-2xl font-bold text-white">
          This screen doesn't exist.
        </Text>
        <Link href="/" className="mt-4 py-4">
          <Text className="text-primary underline">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
