import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, Alert, BackHandler } from 'react-native'
import React, { useCallback } from 'react'
import { style } from '../../../../Constants'
import Button from '../../../../Components/Button'
import { SetQues, SetRepeateIndexData } from '../../../../Redux/actions/appactions/Index'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

const bg = require('../../../../Assets/cong2.png')
const RoundCount = ({ navigation }) => {
    const { milestone, user } = useSelector(({ appReducer }) => appReducer);
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
    return (
        <ImageBackground source={bg} style={{ flex: 1 }}>
            <View style={{
                flex: 5,
                justifyContent: 'center',
            }}>
                <View style={[styles.parentContainer, { marginTop: '10%' }]}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <ImageBackground source={require('../../../../Assets/circlebg.png')} style={{
                            height: 150,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 150
                        }}>
                            <View style={styles.imgStyler}>
                                {user?.userdata.image ? <Image source={{ uri: user.userdata.image }} style={{
                                    height: 130, width: 130,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    borderRadius: 70
                                }} /> : <Image source={require("../../../../Assets/user.png")} style={{
                                    height: 130, width: 130,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    borderRadius: 70
                                }} />}
                            </View>
                        </ImageBackground>
                        {/* */}
                        <View style={{ alignItems: 'center', marginTop: '10%' }}>
                            <Text style={styles.nameTxt}>{user?.userdata?.name}</Text>
                            <Text style={[styles.nameTxt, { color: style.yellow1 }]}>Rank 15</Text>
                            <Text style={[styles.wingnTxt, {
                                fontSize: 24,
                                marginTop: 12,
                                fontFamily: style.Bold
                            }]}>
                                {"Congratulations!"}

                            </Text>
                            <Text style={[styles.wingnTxt, {
                                fontFamily: style.Medium,
                                color: 'white',
                                width: 230,
                                textAlign: 'center', top: "18%"
                            }]}>Invite your 10 friends to the app and get your cash.</Text>
                        </View>


                        {/* <View style={{ height: 30, alignItems: 'center' }}>
                            <Image source={require("../Assets/curveIcon.png")} style={{
                                width: 100,
                                height: 30,
                                tintColor: style.green,
                                resizeMode: 'contain'
                            }} />
                            <View style={{ position: 'absolute', bottom: -8 }}>
                                <Text style={styles.nameTxt}>Play Again</Text>
                            </View>
                        </View> */}
                    </View>

                </View>
                <View style={{ marginTop: "20%", alignItems: 'center' }}>
                    <View style={{
                        height: 30,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 120, backgroundColor: style.btnColor
                    }}>
                        <Image source={require("../../../../Assets/cash.png")} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                        <Text style={{
                            fontSize: 12,
                            marginLeft: 4,
                            color: '#fff', fontFamily: style.SemiBold
                        }}>Cash Prize</Text>
                    </View>
                    <Text style={{
                        fontSize: 32,
                        marginTop: 10,
                        color: style.yellow, fontFamily: style.Bold
                    }}>USD {milestone == 4 ? "1000" : milestone == 6 ? "15,000" : milestone == 5 ? "1000" : milestone == 6 ? "15000" : milestone == 7 ? "15,000" : milestone == 8 ? "15,000" : milestone == 9 ? "30,000" : milestone == 10 ? "30,000" : milestone == 11 ? "30,000" : milestone == 12 ? "50000" : 0}</Text>

                </View>

            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: 60, backgroundColor: '#ffa800', opacity: .1, width: '80%', alignSelf: 'center', borderRadius: 30 }} />
                <Button title={"Cash Out"}
                    onPress={() => {
                        // SetRepeateIndexData(null)(dispatch)
                        navigation.navigate("Bankdetailscreen", {
                            cash: milestone == 4 ? "1000" : milestone == 6 ? "15000" : milestone == 5 ? "1000" : milestone == 6 ? "15000" : milestone == 7 ? "15000" : milestone == 8 ? "15000" : milestone == 9 ? "30000" : milestone == 10 ? "30000" : milestone == 11 ? "30000" : milestone == 12 ? "50000" : 0
                        })
                        // SetQues(null)(dispatch)
                    }}
                    // onPress={() => navigation.navigate("Bankdetailscreen")}
                    textstyle={{
                        color: style.yellow
                    }}
                    btnstyle={{
                        position: 'absolute',
                        // marginTop:30,
                        backgroundColor: null,
                        borderWidth: 1,
                        borderRadius: 30,
                        height: 60,
                        top: 22,
                        bottom: 0,
                        borderColor: style.yellow
                    }} />
            </View>
        </ImageBackground>
    )
}

export default RoundCount

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        width: 120,
        height: 30,
        backgroundColor: "black"
    },
    parentContainer: {
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-around'
    },
    imgs: { height: 90, width: 90, borderRadius: 45 },
    priceView: {
        flexDirection: 'row',
        borderWidth: 1,
        marginTop: "20%",
        width: 170,
        height: 40,
        borderColor: style.yellow,
        paddingHorizontal: 20,
        // padding: 12,
        borderRadius: 30,
        alignItems: 'center', justifyContent: "center"
    },
    wingnTxt: {
        fontFamily: style.SemiBold,
        color: "#fff",
        marginLeft: 10,
        fontSize: 16,
        top: "10%"
    },
    imgStyler: {
        height: 100, width: 100, borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1, borderRadius: 50
    },
    vsTxt: {
        fontFamily: style.Bold,
        color: style.yellow,
        fontSize: 24,
        left: 6,
        bottom: 16

        // padding: 12
    },
    nameTxt: {
        fontFamily: style.SemiBold,
        fontSize: 16,
        color: '#fff',
    }
})