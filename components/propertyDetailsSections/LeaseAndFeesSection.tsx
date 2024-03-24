import { StyleSheet, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';
import { MaterialIcons } from '@expo/vector-icons';

import { Property } from 'types/property';
import { Row } from 'components/Row';
import { PetCard } from 'components/PetCard';

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
            renderItem={({ item }) => <PetCard pet={item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.type}
          />
        </>
      ) : null}
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
