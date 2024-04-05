import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { Text, Input, Divider, Button } from '@ui-kitten/components';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';

import { Screen } from './Screen';
import { ModalHeader } from './ModalHeader';
import { Row } from './Row';
import { UnitButton } from './UnitButton';

export const AddPropertySection = () => {
  return (
    <KeyboardAwareFlatList
      data={[1]}
      renderItem={() => (
        <Screen>
          <ModalHeader text="Khojkhaz" xShown />
          <View style={styles.container}>
            <Text category={'h5'} style={styles.header}>
              Add a Property
            </Text>

            <Formik
              initialValues={{
                unitType: 'single',
              }}
              onSubmit={(values) => console.log(values)}>
              {({
                values,
                errors,
                touched,
                handleSubmit,
                setFieldTouched,
                setFieldValue,
                handleChange,
              }) => {
                return (
                  <View>
                    <Row style={styles.row}>
                      <UnitButton
                        text="Single Property"
                        iconName="home"
                        active={values.unitType === 'single' ? true : false}
                        onPress={() => setFieldValue('unitType', 'single')}
                      />
                      <UnitButton
                        text="Multiple Property"
                        iconName="apartment"
                        active={values.unitType === 'multiple' ? true : false}
                        onPress={() => setFieldValue('unitType', 'multiple')}
                      />
                    </Row>
                  </View>
                );
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
  row: {
    justifyContent: 'space-evenly',
  },
});
