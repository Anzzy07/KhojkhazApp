import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchScreen } from '../screens/SearchScreen';
import { SavedScreen } from 'screens/SavedScreen';
import { AccountScreen } from 'screens/AccountScreen';
import { theme } from '../theme';
import { AccountSettingsScreen } from 'screens/AccountSettingsScreen';
import { AccountTabParamList } from 'navigation';
import { ConversationsScreen } from 'screens/ConversationsScreen';
import { MessagesScreen } from 'screens/MessagesScreen';

const Tab = createBottomTabNavigator();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={{
        tabBarActiveTintColor: theme['color-primary-500'],
      }}>
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="magnify" color={color} />,
        }}
      />

      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="heart-outline" color={color} />,
        }}
      />
      <Tab.Screen
        name="AccountRoot"
        component={AccountStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => <TabBarIcon name="account-circle-outline" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const AccountStackNavigator = createStackNavigator<AccountTabParamList>();
const AccountStack = () => (
  <AccountStackNavigator.Navigator initialRouteName="Account">
    <AccountStackNavigator.Screen
      name="Account"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <AccountStackNavigator.Screen
      name="Settings"
      component={AccountSettingsScreen}
      options={{
        headerTitle: 'Account Settings',
        headerBackTitle: 'Back',
      }}
    />
    <AccountStackNavigator.Screen
      name="Conversations"
      component={ConversationsScreen}
      options={{ headerTitle: 'Conversations', headerBackTitle: 'Back' }}
    />
    <AccountStackNavigator.Screen
      name="Messages"
      component={MessagesScreen}
      options={{
        headerBackTitle: 'Back',
      }}
    />
  </AccountStackNavigator.Navigator>
);
