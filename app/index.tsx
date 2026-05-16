import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Backdrop } from '../src/components/Backdrop';
import { DateHeader } from '../src/components/DateHeader';
import { LiveContextCard } from '../src/components/LiveContextCard';
import { NudgeCard } from '../src/components/NudgeCard';
import { BottomTabBar } from '../src/components/BottomTabBar';
import { useNudge } from '../src/context/NudgeProvider';

/**
 * Habits tab — primary dashboard.
 *
 *   Backdrop (radial pulse + dot grid + arcs)
 *   ─ DateHeader
 *   ─ LiveContextCard (glass, internal glow)
 *   ─ NudgeCard       (glass, AI avatar, Why-now, Done/Snooze)
 *   ─ BottomTabBar    (floating glass nav, purple active ring)
 */
export default function HabitsScreen() {
  const { activeNudge, markDone, snooze } = useNudge();
  const [tab, setTab] = useState<'habits' | 'progress' | 'insights' | 'settings'>('habits');

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <Backdrop palette="violet" pattern />
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <DateHeader userName="Alex" tagline="Your moment is now." />
          <View style={styles.gap} />
          <LiveContextCard palette="violet" />
          <View style={styles.gap} />
          <NudgeCard
            title={activeNudge?.scored.habit.title ?? 'Read 5 pages of your book.'}
            meta={activeNudge ? buildMeta(activeNudge.scored.habit) : ['Wind-down · Evening', '~2 min']}
            rationale={
              activeNudge?.rationale ??
              'You usually read between 6–7 PM. Picking up where you left off in "Sapiens".'
            }
            onDone={() => void markDone()}
            onSnooze={() => void snooze()}
          />
        </ScrollView>
      </SafeAreaView>
      <BottomTabBar active={tab} onChange={setTab} />
    </View>
  );
}

function buildMeta(habit: { category: string; duration_minutes: number }): string[] {
  const category = habit.category.replace(/_/g, ' ').replace(/(^|\s)\S/g, (s) => s.toUpperCase());
  return [category, `~${habit.duration_minutes} min`];
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingBottom: 140, paddingTop: 4 },
  gap: { height: 14 },
});
