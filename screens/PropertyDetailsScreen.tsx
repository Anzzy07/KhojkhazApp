import { StyleSheet, FlatList, View, Dimensions } from 'react-native';
import { Screen } from 'components/Screen';
import { properties } from 'data/properties';
import { ImageCarousel } from 'components/ImageCarousel';
import { theme } from 'theme';
import { PropertyHeaderSection } from 'components/propertyDetailsSections/PropertyHeaderSection';

export const PropertyDetailsScreen = ({ route }: { route: { params: { propertyID: number } } }) => {
  const index = properties.findIndex((i) => i.id === route.params.propertyID);
  const property = properties[index];
  return (
    <Screen>
      <FlatList
        data={[property]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            {item.images ? (
              <ImageCarousel images={item.images} indexShown imageStyle={styles.image} />
            ) : null}
            <View style={styles.contentContainer}>
              <PropertyHeaderSection property={item} />
            </View>
          </> //render images from image carosel component for property details
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: 250,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  contentContainer: {
    marginHorizontal: 10,
  },
  divider: {
    backgroundColor: theme['color-gray'],
    marginTop: 10,
  },
});
