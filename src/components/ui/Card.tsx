import React from "react";
import { View, Text, ViewProps, Pressable } from "react-native";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
  onPress?: () => void;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: "bg-surface",
  elevated: "bg-surface shadow-lg shadow-black/30",
  outlined: "bg-transparent border border-border",
};

const paddingStyles: Record<string, string> = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  padding = "md",
  onPress,
  style,
  ...props
}) => {
  const cardClassName = `
    rounded-2xl
    ${variantStyles[variant]}
    ${paddingStyles[padding]}
  `;

  if (onPress) {
    return (
      <Pressable
        className={cardClassName}
        onPress={onPress}
        style={({ pressed }) => [
          { opacity: pressed ? 0.8 : 1 },
          style as object,
        ]}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View className={cardClassName} style={style} {...props}>
      {children}
    </View>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => <View className={`mb-3 ${className}`}>{children}</View>;

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = "",
}) => (
  <Text className={`text-white text-lg font-bold ${className}`}>
    {children}
  </Text>
);

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => <View className={className}>{children}</View>;

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = "",
}) => (
  <View className={`mt-4 pt-4 border-t border-border ${className}`}>
    {children}
  </View>
);
