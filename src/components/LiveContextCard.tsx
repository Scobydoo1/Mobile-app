import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radii, Shadows, Type } from '../theme/tokens';
import { PinIcon, ClockIcon } from './icons';
import { useAppContext } from '../context/AppContextProvider';

/**
 * Glassmorphic "LIVE CONTEXT" card.
 *
 * Layout (per mockup):
 *   ┌──────────────────────────────────────────────┐
 *   │  LIVE CONTEXT                  [📍 Home   ]  │
 *   │  YOU ARE HOME                  [🕒 6:15 PM]  │
 *   └──────────────────────────────────────────────┘
 *
 * Gradient: pale mint → pale lavender (left → right). Rounded 28pt.
 */
export function LiveContextCard() {
  const { currentContext } = useAppContext();
  const isHome = currentContext.location === 'Home';
  const headline = isHome ? 'YOU ARE HOME' : currentContext.location === 'On the Move' ? "YOU'RE ON THE MOVE" : 'CONTEXT UNKNOWN';

  return (
    <View style={styles.outer}>
      <LinearGradient
        colors={[Colors.glassFrom, Colors.glassMid, Colors.glassTo]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.left}>
          <Text style={styles.eyebrow}>LIVE CONTEXT</Text>
          <Text style={styles.headline}>{headline}</Text>
        </View>

        <View style={styles.right}>
          <View style={styles.chip}>
            <View style={[styles.chipIconBubble, { backgroundColor: Colors.brandPurpleSoft }]}>
              <PinIcon size={14} color={Colors.brandPurple} />
            </View>
            <Text style={styles.chipText}>{currentContext.location}</Text>
          </View>

          <View style={styles.chip}>
            <View style={[styles.chipIconBubble, { backgroundColor: Colors.skySoft }]}>
              <ClockIcon size={14} color={Colors.sky} />
            </View>
            <Text style={styles.chipText}>{currentContext.timeString}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginHorizontal: 20,
    borderRadius: Radii.card,
    ...Shadows.card,
    backgroundColor: 'transparent',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 26,
    borderRadius: Radii.card,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
    minHeight: 150,
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  right: {
    gap: 10,
    alignItems: 'flex-end',
  },
  eyebrow: {
    fontSize: Type.eyebrow.size,
    fontWeight: Type.eyebrow.weight,
    letterSpacing: Type.eyebrow.tracking,
    color: Type.eyebrow.color,
    marginBottom: 14,
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
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: Radii.pill,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
    minWidth: 108,
  },
  chipIconBubble: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.ink900,
  },
});
