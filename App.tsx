import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './navigation';
import { QueryClient, QueryClientProvider } from 'react-query';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { theme } from 'theme';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationProvider {...eva} theme={theme}>
        <SafeAreaProvider>
          <RootStack />
          <StatusBar />
        </SafeAreaProvider>
      </ApplicationProvider>
    </QueryClientProvider>
  );
}
