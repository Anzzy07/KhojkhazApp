import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';

import { Pet } from '../types/pet';
import { Row } from './Row';
import { theme } from '../theme';

export const PetCard = ({ pet, style }: { pet: Pet; style?: ViewStyle | ViewStyle[] }) => {
  return <View></View>;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderColor: theme['color-gray'],
    borderWidth: 1,
    padding: 7,
    width: 250,
  },
  allowedText: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardRow: { justifyContent: 'space-between', paddingVertical: 5 },
  cardRowText: { fontWeight: 'bold' },
  divider: { backgroundColor: theme['color-gray'] },
});
