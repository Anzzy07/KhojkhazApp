import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { Text, Input } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useState } from 'react';
import { PickerItem } from 'react-native-woodpicker';

import { Screen } from './Screen';
import { ModalHeader } from './ModalHeader';
import { Row } from './Row';
import { UnitButton } from './UnitButton';
import { SearchLocation } from 'types/locationIQ';
import { SearchAddress } from './SearchAddress';
import { getStateAbbreviation } from 'utils/getStateAbbreviation';
import { Select } from './Select';

export const AddPropertySection = () => {
  const [searchingLocation, setSearchingLocation] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchLocation[]>([]);

  const handleGoBack = () => {
    setSearchingLocation(false);
  };

  return (
    <KeyboardAwareFlatList
      data={[1]}
      renderItem={() => (
        <Screen>
          {!searchingLocation && <ModalHeader text="Khojkhaz" xShown />}
          <View style={styles.container}>
            {!searchingLocation && (
              <Text category={'h5'} style={styles.header}>
                Add a Property
              </Text>
            )}

            <Formik
              initialValues={{
                unitType: 'single',
                street: '',
                city: '',
                state: '',
                zip: '',
                lat: '',
                lng: '',
                propertyType: propertyTypes[0],
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
                const onLocationFocus = () => {
                  setSearchingLocation(true);
                  setFieldTouched('street');
                };

                const handleSuggestionPress = (item: any) => {
                  const location = item as SearchLocation;

                  let street = location.address?.road;
                  if (location.address?.house_number)
                    street = `${location.address.house_number} ${street}`;

                  // International use case (current Property Data Struct only really applies to USA)
                  let state = location.address.state;
                  if (!state) state = location.address.country;

                  setFieldValue('street', street);
                  setFieldValue('city', location.address.city);
                  setFieldValue('state', state);
                  setFieldValue('zip', location.address.postcode);
                  setFieldValue('lat', location.lat);
                  setFieldValue('lng', location.lon);

                  handleGoBack();
                };

                const currentLocation = values.street
                  ? values.state
                    ? `${values.street}, ${values.city}, ${getStateAbbreviation(values.state)}`
                    : `${values.street}, ${values.city}`
                  : '';

                if (searchingLocation)
                  return (
                    <SearchAddress
                      type="search"
                      suggestions={suggestions}
                      setSuggestions={(item) => setSuggestions(item as SearchLocation[])}
                      handleGoBack={handleGoBack}
                      handleSuggestionPress={handleSuggestionPress}
                      defaultLocation={currentLocation}
                    />
                  );
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

                    <Input
                      placeholder="Property Address"
                      label="Address"
                      value={currentLocation}
                      onFocus={onLocationFocus}
                      style={styles.input}
                      caption={
                        !values.street && touched.street && errors.street
                          ? errors.street
                          : undefined
                      }
                      status={
                        !values.street && touched.street && errors.street ? 'danger' : 'basic'
                      }
                    />

                    <Select
                      label="Property Type"
                      item={values.propertyType}
                      items={propertyTypes}
                      onItemChange={(item) => setFieldValue('propertyType', item)}
                      isNullable={false}
                      style={styles.input}
                    />
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
  input: {
    marginTop: 15,
  },
});

const propertyTypes: PickerItem[] = [
  { label: 'Apartment', value: 'Apartment' },
  { label: 'Single Family House', value: 'Single Family House' },
  { label: 'Land', value: 'Land' },
  { label: 'Townhouse', value: 'Townhouse' },
  {
    label: 'Mobile Home / Manufactured Home',
    value: 'Mobile Home / Manufactured Home',
  },
];
