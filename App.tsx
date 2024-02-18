import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { theme } from '../khojkhaz/theme';
import { AuthContext } from 'context';
import { User } from 'types/user';
import * as SecureStore from 'expo-secure-store';

export default function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const user = await SecureStore.getItemAsync('user');
      if (user) setUser(JSON.parse(user));
    }
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <ApplicationProvider {...eva} theme={theme}>
          <SafeAreaProvider>
            <RootStack />
            <StatusBar />
          </SafeAreaProvider>
        </ApplicationProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
