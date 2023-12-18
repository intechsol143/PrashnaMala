import {
  FlatList,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import React, {
  useEffect,
  useCallback,
  useState,
  useRef
} from 'react'
import Header from '../../../../Components/Header'
import Coins from '../../../../Components/Coins'
import Tournaments from '../../../../Components/Tournaments'
import LeagueStatus from '../../../../Components/LeagueStatus'
const bgImg = require("../../../../Assets/bg1.png")
import Swiper from 'react-native-swiper'
import { style } from '../../../../Constants'
import Claims from '../../../../Components/Claims'
import { SetQcounterRefres, SetMilestoneRefresh, SetQues, SetRepeateIndexData, SetTitles, SetTooclose, SetUser, SetQcounter, SetMyTotalQues, SetRefCode, SetTournamentLooser, SetTournamentWinner, SetBox, SetStop, SetCorectCount, SetLoginuserPoints, SetOperantPoints, SetCurrentTime, SetPaymentActive } from '../../../../Redux/actions/appactions/Index'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserStatus, checkPaymentActivness, setWinnerTournamentRank, _addReward, _checkExistingUsers, _home } from '../../../../Utils/Apis'
import Loader from '../../../../Components/Loader'
import Modal from "react-native-modal";
import Video from 'react-native-video';
import moment from 'moment'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging';

import {
  RewardedAd,
  TestIds,
  MobileAds,
  RewardedAdEventType
} from 'react-native-google-mobile-ads';


// const adUnitId2 = "ca-app-pub-1579810093221435/9744080388";
const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-3940256099942544/1712485313';




const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});



const Index = ({ navigation }) => {
  const dispatch = useDispatch();
  const { width } = Dimensions.get("screen");

  const { user } = useSelector(({ appReducer }) => appReducer);
  const [TournmentsData, setTournamentsData] = useState([])
  const [myLeaguse, setmyLeagues] = useState([])
  const [loader, setloader] = useState(false)
  const [refreshPage, setrefreshPage] = useState(false)
  const [rewards, setrewards] = useState([])
  const [mystryBox, setmystryBox] = useState([])
  const [loaded, setLoaded] = useState(false);
  const [saveRewardType, setsaveRewardType] = useState("")
  const [saveRewarewardeId, setsaveRewarewardeId] = useState()
  const [handleModal, sethandleModal] = useState(false)
  const fadIn = new Animated.Value(0)
  const springValue = new Animated.Value(0.47)
  const fadeValue = new Animated.Value(1)
  const [dis, setdisabled] = useState(false)
  const [usercoins, serusercoins] = useState(0)
  const [currentDate, setCurrentDate] = useState('');

  const [tabType, settanType] = useState("")
  // let date = new Date();

  // let hours = date.getHours();
  // let minutes = date.getMinutes();
  // let seconds = date.getSeconds();
  // setCurrentDate(hours + ':' + minutes + ':' + seconds);

  useEffect(() => {
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    setCurrentDate(
      hours + ':' + min + ':' + sec
    );
  }, []);


  const [timer, setTimer] = useState();
  var serverExpiryDate = "'the time the event will expire gotten from server";
  var currentTimeAtServer = "the time you got from server via api";

  var currentTimeAtDevice = new Date().getTime();
  const timeOffset = currentTimeAtServer - currentTimeAtDevice;
  //timeOffset is the time difference between the user's clock and the server clock. Calculated when user received response from server.

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(() => {
        let endT = new Date(serverExpiryDate).getTime(); //time from server;
        let nowT = new Date().getTime(); //current time on user've device
        nowT = nowT + timeOffset; //VERY IMPORTANT, helps to sync user's time with server.
        let remaining = endT >= nowT ? Math.floor((endT - nowT) / 1000) : 0;
        let stopCheck = remaining === 0 ? clearInterval(interval) : null;
        return remaining;
      });
    }, 1000); //each count lasts for a second
    return () => {
      clearInterval(interval);
    };
  }, []);


  //Check reward ad

  //  useEffect(() => {
  //   const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
  //     setLoaded(true);
  //     rewarded.show()
  //   });
  //   const unsubscribeEarned = rewarded.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     reward => {
  //       console.log('User earned reward of ', reward);
  //     },
  //   );

  //   rewarded.load();
  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeEarned();
  //   };
  // }, []);

  // if (!loaded) {
  //   return null; 
  // }



  //check reward end
  const showAd = () => {
    const rewarded = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });

    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewarded.show();
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log("Callback called!", reward);
      },
    );

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }
  const showRewardedAds = async () => {
    try {
      const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
        setLoaded(true);
        rewarded.show()
      });
      // let rewarded = RewardedAd.createForAdRequest(adUnitId, {
      //   requestNonPersonalizedAdsOnly: true,
      //   keywords: ['fashion', 'clothing'],
      // });
      const unsubscribeEarned = rewarded.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => {
          console.log('User earned reward of ', reward);
        },
      );
      rewarded.show();
      return () => {
        unsubscribeLoaded();
        unsubscribeEarned();
      };

    } catch (error) {
      console.log("Errorr", error)
    }

    // let interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    //   requestNonPersonalizedAdsOnly: true,
    //   keywords: ['fashion', 'clothing'],
    // });
    // interstitial.addAdEventListener(AdEventType.LOADED, () => {
    //   interstitial.show();
    // });
    // interstitial.load();
    // return () => {
    //   interstitialListener = null;
    // };
  }
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      settanType(e.type)
      // Prevent default behavior
      // e.preventDefault();

      // Do something manually
      // ...
    });

    return unsubscribe;
  }, [tabType]);



  // No advert ready to show yet

  const _checkUsers = () => {
    _checkExistingUsers(apiToken).then((responce) => {
    }).catch((error) => {
      if (error) {
        SetUser(null)(dispatch)
      }
    })
  }
  const apiToken = user.token
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _checkUsers();
      SetRepeateIndexData(null)(dispatch)
      _getUserStatus();
      SetRefCode("")(dispatch)
      SetTournamentLooser("")(dispatch)
      SetTournamentWinner("")(dispatch)
      SetMyTotalQues(0)(dispatch)
      SetBox(false)(dispatch)
      SetStop("")(dispatch)
      SetCorectCount(0)(dispatch)
      // SetQcounter(0)(dispatch)
      SetQues(null)(dispatch)

      SetLoginuserPoints(0)(dispatch)
      SetOperantPoints(0)(dispatch)
      SetStop("")(dispatch)
      // SetCurrentTime(0)(dispatch)
      _homeData(apiToken)
      _checkPayment();

    });
    return unsubscribe;
  }, [navigation]);

  




  useEffect(() => {
    // if (repeatIndex == questionsList?.classic_questions.length) {
    // SetRepeateIndexData(null)(dispatch)
    // SetQues(null)(dispatch)
    // }
    // if (repeatIndex == questionsList?.classic_questions.length) {
    // SetRepeateIndexData(null)(dispatch)
    // SetQues(null)(dispatch)
    //  } 

    SetTooclose(null)(dispatch)
    SetTitles(null)(dispatch)
    _homeData(apiToken)
    getToken()
  }, [navigation])


  //   React.useEffect(() => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //     // Do something when the screen blurs
  //     SetRepeateIndexData(null)(dispatch)
  //     SetQues(null)(dispatch)
  //   });

  //   return unsubscribe;
  // }, [navigation]);






  const _homeData = (apiToken) => {
    setloader(true)
    _home(apiToken).then((responce) => {
      serusercoins(responce.user_coin)
      setloader(false)
      if (responce) {
        setTournamentsData(responce.box_games)
        setmyLeagues(responce.league_games)
        setrewards(responce.video_reward)
        setmystryBox(responce.treasure_box)
      }
    }).catch((error) => {
      setloader(false)
    })
  }

  const _refreshHomescreenData = (apiToken) => {
    setrefreshPage(true)
    _home(apiToken).then((responce) => {
      setrefreshPage(false)
      if (responce) {
        setTournamentsData(responce.box_games)
        setmyLeagues(responce.league_games)
      }
    }).catch((error) => {
      setrefreshPage(false)

    })
  }

  const showRewarded = async () => {
    const rewarded = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: false
    });
    var loaded = false;
    var gotReward = false;
    const eventListener = rewarded.onAdEvent((type, error, reward) => {
      if(type === RewardedAdEventType.LOADED) {
        rewarded.show();
        loaded = true;
      }
      else if(type === RewardedAdEventType.EARNED_REWARD) {
        gotReward = true;
      }
      else if(error) {
        console.warn(error);
      }
    }); 
    rewarded.load();
    while(!loaded) {
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    }
    return gotReward;
  }


  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
  //       interstitial.show();
  //   });
  //   // Start loading the interstitial straight away
  //   interstitial.load();
  //   // Unsubscribe from events on unmount
  //   return unsubscribe;
  // }, []);




  // useEffect(() => {
  //   const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
  //     setLoaded(true);
  //     rewarded.show();

  //   });
  //   const unsubscribeEarned = rewarded.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     reward => {
  //       if (saveRewardType === "mystery") {
  //         alert("Need to show Box")
  //         // _saveAdReward(saveRewarewardeId)
  //       } else {
  //         // _saveAdReward(saveRewarewardeId)
  //       }
  //       rewarded.load();
  //     },
  //   );
  //   rewarded.load();
  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeEarned();
  //   };
  // }, [saveRewarewardeId]);


  const _saveAdReward = (id) => {

    Alert.alert(
      "Sorry",
      "We will implement this when we will get Ad ids.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => navigateToNextScreen() }
      ]
    );
    // const userdata = new FormData()
    // userdata.append("reward_video_id", id)
    // _addReward({ userdata, apiToken }).then((responce) => {
    //   console.log("response", responce)
    //   if (responce.status === "success") {
    //     setdisabled(true)
    //     setsaveRewarewardeId()
    //     let r = { ...user }
    //     r.userdata.coin = responce.coin
    //     SetUser(r)(dispatch)
    //     SetCoinsTime({
    //       time: currentTime,
    //       reduxId: id
    //     })(dispatch)

    //   }
    // }).catch((error) => {
    //   console.log("Error-------", error)
    // })

  }

  // useEffect(() => {
  //   let y = moment(new Date()).format("m")
  //   setCurrentTime(y)

  // }, []);



  const Funcall = (item) => {
    navigation.navigate("SelectGame", {
      id: item.id,
      questions: item.total_question
    })
    SetBox(true)(dispatch)
    SetMyTotalQues(item.total_question)(dispatch)
    SetTitles("LeaGue")(dispatch)
  }


  const _getUserStatus = () => {
    const userdata = new FormData();
    userdata.append("status", "inactive")
    changeUserStatus({ userdata, apiToken }).then((responce) => {
    }).catch((error) => {
      console.log("Erro", error)
    })

  }
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     console.log("Hellloooo")
  //     navigation.navigate("Testscreen")
  //   }, 10000);
  //   return () => clearInterval(intervalId);
  // }, []);






console.log("token",apiToken)

  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    if (fcmToken) {
      _updateToken(fcmToken);
    }
    messaging().onTokenRefresh(token => {
      _updateToken(token);
    });
  };
  const _updateToken = token => {
    const data = JSON.stringify({ fcm_token: token });
    fetch(`https://app.prashnamaala.com/api/update-fcm`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then(res => res.json())
      .then(res => {
        console.log("responce{{{{{{{",res)
      })
      .catch(e => {
        console.log("errrrr", e)
      });
  };



 

  const _checkPayment = () =>{
    checkPaymentActivness(apiToken).then((res)=>{
      SetPaymentActive(res.is_payment)(dispatch)

    }).catch((error)=>{
      console.log("Error",error)
    })
  }


  return (

    <ImageBackground source={bgImg} style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshPage}
            tintColor={"white"}
            progressBackgroundColor={'white'}
            onRefresh={_refreshHomescreenData}
          />
        }
        contentContainerStyle={{
          justifyContent: 'center',
          flexGrow: 1,
          paddingBottom: 60,
        }}>
        {loader && <Loader />}
        <View style={{ flex: 1, padding: 12 }}>
          <Header
            navigation={navigation}
            username={`${user.userdata.name}`}
            coins={usercoins}
            tTtalcoins={usercoins}
          />
          <View style={styles.horizontalView}>
            <FlatList
              data={rewards}
              contentContainerStyle={{ flexGrow: 1 }}
              // numColumns={2}
              horizontal={true}
              renderItem={({ item, index }) => {
                return (
                  <Coins
                    onPress={() => {
                      // rewarded.show();
                      // showRewarded()
                      sethandleModal(true)
                      setsaveRewardType(item.type)

                      // _saveAdReward(item.id)
                      // rewarded.show();
                      // showRewardedAds();

                      showAd()
                      // setdisabled(true)

                      // setsaveRewarewardeId(item.id)
                      // _start()
                    }}
                    dsb={dis}
                    opacity={fadeValue}
                    springVal={springValue}
                    item={item}
                    indx={index}
                    navigation={navigation}
                  />
                )
              }}

            />

          </View>
          <View style={[styles.horizontalView, { marginTop: 0 }]}>
            <FlatList
              data={TournmentsData}
              horizontal={true}
              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={({ item, index }) => {
                return (
                  <Tournaments
                    idx={index}
                    item={item}
                    navigation={navigation} />
                )
              }}
            />
          </View>
          <View style={styles.slider}>
            <Swiper
              activeDotStyle={styles.activedotsyle}
              dotStyle={styles.dotStyle}
              style={styles.wrapper}>
              {myLeaguse?.map((item) => {
                return (
                  <View style={styles.slideView}>
                    <LeagueStatus
                      item={item}
                      onPress={() => Funcall(item)}
                      navigation={navigation}
                    />
                  </View>
                )
              })}
            </Swiper>
          </View>
          <View style={{ marginTop: 0 }}>

          
            {mystryBox?.length > 0 ? <FlatList
              data={mystryBox}
              contentContainerStyle={{ flexGrow: 1 }}
              horizontal={true}
              renderItem={({ item, index }) => {
                console.log("check clain data", item)
                return (
                  <>
                    <Claims
                      idx={index}
                      item={item}
                      navigation={navigation} />
                  </>
                )
              }}

            /> :
              <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {["1", "2", "3"].map((i) => {
                  return (
                    <TouchableOpacity style={{ flex: 1, margin: 5 }}>
                      <View style={{
                        height: 170,
                        borderRadius: 15,
                        width: width * 0.30 - 5,
                        borderColor: 'red',
                        opacity: .2,
                        marginTop: 30,
                        backgroundColor: '#ec4137'
                      }}>
                      </View>
                      <View style={{
                        height: 170,
                        borderRadius: 15,
                        position: 'absolute',
                        width: width * 0.30 - 5,
                        borderColor: 'red',
                        marginTop: 30,
                        borderWidth: 1

                      }}>
                        {/* <View style={{ alignItems: 'center' }}>
                          <View style={{ position: 'absolute', bottom: -29 }}>
                            <ImageBackground
                              resizeMode='contain'
                              source={require("../../../../Assets/rc1.png")} style={{
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 80
                              }}>
                              <View style={{
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 80,
                              }}> 
                              </View>

                            </ImageBackground>
                          </View>
                        </View> */}

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 14, fontFamily: style.SemiBold, color: '#fff' }}>Free Slot</Text>
                          {/* <ImageBackground resizeMode='contain' source={require('../../../../Assets/sun.png')} style={{
                        height: 180,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 180,
                      }}>

                      </ImageBackground> */}
                        </View>

                      </View>
                    </TouchableOpacity>
                  )
                })}


              </ScrollView>
            }

          </View>
        </View>
      </ScrollView>
      {/* <Modal
        style={{
          margin: 0,
          paddingHorizontal: 24,
          backgroundColor: 'rgba(0,0,0,.4)'
        }}
        isVisible={handleModal}>
        <View style={{flex:1,
        backgroundColor:'red',
        marginTop:20,
     }}>



          <Video source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}

            controls={true}
            style={styles.backgroundVideo}
          />
        </View>
      </Modal> */}


    </ImageBackground>


  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalcontainer: {
    flex: 1,
    // alignItems:'center',
    justifyContent: 'center'
  },
  backgroundVideo: {
    height: 500,
    width: '100%'
    // position: 'absolute',
    // top: 0,
    // flex:1,
    // left: 0,
    // height:200,

    // bottom: 0,
    // right: 0
  },
  modalsubcontainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

    backgroundColor: 'grey'
  },
  cng: {
    fontSize: 16,
    fontFamily: style.Bold
  },
  cng2: {
    fontSize: 16,
    paddingVertical: 4,
    // top:4,
    fontFamily: style.Regular
  },
  playbtn: {
    height: 30, width: 80,
    borderRadius: 40,
    marginTop: 5,
    borderColor: '#fff',
    backgroundColor: 'grey',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgS: {
    height: 90,
  },
  dotStyle: {
    top: 40,

    backgroundColor: 'grey'
  },
  activedotsyle: {
    top: 40,
    width: 15,
    backgroundColor: style.btnColor
  },
  txt: {
    color: '#fff',
    fontFamily: style.SemiBold
  },
  slideView: {
    height: 200,
    width: '100%',
    padding: 4
  },
  horizontalView: {
    marginTop: "10%",

    flexDirection: 'row'
  },
  slider: {
    height: 100,
    marginTop: '5%',
    flexDirection: 'row',
  },
  fadingContainer: {
    height: 50,
    backgroundColor: 'blue'
  }

})






// import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
// import React, { useState } from 'react'
// import CheckBox from '@react-native-community/checkbox';
// const Index = () => {

//   const [inp, setinp] = useState('')
//   const [toggleCheckBox, setToggleCheckBox] = useState(false)
//   const [data, setdata] = useState([])
//   const [id, setid] = useState(-1)
//   const [ids, setids] = useState([])
//   const [multipletest, setmultipleTest] = React.useState([]);
//   // const showData = (a) => {
//   //   setdata([...data, a])
//   // }

//   const add = (crypto) => {
//     if (crypto) {
//       console.log("cryptio", crypto, Math.round(0.9))

//     }
//     // let newData = [...multipletest];
//     // newData.push(crypto.id);
//     // setmultipleTest(newData);
//   }

//   console.log("data", data)
//   return (
//     <View>
//       <View style={{
//         flexDirection: 'row',
//         padding: 12,
//         alignItems: 'center'
//       }}>
//         <TextInput
//           value={inp}
//           placeholder="Type here..."
//           style={{ borderWidth: 1, width: "80%" }}
//           onChangeText={(txt) => setinp(txt)}
//         />
//         <TouchableOpacity onPress={() => {
//           add(inp)
//         }} style={{
//           height: 40, width: 40,
//           marginLeft: 10,
//           backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'
//         }}>
//           <Text style={{ fontSize: 20, color: 'green' }}>+</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={{ paddingLeft: 12 }}>
//         {data.map((item, index) => {
//           return (
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <CheckBox
//                 // disabled={false}
//                 value={id == index ? true : false}
//                 onValueChange={(newValue) => {
//                   setToggleCheckBox(newValue)
//                   setid(index)
//                 }}
//               />
//               <Text style={{ color: 'black' }}>{item}</Text>
//             </View>
//           )
//         })}
//       </View>

//     </View>
//   )
// }

// export default Index

// const styles = StyleSheet.create({})