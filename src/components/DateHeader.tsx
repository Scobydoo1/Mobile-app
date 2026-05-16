import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Type } from '../theme/tokens';
import { formatHeaderDate } from '../utils/dates';
import { useAppContext } from '../context/AppContextProvider';

interface DateHeaderProps {
  userName?: string;
}

/**
 * Top of the dashboard.
 *
 *   SATURDAY · MAY 16
 *   Welcome back, Alex.
 *   Your moment is now.
 */
export function DateHeader({ userName = 'Alex' }: DateHeaderProps) {
  const { currentContext } = useAppContext();
  const date = formatHeaderDate(currentContext.rawTime);

  return (
    <View style={styles.wrap}>
      <Text style={styles.date} accessibilityRole="header">
        {date}
      </Text>
      <Text style={styles.hero}>Welcome back, {userName}.</Text>
      <Text style={styles.sub}>Your moment is now.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 20,
  },
  date: {
    fontSize: Type.date.size,
    fontWeight: Type.date.weight,
    letterSpacing: Type.date.tracking,
    color: Type.date.color,
    marginBottom: 14,
  },
  hero: {
    fontSize: Type.hero.size,
    fontWeight: Type.hero.weight,
    letterSpacing: Type.hero.tracking,
    color: Type.hero.color,
    lineHeight: 38,
  },
  sub: {
    fontSize: Type.subHero.size,
    fontWeight: Type.subHero.weight,
    color: Type.subHero.color,
    marginTop: 4,
  },
});

// Silence the lint by re-exporting Colors usage (it's via Type tokens)
void Colors;
