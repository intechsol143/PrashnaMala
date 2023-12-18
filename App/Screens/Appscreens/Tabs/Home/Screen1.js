import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { style } from '../../../../Constants'
import Button from '../../../../Components/Button'
import Icon from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
const bgImg = require("../../../../Assets/bg1.png")
const Screen1 = () => {
    return (
        <ImageBackground source={bgImg} style={styles.container}>
            <View style={[styles.parentContainer, { marginTop: '10%' }]}>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        alignItems: 'center',
                    }}>
                        <View style={{ flexDirection: "row" }}>

                            {["1", "2", "3"].map((item, index) => {
                                return (

                                    <Image source={require("../../../../Assets/Star.png")} style={{
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
                    <View style={styles.imgStyler}>
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1602546005687-372f3c6455ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }} style={styles.imgs} />
                    </View>
                    <Text style={styles.nameTxt}>Talan George</Text>

                </View>
                <Text style={[styles.vsTxt, { color: '#fff' }]}>VS</Text>
                <TouchableOpacity

                    style={{ alignItems: 'center' }}>
                    <View style={styles.imgStyler}>
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1605192554106-d549b1b975cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }} style={styles.imgs} />
                    </View>
                    <Text style={styles.nameTxt}>Randy Lipshurtz</Text>

                </TouchableOpacity>


            </View>
            <View style={{ marginTop: '7%',alignItems:'center' }}>
                <Text style={[styles.wingnTxt, { fontSize: 24, fontFamily: style.Bold }]}>You were too close</Text>
                <Text style={[styles.wingnTxt, {
                    fontFamily: style.Regular,
                    color: 'white',
                    width: 300,
                    textAlign: 'center', top: "15%"
                }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
                <View style={{ flexDirection: 'row', marginTop: "20%" }}>
                    <Button
                        title={"2 correct"}
                        textstyle={{ marginLeft: 10 }}
                        btnstyle={styles.btn}
                        MyIcon={<Icon name={"checkcircle"} color={"green"} />}
                    />
                    <Button
                        title={"8 Incorrect"}
                        textstyle={{ marginLeft: 10 }}
                        btnstyle={styles.btn}
                        MyIcon={<Entypo name={"circle-with-cross"} color={"red"} />}
                    />
                </View>
            </View>
            <Button title={"Rematch"}
                // onPress={() => {
                //     if (tournMent) {
                //         navigation.navigate("CongratesScreen", {
                //             congrat: true
                //         })
                //     }
                // }}
                textstyle={{
                    color: style.yellow
                }}
                btnstyle={styles.btn1} />
            {/* <View>
      <View style={{ alignItems: 'center' }}>
            <Text style={[styles.wingnTxt, {
                fontFamily: style.Regular,
                color: 'white',
                width: 300,
                textAlign: 'center', top: "15%"
            }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
            <View style={{ flexDirection: 'row', marginTop: "20%" }}>
                <Button
                title={"Test"}
                    textstyle={{ marginLeft: 10 }}
                    btnstyle={styles.btn}
                    MyIcon={<Icon name={"checkcircle"} color={"green"} />}
                />
                <Button
                title={"Test"}
                    textstyle={{ marginLeft: 10 }}
                    btnstyle={styles.btn}
                    MyIcon={<Entypo name={"circle-with-cross"} color={"red"} />}
                />
            </View>
             <View style={{ marginTop: '7%' }}>
                <Text style={[styles.wingnTxt, { textAlign: 'center' }]}>Wining Price</Text>
                <TouchableOpacity style={[styles.priceView, { marginTop: 20 }]}>
                    <Image source={require("../../../../Assets/4.png")} style={{ height: 15, width: 15, borderRadius: 45 }} />
                    <Text style={{ fontFamily: style.SemiBold, color: style.yellow, marginLeft: 10, fontSize: 20 }}>20,000</Text>
                </TouchableOpacity>
            </View> 
            <View style={{ marginTop: '7%' }}>
                <Text style={[styles.wingnTxt, { textAlign: 'center' }]}>Wining Price</Text>
                <TouchableOpacity style={[styles.priceView, { marginTop: 20 }]}>
                    <Image source={require("../../../../Assets/4.png")} style={{ height: 15, width: 15, borderRadius: 45 }} />
                    <Text style={{ fontFamily: style.SemiBold, color: style.yellow, marginLeft: 10, fontSize: 20 }}>20,000</Text>
                </TouchableOpacity>
            </View>

        </View>
           
                <View style={{ marginTop: 25 }}>
                    <Text style={[styles.wingnTxt, {
                        textAlign: 'center',
                        marginLeft: 0,
                    }]}>Wining Price</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Questionscreen", { tournMent, leagueStatus })} style={[styles.priceView, { marginTop: '10%' }]}>
                        <Image source={require("../../../../Assets/4.png")} style={{ height: 22, width: 22, borderRadius: 45 }} />
                        <Text style={{ fontFamily: style.Bold, color: style.yellow, marginLeft: 10, fontSize: 24 }}>20,000</Text>
                    </TouchableOpacity>
                </View>
               <View style={{ marginTop: 25 }}>
                    <Text style={[styles.wingnTxt, {
                        textAlign: 'center',
                        marginLeft: 0,
                    }]}>Wining Price</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Questionscreen", { tournMent, leagueStatus })} style={[styles.priceView, { marginTop: '10%' }]}>
                        <Image source={require("../../../../Assets/4.png")} style={{ height: 22, width: 22, borderRadius: 45 }} />
                        <Text style={{ fontFamily: style.Bold, color: style.yellow, marginLeft: 10, fontSize: 24 }}>20,000</Text>
                    </TouchableOpacity>
                </View> 


    </View> */}
        </ImageBackground>
    )
}

export default Screen1


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn1: {
        backgroundColor: null,
        borderWidth: 1,
        marginTop:'10%',
        borderColor: style.yellow
    
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
        color: '#fff', padding: 12
    }
})