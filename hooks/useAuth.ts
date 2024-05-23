import { useNavigation } from '@react-navigation/native';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useEffect } from 'react';
import {
  appleLoginOrRegister,
  facebookLoginOrRegister,
  googleLoginOrRegister,
  loginUser,
  registerUser,
} from '../services/user';
import { User } from '../types/user';
import { useUser } from './useUser';
import { useLoading } from './useLoading';

export const useAuth = () => {
  const [_, googleResponse, googleAuth] = Google.useAuthRequest({
    expoClientId: '841113567422-4h0fi2te8ngedfi9unk4m1bbbmrjiun4.apps.googleusercontent.com',
    iosClientId: '841113567422-satb5vt4gk1qe5m4tishedcahfs9mfpp.apps.googleusercontent.com',
    androidClientId: '841113567422-d3tl2mh1q4el63mij8fp6j9j9oj5nond.apps.googleusercontent.com',
    webClientId: '841113567422-hlqrrkfe6b20mdsjdffg13bknbvhg3o7.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/@anzel/khojkhaz',
    selectAccount: true,
  });

  const [___, ____, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: '229503536901618',
    redirectUri: 'https://auth.expo.io/@anzel/khojkhaz',
  });

  useEffect(() => {
    async function loginUserWithGoogle(access_token: string) {
      try {
        setLoading(true);

        const user = await googleLoginOrRegister(access_token);
        handleSignInUser(user);
      } catch (error) {
        handleAuthError();
      } finally {
        setLoading(false);
      }
    }

    if (googleResponse?.type === 'success') {
      const { access_token } = googleResponse.params;
      loginUserWithGoogle(access_token);
    }
  }, [googleResponse]);

  const { login } = useUser();
  const { goBack } = useNavigation();
  const { setLoading } = useLoading();

  const handleSignInUser = (user?: User | null) => {
    if (user) {
      login(user);
      goBack();
    }
  };

  const handleAuthError = () => alert('Unable to authorize');

  const nativeRegister = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);

      const user = await registerUser(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );
      handleSignInUser(user);
    } catch (error) {
      handleAuthError();
    } finally {
      setLoading(false);
    }
  };

  const nativeLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);

      const user = await loginUser(values.email, values.password);
      handleSignInUser(user);
    } catch (error) {
      handleAuthError();
    } finally {
      setLoading(false);
    }
  };

  const facebookAuth = async () => {
    try {
      const response = await fbPromptAsync();
      if (response.type === 'success') {
        setLoading(true);
        const { access_token } = response.params;

        const user = await facebookLoginOrRegister(access_token);
        handleSignInUser(user);
      }
    } catch (error) {
      handleAuthError();
    } finally {
      setLoading(false);
    }
  };

  const appleAuth = async () => {
    try {
      const { identityToken } = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      if (identityToken) {
        setLoading(true);

        const user = await appleLoginOrRegister(identityToken);
        handleSignInUser(user);
      }
    } catch (error) {
      handleAuthError();
    } finally {
      setLoading(false);
    }
  };

  return { nativeRegister, nativeLogin, facebookAuth, googleAuth, appleAuth };
};
