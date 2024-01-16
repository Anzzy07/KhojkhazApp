import { TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from '@ui-kitten/components';
import { Row } from '../components/Row';
import { theme } from '../theme';

export const HeaderInput = () => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => console.log('navigate to input screen')}>
      <Row style={{ alignItems: 'center' }}>
        <MaterialCommunityIcons name="magnify" color={theme['color-primary-500']} size={28} />
        <Text style={styles.text}>Find a Location</Text>
      </Row>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? 50 : 30, //Search screen manage
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 30,
    padding: 10,
  },
  text: {
    marginLeft: 10,
  },
});
