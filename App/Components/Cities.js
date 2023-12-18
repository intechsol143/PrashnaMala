import {
    StyleSheet, Text, View, Dimensions,
    Animated,
    ImageBackground, Image, TouchableOpacity
} from 'react-native'
import React from 'react'
import { style } from '../Constants';
import Icon from 'react-native-vector-icons/AntDesign'
const Cities = ({ item, onPress, state, idx }) => {
    const { width } = Dimensions.get("screen");

    return (
        <TouchableOpacity onPress={onPress} style={[styles.bgimgCont, { width: width * 0.43, width: width * 0.45 - 3 }]}>
            {item.is_free ? <ImageBackground
                borderRadius={10}
                resizeMode='contain' source={{ uri: item.image }} style={{
                    height: 200,
                    width: width * 0.43,
                }}>
                <View style={{ flex: 1, }}>
                    <View style={{
                        flex: 3.8,
                    }}>
                        <View style={{ margin: 15 }}>
                            {state == idx ? <View style={styles.checkView}>
                                <Icon name={"check"} size={16} color={'#fff'} />
                            </View> : null}
                        </View>
                    </View>
                    <View style={{ flex: 1.2, }}>
                        <View style={{
                            backgroundColor: '#000',
                            opacity: .6,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            flex: 1
                        }} />
                        <View style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%'
                        }}>
                            <View>
                                <View style={{
                                    alignSelf: 'center',
                                    bottom: 8,
                                    backgroundColor: style.green, width: 92, borderRadius: 50, justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Text style={{ fontFamily: style.SemiBold, color: '#fff' }}>Cash Prize</Text>
                                </View>
                                <Text style={styles.cash}>USD {item.cash_price}</Text>
                            </View>

                        </View>
                    </View>
                </View>

            </ImageBackground> :
                <ImageBackground
                    borderRadius={10}
                    resizeMode='contain' source={{ uri: item.image }} style={{
                        height: 200,
                        width: width * 0.43,
                    }}>
                    <View style={{ flex: 1, }}>
                        <View style={{
                            flex: 1,
                            borderRadius: 10,
                            backgroundColor: 'black',
                            opacity: .7
                        }}>
                        </View>
                        <View style={{
                            position: 'absolute',
                            borderRadius: 10,
                            height: '100%', width: '100%',
                        }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require("../Assets/lock.png")} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                                <TouchableOpacity style={{
                                    height: 40,
                                    borderRadius: 10,
                                    marginTop: 10,
                                    width: 100, backgroundColor: style.yellow, alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        color: '#000',
                                        fontSize: 16,
                                        fontFamily: style.SemiBold
                                    }}>Unlock</Text>
                                </TouchableOpacity>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    alignItems: 'center'
                                }}>
                                    <Image source={require("../Assets/4.png")} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                                    <Text style={styles.cash1}>{item.unlock_coins}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            }
            <View style={{
                alignItems: 'center',
                marginTop: 8,
                justifyContent: 'center'
            }}>
                <Text style={styles.countryName}>{item.title}</Text>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 3,
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <Image source={require("../Assets/4.png")} style={{ height: 12, width: 12, resizeMode: 'contain' }} />
                    <Text style={{ fontFamily: style.SemiBold, color: style.yellow, textAlign: 'center', }}>{item.max_coin}</Text>
                </View>

            </View>

        </TouchableOpacity>
    )
}

export default Cities

const styles = StyleSheet.create({
    bgimgCont: {
        // flex: 1,
        margin: 5,
        height: 260,
        // width:200,

        alignItems: 'center',
    },
    cash1:{
        color: '#fff',
        fontSize: 16,
        marginLeft: 6,
        fontFamily: style.SemiBold
    },
    cash:{
        fontSize: 18,
        fontFamily: style.Bold,
        bottom: 3,
        color: '#fff', 
        textAlign: 'center'
    },
    checkView: {
        height: 25, width: 25, borderWidth: 2,
        backgroundColor: style.green,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    countryName: {
        fontSize: 16,
        fontFamily: style.SemiBold, color: '#fff', textAlign: 'center'
    }
})