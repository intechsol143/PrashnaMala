import { StyleSheet, Text, View, ImageBackground, FlatList, ScrollView, Alert, RefreshControl, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import Deals from '../../../../Components/ShopComp/Deals'
import { style } from '../../../../Constants'
import ModalBox from '../../../../Components/ModalBox'
import { confirmPayment, Payment, ShopTab } from '../../../../Utils/Apis'
import { useSelector } from 'react-redux'
import Loader from '../../../../Components/Loader'
import Modal from "react-native-modal";
import Button from '../../../../Components/Button'
import {
  useStripe,
  PlatformPayButton,
  isPlatformPaySupported,
  confirmPlatformPayPayment,
  PlatformPay,

} from '@stripe/stripe-react-native';
const bgImg = require("../../../../Assets/bgg.png")
const Index = ({ navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [handleModal, SethandleModal] = useState(false)
  const { user, checkPayment } = useSelector(({ appReducer }) => appReducer);
  const [todaysArray, settodaysArr] = useState([])
  const [coinsPack, setcoinsPack] = useState([])
  const [treasureBox, settreasureBox] = useState([])
  const [citiesList, setCitiesList] = useState([])
  const [loading, setloading] = useState(false)
  const [isrefresh, setisrefresh] = useState(false)
  const [tyPe, settyPe] = useState("")
  const [coinsId, setcoinsId] = useState("")
  const apiToken = user.token
  const [isApplePaySupported, setIsApplePaySupported] = useState(false);


  useEffect(() => {
    (async function () {
      setIsApplePaySupported(await isPlatformPaySupported());
    })();
  }, [isPlatformPaySupported]);

  const pay = async res => {
    const tot = await String(parseInt(price) * qty);
    const clientSecret = res.clientSecret;
    const { error } = await confirmPlatformPayPayment(clientSecret, {
      applePay: {
        cartItems: [
          {
            label: 'Buying Ticket',
            amount: tot,
            paymentType: PlatformPay.PaymentType.Immediate,
          },
        ],
        merchantCountryCode: 'US',
        currencyCode: 'USD',
      },
    });
    if (error) {
      console.log(JSON.stringify(error));
    } else {
      Alert.alert('Success', 'Check the logs for payment intent details.');
    }
  };
  const _applePay = id => {
    const data = new FormData();
    data.append('ticket_id', id);
    PaymentApple({ data, userToken })
      .then(responce => {
        if (responce.status === 'success') {
          pay(responce);
          // console.log('****************', responce);
        }
      })
      .catch(error => {
        console.log('err', error.response.data.message);
      });
  };

  useEffect(() => {
    _getShopData();
  }, [navigation])
  const _getShopData = () => {
    setloading(true)
    // { a == "1" ? setisrefresh(true) : setloading(true) }
    ShopTab(apiToken).then((responce) => {

      setloading(false)
      setisrefresh(false)
      settodaysArr(responce.today_deal)
      setcoinsPack(responce.shop_data)
      settreasureBox(responce.treasure_box)
      setCitiesList(responce.classic_cities)
    }).catch((error) => {
      console.log("eroorrrrrrr-----", error.response)
      // alert('fun call',JSON.stringify(error))

      setisrefresh(false)
      setloading(false)
    })
  }

  const _payment = () => {
    const userdata = new FormData();
    userdata.append("id", coinsId)
    userdata.append("type", tyPe)
    Payment({ userdata, apiToken }).then((responce) => {
      SethandleModal(false)
      initializePaymentSheet(responce)
    }).catch((error) => {
      console.log("Error", error)
    })
  }

  const _confirmPayment = (res) => {
    const userdata = new FormData();
    userdata.append('id', coinsId);
    userdata.append('payment_intent_id', res.payment_intent_id);
    userdata.append("type", tyPe)
    userdata.append("customer_id", res.customer)
    confirmPayment({ userdata, apiToken }).then((responce) => {
      if (responce.status == "success") {
        Alert.alert(
          "Congratulation!",
          "Your payment has been added successfuly",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("Ok") }
          ]
        );
      }
    }).catch((err) => {
      console.log("errror", err.response)
    })
  };

  const initializePaymentSheet = async (responce) => {
    const { error } = await initPaymentSheet({
      customerId: responce.customer,
      customerEphemeralKeySecret: responce.ephemeralKey,
      paymentIntentClientSecret: responce.paymentIntent,
      merchantDisplayName: 'PrashnamalKey',
      allowsDelayedPaymentMethods: true,
      style: 'alwaysLight',
    })
    if (!error) {
      openPaymentSheet(responce);
    }
  };

  const openPaymentSheet = async (responce) => {
    console.log("on Paymen sheet", responce)
    const { error } = await presentPaymentSheet();
    if (error) {
      // setIsError(true);
    } else {
      _confirmPayment(responce)
      // setIsPaid(true);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {loading ? <Loader /> : <ImageBackground source={bgImg} style={styles.container}>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          refreshControl={
            <RefreshControl refreshing={isrefresh} onRefresh={() => _getShopData("1")} />
          }
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={{ marginTop: "2.5%" }}>
              <Text style={[styles.ttTxt, { paddingLeft: 4 }]}>Shop</Text>
              <View style={{
                flexDirection: 'row',
                marginTop: '5%',
                paddingHorizontal: 6,
                alignItems: 'center', justifyContent: 'space-between'
              }}>
                <Text style={styles.ttTxt}>Today's Deal</Text>
                <Text style={[styles.ttTxt, { color: style.yellow, fontSize: 14, fontFamily: style.SemiBold }]}>3h 55m</Text>
              </View>
              <View style={{ height: 20 }} />
              <FlatList
                numColumns={3}

                data={todaysArray}
                renderItem={({ item }) => (
                  <Deals
                    item={item}
                    price={true}
                    handleModal={() => {
                      SethandleModal(true)

                    }}
                  />

                )}
              />
              <View style={{ marginTop: "7%" }}>
                <Text style={styles.ttTxt}>Coins Pack</Text>
                <View style={{ height: 10 }} />
                <FlatList
                  numColumns={3}
                  data={coinsPack}
                  coinPack={'coinPack'}
                  contentContainerStyle={{ bottom: 0 }}
                  renderItem={({ item }) => {
                    return (
                      <Deals item={item}
                        handleModal={() => {
                          SethandleModal(true)
                          settyPe("coin")
                          setcoinsId(item.id)

                        }}
                      />
                    )
                  }}
                />
              </View>
              <View style={{ marginTop: "7%" }}>
                <Text style={styles.ttTxt}>Treasure Box</Text>
                <View style={{ height: 5 }} />
                <FlatList
                  numColumns={3}
                  data={treasureBox}
                  renderItem={({ item }) => {
                    return (
                      <Deals item={item}
                        treasure={true}
                        handleModal={() => {
                          SethandleModal(true)
                          settyPe("treasure")
                          setcoinsId(item.id)
                        }}
                      />
                    )
                  }}
                />
              </View>
              <View style={{ marginTop: "6%" }}>
                <Text style={styles.ttTxt}>Cities Unlock</Text>
                <View style={{ height: 10 }} />
                <FlatList
                  numColumns={2}
                  contentContainerStyle={{ paddingBottom: 80 }}
                  data={citiesList}
                  renderItem={({ item }) => {
                    return (
                      <Deals
                        item={item}
                        cities={true}
                        handleModal={() => SethandleModal(true)}
                      />
                    )
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>}
      <View>
        <Modal
          style={{
            margin: 0,
            paddingHorizontal: 24,
            backgroundColor: 'rgba(0,0,0,.4)'
          }}
          isVisible={handleModal}>
          <View style={styles.modalContainer}>
            <View style={styles.paymentCard}>
              <Text style={styles.txt}>Are you sure you want to buy?</Text>
              <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                <Button
                  onPress={() => SethandleModal(false)}
                  title={"NO"}
                  textstyle={{ color: '#979797' }}
                  btnstyle={{ width: 100, height: 40, backgroundColor: 'lightgrey' }} />
                <Button onPress={() => {
                  if (Platform.OS == "android") {
                    _payment()
                  } else {
                    _applePay(coinsId)
                  }

                  // SethandleModal(false)
                  // handleModal(!handlemodal)
                  // Alert.alert(
                  //   "Are you sure",
                  //   "Payment will be called from there sdk so wait plz?",
                  //   [
                  //     {
                  //       text: "Cancel",
                  //       onPress: () => console.log("Cancel Pressed"),
                  //       style: "cancel"
                  //     },
                  //     { text: "OK", onPress: () => console.log("ok") }
                  //   ]
                  // )
                }} title={"Yes"} btnstyle={{ width: 100, height: 40, }} />
              </View>
            </View>
          </View>
        </Modal>
        {/* <ModalBox
          testL={true}
          handlemodal={handleModal}
          handleModal={() => _handleModalFun("1")} /> */}
      </View>

    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6
  },
  ttTxt: {
    color: '#fff',
    fontSize: 16,
    fontFamily: style.SemiBold
  },
  paymentCard: {
    height: 200, backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', borderRadius: 15
  },
  paymentCard1: {
    height: 270,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 15
  },
  modalContainer: {
    flex: 1,
    // backgroundColor:'rgba(1,0,1,.7)',
    // opacity:.2,
    justifyContent: 'center'
  },
  txt: {
    color: 'black',
    fontSize: 18,
    width: 200,
    textAlign: 'center',

    fontFamily: style.Bold
  },
})