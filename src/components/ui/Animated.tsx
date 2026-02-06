import React, { useEffect } from "react";
import { Pressable, PressableProps, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
  FadeInDown,
  FadeInUp,
  Layout,
} from "react-native-reanimated";

// Re-export layout animations for easy import
export {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
  FadeInDown,
  FadeInUp,
  Layout,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedButtonProps extends PressableProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}

/**
 * Button with scale animation on press
 */
export function AnimatedButton({
  children,
  onPressIn,
  onPressOut,
  style,
  ...props
}: AnimatedButtonProps): JSX.Element {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (e: any) => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    onPressOut?.(e);
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, style]}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
}

interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
  style?: ViewStyle;
  className?: string;
}

/**
 * Card with staggered fade-in animation
 */
export function AnimatedCard({
  children,
  index = 0,
  style,
  ...props
}: AnimatedCardProps): JSX.Element {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    const delay = index * 100; // Stagger by 100ms
    opacity.value = withTiming(1, { duration: 400 }, () => {});
    translateY.value = withTiming(0, { duration: 400 });
  }, [index, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
}

interface AnimatedListItemProps {
  children: React.ReactNode;
  index?: number;
  style?: ViewStyle;
}

/**
 * List item with slide-in animation
 */
export function AnimatedListItem({
  children,
  index = 0,
  style,
}: AnimatedListItemProps): JSX.Element {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).springify()}
      layout={Layout.springify()}
      style={style}
    >
      {children}
    </Animated.View>
  );
}

interface AnimatedNumberProps {
  value: number;
  style?: ViewStyle;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
}

/**
 * Number with counting animation
 */
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimalPlaces = 2,
}: AnimatedNumberProps): JSX.Element {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withTiming(value, { duration: 800 });
  }, [value, animatedValue]);

  const animatedText = useAnimatedStyle(() => {
    const displayValue = interpolate(
      animatedValue.value,
      [0, value],
      [0, value],
      Extrapolate.CLAMP
    );
    return {
      // Note: We can't directly animate text content in React Native
      // This is a placeholder for the animated value
    };
  });

  return (
    <Animated.Text style={animatedText}>
      {prefix}
      {value.toFixed(decimalPlaces)}
      {suffix}
    </Animated.Text>
  );
}

interface AnimatedProgressProps {
  progress: number; // 0 to 1
  color?: string;
  backgroundColor?: string;
  height?: number;
  style?: ViewStyle;
}

/**
 * Progress bar with animated fill
 */
export function AnimatedProgress({
  progress,
  color = "#a3e637",
  backgroundColor = "#1E1E1E",
  height = 8,
  style,
}: AnimatedProgressProps): JSX.Element {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withSpring(progress, {
      damping: 15,
      stiffness: 100,
    });
  }, [progress, animatedProgress]);

  const animatedWidth = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));

  return (
    <Animated.View
      style={[
        {
          height,
          backgroundColor,
          borderRadius: height / 2,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            height: "100%",
            backgroundColor: color,
            borderRadius: height / 2,
          },
          animatedWidth,
        ]}
      />
    </Animated.View>
  );
}

/**
 * Pulse animation for loading states
 */
export function AnimatedPulse({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const opacity = useSharedValue(1);

  useEffect(() => {
    const pulse = () => {
      opacity.value = withTiming(0.5, { duration: 800 }, () => {
        opacity.value = withTiming(1, { duration: 800 });
      });
    };
    const interval = setInterval(pulse, 1600);
    pulse();
    return () => clearInterval(interval);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
