import React from 'react';
import { Platform, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors, Radii, Shadows } from '../theme/tokens';

interface GlassCardProps extends ViewProps {
  radius?: number;
  tint?: string;
  intensity?: number;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
}

/**
 * Soft glass card surface.
 *
 * iOS gets a real backdrop blur; Android/web fall back to a high-opacity white
 * because RN's BlurView is iOS-only by default. Either way the geometry
 * (radius, hairline edge, soft drop shadow) matches the design.
 */
export function GlassCard({
  radius = Radii.card,
  tint = Colors.glass,
  intensity = 32,
  style,
  children,
  ...rest
}: GlassCardProps) {
  const shape: ViewStyle = {
    borderRadius: radius,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.glassEdge,
  };

  return (
    <View style={[styles.shadow, { borderRadius: radius }, style]} {...rest}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={intensity} tint="light" style={[StyleSheet.absoluteFill, { borderRadius: radius }]} />
      ) : null}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: tint, borderRadius: radius }]} />
      <View style={shape}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    ...Shadows.card,
    backgroundColor: 'transparent',
  },
});
