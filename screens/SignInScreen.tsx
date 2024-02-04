import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Screen } from 'components/Screen';
import * as yup from 'yup';
import { Formik } from 'formik';
import { ModalHeader } from 'components/ModalHeader';
import { GoogleButton } from 'components/GoogleButton';
import { FacebookButton } from 'components/FacebookButton';
import { AppleButton } from 'components/AppleButton';
import { useNavigation } from '@react-navigation/native';
import { PasswordInput } from 'components/PasswordInput';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation';
import { OrDivider } from 'components/OrDivider';
import { loginUser } from 'services/user';
import { useAuth } from 'hooks/useAuth';
import { useMutation } from 'react-query';
import { Loading } from 'components/loading';

export const SignInScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { login } = useAuth();

  const nativeLogin = useMutation(async (values: { email: string; password: string }) => {
    const user = await loginUser(values.email, values.password);
    if (user) {
      login(user);
      navigation.goBack();
    }
  });

  if (nativeLogin.isLoading) return <Loading />;

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen style={styles.container}>
        <ModalHeader text="Khojkhaz" xShown />
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
                  onPress={() => console.log('google login')}
                />
                <FacebookButton
                  text="Continue with Facebook"
                  style={styles.button}
                  onPress={() => console.log('Facebook login')}
                />
                <AppleButton type="sign-in" onPress={() => console.log('Apple login')} />
              </>
            );
          }}
        </Formik>
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
