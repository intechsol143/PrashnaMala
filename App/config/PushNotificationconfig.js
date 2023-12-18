import PushNotification from 'react-native-push-notification';
import * as RootNavigation from './RootNavigationservice';
// import {Store} from '../redux/config/Index';
import {Store} from '../redux/config/Index'

const PushNotificationsConfigs = {

  
  congigurations: () => {
    // const res = Store.getState().USER.user

    // console.log("resssss",res)
    PushNotification.configure({
      onNotification: notification => {
        const clicked = notification.userInteraction;
        console.log("clickeeeeee",clicked)
        if(clicked){
          RootNavigation.navigate("AppNav")
        }
        // if (clicked) {
        //   if (notification.data.store_id) {
        //     RootNavigation.navigate2('Orderdetail', {
        //       Id: notification.data.store_id,
        //       is_complete: notification.data.is_completed,
        //       appointment_Id: notification.data.appointment_id,
        //     });
        //   }
        // }
        // if (notification.data.user_rating) {
        //   RootNavigation.navigate('Tabs', {
        //     type: 'Navigate',
        //     screen: 'NewOrders',
        //     params: {type: notification.data.user_rating},
        //   });
        // }
      },
      onAction: notification => {},
      onRegistrationError: err => {},
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: false,
    });
  },
};
export default PushNotificationsConfigs;
