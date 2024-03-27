import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Screen } from 'components/Screen';
import * as yup from 'yup';
import { Formik } from 'formik';
import * as AppleAuthentication from 'expo-apple-authentication';

import { ModalHeader } from 'components/ModalHeader';
import { GoogleButton } from 'components/GoogleButton';
import { FacebookButton } from 'components/FacebookButton';
import { AppleButton } from 'components/AppleButton';
import { useNavigation } from '@react-navigation/native';
import { PasswordInput } from 'components/PasswordInput';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation';
import { OrDivider } from 'components/OrDivider';
import {
  appleLoginOrRegister,
  facebookLoginOrRegister,
  googleLoginOrRegister,
  loginUser,
} from 'services/user';
import { useAuth } from 'hooks/useAuth';
import { useMutation } from 'react-query';
import { Loading } from 'components/loading';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';

export const SignInScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { login } = useAuth();

  const [_, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    expoClientId: '841113567422-4h0fi2te8ngedfi9unk4m1bbbmrjiun4.apps.googleusercontent.com',
    iosClientId: '841113567422-ovi5t3grd0a5cereu56fqqp8phk6j2kg.apps.googleusercontent.com',
    androidClientId: '841113567422-brvrdcgvb26s21ku994mqisiefe7hk27.apps.googleusercontent.com',
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  // useEffect(() => {}, [googleResponse]);

  const [___, ____, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: '229503536901618',
    redirectUri: 'https://auth.expo.io/@anzel/khojkhaz',
  });

  const nativeLogin = useMutation(async (values: { email: string; password: string }) => {
    const user = await loginUser(values.email, values.password);
    if (user) {
      login(user);
      navigation.goBack();
    }
  });

  const facebookLogin = useMutation(async () => {
    const response = await fbPromptAsync();
    if (response.type === 'success') {
      const { access_token } = response.params;

      const user = await facebookLoginOrRegister(access_token);
      if (user) {
        login(user);
        navigation.goBack();
      }
    }
  });

  const googleLogin = useMutation(async () => {
    const response = await googlePromptAsync();
    if (response.type === 'success') {
      const { access_token } = response.params;
      console.log('access', access_token);

      const user = await googleLoginOrRegister(access_token);
      if (user) {
        login(user);
        navigation.goBack();
      }
    }
  });

  const appleLogin = useMutation(async () => {
    const { identityToken } = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      ],
    });
    if (identityToken) {
      const user = await appleLoginOrRegister(identityToken);
      if (user) {
        login(user);
        navigation.goBack;
      }
    }
  });

  if (
    nativeLogin.isLoading ||
    facebookLogin.isLoading ||
    googleLogin.isLoading ||
    appleLogin.isLoading
  )
    return <Loading />;

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen>
        <ModalHeader text="Khojkhaz" xShown />
        <View style={styles.container}>
          <Text category={'h5'} style={styles.header}>
            Sign In
          </Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={yup.object().shape({
              email: yup.string().email().required('Your email is required.'),
              password: yup.string().required('A password is required.'),
            })}
            onSubmit={async (values) => {
              nativeLogin.mutate(values);
            }}>
            {({ values, errors, touched, handleChange, handleSubmit, setFieldTouched }) => {
              return (
                <>
                  <Input
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="Your Email Address"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoComplete="email"
                    label="Email"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched('email')}
                    caption={touched.email && errors.email ? errors.email : undefined}
                    status={touched.email && errors.email ? 'danger' : 'basic'}
                  />
                  <PasswordInput
                    style={styles.input}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Your Password"
                    label="Password"
                    onBlur={() => setFieldTouched('password')}
                    caption={touched.password && errors.password ? errors.password : undefined}
                    status={touched.password && errors.password ? 'danger' : 'basic'}
                  />
                  <TouchableOpacity
                    style={styles.forgotPasswordContainer}
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text category={'c1'} status={'info'}>
                      Forgot your password?
                    </Text>
                  </TouchableOpacity>

                  <Button style={styles.signInButton} onPress={() => handleSubmit()}>
                    Sign In
                  </Button>
                  <OrDivider style={styles.orContainer} />
                  <GoogleButton
                    text="Continue with Google"
                    style={styles.button}
                    onPress={() => googleLogin.mutate()}
                  />
                  <FacebookButton
                    text="Continue with Facebook"
                    style={styles.button}
                    onPress={() => facebookLogin.mutate()}
                  />
                  <AppleButton type="sign-in" onPress={() => appleLogin.mutate()} />
                </>
              );
            }}
          </Formik>
        </View>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 10 },
  header: { textAlign: 'center', marginVertical: 20 },
  input: {
    marginTop: 10,
  },
  forgotPasswordContainer: { alignItems: 'flex-end', marginTop: 5 },
  signInButton: { marginTop: 20 },
  orContainer: {
    marginVertical: 30,
  },
  button: { marginBottom: 10 },
});
