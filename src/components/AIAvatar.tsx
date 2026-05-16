import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

interface AIAvatarProps {
  size?: number;
}

/**
 * The "AI assistant" particle avatar — a glowing violet bead with a small
 * white dot orbiting around its rim. Used on the Nudge card eyebrow.
 */
export function AIAvatar({ size = 32 }: AIAvatarProps) {
  const breathe = useRef(new Animated.Value(0)).current;
  const orbit = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const breatheLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(breathe, { toValue: 0, duration: 1400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );
    const orbitLoop = Animated.loop(
      Animated.timing(orbit, { toValue: 1, duration: 3500, easing: Easing.linear, useNativeDriver: true })
    );
    breatheLoop.start();
    orbitLoop.start();
    return () => {
      breatheLoop.stop();
      orbitLoop.stop();
    };
  }, [breathe, orbit]);

  const scale = breathe.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] });
  const opacity = breathe.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] });
  const rotate = orbit.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const ringSize = size + 8;
  const dotOffset = size / 2 - 2;

  return (
    <View style={{ width: ringSize, height: ringSize, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{ width: size, height: size, opacity, transform: [{ scale }] }}>
        <Svg width={size} height={size} viewBox="0 0 32 32">
          <Defs>
            <RadialGradient id="bead" cx="35%" cy="35%" r="65%">
              <Stop offset="0%" stopColor="#FFFFFF" />
              <Stop offset="35%" stopColor="#C4B5FD" />
              <Stop offset="75%" stopColor="#7C3AED" />
              <Stop offset="100%" stopColor="#4C1D95" />
            </RadialGradient>
          </Defs>
          <Circle cx={16} cy={16} r={15} fill="url(#bead)" />
          <Circle cx={16} cy={16} r={15} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={1} />
        </Svg>
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          { alignItems: 'center', justifyContent: 'center', transform: [{ rotate }] },
        ]}
      >
        <View style={[styles.orbitDot, { transform: [{ translateX: dotOffset }] }]} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  orbitDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
});
