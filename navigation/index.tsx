import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './tab-navigator';
import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { FindLocationsScreen } from 'screens/FindLocationsScreen';
import { SignInScreen } from 'screens/SignInScreen';
import { SignUpScreen } from 'screens/SignUpScreen';
import { ForgotPasswordScreen } from 'screens/ForgotPasswordScreen';
import { ResetPasswordScreen } from 'screens/ResetPasswordScreen';
import { PropertyDetailsScreen } from 'screens/PropertyDetailsScreen';
import { MessageScreen } from 'screens/MessageScreen';

export type TabNavigatorParamList = {
  Search: undefined | SearchScreenParams;
  Saved: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  setOptions(arg0: { tabBarStyle: { display: string } }): unknown;
  navigate(arg0: string, arg1: { propertyID: number }): void;
  TabNavigator: NavigatorScreenParams<TabNavigatorParamList>;
  Modal: undefined;
  FindLocations: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
  PropertyDetails: { propertyID: number };
  Message: { propertyID: number; tour?: boolean };
};

export type SearchScreenParams = {
  location: string;
  boundingBox: string[];
  lat: string;
  lon: string;
};

const Stack = createStackNavigator<RootStackParamList>();

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      TabNavigator: {
        screens: {
          Search: 'search',
          Saved: 'saved',
          Account: 'account',
        },
      },
      FindLocations: 'findLocations',
      ForgotPassword: 'forgotPassword',
      Message: 'message',
      PropertyDetails: 'propertydetails',
      ResetPassword: { path: 'resetpassword/:token' },
      SignIn: 'signin',
      SignUp: 'signup',
    },
  },
};

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
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PropertyDetails"
            component={PropertyDetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Message" component={MessageScreen} options={{ headerShown: false }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
