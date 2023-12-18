import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
const bgImg = require("../../../../../Assets/bg3.png")
// const bgImg2 = require("../../../../Assets/cong1.png")
const bgImg2 = require("../../../../../Assets/ii.png")
import IconBack from 'react-native-vector-icons/Entypo'
import { style } from '../../../../../Constants'
import Button from '../../../../../Components/Button'
import {useSelector} from 'react-redux'
const LeagueWin = ({ route }) => {
    const { Total_question, fbresult } = route.params;
    const {anscount} = useSelector(({ appReducer }) => appReducer);

    console.log("Total_question,fbresult",anscount)
    const win = Dimensions.get('window');
    const ratio = win.width / 200;
    return (
        <View style={styles.container}>
            <View style={{ flex: .5, backgroundColor: 'red' }}>
            </View>
            <View style={{ flex: 4, backgroundColor: 'green', alignItems: 'center' }}>
                <View style={styles.itemsContainer}>
                    <View style={styles.container}>
                        <View style={[styles.parentContainer, { marginTop: '10%' }]}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{
                                    alignItems: 'center',
                                }}>
                                    <View style={{ flexDirection: "row" }}>

                                        {["1", "2", "3"].map((item, index) => {
                                            return (

                                                <Image source={require("../../../../../Assets/Star.png")} style={{
                                                    height: 15,
                                                    margin: 1.5,
                                                    bottom: index === 0 ? "30%" : index === 1 ? "37%" : index === 2 ? "30%" : null,
                                                    width: 15, resizeMode: 'contain'
                                                }} />
                                            )
                                        })}
                                    </View>
                                    <Text style={[styles.nameTxt, {
                                        fontSize: 16,
                                        textAlign: 'center',
                                        fontFamily: style.Bold,
                                        position: 'absolute', bottom: -5
                                    }]}>Winner</Text>
                                </View>
                                <View style={[styles.imgStyler, { borderColor: style.yellow }]}>
                                    <Image source={{ uri: 'https://images.unsplash.com/photo-1602546005687-372f3c6455ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }} style={styles.imgs} />
                                </View>
                                <Text style={styles.nameTxt}>Talan George</Text>
                            </View>
                            <Text style={[styles.vsTxt, { color: '#fff' }]}>VS</Text>
                            <TouchableOpacity
                                onPress={() => {

                                }} style={{ alignItems: 'center' }}>
                                <View style={styles.imgStyler}>
                                    <Image source={{ uri: 'https://images.unsplash.com/photo-1605192554106-d549b1b975cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }} style={styles.imgs} />
                                </View>
                                <Text style={styles.nameTxt}>Randy Lipshurtz</Text>

                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <View>
                                <View style={styles.commondesign} />
                                <View style={styles.commondesign2}>
                                    <Image source={require("../../../../../Assets/check.png")} style={styles.iconstylecommon} />
                                    <Text style={[styles.textcomon, { marginLeft: 8 }]}>2 Correct</Text>
                                </View>
                            </View>
                            <View>
                                <View style={styles.commondesign} />
                                <View style={styles.commondesign2}>
                                    <Image source={require("../../../../../Assets/cross1.png")} style={styles.iconstylecommon} />
                                    <Text style={[styles.textcomon, { marginLeft: 6 }]}>8 InCorrect</Text>
                                </View>
                            </View>
                        </View>
               
                        <Button title={"Rematch"}
                            // onPress={() => setrematchHandler2(true)}
                            textstyle={{
                                color: style.yellow,

                            }}
                            btnstyle={{
                                backgroundColor: null,
                                borderWidth: 1,
                                alignSelf: 'center',
                                width: "70%",
                                marginTop: 20,
                                // top:'60%',
                                borderColor: style.yellow
                            }}
                        />
                    </View>



                </View>
            </View>
            <View style={{ flex: .5, backgroundColor: 'black' }}>

            </View>
           
        </View>
    )
}

export default LeagueWin

const styles = StyleSheet.create({

    itemsContainer: {
        flex: 1,
        // backgroundColor: 'red'
    },
    container: {
        flex: 1,
        // alignItems: 'center',
        // backgroundColor:'blue',
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
    imgs: {
        height: 97,
        width: 97, borderRadius: 100
    },
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
    iconstylecommon: {
        height: 20,
        width: 20, resizeMode: 'contain'
    },
    wingnTxt: {
        fontFamily: style.SemiBold,
        color: "#fff",
        marginLeft: 10,
        fontSize: 14,
        top: "10%"
    },
    imgStyler: {
        height: 100, width: 100, borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 50
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
        color: '#fff', padding: 12
    },
    btn1: {
        backgroundColor: null,
        borderWidth: 1,
        top: '40%',
        // marginTop:"30%",
        borderColor: style.yellow

    },
    commondesign2: {
        position: 'absolute',
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 130,
        height: 30
    },
    textcomon: {
        color: 'white',
        fontSize: 14,
        fontFamily: style.SemiBold
    },
    commondesign: {
        height: 30,
        borderRadius: 20,
        opacity: .3,
        backgroundColor: '#959ca6',
        width: 130,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     btn: {
//         backgroundColor: null,
//         borderWidth: 1,
//         borderColor: style.yellow

//     },
//     matchContainer: { flex: 5, },
//     itemsContainer: { flex: 1 },
//     bacView: {
//         margin: 10,
//         height: 35,
//         alignItems: 'center',
//         justifyContent: "center",
//         width: 35, borderRadius: 20, backgroundColor: '#fff'
//     }
// })