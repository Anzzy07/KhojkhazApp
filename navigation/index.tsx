import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './tab-navigator';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { FindLocationsScreen } from 'screens/FindLocationsScreen';
import { SignInScreen } from 'screens/SignInScreen';
import { SignUpScreen } from 'screens/SignUpScreen';
import { ForgotPasswordScreen } from 'screens/ForgotPasswordScreen';
import { ResetPasswordScreen } from 'screens/ResetPasswordScreen';
import { PropertyDetailsScreen } from 'screens/PropertyDetailsScreen';
import { MessageScreen } from 'screens/MessageScreen';
import { AddPropertyScreen } from 'screens/AddPropertyScreen';
import { EditPropertyScreen } from 'screens/EditPropertyScreen';
import { MyPropertiesScreen } from 'screens/MyPropertiesScreen';
import { ManageUnitsScreen } from 'screens/ManageUnitsScreen';
import { ReviewScreen } from 'screens/ReviewScreen';
import { useNotifications } from 'hooks/useNotifications';

export type TabNavigatorParamList = {
  Search: undefined | SearchScreenParams;
  Saved: undefined;
  AccountRoot: NavigatorScreenParams<AccountTabParamList> | undefined;
};

export type AccountTabParamList = {
  Account: undefined;
  Settings: undefined;
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
  AddProperty: undefined;
  EditProperty: { propertyID: number };
  MyProperties: undefined;
  ManageUnits: { propertyID: number };
  Review: { propertyID: number; propertyName: string };
};

export type SearchScreenParams = {
  location: string;
  boundingBox: string[];
  lat: string;
  lon: string;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { registerForPushNotificationsAsync, handleNotificationResponse } = useNotifications();

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );

    return () => {
      if (responseListener) Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
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
          <Stack.Screen
            name="AddProperty"
            component={AddPropertyScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProperty"
            component={EditPropertyScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyProperties"
            component={MyPropertiesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageUnits"
            component={ManageUnitsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Review" component={ReviewScreen} options={{ headerShown: false }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
