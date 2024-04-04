import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { Text, Input, Divider, Button } from '@ui-kitten/components';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Screen } from './Screen';
import { ModalHeader } from './ModalHeader';
import { Formik } from 'formik';

export const AddPropertySection = () => {
  return (
    <KeyboardAwareFlatList
      data={[1]}
      renderItem={({ item }) => (
        <Screen>
          <ModalHeader text="Khojkhaz" xShown />
          <View style={styles.container}>
            <Text category={'h5'} style={styles.header}>
              Add a Property
            </Text>

            <Formik initialValues={{}} onSubmit={(values) => console.log(values)}>
              {({
                values,
                errors,
                touched,
                handleSubmit,
                setFieldTouched,
                setFieldValue,
                handleChange,
              }) => {
                return <View></View>;
              }}
            </Formik>
          </View>
        </Screen>
      )}
      bounces={false}
    />
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 10 },
  header: { marginVertical: 20, textAlign: 'center' },
});
