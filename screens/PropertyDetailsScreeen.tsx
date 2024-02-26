import { Text } from '@ui-kitten/components';
import { Screen } from 'components/Screen';
import { properties } from 'data/properties';

export const PropertyDetailsScreeen = ({
  route,
}: {
  route: { params: { propertyID: number } };
}) => {
  const index = properties.findIndex((i) => i.id === route.params.propertyID);
  const property = properties[index];
  return (
    <Screen>
      <Text>Property Details</Text>
      <Text>{property.name}</Text>
    </Screen>
  );
};
