import { StyleSheet } from 'react-native';
import { Chat, MessageType, defaultTheme } from '@flyerhq/react-native-chat-ui';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@ui-kitten/components';

import { useUser } from '../hooks/useUser';
import { SignUpOrSignInScreen } from './SignUpOrSignInScreen';
import { theme } from '../theme';
import { useSelectedConversationQuery } from '../hooks/queries/useSelectedConversationQuery';
import { Loading } from '../components/loading';
import { useCreateMessageMutation } from '../hooks/mutations/useCreateMessageMutation';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation';

export const MessagesScreen = ({
  route,
}: {
  route: { params: { conversationID: number; recipientName: string } };
}) => {
  const title = route.params.recipientName.includes('%20')
    ? route.params.recipientName.replaceAll('%20', ' ')
    : route.params.recipientName.includes('%')
      ? route.params.recipientName.replaceAll('%', ' ')
      : route.params.recipientName;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  navigation.setOptions({
    title: title,
  });
  const { user } = useUser();
  const conversation = useSelectedConversationQuery(route.params.conversationID);
  const createMessage = useCreateMessageMutation();

  if (!user) return <SignUpOrSignInScreen />;
  if (conversation.isLoading) return <Loading />;

  if (!conversation.data) return <Text>... Unable to get chat</Text>;

  const handleSendPress = (message: MessageType.PartialText) => {
    if (conversation)
      createMessage.mutate({
        author: conversation.data.author,
        conversationID: conversation.data.ID,
        receiverID: conversation.data.receiverID,
        senderID: user.ID,
        text: message.text,
      });
  };

  return (
    <Chat
      messages={conversation.data.messages}
      onSendPress={handleSendPress}
      user={conversation.data.author}
      sendButtonVisibilityMode="always"
      //enableAnimation
      textInputProps={{
        style: styles.textInputProps,
      }}
      theme={{
        ...defaultTheme,
        colors: {
          ...defaultTheme.colors,
          primary: theme['color-primary-500'],
          secondary: theme['color-light-gray'],
          inputText: 'black',
          inputBackground: 'white',
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  textInputProps: {
    borderBottomColor: theme['color-gray'],
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});
