import { Text, Button } from '@ui-kitten/components';
import { View, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import LottieView from 'lottie-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation';
import { Screen } from 'components/Screen';
import { Row } from 'components/Row';
import { theme } from 'theme';
import { properties } from 'data/properties';
import { Card } from 'components/Card';
import { Property } from 'types/property';
import { SignUpAndSignInButtons } from 'components/SignUpAndSignInButton';
import { useAuth } from 'hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

export const SavedScreen = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { user } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const likedProperties = properties;
  const contactedProperties = undefined;
  const applicationProperties = undefined;

  const getButtonAppearance = (buttonIndex: number) => {
    if (activeIndex === buttonIndex) return 'filled';
    return 'ghost';
  };

  const handleButtonPress = (index: number) => {
    setActiveIndex(index);
  };

  const getBodyText = (heading: string, subHeading: string) => {
    return (
      <View style={styles.textContainer}>
        <Text category={'h6'} style={styles.text}>
          {heading}
        </Text>
        <Text appearance={'hint'} style={[styles.text, styles.subHeading]}>
          {subHeading}
        </Text>
      </View>
    );
  };

  const getPropertiesFlatList = (properties: Property[]) => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={properties}
        style={{ marginTop: 10 }}
        renderItem={({ item }) => (
          <Card
            property={item}
            style={styles.card}
            onPress={() => navigation.navigate('PropertyDetails', { propertyID: item.ID })}
          />
        )}
        keyExtractor={(item) => item.ID.toString()}
      />
    );
  };

  const getBody = () => {
    if (activeIndex === 0) {
      if (likedProperties) return getPropertiesFlatList(likedProperties);
      return (
        <>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require('../assets/lotties/Fav.json')}
          />
          {getBodyText(
            'You do not have any favorites saved',
            'Tap the heart icon on properties to add favorites'
          )}
          {!user && <SignUpAndSignInButtons style={styles.signInAndSignUpButtonContainer} />}
        </>
      );
    }
    if (activeIndex === 1) {
      if (contactedProperties) return getPropertiesFlatList(contactedProperties);
      return (
        <>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require('../assets/lotties/Contacted.json')}
          />
          {getBodyText(
            'You have not contacted any properties yet',
            'Your contacted properties will show here'
          )}
          {!user && <SignUpAndSignInButtons style={styles.signInAndSignUpButtonContainer} />}
        </>
      );
    }
    if (activeIndex === 2) {
      if (applicationProperties) return getPropertiesFlatList(applicationProperties);
      return (
        <>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require('../assets/lotties/Appli.json')}
          />
          {getBodyText(
            'Check the status of your rental applications here',
            'Any properties that you have applied to will show here'
          )}
          {!user && <SignUpAndSignInButtons style={styles.signInAndSignUpButtonContainer} />}
        </>
      );
    }
  };

  return (
    <Screen>
      <Row style={styles.buttonContainer}>
        <Button
          style={[styles.button, styles.favoritesButton]}
          size={'small'}
          appearance={getButtonAppearance(0)}
          onPress={() => handleButtonPress(0)}>
          Favroites
        </Button>
        <Button
          style={[styles.button, styles.contactedButton]}
          size={'small'}
          appearance={getButtonAppearance(1)}
          onPress={() => handleButtonPress(1)}>
          Contacted
        </Button>
        <Button
          style={[styles.button, styles.applicationButton]}
          size={'small'}
          appearance={getButtonAppearance(2)}
          onPress={() => handleButtonPress(2)}>
          Application
        </Button>
      </Row>
      <View style={styles.container}>{getBody()}</View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    borderRadius: 5,
  },
  button: {
    width: '33.3%',
    borderRadius: 0,
    borderColor: theme['color-primary-500'],
  },
  applicationButton: { borderTopRightRadius: 5, borderBottomRightRadius: 5 },
  favoritesButton: { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 },
  contactedButton: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  container: { flex: 1, justifyContent: 'center' },
  lottie: {
    height: 180,
    width: 180,
    marginBottom: 20,
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
  },
  textContainer: {
    marginVertical: 15,
  },
  subHeading: {
    marginTop: 10,
  },
  signInAndSignUpButtonContainer: {
    marginTop: 15,
  },
  card: { marginVertical: 10 },
});
