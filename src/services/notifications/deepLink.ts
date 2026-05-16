import * as Notifications from 'expo-notifications';

type DeepLinkHandler = (habitId: string) => void;

let listener: Notifications.Subscription | null = null;

/**
 * Wire a single deep-link handler that fires when the user taps a snooze notification.
 * Returns a cleanup function.
 */
export function registerDeepLinkHandler(handler: DeepLinkHandler): () => void {
  listener?.remove();
  listener = Notifications.addNotificationResponseReceivedListener((res) => {
    const data = res.notification.request.content.data as { habitId?: string };
    if (data?.habitId) handler(data.habitId);
  });
  return () => {
    listener?.remove();
    listener = null;
  };
}
