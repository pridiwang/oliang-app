import React from 'react';
import {View,Text,Image,StyleSheet,TouchableHighlight}  from 'react-native';
import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = 'https://oliang.itban.com/users/push-token';

async function registerForPushNotificationsAsync() {
  console.log('registerForPushNotificationsAsync');
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log('push token'+token);
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        username: 'Brent',
      },
    }),
  });
}
export default class Noti extends React.Component{
    render(){

      registerForPushNotificationsAsync();
        return (
            <View >
                <Text>Noti token  </Text>
            </View>
        )
    }
} 