import { StyleSheet, FlatList, View, Dimensions } from 'react-native';
import { Screen } from 'components/Screen';
import { Divider, Text } from '@ui-kitten/components';
import { ImageCarousel } from 'components/ImageCarousel';

import { theme } from 'theme';
import { PropertyHeaderSection } from 'components/propertyDetailsSections/PropertyHeaderSection';
import { PricingAndFloorPlanSection } from 'components/propertyDetailsSections/PricingAndFloorPlanSection';
import { AboutSection } from 'components/propertyDetailsSections/AboutSection';
import { ContactSection } from 'components/propertyDetailsSections/ContactSection';
import { AmentitiesSection } from 'components/propertyDetailsSections/AmenitiesSection';
import { LeaseAndFeesSection } from '../components/propertyDetailsSections/LeaseAndFeesSection';
import { LocationSection } from 'components/propertyDetailsSections/LocationSection';
import { ReviewSection } from 'components/propertyDetailsSections/ReviewSection';
import { useSelectedPropertyQuery } from 'hooks/queries/useSelectedPropertyQuery';

export const PropertyDetailsScreen = ({ route }: { route: { params: { propertyID: number } } }) => {
  const property = useSelectedPropertyQuery(route.params.propertyID);

  if (!property.data) return <Text>Unable to get property ...</Text>;

  return (
    <Screen>
      <FlatList
        data={[property.data]}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={({ item }) => (
          <>
            {item.images ? (
              <ImageCarousel images={item.images} indexShown imageStyle={styles.image} />
            ) : null}
            <View style={styles.contentContainer}>
              <PropertyHeaderSection property={item} />
              <Divider style={styles.divider} />
              <PricingAndFloorPlanSection property={item} />
              <Divider style={styles.divider} />
              <AboutSection property={item} />
              <Divider style={styles.divider} />
              <ContactSection property={item} />
              <Divider style={styles.divider} />
              <AmentitiesSection property={item} />
              <Divider style={styles.divider} />
              <LeaseAndFeesSection property={item} />
              <Divider style={styles.divider} />
              <LocationSection property={item} />
              <Divider style={styles.divider} />
              <ReviewSection property={item} />
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
