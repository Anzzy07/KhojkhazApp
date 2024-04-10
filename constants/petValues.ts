import { PickerItem } from 'react-native-woodpicker';

// export const NoPets = 'none';
// export const CatsOnly = 'cats';
// export const DogsOnly = 'dogs';
// export const CatsAndDogs = 'cats & dogs';

export const petValues: PickerItem[] = [
  { label: 'None', value: 'none' },
  { label: 'Cats', value: 'cats' },
  { label: 'Dogs', value: 'dogs' },
  { label: 'Both', value: 'cats & dogs' },
];
