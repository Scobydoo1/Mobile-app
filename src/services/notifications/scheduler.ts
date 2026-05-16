import * as Notifications from 'expo-notifications';

const SNOOZE_MINUTES = 30;

/**
 * Schedule a high-priority local push for the given habit, `SNOOZE_MINUTES` from now.
 * Payload carries `habitId` so the deep-link handler can route back to the completion card.
 */
export async function scheduleSnooze(
  habitId: string,
  title: string,
  whyNow: string,
): Promise<string | null> {
  try {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Ready for a 2-minute win?',
        body: title,
        data: { habitId, kind: 'snooze', whyNow },
        sound: 'default',
      },
      trigger: {
        seconds: SNOOZE_MINUTES * 60,
        channelId: 'nudges',
      } as Notifications.TimeIntervalTriggerInput,
    });
  } catch {
    return null;
  }
}

export async function cancelScheduled(notifId: string): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(notifId);
  } catch {
    // ignore
  }
}
