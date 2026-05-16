import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

let configured = false;

/**
 * One-time global handler + Android channel.
 * Foregrounded nudges are intentionally shown as banners + sounds so the user notices a context-change
 * even while the app is open.
 */
export async function setupNotifications(): Promise<void> {
  if (configured) return;
  configured = true;

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('nudges', {
      name: 'Habit Nudges',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 200, 100, 200],
      lightColor: '#7C3AED',
    });
  }

  try {
    await Notifications.requestPermissionsAsync();
  } catch {
    // permission denied — silent, user can re-grant in settings later.
  }
}
