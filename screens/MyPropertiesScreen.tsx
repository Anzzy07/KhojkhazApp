import { StyleSheet, FlatList, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation';
import axios from 'axios';

import { Screen } from 'components/Screen';
import { useAuth } from 'hooks/useAuth';
import { SignUpOrSignInScreen } from './SignUpOrSignInScreen';
import { Property } from 'types/property';
import { endpoints } from '../constants';
import { Loading } from 'components/loading';
import { Card } from 'components/Card';

export const MyPropertiesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const properties = useQuery('myproperties', async () => {
    if (user) return axios.get<Property[]>(`${endpoints.getPropertiesByUserID}${user.ID}`);
  });

  if (!user) return <SignUpOrSignInScreen />;

  if (properties.isLoading || properties.isFetching) return <Loading />;

  return (
    <Screen>
      {properties.data?.data && properties.data?.data.length > 0 ? (
        <FlatList
          data={properties.data.data}
          renderItem={({ item }) => <Card property={item} myProperty />}
        />
      ) : (
        <Text>My Property Screen</Text>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({});
