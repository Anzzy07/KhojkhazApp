import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../navigation/index';

const linking: LinkingOptions<RootStackParamList> = {
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

export default linking;

/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
