import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const PinIcon: React.FC<IconProps> = ({ size = 18, color = '#7C3AED', strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 18, color = '#3B82F6', strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M12 7v5l3 2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 20, color = '#FFFFFF', strokeWidth = 2.5 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12.5l4.2 4.2L19 7"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ZzzIcon: React.FC<IconProps> = ({ size = 18, color = '#5A6172', strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 7h6L6 17h6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M14 11h4l-4 6h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BookIcon: React.FC<IconProps> = ({ size = 22, color = '#5A6172', strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="4" width="16" height="16" rx="3" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M8 9h8M8 13h8M8 17h5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

// --- Tab bar icons (line style) ---

export const TargetIcon: React.FC<IconProps> = ({ size = 24, color = '#7C3AED', strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="12" cy="12" r="5" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="12" cy="12" r="1.6" fill={color} />
  </Svg>
);

export const BarsIcon: React.FC<IconProps> = ({ size = 24, color = '#8A92A3', strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 19V11M12 19V5M19 19v-9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 24, color = '#8A92A3', strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="6" width="16" height="14" rx="3" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M4 10h16M9 4v4M15 4v4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

export const GearIcon: React.FC<IconProps> = ({ size = 24, color = '#8A92A3', strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
