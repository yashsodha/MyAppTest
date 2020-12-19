import FCM, {FCMEvent, getInitialNotification} from "react-native-fcm";
import {Alert, alert } from 'react-native'
import PushNotification from 'react-native-push-notification';



export default class PushServiceAndroid {
  static init() {
    PushServiceAndroid.onRegistration = null;
  }

  static setCallbacks(onRegistration) {
    PushServiceAndroid.onRegistration = onRegistration;
  }

  static configure(){
    FCM.requestPermissions();
    FCM.getFCMToken()
    .then(token => console.log("token",token))
    FCM.getInitialNotification().then(notif => {

      console.log("notif",notif)
    //   if(notif.collapse_key === "com.justone"){
    //  }
    })
    FCM.on(FCMEvent.Notification, notif => {

      console.log("notif1212",notif)

      // PushNotification.onNotification(notif);


      // Alert.alert(
      //   'Alert Title',
      //   'My Alert Msg',
      //   [
      //     {
      //       text: "hello",
      //       onPress: () => console.log('Ask me later pressed')
      //     },
      //     {
      //       text: 'Cancel',
      //       onPress: () => console.log('Cancel Pressed'),
      //       style: 'cancel'
      //     },
      //     { text: 'OK', onPress: () => console.log('OK Pressed') }
      //   ],
      //   { cancelable: false }
      // );      

    })
    FCM.enableDirectChannel();
  }
}

