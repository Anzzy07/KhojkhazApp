import { StyleSheet, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';
import { MaterialIcons } from '@expo/vector-icons';

import { Property } from 'types/property';
import { Row } from 'components/Row';
import { PetCard } from 'components/PetCard';
import { GeneralTextCard } from 'components/GeneralTextCard';

export const LeaseAndFeesSection = ({ property }: { property: Property }) => {
  return (
    <>
      <Text category={'h5'} style={styles.defaultMarginVertical}>
        Lease Detail & Fees
      </Text>
      {property.pets ? (
        <>
          <Row style={styles.row}>
            <MaterialIcons name="pets" color="black" size={24} />
            <Text category={'h6'} style={styles.rowText}>
              Pet Policies
            </Text>
          </Row>
          <FlatList
            style={styles.defaultMarginVertical}
            horizontal
            data={property.pets}
            renderItem={({ item }) => <PetCard pet={item} style={styles.petCard} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.type}
          />
        </>
      ) : null}
      <Row style={styles.row}>
        <MaterialIcons name="attach-money" color="black" size={24} />
        <Text category={'h6'} style={styles.rowText}>
          Fees
        </Text>
      </Row>
      <GeneralTextCard heading="parking" body={['Others']} />

      <Row style={[styles.row, { paddingTop: 10 }]}>
        <MaterialIcons name="list-alt" color="black" size={24} />
        <Text category={'h6'} style={styles.rowText}>
          Details
        </Text>
      </Row>
      <FlatList
        style={styles.defaultMarginVertical}
        data={[
          {
            heading: 'lease options',
            body: ['12 months'],
          },
          {
            heading: 'Property Information',
            body: ['Built in 2023-2024', 'Home Community', 'Apartment Community'],
          },
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.heading}
        renderItem={({ item, index }) => (
          <GeneralTextCard heading={item.heading} body={item.body} style={styles.textCard} />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  defaultMarginVertical: { marginVertical: 10 },
  row: { alignItems: 'center', marginVertical: 15 },
  rowText: { marginLeft: 10 },
  petCard: { marginRight: 15 },
  textCard: { marginRight: 10 },
});
