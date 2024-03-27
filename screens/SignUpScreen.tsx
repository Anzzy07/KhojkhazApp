import { StyleSheet, View } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import * as yup from 'yup';
import { Formik } from 'formik';
import * as AppleAuthentication from 'expo-apple-authentication';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { Screen } from 'components/Screen';
import { ModalHeader } from 'components/ModalHeader';
import { GoogleButton } from 'components/GoogleButton';
import { FacebookButton } from 'components/FacebookButton';
import { AppleButton } from 'components/AppleButton';
import { PasswordInput } from 'components/PasswordInput';
import { OrDivider } from 'components/OrDivider';
import {
  appleLoginOrRegister,
  facebookLoginOrRegister,
  googleLoginOrRegister,
  registerUser,
} from 'services/user';
import { useAuth } from 'hooks/useAuth';
import { useMutation } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation';
import { Loading } from 'components/loading';
import * as Google from 'expo-auth-session/providers/google';

export const SignUpScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { login } = useAuth();

  const [_, __, googlePromptAsync] = Google.useAuthRequest({
    expoClientId: '841113567422-4h0fi2te8ngedfi9unk4m1bbbmrjiun4.apps.googleusercontent.com',
    iosClientId: '841113567422-ovi5t3grd0a5cereu56fqqp8phk6j2kg.apps.googleusercontent.com',
    androidClientId: '841113567422-brvrdcgvb26s21ku994mqisiefe7hk27.apps.googleusercontent.com',
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  const [___, ____, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: '229503536901618',
    redirectUri: 'https://auth.expo.io/@anzel/khojkhaz',
  });

  const nativeRegister = useMutation(
    async (values: { firstName: string; lastName: string; email: string; password: string }) => {
      const user = await registerUser(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );
      if (user) {
        login(user);
        navigation.goBack();
      }
    }
  );

  const facebookRegister = useMutation(async () => {
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

  const googleRegister = useMutation(async () => {
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

  const appleRegister = useMutation(async () => {
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
    nativeRegister.isLoading ||
    facebookRegister.isLoading ||
    googleRegister.isLoading ||
    appleRegister.isLoading
  )
    return <Loading />;

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen>
        <ModalHeader text="Khojkhaz" xShown />
        <View style={styles.container}>
          <Text category={'h5'} style={styles.header}>
            Sign Up
          </Text>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            }}
            validationSchema={yup.object().shape({
              firstName: yup.string().required('Your first name is required.'),
              lastName: yup.string().required('Your last name is required.'),
              email: yup.string().email().required('Your email is required.'),
              password: yup
                .string()
                .required('A password is required.')
                .matches(
                  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                  'Your password must have 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character.'
                ),
            })}
            onSubmit={(values) => {
              nativeRegister.mutate(values);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
            }) => {
              return (
                <>
                  <Input
                    style={styles.input}
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    placeholder="Your First Name"
                    label="First Name"
                    autoComplete="name"
                    textContentType="givenName"
                    onBlur={() => setFieldTouched('firstName')}
                    caption={touched.firstName && errors.firstName ? errors.firstName : undefined}
                    status={touched.firstName && errors.firstName ? 'danger' : 'basic'}
                  />
                  <Input
                    style={styles.input}
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    placeholder="Your Last Name"
                    label="Last Name"
                    textContentType="familyName"
                    autoComplete="name"
                    onBlur={() => setFieldTouched('lastName')}
                    caption={touched.lastName && errors.lastName ? errors.lastName : undefined}
                    status={touched.lastName && errors.lastName ? 'danger' : 'basic'}
                  />
                  <Input
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="Your Email Address"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoComplete="email"
                    autoCorrect={false}
                    label="Email"
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

                  <Button style={styles.signUpButton} onPress={() => handleSubmit()}>
                    Sign Up
                  </Button>
                  <OrDivider style={styles.orContainer} />
                  <GoogleButton
                    text="Sign Up with Google"
                    style={styles.button}
                    onPress={() => googleRegister.mutate()}
                  />
                  <FacebookButton
                    text="Sign Up with Facebook"
                    style={styles.button}
                    onPress={() => facebookRegister.mutate()}
                  />
                  <AppleButton type="sign-in" onPress={() => appleRegister.mutate()} />
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
  signUpButton: { marginTop: 20 },
  orContainer: {
    marginVertical: 30,
  },
  button: { marginBottom: 10 },
});
