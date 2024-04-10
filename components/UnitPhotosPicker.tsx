import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';

import { ModalHeader } from './ModalHeader';
import { ImageCarousel } from './ImageCarousel';
import { number } from 'yup';

export const UnitPhotosPicker = ({
  images,
  field,
  setImages,
  cancel,
}: {
  images: string[];
  field: string;
  setImages: (field: string, values: any) => void;
  cancel?: () => void;
}) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      const basedImage = `data:image/jpeg;base64,${result.assets[0].base64 as string}`;
      const newImages = [...images];
      newImages.push(basedImage);

      setImages(field, newImages);
    }
  };

  const deleteImage = (
    index: number,
    flatListRef: React.MutableRefObject<FlatList<any> | null> | undefined
  ) => {
    const newImages = images.filter((i, idx) => index !== idx);
    setImages(field, newImages);
    if (index !== 0 && index === images.length - 1 && flatListRef && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: index - 1 });
    }
  };
  return (
    <View>
      <ModalHeader xShown text="Property Photos" onPress={cancel ? cancel : undefined} />

      <Text style={styles.text}>Pick images for your unit</Text>

      {images.length > 0 ? (
        <ImageCarousel
          images={images}
          xShown
          onXpress={deleteImage}
          style={styles.largeMarginTop}
          field={field}
          setImages={setImages}
        />
      ) : null}

      <Button
        appearance={'ghost'}
        style={styles.largeMarginTop}
        onPress={pickImage}
        disabled={images.length > 4 ? true : false}>
        Upload Photos
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { textAlign: 'center', marginTop: 20 },
  largeMarginTop: { marginTop: 30 },
});
