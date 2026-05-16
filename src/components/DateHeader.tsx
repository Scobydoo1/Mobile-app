import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Type } from '../theme/tokens';
import { formatHeaderDate } from '../utils/dates';
import { useAppContext } from '../context/AppContextProvider';

interface DateHeaderProps {
  userName?: string;
  tagline?: string;
}

/**
 *   SATURDAY · MAY 16
 *   Welcome back, Alex.
 *   Your moment is now.
 */
export function DateHeader({ userName = 'Alex', tagline = 'Your moment is now.' }: DateHeaderProps) {
  const { currentContext } = useAppContext();
  const date = formatHeaderDate(currentContext.rawTime);

  return (
    <View style={styles.wrap}>
      <Text style={styles.date} accessibilityRole="header">
        {date}
      </Text>
      <Text style={styles.hero}>Welcome back, {userName}.</Text>
      <Text style={styles.sub}>{tagline}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 18,
  },
  date: {
    fontSize: Type.date.size,
    fontWeight: Type.date.weight,
    letterSpacing: Type.date.tracking,
    color: Type.date.color,
    marginBottom: 6,
  },
  hero: {
    fontSize: Type.hero.size,
    fontWeight: Type.hero.weight,
    letterSpacing: Type.hero.tracking,
    color: Type.hero.color,
    lineHeight: 32,
  },
  sub: {
    fontSize: Type.subHero.size,
    fontWeight: Type.subHero.weight,
    letterSpacing: Type.subHero.tracking,
    color: Type.subHero.color,
    marginTop: 4,
  },
});
