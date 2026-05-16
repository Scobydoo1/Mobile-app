import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DateHeader } from '../src/components/DateHeader';
import { LiveContextCard } from '../src/components/LiveContextCard';
import { Colors } from '../src/theme/tokens';

export default function HabitsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <DateHeader userName="Alex" />
        <LiveContextCard />
        {/* NudgeCard arrives in the next milestone after screenshot verification */}
        <View style={{ height: 48 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.canvas },
  scroll: { flex: 1 },
  content: { paddingBottom: 120 },
});
