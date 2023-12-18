import { ImageBackground, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import Subheader from '../../../../../Components/Subheader'
import { style } from '../../../../../Constants'
import Button from '../../../../../Components/Button'
import { useState } from 'react'
import { changeUserStatus, _Leaguecoins } from '../../../../../Utils/Apis'
const bgImg = require("../../../../../Assets/bgg.png")
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../../../Components/Loader'
import firestore from '@react-native-firebase/firestore';
import { SetUser } from '../../../../../Redux/actions/appactions/Index'

const SelectGame = ({ navigation, route }) => {
    const { id, questions } = route.params;
    const { user } = useSelector(({ appReducer }) => appReducer);
    const [coins, setcoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [GamePrice, setGamePrice] = useState(-1)
    const [gameId, setgameId] = useState()
    const [price, setprice] = useState("")

    const dispatch = useDispatch()
    const apiToken = user.token



    useEffect(() => {
        _Games()
    }, [apiToken])


    const _Games = () => {
        setLoading(true)
        _Leaguecoins(apiToken).then((responce) => {
            setLoading(false)
            setcoins(responce.league_coin)
        }).catch((error) => {
            setLoading(false)
            console.log("Error", error.response)
        })
    }



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            _getUserStatus()
            // deleteData()
        });
        return unsubscribe;
    }, [navigation, apiToken]);

    const _getUserStatus = () => {
        const userdata = new FormData();
        userdata.append("status", "inactive")
        changeUserStatus({ userdata, apiToken }).then((responce) => {
            console.log("User chck", responce)
        }).catch((error) => {
            console.log("Erro", error)
        })

    }


 

    return (
        <ImageBackground source={bgImg} style={styles.container}>
            {loading && <Loader />}
            <View style={{ padding: 12 }}>
                <Subheader title={"Select Game"} onPress={()=>navigation.goBack()} />
            </View>

            <View style={{
                flex: 1,
                paddingHorizontal: 32,
            }}>
                <View style={{ flex: 5, }}>
                    {coins.length != 0 ? <FlatList
                        showsVerticalScrollIndicator={false}
                        data={coins}
                        style={{ flex: 1 }}
                        ListFooterComponent={
                            <View>
                                <Button title={"Start"}
                                    btnstyle={{
                                        marginTop: '10%',
                                        width: '100%'
                                    }}
                                    onPress={() => {
                                        if (price != "") {
                                            navigation.navigate("WiningScreen", {
                                                box_id: id,
                                                coin_id: gameId,
                                                price,
                                                totalquestions: questions
                                            })
                                          

                                        } else {
                                            Alert.alert('Hold on!', 'Please select one Item atleast!', [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => null,
                                                    style: 'cancel',
                                                },
                                                { text: 'YES', onPress: () => console.log("ok") },
                                            ]);

                                        }
                                    }}
                                />
                            </View>
                        }
                        contentContainerStyle={{
                            flex: 1,
                            justifyContent: 'center',
                            paddingBottom: 20,
                            // backgroundColor: 'red',
                            flexGrow: 1
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ marginTop: '5%' }}>
                                    <View style={{
                                        height: 50,
                                        borderRadius: 25,
                                        // backgroundColor: index === GamePrice ? "#a25c13" : "#848c97",
                                        // opacity: index === 7 ? 1 : .2
                                        // opacity:1
                                    }} />
                                    <TouchableOpacity
                                        onPress={() => {
                                            setGamePrice(index)
                                            setgameId(item.id)
                                            setprice(item.price)

                                        }}
                                        style={{
                                            height: 50,
                                            borderRadius: 25,
                                            width: '100%',
                                            position: 'absolute',
                                            borderWidth: .5,
                                            // borderColor:'red'
                                            borderColor: index == GamePrice ? "#ffa800" : "#959ca6"
                                        }}>
                                        <View style={{
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            justifyContent: 'center', flex: 1
                                        }}>
                                            <View style={{
                                                height: 50,
                                                flexDirection: 'row',
                                                width: '100%'
                                            }}>
                                                <View style={{
                                                    height: 50,
                                                    paddingLeft: index === 7 ? 4 : 0,
                                                    justifyContent: 'center',
                                                    width: '33%'
                                                }}>
                                                </View>
                                                <View style={{
                                                    height: 50,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'row',
                                                    width: '33%'
                                                }}>
                                                    <Image source={require('../../../../../Assets/4.png')} style={{
                                                        height: 25,
                                                        width: 25,
                                                        resizeMode: 'contain',
                                                    }} />
                                                    <Text style={{
                                                        color: index == GamePrice ? '#fff' : "#898e94",
                                                        fontSize: 18,
                                                        marginLeft: 4,
                                                        fontFamily: style.SemiBold
                                                    }}>
                                                        {item.price}
                                                    </Text>
                                                </View>
                                                <View style={{ height: 50, width: '33%' }}>

                                                </View>
                                            </View>

                                            {/* 
                                        */}
                                        </View>

                                    </TouchableOpacity>

                                </View>
                            )
                        }}
                    /> : null}

                </View>

                <View style={{ flex: 1, }} />

            </View>
        </ImageBackground>
    )
}

export default SelectGame

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})