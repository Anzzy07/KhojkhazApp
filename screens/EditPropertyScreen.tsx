import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { useState, useRef } from 'react';
import RNPhoneInput from 'react-native-phone-number-input';

import { Loading } from 'components/loading';
import { Screen } from 'components/Screen';
import { AMENITIES_STR, DESCRIPTION_STR, PHOTOS_STR, endpoints } from '../constants';
import { Property } from 'types/property';
import { theme } from 'theme';
import { bedValues } from 'constants/bedValues';
import { bathValues } from 'constants/bathValues';
import { UnitPhotosPicker } from 'components/UnitPhotosPicker';
import { UnitAmenities } from 'components/UnitAmenities';
import { UnitDescription } from 'components/UnitDescription';
import { UnitsInput } from 'components/editPropertySections/UnitsInput';
import { TempApartment } from 'types/tempApartments';
import { GeneralPropertyInfo } from 'components/editPropertySections/GeneralPropertyInfo';
import { UtilitiesAndAmenities } from 'components/editPropertySections/UtilitiesAndAmenities';
import { petValues } from 'constants/petValues';
import { laundryValues } from 'constants/LaundryValues';
import { ContactInfo } from 'components/editPropertySections/ContactInfo';
import { useAuth } from 'hooks/useAuth';

export const EditPropertyScreen = ({ route }: { route: { params: { propertyID: number } } }) => {
  const { user } = useAuth();
  const scrollViewRef = useRef<KeyboardAwareScrollView | null>(null);
  const property: UseQueryResult<{ data: Property }, unknown> = useQuery('property', () =>
    axios.get(endpoints.getPropertyByID + route.params.propertyID)
  );

  const phoneRef = useRef<RNPhoneInput>(null);

  const [showAlternateScreen, setShowAlternateScreen] = useState('');
  const [apartmentIndex, setApartmentIndex] = useState<number>(-1);

  const handleShowAlternateScreen = (index: number, name: string) => {
    // When there are multiple unit, we dont want to be
    // half way down the screen for amenities
    if (scrollViewRef.current) scrollViewRef.current.scrollToPosition(0, 0);
    setShowAlternateScreen(name);
    setApartmentIndex(index);
  };
  const handleHideAlternateScreen = () => {
    setShowAlternateScreen('');
    setApartmentIndex(-1);
  };

  if (property.isFetching || property.isLoading) return <Loading />;

  let initialApartments: TempApartment[] = [];
  if (property.data?.data) {
    for (let i of property.data.data.apartments) {
      initialApartments.push({
        unit: i.unit ? i.unit : '',
        bedrooms: bedValues.filter((item) => item.value === i.bedrooms)[0],
        bathrooms: bathValues.filter((item) => item.value === i.bathrooms)[0],
        sqFt: '',
        rent: '',
        deposit: '0',
        leaseLength: '12 Months',
        availableOn: new Date(),
        active: true,
        showCalendar: false,
        images: [],
        amenities: [],
        description: '',
      });
    }
  }

  return (
    <KeyboardAwareScrollView bounces={false} ref={(ref) => (scrollViewRef.current = ref)}>
      <Screen style={styles.container}>
        {!showAlternateScreen && (
          <Text category="h5" style={styles.header}>
            Basic Info
          </Text>
        )}
        <View>
          <Formik
            initialValues={{
              unitType: property.data?.data.unitType,
              apartments: initialApartments,
              description: '',
              images: [],
              includedUtilities: [],
              petsAllowed: petValues[0],
              laundryType: laundryValues[0],
              parkingFee: '',
              amenities: [],
              firstName: user?.firstName ? user.firstName : '',
              lastName: user?.lastName ? user.lastName : '',
              email: user?.email ? user.email : '',
              phoneNumber: '',
              onMarket: false,
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
              const addUnit = () => {
                const apartments = [...values.apartments];
                apartments.push({
                  unit: '',
                  bedrooms: bedValues[0],
                  bathrooms: bathValues[0],
                  sqFt: '',
                  rent: '',
                  deposit: '0',
                  leaseLength: '12 Months',
                  availableOn: new Date(),
                  active: true,
                  showCalendar: false,
                  images: [],
                  amenities: [],
                  description: '',
                });
                setFieldValue('apartments', apartments);
              };

              const removeUnit = (index: number) => {
                const newApartments = values.apartments.filter((i, idx) => idx !== index);
                setFieldValue('apartments', newApartments);
              };

              if (showAlternateScreen === PHOTOS_STR && apartmentIndex > -1)
                return (
                  <UnitPhotosPicker
                    setImages={setFieldValue}
                    images={values.apartments[apartmentIndex].images}
                    field={`apartments[${apartmentIndex}].images`}
                    cancel={handleHideAlternateScreen}
                  />
                );

              if (showAlternateScreen === AMENITIES_STR && apartmentIndex > -1)
                return (
                  <UnitAmenities
                    setAmenities={setFieldValue}
                    amenities={values.apartments[apartmentIndex].amenities}
                    field={`apartments[${apartmentIndex}].amenities`}
                    cancel={handleHideAlternateScreen}
                  />
                );

              if (showAlternateScreen === DESCRIPTION_STR && apartmentIndex > -1)
                return (
                  <UnitDescription
                    setDescription={setFieldValue}
                    description={values.apartments[apartmentIndex].description}
                    field={`apartments[${apartmentIndex}].description`}
                    cancel={handleHideAlternateScreen}
                  />
                );

              return (
                <>
                  <UnitsInput
                    unitType={values.unitType}
                    apartments={values.apartments}
                    property={property.data?.data}
                    errors={errors}
                    handleChange={handleChange}
                    handleShowAlternateScreen={handleShowAlternateScreen}
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    touched={touched}
                  />

                  <GeneralPropertyInfo
                    description={values.description}
                    images={values.images}
                    setFieldValue={setFieldValue}
                  />

                  <UtilitiesAndAmenities
                    amenities={values.amenities}
                    handleChange={handleChange}
                    includedUtilities={values.includedUtilities}
                    laundryType={values.laundryType}
                    parkingFee={values.parkingFee}
                    petsAllowed={values.petsAllowed}
                    setFieldValue={setFieldValue}
                  />

                  <ContactInfo
                    firstName={values.firstName}
                    email={values.email}
                    errors={errors}
                    handleChange={handleChange}
                    lastName={values.lastName}
                    phoneNumber={values.phoneNumber}
                    phoneRef={phoneRef}
                    setFieldTouched={setFieldTouched}
                    touched={touched}
                  />

                  <Button style={styles.largeMarginTop} onPress={() => handleSubmit()}>
                    Save
                  </Button>
                  <Button
                    appearance={'ghost'}
                    style={[styles.saveButton]}
                    onPress={() => {
                      setFieldValue('onMarket', false);
                      handleSubmit();
                    }}>
                    Publish Listing
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
  container: {
    marginHorizontal: 10,
  },
  input: {
    marginTop: 15,
  },
  header: {
    textAlign: 'center',
    paddingVertical: 10,
  },
  saveButton: {
    borderColor: theme['color-primary-500'],
    marginVertical: 15,
  },
  largeMarginTop: { marginTop: 30 },
  unitRow: { justifyContent: 'space-between' },
  smallInput: { width: '45%' },
  divider: { backgroundColor: theme['color-gray'], marginVertical: 30 },
  toggleRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitInputs: {
    borderColor: theme['color-gray'],
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
  },
  addUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  addUnitText: { marginLeft: 10 },
  removeUnit: {
    position: 'absolute',
    right: 5,
    zIndex: 10,
    top: 15,
  },
  removeUnitText: {
    fontWeight: 'bold',
  },
});
