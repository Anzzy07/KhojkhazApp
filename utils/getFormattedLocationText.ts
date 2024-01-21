import { Location } from 'types/locationIQ';

export const getFormattedLocationText = (item: Location): string => {
  let location = item.address.name || 'Unknown Location'; // Default value if undefined
  if (item.type === 'city' && item.address.state) {
    location += ', ' + item.address.state;
  }
  return location;
};
