import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Type } from '../theme/tokens';
import { GlassCard } from './GlassCard';
import { BarsIcon, CalendarIcon, GearIcon, TargetIcon } from './icons';

type TabKey = 'habits' | 'progress' | 'insights' | 'settings';

interface BottomTabBarProps {
  active?: TabKey;
  onChange?: (key: TabKey) => void;
}

const ITEMS: { key: TabKey; label: string; Icon: React.FC<{ size?: number; color?: string; strokeWidth?: number }> }[] = [
  { key: 'habits', label: 'Habits', Icon: TargetIcon },
  { key: 'progress', label: 'Progress', Icon: BarsIcon },
  { key: 'insights', label: 'Insights', Icon: CalendarIcon },
  { key: 'settings', label: 'Settings', Icon: GearIcon },
];

/**
 * Floating glass bottom-nav with an active purple ring + soft glow.
 */
export function BottomTabBar({ active = 'habits', onChange }: BottomTabBarProps) {
  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <GlassCard radius={28} style={styles.bar}>
        <View style={styles.row}>
          {ITEMS.map(({ key, label, Icon }) => {
            const isActive = key === active;
            const color = isActive ? Colors.brandPurple : Colors.ink500;
            return (
              <Pressable
                key={key}
                onPress={() => onChange?.(key)}
                style={[styles.item, isActive && styles.itemActive]}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={label}
              >
                <Icon size={22} color={color} strokeWidth={isActive ? 2 : 1.6} />
                <Text
                  style={[
                    styles.label,
                    {
                      color,
                      fontWeight: isActive ? '600' : '500',
                    },
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
  },
  bar: { paddingVertical: 10, paddingHorizontal: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignItems: 'center',
    gap: 4,
  },
  itemActive: {
    backgroundColor: Colors.brandPurpleSoft,
    borderWidth: 1,
    borderColor: Colors.brandPurpleEdge,
    shadowColor: Colors.brandPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  label: {
    fontSize: Type.tab.size,
    letterSpacing: -0.1,
  },
});
