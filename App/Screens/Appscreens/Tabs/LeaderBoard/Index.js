import {
  StyleSheet, Text, View, ImageBackground,
  FlatList,

  TouchableOpacity, Image, ScrollView
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { style } from '../../../../Constants'
import FriendsList from '../../../../Components/FriendsList'
import { leaderBoard } from '../../../../Utils/Apis'
const bgImg = require("../../../../Assets/new.png")

import { useSelector } from 'react-redux'
import Loader from '../../../../Components/Loader'
const Index = () => {
  const { user } = useSelector(({ appReducer }) => appReducer);

  const [btnState, setbtnState] = useState(1)
  const [buttonType, setbuttonType] = useState("Monthly")
  const [Postion, setPostion] = useState([])
  const [Leader, setLeader] = useState([])
  const [loading, setloading] = useState(false)
  const [resultantCoin, setresultantCoin] = useState(0)
  const [savemYindex, setsavemYindex] = useState(0)

  const apiToken = user.token




  useEffect(() => {
    _showLeaderBorder(buttonType);
  }, [buttonType])





  const _showLeaderBorder = (typ) => {
    setloading(true)
    const userdata = new FormData()
    userdata.append("type", typ.toLowerCase())
    leaderBoard({ apiToken, userdata }).then((responce) => {
      setloading(false)
      setPostion(responce.leaders)
      setLeader(responce.leaderboard)
      responce.leaderboard.forEach((element, index) => {
        if (element.user_id == user.userdata.id) {
          let r = Math.abs(element.coin) > 999 ? Math.sign(element.coin) * ((Math.abs(element.coin) / 1000).toFixed(1)) + 'k' : Math.sign(element.coin) * Math.abs(element.coin)
          setresultantCoin(r)
          setsavemYindex(index + 1)
        }
      });

    }).catch((error) => {
      setloading(false)
      console.log("Error", error.response)
    })
  }

  let r0 = Math.abs(Postion[0]?.coin) > 999 ? Math.sign(Postion[0]?.coin) * ((Math.abs(Postion[0]?.coin) / 1000).toFixed(1)) + 'k' : Math.sign(Postion[0]?.coin) * Math.abs(Postion[0]?.coin)
  let r1 = Math.abs(Postion[1]?.coin) > 999 ? Math.sign(Postion[1]?.coin) * ((Math.abs(Postion[1]?.coin) / 1000).toFixed(1)) + 'k' : Math.sign(Postion[1]?.coin) * Math.abs(Postion[1]?.coin)
  let r2 = Math.abs(Postion[2]?.coin) > 999 ? Math.sign(Postion[2]?.coin) * ((Math.abs(Postion[2]?.coin) / 1000).toFixed(1)) + 'k' : Math.sign(Postion[2]?.coin) * Math.abs(Postion[2]?.coin)



  return (
    <View style={{ flex: 1 }}>
      {loading && <Loader />}
      <ImageBackground source={bgImg} style={styles.container}>
        <ScrollView>
          <View style={{ marginTop: '5%', paddingHorizontal: 10 }}>
            <Text style={styles.txt}>Leaderboard</Text>
            <View>
              <View style={[styles.btnsContainer, { opacity: 0.5, alignSelf: 'center' }]}>

              </View>
              <View style={styles.monthsStyle}>
                {["Weekly", "Monthly", "Yearly"].map((item, index) => {

                  console.log("index", index)
                  return (
                    <TouchableOpacity onPress={() => {
                      setbtnState(index)
                      setbuttonType(item)

                    }} style={[styles.btn, {
                      height: index === btnState ? 35 : null,
                      backgroundColor: index === btnState ? style.btnColor : null
                    }]}>
                      <Text style={styles.txt}>{item}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
              <View style={styles.usersView1}>
                {/* {['1', "2", "3"].map((item, index) => {
                  return (
                    <Image source={require("../../../../Assets/Star.png")} style={[styles.coinimg, {
                      height: 18,
                      top: index === 0 ? 8 : index === 1 ? 3 : index === 2 ? 8 : 3,
                      width: 15
                    }]} />
                  )
                })} */}
                <View style={{
                  flexDirection: 'row',
                  marginRight: Postion[1]?.user_image ? 30 : Postion[2]?.user_image ? 30 : 0,
                  // marginLeft:50,
                  alignItems: 'center', justifyContent: 'center'
                }}>
                  {Postion.length > 1 ?
                    <View>
                      <Image source={{ uri: Postion[1].user_image ? Postion[1].user_image : "https://images.unsplash.com/photo-1520121401995-928cd50d4e27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" }} style={[styles.userImg, {
                        height: 85,
                        width: 85,
                        borderWidth: 1,
                        borderColor: '#B5B332',
                      }]} />
                      <View style={[styles.statusview, {
                        backgroundColor: "#B5B332",
                        alignItems: 'center',
                        bottom: 6,
                        justifyContent: 'center'
                      }]}>
                        <Text style={{ color: "#fff" }}>2</Text>
                      </View>
                      <Text style={[styles.txt, { bottom: 4, left: 26 }]}>{Postion[1]?.user_name.split(' ').slice(0, -1).join(' ')}</Text>
                      <View style={{
                        flexDirection: 'row',
                        bottom: 6,
                        alignItems: 'center', justifyContent: 'center', marginTop: 5
                      }}>
                        <Image source={require("../../../../Assets/4.png")} style={styles.coinimg} />
                        <Text style={[styles.txt, { color: style.yellow, }]}>{r1}</Text>
                      </View>
                    </View>
                    : null}
                  {Postion.length > 0 ?
                    <View>
                      <View style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        alignItems: 'center', justifyContent: 'center'
                      }}>
                        <Image source={require("../../../../Assets/Star.png")} style={[styles.coinimg, {
                          height: 18,
                          bottom: 75,
                          width: 15
                        }]} />
                        <Image source={require("../../../../Assets/Star.png")} style={[styles.coinimg, {
                          height: 18,
                          bottom: 83,
                          width: 15
                        }]} />
                        <Image source={require("../../../../Assets/Star.png")} style={[styles.coinimg, {
                          height: 18,
                          bottom: 75,
                          width: 15
                        }]} />


                      </View>

                      <Image source={{ uri: Postion[0].user_image ? Postion[0].user_image : "https://images.unsplash.com/photo-1520121401995-928cd50d4e27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" }} style={[styles.userImg, {
                        height: 100,
                        bottom: 70,
                        borderWidth: 1,
                        borderColor: '#4EB2EE',
                        width: 100,
                      }]} />
                      <View style={[styles.statusview, {
                        backgroundColor: "#4EB2EE",
                        bottom: 80,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }]}>
                        <Text style={{ color: "#fff" }}>1</Text>
                      </View>
                      <Text style={[styles.txt, { bottom: 80, left: 26 }]}>{Postion[0]?.user_name.split(' ').slice(0, -1).join(' ')}</Text>
                      <View style={{
                        flexDirection: 'row',
                        bottom: 80,
                        alignItems: 'center', justifyContent: 'center', marginTop: 5
                      }}>
                        <Image source={require("../../../../Assets/4.png")} style={styles.coinimg} />
                        <Text style={[styles.txt, { color: style.yellow, }]}>{r0}</Text>
                      </View>
                    </View>
                    : null}
                  {Postion.length > 2 ?
                    <View>
                      <Image source={{ uri: Postion[2].user_image ? Postion[2].user_image : "https://images.unsplash.com/photo-1520121401995-928cd50d4e27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" }} style={[styles.userImg, {
                        height: 85,
                        width: 85,

                      }]} />
                      <View style={[styles.statusview, {
                        backgroundColor: "#4EB2EE",
                        // bottom:80,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }]}>
                        <Text style={{ color: "#fff" }}>3</Text>
                      </View>
                      <Text style={[styles.txt, { bottom: 0, left: 26 }]}>{Postion[2]?.user_name.split(' ').slice(0, -1).join(' ')}</Text>
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'center', marginTop: 5
                      }}>
                        <Image source={require("../../../../Assets/4.png")} style={styles.coinimg} />
                        <Text style={[styles.txt, { color: style.yellow, left: 4 }]}>{r2}</Text>
                      </View>
                    </View>
                    : null}
                </View>


              </View>
              <View style={{ marginTop: 0 }}>
                {Leader.slice(3, 3).map((item, index) => {
                  let r = Math.abs(item.coin) > 999 ? Math.sign(item.coin) * ((Math.abs(item.coin) / 1000).toFixed(1)) + 'k' : Math.sign(item.coin) * Math.abs(item.coin)
                  return (
                    <FriendsList
                      idx={index}
                      leader={true}
                      item={item}
                      coins={r}
                    />
                  )
                })}

              </View>
            </View>

          </View>
        </ScrollView>

      </ImageBackground>

      {resultantCoin != 0 ? <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: 'black',
          paddingBottom: 80,
          position: 'absolute',
          bottom: 0,
          justifyContent: 'center',
          alignSelf: 'center',
          width: "100%"
        }}>
        <ImageBackground resizeMode='contain' source={require("../../../../Assets/rec.png")} style={{
          height: 60,
          top: 10,
          alignSelf: 'center',
          width: 300
        }}>
          <View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 17,
              marginTop: 10,
              justifyContent: 'space-between'
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: user.userdata.image }} style={{ height: 40, width: 40, borderRadius: 30 }} />
                <View style={{ paddingLeft: 10 }}>
                  <Text style={styles.txt}>{user.userdata.name}</Text>
                  <Text style={[styles.txt, { color: style.yellow }]}>{resultantCoin}</Text>
                </View>
                <View>
                </View>
              </View>
              <Text style={[styles.txt, { color: style.yellow, fontFamily: style.SemiBold, fontSize: 18 }]}>{savemYindex}</Text>

            </View>
          </View>
        </ImageBackground>

      </TouchableOpacity> : null}
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusview: {
    height: 25,
    width: 25,
    borderRadius: 30,
    // position: 'absolute',
    alignSelf: 'center',
    // top: 95,
    justifyContent: 'center',

  },
  userImg: {
    height: 90,
    width: 90,
    borderRadius: 50
  },
  coinimg: {
    height: 10,
    width: 10,
    borderRadius: 50,
    resizeMode: 'contain'
  },
  btnsContainer: {
    height: 35,
    backgroundColor: '#414242',
    width: '80%',
    borderRadius: 25,
    marginTop: '5%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center', justifyContent: "space-around"
  },
  usersView1: {
    flexDirection: 'row',
    marginTop: '25%',
    alignItems: 'center',
    justifyContent: "center",
    // backgroundColor:'red'
    // justifyContent: "space-around"
  },
  usersView: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100, borderRadius: 50,
    borderWidth: 2, borderColor: '#fff'
  },
  monthsStyle: {
    position: 'absolute',
    width: '70%',
    height: 35,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    left: 50,
    marginTop: "4%",
    alignSelf: 'center'
  },
  usersView2: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100, borderRadius: 50,
    borderWidth: 2, borderColor: '#fff'
  },
  txt: {
    fontSize: 14,
    color: '#fff',
    fontFamily: style.Medium
  },
  btn: {
    backgroundColor: style.btnColor,
    top: 2,
    borderRadius: 20,
    paddingHorizontal: 20,
    // paddingVertical: 6,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center'
  }
})