import PushNotification from 'react-native-push-notification';

export default class PushService {
  static init() {
    PushService.onRegistration = null;
    PushService.onNotification = null;
  }

  static setCallbacks(onRegistration, onNotification) {
    PushService.onRegistration = onRegistration;
    PushService.onNotification = onNotification;
  }

  static configure() {
    PushNotification.configure({
      onRegister: (device) => {
        if (PushService.onRegistration) {
          PushService.onRegistration(device);
        }
      },
      onNotification: (notification) => {
        if (PushService.onNotification) {
          PushService.onNotification(notification);
        }
      },
      requestPermissions: true,
    });
  }
}

PushService.init();