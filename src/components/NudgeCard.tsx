import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors, Radii, Shadows, Type } from '../theme/tokens';
import { GlassCard } from './GlassCard';
import { AIAvatar } from './AIAvatar';
import { BookIcon, CheckIcon, ZzzIcon } from './icons';

export interface NudgeCardProps {
  title: string;
  meta?: string[];
  rationale: string;
  badge?: string;
  iconColor?: string;
  icon?: React.ReactNode;
  onDone?: () => void;
  onSnooze?: () => void;
}

/**
 * The primary action card.
 *
 *   ┌──────────────────────────────────────────────┐
 *   │ ◉ YOUR PERSONAL NUDGE              · just now│
 *   │                                              │
 *   │ [📕]  Read 5 pages of your book.             │
 *   │       [Wind-down · Evening] [~2 min]         │
 *   │                                              │
 *   │ │ Why now · You usually read between 6–7 PM. │
 *   │                                              │
 *   │ ┌──────────────────────────────────────────┐ │
 *   │ │ ✓  Done · Mark as complete               │ │
 *   │ └──────────────────────────────────────────┘ │
 *   │ ┌──────────────────────────────────────────┐ │
 *   │ │ ☾  Snooze · Ask again in 30 min          │ │
 *   │ └──────────────────────────────────────────┘ │
 *   └──────────────────────────────────────────────┘
 */
export function NudgeCard({
  title,
  meta = [],
  rationale,
  badge = '· just now',
  icon,
  onDone,
  onSnooze,
}: NudgeCardProps) {
  const handleDone = () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    onDone?.();
  };
  const handleSnooze = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    onSnooze?.();
  };

  return (
    <GlassCard radius={Radii.card} style={styles.card}>
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <AIAvatar size={26} />
            <Text style={styles.eyebrow}>YOUR PERSONAL NUDGE</Text>
          </View>
          <Text style={styles.badge}>{badge}</Text>
        </View>

        <View style={styles.titleRow}>
          <View style={styles.iconTile}>
            {icon ?? <BookIcon size={18} color={Colors.brandPurpleDeep} />}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.metaRow}>
              {meta.map((m) => (
                <View key={m} style={styles.metaChip}>
                  <Text style={styles.metaChipText}>{m}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.rationale}>
          <Text style={styles.rationaleText}>
            <Text style={styles.rationaleLead}>Why now · </Text>
            {rationale}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable onPress={handleDone} style={({ pressed }) => [styles.btnWrap, pressed && styles.btnPressed]}>
            <LinearGradient
              colors={[Colors.emeraldFrom, Colors.emeraldTo]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={[styles.btn, styles.btnDone, Shadows.buttonEmerald as ViewStyle]}
            >
              <CheckIcon size={18} color="#FFFFFF" />
              <Text style={styles.btnDoneText}>Done · Mark as complete</Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={handleSnooze} style={({ pressed }) => [styles.btnWrap, pressed && styles.btnPressed]}>
            <LinearGradient
              colors={[Colors.slateFrom, Colors.slateTo]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={[styles.btn, styles.btnSnooze, Shadows.buttonSlate as ViewStyle]}
            >
              <ZzzIcon size={16} color={Colors.ink500} />
              <Text style={styles.btnSnoozeText}>Snooze · Ask again in 30 min</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 18 },
  body: { padding: 22 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  eyebrow: {
    fontSize: Type.cardLabel.size,
    fontWeight: Type.cardLabel.weight,
    letterSpacing: Type.cardLabel.tracking,
    color: Type.cardLabel.color,
  },
  badge: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.brandPurple,
    backgroundColor: Colors.brandPurpleSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    overflow: 'hidden',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 6,
  },
  iconTile: {
    width: 38,
    height: 38,
    borderRadius: Radii.iconTile,
    backgroundColor: Colors.brandPurpleSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Type.title.size,
    fontWeight: Type.title.weight,
    letterSpacing: Type.title.tracking,
    color: Type.title.color,
    lineHeight: 27,
  },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  metaChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: Colors.ink050,
  },
  metaChipText: {
    fontSize: Type.metaChip.size,
    fontWeight: Type.metaChip.weight,
    color: Type.metaChip.color,
  },
  rationale: {
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: Colors.brandPurpleSofter,
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(124,58,237,0.45)',
  },
  rationaleText: {
    fontSize: 13,
    color: Colors.ink500,
    lineHeight: 19,
  },
  rationaleLead: {
    fontWeight: '600',
    color: Colors.brandPurpleDeep,
  },
  actions: { marginTop: 16, gap: 10 },
  btnWrap: { borderRadius: Radii.button },
  btnPressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
  btn: {
    borderRadius: Radii.button,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  btnDone: { height: 54 },
  btnSnooze: { height: 50, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(20,20,60,0.06)' },
  btnDoneText: {
    fontSize: Type.buttonLg.size,
    fontWeight: Type.buttonLg.weight,
    color: Type.buttonLg.color,
    letterSpacing: -0.2,
  },
  btnSnoozeText: {
    fontSize: Type.buttonMd.size,
    fontWeight: Type.buttonMd.weight,
    color: Type.buttonMd.color,
    letterSpacing: -0.2,
  },
});
