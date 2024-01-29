import React from 'react'; // Ensure React is imported
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Button } from '@ui-kitten/components';
import { theme } from 'theme';

export const SignUpAndSignInButtons = ({ style }: { style?: ViewStyle }) => (
  <View style={style}>
    <Button onPress={() => console.log('navigate to signIn')}>Sign In</Button>
    <Button appearance={'ghost'} style={styles.signUpButton} onPress={() => console.log('SignUp')}>
      Create Account
    </Button>
  </View>
);

const styles = StyleSheet.create({
  signUpButton: {
    marginVertical: 10,
    borderColor: theme['color-primary-500'],
  },
});
