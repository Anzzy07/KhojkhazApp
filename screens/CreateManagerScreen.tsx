import { View, StyleSheet, Image, Pressable } from 'react-native';
import { useState, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Input, Button } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import RNPhoneInput from 'react-native-phone-number-input';

import { Screen } from 'components/Screen';
import { ModalHeader } from 'components/ModalHeader';
import { PhoneInput } from 'components/PhoneInput';

export const CreateManagerScreen = () => {
  const [imageURI, setImageURI] = useState('');
  const phoneRef = useRef<RNPhoneInput>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
    }
  };

  const createManager = () => {
    console.log('Doing in backend');
  };

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen>
        <ModalHeader text="Khojkhaz" xShown />
        <View style={styles.container}>
          <Text category={'h5'} style={styles.header}>
            Create Property Manager Account
          </Text>
          <Text>
            Create this account to list your properties. Users will see this information under the
            contact section of your listings.
          </Text>

          <Formik
            initialValues={{
              name: '',
              email: '',
              phoneNumber: '',
              website: '',
              image: '',
            }}
            validationSchema={yup.object().shape({
              name: yup.string().required('Required'),
              email: yup.string().email().required('Required'),
              phoneNumber: yup.string(),
              website: yup.string(),
              image: yup.string(),
            })}
            onSubmit={(values) => {
              if (values.phoneNumber && !phoneRef.current?.isValidNumber(values.phoneNumber))
                return;

              createManager();
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
                    value={values.name}
                    onChangeText={handleChange('name')}
                    placeholder="Management Name"
                    autoCapitalize="none"
                    label="Name *"
                    onBlur={() => setFieldTouched('name')}
                    caption={touched.name && errors.name ? errors.name : undefined}
                    status={touched.name && errors.name ? 'danger' : 'basic'}
                  />
                  <Input
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="Email Address"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="email"
                    label="Email *"
                    textContentType="emailAddress"
                    onBlur={() => setFieldTouched('email')}
                    caption={touched.email && errors.email ? errors.email : undefined}
                    status={touched.email && errors.email ? 'danger' : 'basic'}
                  />
                  <Input
                    style={styles.input}
                    value={values.website}
                    onChangeText={handleChange('website')}
                    placeholder="Your Website"
                    autoCapitalize="none"
                    keyboardType="url"
                    label="Website"
                    textContentType="URL"
                    onBlur={() => setFieldTouched('website')}
                    caption={touched.website && errors.website ? errors.website : undefined}
                    status={touched.website && errors.website ? 'danger' : 'basic'}
                  />

                  <PhoneInput
                    onChangeText={handleChange('phoneNumber')}
                    phoneNumber={values.phoneNumber}
                    style={styles.input}
                    phoneRef={phoneRef}
                  />

                  {imageURI ? (
                    <Pressable style={styles.imageContainer} onPress={() => pickImage()}>
                      <Image source={{ uri: imageURI }} style={styles.image} />
                      <Button
                        status={'info'}
                        appearance={'ghost'}
                        onPress={() => {
                          setImageURI('');
                          setFieldValue('image', '');
                        }}>
                        Clear Image
                      </Button>
                    </Pressable>
                  ) : null}

                  <Button
                    appearance={'ghost'}
                    style={styles.signInButton}
                    onPress={() => pickImage()}>
                    {imageURI ? 'Update Image' : 'Add Image'}
                  </Button>

                  <Button style={styles.signInButton} onPress={() => handleSubmit()}>
                    Create Account
                  </Button>
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
  signInButton: { marginTop: 20 },
  imageContainer: {
    paddingVertical: 10,
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    borderRadius: 5,
    alignSelf: 'center',
  },
});
