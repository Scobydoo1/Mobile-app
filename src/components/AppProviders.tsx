import React from 'react';
import { DatabaseProvider, useDatabaseReady } from '../context/DatabaseProvider';
import { AppContextProvider } from '../context/AppContextProvider';
import { NudgeProvider } from '../context/NudgeProvider';
import { NotificationProvider } from '../context/NotificationProvider';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/tokens';

function Gate({ children }: { children: React.ReactNode }) {
  const { ready, error } = useDatabaseReady();
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Database failed: {error}</Text>
      </View>
    );
  }
  if (!ready) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Colors.brandPurple} />
      </View>
    );
  }
  return <>{children}</>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <DatabaseProvider>
      <Gate>
        <AppContextProvider>
          <NudgeProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </NudgeProvider>
        </AppContextProvider>
      </Gate>
    </DatabaseProvider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.canvas },
  errorText: { color: '#B91C1C', padding: 24, textAlign: 'center' },
});
