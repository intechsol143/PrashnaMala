import { ImageBackground, StyleSheet, Text, TouchableOpacity, Dimensions, View, Image, BackHandler, Alert, AppState } from 'react-native'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { style } from '../Constants'
import CountDown from 'react-native-countdown-component';
import { SetCurrentTime } from '../Redux/actions/appactions/Index';
import { useDispatch, useSelector } from 'react-redux'
const Claims = ({ item, navigation, idx }) => {
    const { width } = Dimensions.get("screen");
    const [timeCheck, settimeCheck] = useState(false)
    const { saveTime } = useSelector(({ appReducer }) => appReducer);
    const [val, setval] = useState()
    const dispatch = useDispatch();

    let resTime = item.time.split(':').reduce(function (seconds, v) {
        return +v + seconds * 60;
    }, 0) / 60;



    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                console.log('App has come to the foreground!');
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            if (appStateVisible == "background") {
                SetCurrentTime(val)(dispatch)
            }
        });

        return () => {
            subscription.remove();
        };
    }, [appStateVisible, saveTime]);

    return (
        <TouchableOpacity disabled={timeCheck ? false : true} onPress={() => navigation.navigate("Claimscreen", { item })} style={{ flex: 1, margin: 5 }}>
            <View style={{
                height: 170,
                borderRadius: 15,
                width: width * 0.35 - 5,
                borderColor: 'red',
                opacity: .1,
                marginTop: 30,
                backgroundColor: '#ec4137'
            }}>
            </View>
            <View style={{
                height: 170,
                borderRadius: 15,
                position: 'absolute',
                width: width * 0.35 - 5,
                borderColor: 'red',
                marginTop: 30,
                borderWidth: 1

            }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ position: 'absolute', bottom: -29 }}>
                        <ImageBackground
                            resizeMode='contain'
                            imageStyle={{
                                tintColor: timeCheck ? 'orange' : null
                            }}
                            source={require("../Assets/rc1.png")} style={{
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 80
                            }}>
                            <View style={{height: 50,alignItems: 'center',justifyContent: 'center',width: 80,
                            }}>
                                <Text style={[styles.txt1, { paddingBottom: 8 }]}>{timeCheck ? "Claim" : "Unlock"}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ImageBackground resizeMode='contain' source={require('../Assets/sun.png')} style={{
                        height: 180,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 180,
                    }}>
                        <Image source={{ uri: item.image }} style={{ height: 80, width: 80, resizeMode: 'contain' }} />
                        {/* <Image source={require("../Assets/box.png")} style={{ height: 80, width: 80, resizeMode: 'contain' }} /> */}
                    </ImageBackground>
                </View>
                <View 
                    style={{
                    height: 40,
                    position: 'absolute',
                    bottom: 0,
                    borderBottomRightRadius: 15,
                    borderBottomLeftRadius: 15,
                    width: '100%',
                    backgroundColor: "#310005"
                }}
                
                >
                    <View style={{
                        alignItems: 'center',
                        height: 40,
                        justifyContent: 'center'
                    }}>
                        <Text style={[styles.txt, { ...styles.ex2 }]}>{item.title}</Text>
                        <CountDown
                            size={30}
                            // until={resTime}
                            until={resTime * 60}
                            // until={saveTime ? saveTime : resTime * 60}
                            onFinish={() => {
                                settimeCheck(true)
                                SetCurrentTime(0)(dispatch)
                            }}
                            onChange={(e) => {
                                setval(e)
                            }
                            }
                            digitStyle={{
                                backgroundColor: 'transparent',
                                height: 30,
                                width: 15,
                                marginBottom: 0,
                            }}
                            digitTxtStyle={{
                                color: '#fff', fontSize: 12,
                                fontFamily: style.Regular
                            }}
                            timeLabelStyle={{ color: 'white',
                            fontSize:12,
                            fontFamily: style.Regular }}
                            separatorStyle={{
                                color: '#fff',
                                bottom: 0,
                                fontSize: 14, fontFamily: style.Regular
                            }}
                            timeToShow={['H', 'M', 'S']}
                            timeLabels={{ m: null, s: null }}
                            showSeparator
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>


    )
}

export default Claims

const styles = StyleSheet.create({
    txt1: {
        color: "#fff",
        fontSize: 14,
        fontFamily: style.SemiBold,
        // bottom: 0,
        // right: 8

    },
    ex2: {
        fontSize: 14,
        top: 6,
        fontFamily: style.SemiBold

    },
    ex: {
        fontSize: 12,
        marginTop: 2,
        fontFamily: style.Medium
    },
    claimCard: {
        height: 165,
        width: 110,

    },
    txt: {
        color: "#fff",
        fontSize: 10,
        fontFamily: style.SemiBold
    },
})