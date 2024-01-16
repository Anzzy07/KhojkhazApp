import { FlatList, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { Button } from '@ui-kitten/components';

export const HeaderFilterButtons = () => {
  const filterButtons = [
    {
      iconName: 'filter-variant',
      onPress: () => console.log('filter all'),
    },
    {
      label: 'Price',
      onPress: () => console.log('Price'),
    },
    {
      label: 'Move-in Date',
      onPress: () => console.log('move in date'),
    },
    {
      label: 'Pets',
      onPress: () => console.log('Pets'),
    },
  ];

  return (
    <FlatList
      data={filterButtons}
      horizontal
      style={{ marginVertical: 10 }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => {
        if (item.iconName) {
          return (
            <Button
              appearance={'ghost'}
              style={[styles.button, { width: 48 }]}
              onPress={item.onPress}
              accessoryLeft={
                <MaterialCommunityIcons
                  name={item.iconName as any}
                  size={20}
                  color={theme['color-primary-500']}
                />
              }></Button>
          );
        }
        return (
          <Button appearance={'ghost'} style={styles.button} onPress={item.onPress}>
            {item.label}
          </Button>
        );
      }}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    borderColor: theme['color-gray'],
    marginHorizontal: 3,
  },
});
