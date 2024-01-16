import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './navigation';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { theme } from 'theme';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={theme}>
      <SafeAreaProvider>
        <RootStack />
        <StatusBar />
      </SafeAreaProvider>
    </ApplicationProvider>
  );
}
