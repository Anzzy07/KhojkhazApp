import { FlatList, StyleSheet } from 'react-native';
import { Text, Button } from '@ui-kitten/components';

import { Property } from 'types/property';
import { OverallReviewScoreCard } from 'components/OverallReviewScoreCard';
import { ReviewCard } from 'components/ReviewCard';

export const ReviewSection = ({ property }: { property: Property }) => {
  return (
    <>
      <Text category={'h5'} style={styles.defaultMarginVertical}>
        Reviews
      </Text>
      {property.rentLow ? (
        <>
          <OverallReviewScoreCard
            numberOfReviews={property.reviews ? property.reviews.length : 0}
            score={property.stars}
            style={styles.defaultMarginVertical}
          />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.flatListMargin}
            data={property.reviews}
            keyExtractor={(item) => item.ID.toString()}
            renderItem={({ item }) => <ReviewCard review={item} />}
          />
        </>
      ) : null}

      <Button
        onPress={() => console.log('Navigate to the review screen')}
        style={styles.defaultMarginVertical}>
        Give a Review
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  defaultMarginVertical: { marginVertical: 10 },
  flatListMargin: { marginBottom: 50 },
});
