import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { Colors, GlowPalette, GlowPalettes, Radii, Type } from '../theme/tokens';
import { GlassCard } from './GlassCard';
import { PinIcon, ClockIcon } from './icons';
import { useAppContext } from '../context/AppContextProvider';

interface LiveContextCardProps {
  palette?: GlowPalette;
}

/**
 * Glassmorphic "Live Context" card.
 *
 *   ┌──────────────────────────────────────────────┐
 *   │  LIVE CONTEXT          [📍 Home          ]   │
 *   │  YOU ARE HOME          [🕒 6:15 PM       ]   │
 *   └──────────────────────────────────────────────┘
 *
 * Internal radial glow softly pulses; chips show location + clock with their
 * own colored glow bead.
 */
export function LiveContextCard({ palette = 'violet' }: LiveContextCardProps) {
  const { currentContext } = useAppContext();
  const [glowA, glowB] = GlowPalettes[palette];

  const headline =
    currentContext.location === 'Home'
      ? 'YOU ARE HOME'
      : currentContext.location === 'On the Move'
        ? "YOU'RE ON THE MOVE"
        : 'CONTEXT UNKNOWN';

  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);
  const glowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] });

  return (
    <GlassCard radius={Radii.card} style={styles.outer}>
      <View style={styles.body}>
        <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: glowOpacity }]}>
          <Svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice">
            <Defs>
              <RadialGradient id="ctxglow" cx="50%" cy="50%" r="60%">
                <Stop offset="0%" stopColor={glowA} stopOpacity="0.30" />
                <Stop offset="40%" stopColor={glowB} stopOpacity="0.14" />
                <Stop offset="70%" stopColor={glowB} stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Circle cx="150" cy="80" r="160" fill="url(#ctxglow)" />
          </Svg>
        </Animated.View>

        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.eyebrow}>LIVE CONTEXT</Text>
            <Text style={styles.headline}>{headline}</Text>
          </View>

          <View style={styles.right}>
            <Chip
              icon={<PinIcon size={11} color="#FFFFFF" />}
              label={currentContext.location}
              glow={Colors.glowVioletA}
            />
            <Chip
              icon={<ClockIcon size={11} color="#FFFFFF" />}
              label={currentContext.timeString}
              glow={Colors.glowVioletB}
            />
          </View>
        </View>
      </View>
    </GlassCard>
  );
}

interface ChipProps {
  icon: React.ReactNode;
  label: string;
  glow: string;
}

function Chip({ icon, label, glow }: ChipProps) {
  return (
    <View style={styles.chip}>
      <View
        style={[
          styles.chipBead,
          {
            backgroundColor: glow,
            shadowColor: glow,
          },
        ]}
      >
        {icon}
      </View>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginHorizontal: 18,
  },
  body: {
    padding: 22,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  left: { flex: 1, paddingRight: 12 },
  right: { alignItems: 'flex-end', gap: 8 },
  eyebrow: {
    fontSize: Type.eyebrow.size,
    fontWeight: Type.eyebrow.weight,
    letterSpacing: Type.eyebrow.tracking,
    color: Type.eyebrow.color,
    marginBottom: 8,
  },
  headline: {
    fontSize: Type.displayBold.size,
    fontWeight: Type.displayBold.weight,
    letterSpacing: Type.displayBold.tracking,
    color: Type.displayBold.color,
    lineHeight: 30,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: Radii.pill,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.glassEdge,
  },
  chipBead: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.9)',
  },
  chipText: {
    fontSize: Type.chip.size,
    fontWeight: Type.chip.weight,
    color: Type.chip.color,
    letterSpacing: -0.1,
  },
});
