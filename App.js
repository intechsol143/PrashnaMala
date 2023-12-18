import { StyleSheet, Text, AppState, SafeAreaView,Platform} from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import ParentNav from './App/Navigator/ParentNav'
import { Provider } from 'react-redux';
import { Store, persistor } from './App/Redux/config/Index'
import { PersistGate } from 'redux-persist/integration/react';
import { checkPaymentActivness, _checkuserStatus } from './App/Utils/Apis';
import { useSelector } from 'react-redux'
import {StripeProvider} from '@stripe/stripe-react-native';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import messaging from '@react-native-firebase/messaging';

const App = () => {
  const appState = useRef(AppState.currentState);
  const { user } = Store.getState().appReducer;
  const apiToken = user?.token
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }
      appState.current = nextAppState;
      _checkUser_status(appState.current)
    });
    return () => {
      subscription.remove();
    };

  }, [apiToken]);


  const _checkUser_status = (stat) => {
    const userdata = new FormData()
    if (stat == "background") {
      userdata.append("status", "inactive")
    } else {
      userdata.append("status", "active")
    }
    _checkuserStatus({ userdata, apiToken }).then((responce) => {
      console.log("app responce",responce)
    }).catch((error) => {
      console.log("Error", error)
    })
  }
  useEffect(() => {
    Platform.OS == 'android' && _createChannel();
    const unsubscribe = messaging().onMessage(remoteMessage => {
      Platform.OS === 'ios' &&
        PushNotificationIOS.addNotificationRequest({
          id: new Date().toString(),
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          category: 'userAction',
          userInfo: remoteMessage.data,
        });
    });
    return unsubscribe;
  }, []);
  // useEffect(() => {
  //   Platform.OS == "android" && _createChannel();
  //   const unsubscribe = messaging().onMessage(remoteMessage => {
  //     Platform.OS == "ios" &&
  //         PushNotificationIOS.addNotificationRequest({
  //         id: new Date().toString(),
  //         title: remoteMessage.notification?.title,
  //         body: remoteMessage.notification?.body,
  //         category: 'userAction',
  //         userInfo: remoteMessage.data,
  //       });
       



  //   });
  //   return unsubscribe;
  // }, []);



 

  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel',
        channelName: 'fcm_fallback_notification_channel',
        channelDescription: 'A channel to categorise your notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      () => { },
    );
  };
 


  //Arish stripe test key
  const stripeKey = "pk_test_51JzZquCMLoAADlGOUCvB3k132Wkqf3YNUIpSB16v2zLa4pqsDlBkSpmUP9zbSWsKdXmrkhc9S9lY2LWWqLJND67e00Lxe7Pi1M"

  return (
    <StripeProvider publishableKey={stripeKey}>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <ParentNav />
        </SafeAreaView>
      </PersistGate>
    </Provider>
 </StripeProvider>
  )
}

export default App

const styles = StyleSheet.create({})