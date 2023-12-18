import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
const bgImg = require("../../../../Assets/avt2.png")
const bgImg2 = require("../../../../Assets/avt1.png")
const bgImg3 = require("../../../../Assets/avt4.png")
const bgImg4 = require("../../../../Assets/avt3.png")
import IconRemove from 'react-native-vector-icons/Entypo'
import { style } from '../../../../Constants'
import { editUserprofile, _home } from '../../../../Utils/Apis'
import { useSelector } from 'react-redux'
const Claimscreen = ({ navigation, route }) => {
    const { user } = useSelector(({ appReducer }) => appReducer);
    const { item } = route.params;
    const apiToken = user.token
    const [first, setfirst] = useState(1)
    const [usercoins, serusercoins] = useState(0)
    console.log("user", user)

    const refreshcoin = usercoins +parseInt(item.coin);
    const refreshEdit = user.userdata.lfl_refresh_count + parseInt(item.refresh);
    const refreshaudience = user.userdata.lfl_audience_count + parseInt(item.audience);

    console.log("resultant", refreshcoin, refreshEdit, refreshaudience)
    useEffect(() => {
        _homeRes()
    }, [])


    const _homeRes = () => {
        _home(apiToken).then((responce) => {
            serusercoins(responce.user_coin)
        }).catch((error) => {
            console.log("Error", error)
        })
    }



    useEffect(() => {
        if (first == 4 && item.treasure == null) {
            const userData = new FormData();
            userData.append("coin", refreshcoin)
            userData.append("lfl_refresh_count", refreshEdit)
            userData.append("lfl_audience_count", refreshaudience)
            console.log("our userdata", userData)
            editUserprofile({ userData, apiToken }).then((responce) => {
                console.log("this is reponce", responce)
                navigation.goBack()
            }).catch((error) => {
                console.log("Error", error)
            })
        }
    }, [first, navigation])


    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                setfirst(first + 1)
                if (first == 4 && item.treasure != null) {
                    navigation.goBack()
                }
            }}
            style={styles.container1}>
            {first != 4 ? <ImageBackground
                source={first === 1 ? bgImg : first === 2 ? bgImg2 : first === 3 ? bgImg3 : first == 4 && item.treasure != null ? bgImg4 : bgImg}
                style={styles.container}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.bacView}>
                        <IconRemove name='cross' color={"white"} size={34} />
                    </TouchableOpacity>
                    {first == 1 ? <View style={{ height: 150, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ color: '#fff', fontFamily: style.SemiBold, textAlign: 'center', fontSize: 28 }}>Tap to Open!</Text>
                    </View> : first == 2 ? <View style={{ height: 250, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ color: '#fff', fontFamily: style.SemiBold, textAlign: 'center', fontSize: 20 }}>{item.coin}</Text>
                    </View> : first == 3 ?
                        <View style={{ height: 270, alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={{ color: '#fff', fontFamily: style.SemiBold, textAlign: 'center', fontSize: 20 }}>X {item.audience}</Text>
                            <Text style={{ color: '#fff', fontFamily: style.SemiBold, textAlign: 'center', fontSize: 20 }}>Audience Poll</Text>
                        </View>
                        : first == 4 && item.treasure != null ? <View style={{ height: 300, alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={{ color: '#fff', fontFamily: style.SemiBold, textAlign: 'center', fontSize: 20 }}>X {item.audience}</Text>
                            <Text style={{ color: '#fff', fontFamily: style.SemiBold, textAlign: 'center', fontSize: 20 }}>Treasure Box!</Text>
                        </View> : null}
                    <View style={styles.tapMoreChild}>
                        <View>
                            <View style={styles.endView}>
                                <Text style={styles.tapMore}>{first != 4 && first != 1 ? "Tap to more" : null}</Text>
                                {first == 2 ? <Text style={styles.ranKtxt}>3</Text> :
                                    first == 3 ? <Text style={styles.ranKtxt}>2</Text> :
                                        first == 4 ? <Text style={styles.ranKtxt}>1</Text> :
                                            null}
                            </View>

                        </View>

                    </View>


                </View>
            </ImageBackground> : <View style={{
                flex: 1,
                backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center'
            }}>
                <Text style={{ fontSize: 24, color: 'white' }}>Coins Selection Over</Text>
            </View>}
        </TouchableOpacity>
    )
}

export default Claimscreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container1: { flex: 1, },
    bacView: {
        margin: 10,
        height: 35,
        // marginTop:'20%',
        alignSelf: 'flex-end',
        alignItems: 'center',
        // backgroundColor:'red',
        justifyContent: "center",
        width: 35, borderRadius: 20,
    },
    ranKtxt: { color: '#fff', fontSize: 30, left: 6 },
    endView: {
        flexDirection: 'row',
        paddingHorizontal: 50,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tapMore: { color: '#fff', fontFamily: style.SemiBold, textAlign: 'center', fontSize: 20 },
    tapMoreChild: {
        position: 'absolute',
        bottom: 20,
        // backgroundColor: 'red',
        width: "100%",
        height: 100

    }
})