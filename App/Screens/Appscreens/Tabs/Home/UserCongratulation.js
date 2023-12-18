import { ImageBackground, StyleSheet, Text, View, Image, Alert, BackHandler, Platform } from 'react-native'
import React, { useCallback, } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Button from '../../../../Components/Button'
import { style } from '../../../../Constants'
import Subheader from '../../../../Components/Subheader'
import { SetMilestone, SetMilestoneRefresh, SetQcounterRefres, SetRepeateIndexData } from '../../../../Redux/actions/appactions/Index'
const back = require("../../../../Assets/bgg.png")
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, CommonActions } from '@react-navigation/native';
const UserCongratulation = ({ route }) => {
  const { id, res } = route?.params;
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { user, milestone } = useSelector(({ appReducer }) => appReducer);

  const handleGoBack = useCallback(() => {
    // custom logic here
    Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => navigation.navigate("Tab") },
    ]);
    return true; // Returning true from onBackPress denotes that we have handled the event
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleGoBack);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
    }, [handleGoBack]))


  const goBackSafe = () => {
    setTimeout(() => {
      if (Platform.OS == "ios") {
        navigation.navigate("Questionscreen", { id, res });
      } else {
        navigation.goBack()
      }

    }, 1000);

    // const navigation = navigation;
    // let canGoBack = navigation.canGoBack();
    // console.log("check goback",canGoBack)

    // return canGoBack ? navigation.goBack() : navigation.replace('MainHome');
  };
  return (
    <ImageBackground source={back} style={styles.container}>
      <View style={{ margin: 10 }}>
        {/* <Subheader navigation={navigation} /> */}
      </View>

      <View style={{ flex: 4.5, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.txt1}>Congratulation</Text>
          <Text style={[styles.txt2, { marginTop: '2%' }]}>{milestone == 4 ? "You reached your first milestone" : milestone == 6 ? "You reached to your second milestone" : milestone == 9 ? "You reached to your third milestone" : ""}</Text>
          <View style={styles.ammountView}>
            {/* <Image source={require("../../../../Assets/4.png")} style={{ height: 35, width: 35, resizeMode: 'contain' }} /> */}
            <Text style={{ fontSize: 20, color: style.yellow, fontFamily: style.Bold }}>{milestone == 4 ? "$ 1000" : milestone == 6 ? "$ 15000" : milestone == 5 ? "$ 1000" : milestone == 6 ? "$ 15000" : milestone == 7 ? "$ 15000" : milestone == 8 ? "15000" : milestone == 9 ? "$ 30000" : milestone == 10 ? "$ 30000" : milestone == 11 ? "$ 30000" : milestone == 12 ? "$ 50000" : 0}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1.5, justifyContent: 'center', }}>
        <View>
          <View style={{
            height: 60, backgroundColor: '#ffa800',
            marginTop: 12,
            opacity: .1, width: '80%', alignSelf: 'center', borderRadius: 30
          }} />
          <Button title={"Go to Next Round"}
            onPress={() => {
              goBackSafe()
              // navigation.goBack(null)
              // navigation.navigate("Questionscreen")


              // SetRepeateIndexData(null)(dispatch)
              // SetMilestone(1)(dispatch)
              // SetMilestoneRefresh(1)(dispatch)
              // SetQcounterRefres(1)(dispatch)

            }}
            textstyle={{
              color: style.yellow
            }}
            btnstyle={{
              position: 'absolute',
              top: milestone == 12 ? 0 : 0,
              backgroundColor: null,
              borderWidth: 1,
              borderRadius: 30,
              height: 60,

              borderColor: style.yellow
            }} />
        </View>

        <View>
          <View style={{ marginTop: 10 }}>
            {milestone == 12 ? <View style={{
              height: 60,
              backgroundColor: '#ffa800',
              // marginTop: 30,
              marginTop: 12,

              opacity: .1, width: '80%', alignSelf: 'center', borderRadius: 30
            }} /> : null}
            {milestone == 12 ? <Button
              title={"Cash Out"}
              onPress={() => {
                // navigation.goBack()
                navigation.navigate("Bankdetailscreen", {
                  cash: milestone == 4 ? "1000" : milestone == 6 ? "15000" : milestone == 5 ? "1000" : milestone == 6 ? "15000" : milestone == 7 ? "15000" : milestone == 8 ? "15000" : milestone == 9 ? "30000" : milestone == 10 ? "30000" : milestone == 11 ? "30000" : milestone == 12 ? "50000" : 0
                })
              }
              }
              textstyle={{
                color: style.yellow
              }}
              btnstyle={{
                position: 'absolute',
                backgroundColor: null,
                borderWidth: 1,
                //marginTop: 27,
                height: 60,

                borderRadius: 30,
                top: 0,
                // bottom: 2,
                borderColor: style.yellow
              }} /> : null}
          </View>

        </View>





      </View>
    </ImageBackground>
  )
}

export default UserCongratulation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  ammountView: {
    height: 50, backgroundColor: 'black',
    borderColor: style.yellow,
    borderWidth: 1,
    paddingHorizontal: 16,

    // width: 180,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: 'row',

    borderRadius: 50
  },
  txt1: {
    fontSize: 35,
    color: style.btnColor,
    fontFamily: style.SemiBold
  },
  txt2: {
    fontSize: 24,
    width: 250,
    textAlign: 'center',
    color: style.white,
    fontFamily: style.Medium
  },
})