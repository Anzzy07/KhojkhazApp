import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Property } from 'types/property';
import { Row } from 'components/Row';
import { BulletedList } from 'components/BulletedList';

export const AmentitiesSection = ({ property }: { property: Property }) => {
  return (
    <>
      <Text category={'h5'} style={styles.defaultMarginVertical}>
        Amenities
      </Text>
      <Row style={styles.row}>
        <MaterialCommunityIcons name="google-circles-communities" color={'black'} size={24} />
        <Text style={styles.text} category={'h6'}>
          Community Amenities
        </Text>
      </Row>
      <BulletedList data={['Contrlled Access']} heading="Services" />
      <BulletedList data={['Clubhouse', 'Lounge']} heading="Interior" />
      <BulletedList data={['Picnic Area', 'Gated', 'Grill']} heading="Outdoor" />
      <BulletedList
        data={['Fitness Center', 'Pool', 'Spas', 'Cycling']}
        heading="Fitness & Recreation"
      />
      <Row style={styles.row}>
        <MaterialCommunityIcons name="toy-brick-outline" color={'black'} size={24} />
        <Text style={styles.text} category={'h6'}>
          Property Features
        </Text>
      </Row>
      <BulletedList
        data={['Freeze', 'Dustbin', 'Oven', 'Kitchen', 'Microwave']}
        heading="Kitchen"
      />
      <BulletedList
        data={['Bay Window', 'Crown Handling', 'Closet', 'Tables']}
        heading="Living Room"
      />
      <BulletedList data={['Balcony']} heading="Outdoor Space" />
    </>
  );
};

const styles = StyleSheet.create({
  row: { alignItems: 'center', paddingVertical: 10 },
  text: { marginLeft: 10 },
  defaultMarginVertical: { marginVertical: 10 },
});
