import React, { forwardRef } from "react";
import { TextInput, View, Text, TextInputProps, ViewStyle } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    { label, error, hint, leftIcon, rightIcon, containerStyle, ...props },
    ref
  ) => {
    const hasError = Boolean(error);

    return (
      <View className="w-full" style={containerStyle}>
        {label && (
          <Text className="text-textSecondary text-sm font-medium mb-2">
            {label}
          </Text>
        )}

        <View
          className={`
            flex-row items-center
            bg-surface rounded-xl px-4
            border-2
            ${hasError ? "border-error" : "border-transparent focus:border-primary"}
          `}
        >
          {leftIcon && <View className="mr-3">{leftIcon}</View>}

          <TextInput
            ref={ref}
            className="flex-1 text-white text-base py-4"
            placeholderTextColor="#666666"
            cursorColor="#a3e635"
            selectionColor="#a3e635"
            {...props}
          />

          {rightIcon && <View className="ml-3">{rightIcon}</View>}
        </View>

        {(error || hint) && (
          <Text
            className={`
              text-sm mt-2
              ${hasError ? "text-error" : "text-textMuted"}
            `}
          >
            {error || hint}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";
