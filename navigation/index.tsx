import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './tab-navigator';
import { FindLocationsScreen } from 'screens/FindLocationsScreen';

export type RootStackParamList = {
  TabNavigator: undefined;
  Modal: undefined;
  FindLocations: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigator">
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="FindLocations"
            component={FindLocationsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Group>
        {/* <Stack.Screen
          name="Modal"
          component={Modal}
          options={{ presentation: 'modal', headerLeft: null }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
