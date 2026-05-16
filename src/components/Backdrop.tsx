import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  Pattern,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';
import { Colors, GlowPalette, GlowPalettes } from '../theme/tokens';

interface BackdropProps {
  palette?: GlowPalette;
  pattern?: boolean;
}

/**
 * Soft glow + dot grid + concentric arcs.
 *
 * Mirrors the `MHBackdrop` in the source mockup: a violet/blue (or mint/peach)
 * radial pulse over a near-white canvas, with a faint dot-grid and four
 * concentric arcs that suggest connectivity. The whole thing fades into white
 * toward the edges of the screen.
 */
export function Backdrop({ palette = 'violet', pattern = true }: BackdropProps) {
  const [glowA, glowB] = GlowPalettes[palette];
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] });
  const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] });

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.canvas }]} />

      {pattern && (
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 402 874"
          preserveAspectRatio="xMidYMid slice"
          style={[StyleSheet.absoluteFill, { opacity: 0.5 }]}
        >
          <Defs>
            <Pattern id="dotgrid" width="22" height="22" patternUnits="userSpaceOnUse">
              <Circle cx="1" cy="1" r="0.7" fill="rgba(80,60,160,0.10)" />
            </Pattern>
            <RadialGradient id="fade" cx="50%" cy="40%" r="60%">
              <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect width="402" height="874" fill="url(#dotgrid)" />
          <G fill="none" stroke="rgba(120,100,200,0.10)" strokeWidth={1}>
            <Circle cx="201" cy="320" r="120" />
            <Circle cx="201" cy="320" r="180" />
            <Circle cx="201" cy="320" r="240" />
            <Circle cx="201" cy="320" r="320" />
          </G>
          <Rect width="402" height="874" fill="url(#fade)" />
        </Svg>
      )}

      <Animated.View
        style={[
          styles.glowWrap,
          { opacity, transform: [{ translateX: -260 }, { scale }] },
        ]}
      >
        <Svg width={520} height={520} viewBox="0 0 520 520">
          <Defs>
            <RadialGradient id="glow" cx="35%" cy="35%" r="60%">
              <Stop offset="0%" stopColor={glowA} stopOpacity="0.34" />
              <Stop offset="40%" stopColor={glowB} stopOpacity="0.20" />
              <Stop offset="70%" stopColor={glowB} stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle cx={260} cy={260} r={260} fill="url(#glow)" />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  glowWrap: {
    position: 'absolute',
    top: 140,
    left: '50%',
    width: 520,
    height: 520,
  },
});
