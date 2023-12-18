import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { style } from '../../Constants'
import { useSelector } from 'react-redux'
const Todaydeals = ({ item, treasure, handleModal, price,
  coinPack,
  cities }) => {
  const { width } = Dimensions.get("screen");
  const { checkPayment } = useSelector(({ appReducer }) => appReducer);

  // console.log("item.deal_priceitem.deal_price",item.deal_price)

  return (
    <View style={{
      flex: 1,
      margin: 5,
    }}>
      <View style={{
        height: cities ? 220 : treasure ? 200 : 150,
        bottom: treasure ? 20 : 0,
        paddingBottom: 20,

      }}>
        {
          cities === true ? <TouchableOpacity
            disabled={!checkPayment ? true : false}
            style={{ marginVertical: 6 }}>
            <ImageBackground
              borderRadius={10}

              resizeMode='cover' source={{ uri: item.image }} style={{
                width: width * 0.45 - 5,
                opacity: .3,
                height: 200,
              }}>


            </ImageBackground>
            <View style={{
              height: 200,
              position: 'absolute',
              width: width * 0.45 - 5,
              alignItems: 'center', justifyContent: 'center'
            }}>
              <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require("../../Assets/lock.png")} style={{ height: 50, width: 50, resizeMode: 'contain' }} />
                <View style={[styles.btn, { justifyContent: 'center' }]}>
                  <Text style={[styles.tttext1, { color: '#fff' }]}>{"Unlock"}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 60, marginTop: 8 }}>
                  <Image source={require("../../Assets/4.png")} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                  <Text style={[styles.tttext, {
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: style.SemiBold
                  }]}>{item.cash_price}</Text>
                </View>

              </View>
            </View>
            <Text style={[styles.tttext1, { color: '#fff', textAlign: 'center', fontSize: 14 }]}>{item.description}</Text>

          </TouchableOpacity> :
            treasure === true ? (
              <TouchableOpacity 
              disabled={!checkPayment ? true : false}

              
              onPress={handleModal}>
                <View style={{ flex: 1, }}>
                  <View style={{
                    height: 130,
                    width: width * 0.4 - 45,
                    borderRadius: 15,
                    // width: '100%',
                    borderColor: 'red',
                    opacity: .1,
                    marginTop: 30,
                    backgroundColor: '#ec4137'
                  }}>

                  </View>
                  <View style={{
                    height: 130,
                    width: width * 0.4 - 45,
                    borderRadius: 15,
                    position: 'absolute',
                    // width: '100%',
                    borderColor: 'red',
                    marginTop: 30,
                    borderWidth: 1

                  }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <ImageBackground resizeMode='contain' source={require('../../Assets/sun.png')} style={{
                        height: 120,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 120,
                      }}>
                        <Image source={{ uri: item.image }} style={{ height: 60, width: 60, resizeMode: 'contain' }} />
                      </ImageBackground>
                    </View>
                    <View style={{
                      height: 25,
                      position: 'absolute',
                      bottom: 0,
                      borderBottomRightRadius: 15,
                      borderBottomLeftRadius: 15,
                      width: '100%',
                      backgroundColor: "#310005"
                    }}>
                      <View style={{
                        alignItems: 'center',
                        height: 25,
                        // backgroundColor:'green',
                        justifyContent: 'center'
                      }}>
                        <Text style={{
                          fontSize: 12,
                          color: '#fff',
                          paddingBottom: 4,
                          fontFamily: style.SemiBold
                        }}>{item.title}</Text>

                      </View>
                    </View>
                  </View>

                  <View style={[styles.btn, {
                    width: width * 0.4 - 45,
                    justifyContent: price ? "space-around" : 'center'
                  }]}>
                    <Text style={styles.tttext1}>USD {item.coin}</Text>

                  </View>
                </View>

              </TouchableOpacity>
            )

              : coinPack == "coinPack" ? <View>

                <View style={{
                  justifyContent: 'center',
                  alignItems: "center"
                }}>
                  <View style={{
                    height: 135,
                    borderWidth: 1,
                    borderColor: '#ffa800',
                    width: width * 0.4 - 45,
                    borderRadius: 15,
                    marginVertical: 10,
                    opacity: .2,
                    backgroundColor: '#d9d9d9'
                  }}>
                  </View>
                  <View style={{
                    height: 135,
                    borderWidth: 1,
                    borderColor: '#ffa800',
                    // width: 100,
                    width: width * 0.4 - 45,
                    borderRadius: 15,
                    marginVertical: 10,
                    position: 'absolute',

                  }}>

                    <TouchableOpacity
                     disabled={!checkPayment ? true : false}
                      onPress={handleModal}
                      style={styles.card}>
                      <Image source={{ uri: item.image }} style={styles.icnStyle} />
                      <Text style={styles.priceTxt}>{item.coin}</Text>
                      <View>
                        <View style={[styles.btn, {
                          width: width * 0.4 - 52,
                          justifyContent: price ? "space-around" : 'center'
                        }]}>
                          <Text style={styles.tttext1}>USD {item.price}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>


                  </View>

                </View>

                {/* coinsPack End */}
              </View> :
                // Todays deals Start........
                <View style={{
                  justifyContent: 'center',
                  alignItems: "center"
                }}>
                  <View style={{
                    height: 135,
                    borderWidth: 1,
                    borderColor: '#ffa800',
                    // width: 100,
                    width: width * 0.4 - 45,
                    borderRadius: 15,
                    marginVertical: 10,
                    opacity: .2,
                    backgroundColor: '#d9d9d9'
                  }}>
                  </View>
                  <View style={{
                    height: 135,
                    borderWidth: 1,
                    borderColor: '#ffa800',
                    // width: 100,
                    width: width * 0.4 - 45,
                    borderRadius: 15,
                    marginVertical: 10,
                    position: 'absolute',

                  }}>

                    <TouchableOpacity
                     disabled={!checkPayment ? true : false}
                      onPress={handleModal}
                      style={styles.card}>
                      <Image source={{ uri: item.image }} style={styles.icnStyle} />
                      <Text style={styles.priceTxt}>{item.coin}</Text>
                      <View>
                        <View style={[styles.btn, {
                          width: width * 0.4 - 52,
                          justifyContent: price ? "space-around" : 'center'
                        }]}>
                          <Text style={styles.tttext1}>USD <Text></Text>{item.deal_price ? item.deal_price : item.price}</Text>
                          {price ? <Text style={[styles.tttext, {

                            textDecorationLine: "line-through",
                            textDecorationStyle: "solid",
                            textDecorationColor: "red",
                            color: 'black',
                            fontFamily: style.SemiBold
                          }]}>{item.price}</Text> : null}
                          <Text style={[styles.tttext1, { marginLeft: price ? 0 : 4 }]}>{item.dis}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>


                  </View>

                </View>

        }
      </View>
    </View>
  )
}

export default Todaydeals

const styles = StyleSheet.create({
  icnStyle: {
    height: 50,
    width: 50,
    resizeMode: 'contain'
  },
  card: {
    height: 150,
    // borderColor:'green',
    // backgroundColor:'red',
    alignItems: 'center', justifyContent: 'center'
    // margin: 4,
    // borderWidth: 1,
    // borderColor: '#fff',
    // borderRadius: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: "31%",
  },
  btn: {
    height: 30,
    width: 85,
    marginTop: 10,
    backgroundColor: style.yellow,
    borderRadius: 10,
    justifyContent: 'space-around',
    paddingHorizontal: 4,
    alignItems: 'center',
    flexDirection: 'row'
  },
  tttext1: {
    color: '#000',
    fontSize: 14,
    fontFamily: style.SemiBold
  },
  tttext: {
    color: '#fff',
    fontSize: 14,
    fontFamily: style.SemiBold
  },
  priceTxt: {
    color: style.yellow,
    fontSize: 16,
    fontFamily: style.Bold
  },
})