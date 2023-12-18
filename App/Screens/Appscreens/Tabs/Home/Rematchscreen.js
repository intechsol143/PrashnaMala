import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
const bgImg = require("../../../../Assets/bg3.png")
const bgImg2 = require("../../../../Assets/cong1.png")
import IconBack from 'react-native-vector-icons/Entypo'
import WiningComp from '../../../../Components/WiningComp'
import Button from '../../../../Components/Button'
import { style } from '../../../../Constants'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

import { SetTooclose, SetRepeateIndexData } from '../../../../Redux/actions/appactions/Index'
const Rematchscreen = ({ navigation, route }) => {
    const { tooClose } = useSelector(({ appReducer }) => appReducer);
    const dispatch = useDispatch()
    const [rematchHandler, setrematchHandler] = useState(false)
    const [rematchHandler2, setrematchHandler2] = useState(false)
    return (
        <ImageBackground source={rematchHandler2 ? bgImg2 : rematchHandler ? bgImg2 : tooClose === "YouWon" ? bgImg2 : bgImg} style={styles.container}>
            <TouchableOpacity style={{
                justifyContent: 'flex-end', alignSelf: 'flex-end'
            }}>
                <IconBack name='cross'
                    onPress={() => {
                        navigation.goBack()
                        setrematchHandler(false)
                        setrematchHandler2(false)
                    }}
                    color={"white"} size={32} style={{ top: 30, marginRight: 20 }} />
            </TouchableOpacity>
            <View style={styles.itemsContainer}>
                <View style={styles.matchContainer}>

                    {tooClose === "leaGueRematch2" ?
                        !rematchHandler2 ?
                            <View style={styles.container}>
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
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={[styles.wingnTxt, { fontSize: 24, fontFamily: style.Bold }]}>
                                        {"Congratulations!"}
                                    </Text>

                                    <Text style={[styles.wingnTxt, {
                                        fontFamily: style.Regular,
                                        color: 'white',
                                        width: 300,
                                        textAlign: 'center', top: "15%"
                                    }]}>Lorem ipsum dolor sit elit adipiscing consectetur adipiscing elit.</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: "10%" }}>
                                    <View>
                                        <View style={{
                                            height: 30,
                                            top: 10,
                                            borderRadius: 20,
                                            opacity: .3,
                                            backgroundColor: '#959ca6',
                                            width: 130,
                                        }} />
                                        <Button
                                            title={"2 Correct"}
                                            textstyle={{ right: 10 }}
                                            btnstyle={{
                                                width: 130,
                                                height: 30,

                                                position: 'absolute',
                                                backgroundColor: null
                                            }}
                                            MyIcon={<Image source={require("../../../../Assets/check.png")} style={{
                                                height: 20,
                                                right: 16,

                                                width: 20, resizeMode: 'contain'
                                            }} />}
                                        />
                                    </View>
                                    <View style={{ marginLeft: 6 }}>
                                        <View style={{
                                            height: 30,
                                            top: 10,
                                            borderRadius: 20,
                                            opacity: .3,
                                            backgroundColor: '#959ca6',
                                            width: 130,
                                        }} />
                                        <Button
                                            title={"8 Incorrect"}
                                            textstyle={{ right: 4 }}
                                            btnstyle={{
                                                width: 130,
                                                height: 30,

                                                position: 'absolute',
                                                backgroundColor: null
                                            }}
                                            MyIcon={<Image source={require("../../../../Assets/cross1.png")} style={{
                                                height: 20,
                                                right: 10,

                                                width: 20, resizeMode: 'contain'
                                            }} />}
                                        />
                                    </View>

                                </View>
                                <Text style={[styles.wingnTxt, {
                                    top: 6,
                                    marginTop: '15%',
                                    fontSize: 14, fontFamily: style.SemiBold
                                }]}>
                                    {"You Won"}
                                </Text>
                                <View style={{
                                    justifyContent: 'center', alignItems: 'center',
                                    marginTop: '10%'
                                }}>
                                    <View style={{
                                        height: 50, backgroundColor: 'black',
                                        opacity: .5,
                                        width: "50%",
                                        borderRadius: 25
                                    }} />

                                    <View style={{
                                        height: 50,
                                        bottom: "23%",
                                        borderWidth: 1,
                                        borderColor: style.yellow,
                                        borderRadius: 25,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 12,
                                        width: "50%",
                                        position: 'absolute'
                                    }}>
                                        <Image source={require("../../../../Assets/4.png")} style={{ height: 35, width: 35, resizeMode: 'contain' }} />
                                        <Text style={{ fontSize: 16, fontFamily: style.Bold, color: style.yellow }}>250 Coins</Text>
                                    </View>
                                </View>


                                <Button title={"Rematch"}
                                    onPress={() => setrematchHandler2(true)}
                                    textstyle={{
                                        color: style.yellow
                                    }}
                                    btnstyle={{
                                        backgroundColor: null,
                                        borderWidth: 1,
                                        // marginTop:30,
                                        width: "70%",
                                        top: "20%",
                                        borderColor: style.yellow
                                    }}
                                />



                            </View> : <View style={styles.container}>
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
                                        <View style={[styles.imgStyler, { borderColor: style.yellow }]}>
                                            <Image source={{ uri: 'https://images.unsplash.com/photo-1602546005687-372f3c6455ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }} style={styles.imgs} />
                                        </View>
                                        <Text style={styles.nameTxt}>Talan George</Text>
                                        <View style={{
                                            height: 30,
                                            alignItems: 'center'
                                        }}>
                                            <Image source={require("../../../../Assets/curveIcon.png")} style={{
                                                width: 100,
                                                height: 30,
                                                tintColor: style.green,
                                                resizeMode: 'contain'
                                            }} />
                                            <View style={{ position: 'absolute', bottom: -8 }}>
                                                <Text style={styles.nameTxt}>Play Again</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Text style={[styles.vsTxt, { color: '#fff' }]}>VS</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("LooserProfile", { looser: false })

                                        }} style={{ alignItems: 'center', top: 8 }}>
                                        <View style={styles.imgStyler}>
                                            <Image source={{ uri: 'https://images.unsplash.com/photo-1605192554106-d549b1b975cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }} style={styles.imgs} />
                                        </View>
                                        <Text style={styles.nameTxt}>Randy Lipshurtz</Text>
                                        <View style={{ height: 30, alignItems: 'center' }}>
                                            <Image source={require("../../../../Assets/curveIcon.png")} style={{
                                                width: 100,
                                                height: 30,
                                                tintColor: 'grey',
                                                resizeMode: 'contain'
                                            }} />
                                            <View style={{ position: 'absolute', bottom: -5 }}>
                                                <Text style={styles.nameTxt}>...</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ alignItems: 'center', marginTop: 8 }}>
                                    <Text style={[styles.wingnTxt, { fontSize: 20, fontFamily: style.Bold }]}>
                                        {"Congratulations!"}
                                    </Text>
                                    <Text style={[styles.wingnTxt, {
                                        fontFamily: style.Regular,
                                        color: 'white',
                                        width: 300,
                                        textAlign: 'center', top: "15%"
                                    }]}>Lorem ipsum dolor sit elit adipiscing consectetur adipiscing elit.</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: "10%" }}>
                                    <View>
                                        <View style={{
                                            height: 30,
                                            top: 10,
                                            borderRadius: 20,
                                            opacity: .3,
                                            backgroundColor: '#959ca6',
                                            width: 130,
                                        }} />
                                        <Button
                                            title={"2 Correct"}
                                            textstyle={{ right: 10 }}
                                            btnstyle={{
                                                width: 130,
                                                height: 30,

                                                position: 'absolute',
                                                backgroundColor: null
                                            }}
                                            MyIcon={<Image source={require("../../../../Assets/check.png")} style={{
                                                height: 20,
                                                right: 16,

                                                width: 20, resizeMode: 'contain'
                                            }} />}
                                        />
                                    </View>
                                    <View style={{ marginLeft: 6 }}>
                                        <View style={{
                                            height: 30,
                                            top: 10,
                                            borderRadius: 20,
                                            opacity: .3,
                                            backgroundColor: '#959ca6',
                                            width: 130,
                                        }} />
                                        <Button
                                            title={"8 Incorrect"}
                                            textstyle={{ right: 4 }}
                                            btnstyle={{
                                                width: 130,
                                                height: 30,

                                                position: 'absolute',
                                                backgroundColor: null
                                            }}
                                            MyIcon={<Image source={require("../../../../Assets/cross1.png")} style={{
                                                height: 20,
                                                right: 10,

                                                width: 20, resizeMode: 'contain'
                                            }} />}
                                        />
                                    </View>
                                    {/* <Button
                                        title={"8 Incorrect"}
                                        textstyle={{ marginLeft: 10 }}
                                        btnstyle={styles.btn}
                                       

                                    /> */}
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={[styles.wingnTxt, {
                                        top: 6,
                                        marginTop: '15%',

                                        fontSize: 14, fontFamily: style.Bold
                                    }]}>
                                        {"You Won!"}
                                    </Text>

                                    <View style={{
                                        justifyContent: 'center', alignItems: 'center',
                                        marginTop: '10%'
                                    }}>
                                        <View style={{
                                            height: 50, backgroundColor: 'black',
                                            opacity: .5,
                                            width: "50%",
                                            borderRadius: 25
                                        }} />

                                        <View style={{
                                            height: 50,
                                            bottom: "23%",
                                            borderWidth: 1,
                                            borderColor: style.yellow,
                                            borderRadius: 25,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 12,
                                            width: "50%",
                                            position: 'absolute'
                                        }}>
                                            <Image source={require("../../../../Assets/4.png")} style={{ height: 35, width: 35, resizeMode: 'contain' }} />
                                            <Text style={{ fontSize: 16, fontFamily: style.Bold, color: style.yellow }}>250 Coins</Text>
                                        </View>
                                    </View>
                                </View>
                            </View> :


                        tooClose === "tooclose" ?
                            <View style={styles.container}>
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
                                        <View style={[styles.imgStyler, { borderColor: style.yellow }]}>
                                            <Image source={{ uri: 'https://images.unsplash.com/photo-1602546005687-372f3c6455ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }} style={styles.imgs} />
                                        </View>
                                        <Text style={styles.nameTxt}>Talan George</Text>

                                    </View>
                                    <Text style={[styles.vsTxt, { color: '#fff' }]}>VS</Text>
                                    <TouchableOpacity
                                        onPress={() => {

                                        }} style={{ alignItems: 'center', top: 10 }}>
                                        <View style={styles.imgStyler}>
                                            <Image source={{ uri: 'https://images.unsplash.com/photo-1605192554106-d549b1b975cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }} style={styles.imgs} />
                                        </View>
                                        <Text style={styles.nameTxt}>Randy Lipshurtz</Text>

                                    </TouchableOpacity>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={[styles.wingnTxt, { fontSize: 24, fontFamily: style.Bold }]}>
                                        {"You were to close"}
                                    </Text>
                                    <Text style={[styles.wingnTxt, {
                                        fontFamily: style.Regular,
                                        color: 'white',
                                        width: 300,
                                        textAlign: 'center', top: "15%"
                                    }]}>Lorem ipsum dolor sit elit adipiscing consectetur adipiscing elit.</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: "10%" }}>
                                    <View>
                                        <View style={{
                                            height: 30,
                                            top: 10,
                                            borderRadius: 20,
                                            opacity: .3,
                                            backgroundColor: '#959ca6',
                                            width: 130,
                                        }} />
                                        <Button
                                            title={"2 Correct"}
                                            textstyle={{ right: 10 }}
                                            btnstyle={{
                                                width: 130,
                                                height: 30,

                                                position: 'absolute',
                                                backgroundColor: null
                                            }}
                                            MyIcon={<Image source={require("../../../../Assets/check.png")} style={{
                                                height: 20,
                                                right: 16,

                                                width: 20, resizeMode: 'contain'
                                            }} />}
                                        />
                                    </View>
                                    <View style={{ marginLeft: 6 }}>
                                        <View style={{
                                            height: 30,
                                            top: 10,
                                            borderRadius: 20,
                                            opacity: .3,
                                            backgroundColor: '#959ca6',
                                            width: 130,
                                        }} />
                                        <Button
                                            title={"8 Incorrect"}
                                            textstyle={{ right: 4 }}
                                            btnstyle={{
                                                width: 130,
                                                height: 30,

                                                position: 'absolute',
                                                backgroundColor: null
                                            }}
                                            MyIcon={<Image source={require("../../../../Assets/cross1.png")} style={{
                                                height: 20,
                                                right: 10,

                                                width: 20, resizeMode: 'contain'
                                            }} />}
                                        />
                                    </View>
                                    {/* <Button
                                        title={"8 Incorrect"}
                                        textstyle={{ marginLeft: 10 }}
                                        btnstyle={styles.btn}
                                       

                                    /> */}
                                </View>

                                <Button title={"Go to Home"}
                                    onPress={() => {
                                        navigation.navigate("Tab")
                                        SetTooclose(null)(dispatch)

                                    }}

                                    textstyle={{
                                        color: style.yellow
                                    }}
                                    btnstyle={styles.btn1} />


                            </View>


                            : tooClose == "toNext" ?
                                <View style={styles.container}>
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
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={[styles.wingnTxt, { fontSize: 24, fontFamily: style.Bold }]}>
                                            {"Congratulations!"}
                                        </Text>
                                        <Text style={[styles.wingnTxt, {
                                            fontFamily: style.Regular,
                                            color: 'white',
                                            width: 300,
                                            textAlign: 'center', top: "15%"
                                        }]}>Lorem ipsum dolor sit elit adipiscing consectetur adipiscing elit.</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: "10%" }}>
                                        <View>
                                            <View style={{
                                                height: 30,
                                                top: 10,
                                                borderRadius: 20,
                                                opacity: .3,
                                                backgroundColor: '#959ca6',
                                                width: 130,
                                            }} />
                                            <Button
                                                title={"2 Correct"}
                                                textstyle={{ right: 10 }}
                                                btnstyle={{
                                                    width: 130,
                                                    height: 30,

                                                    position: 'absolute',
                                                    backgroundColor: null
                                                }}
                                                MyIcon={<Image source={require("../../../../Assets/check.png")} style={{
                                                    height: 20,
                                                    right: 16,

                                                    width: 20, resizeMode: 'contain'
                                                }} />}
                                            />
                                        </View>
                                        <View style={{ marginLeft: 6 }}>
                                            <View style={{
                                                height: 30,
                                                top: 10,
                                                borderRadius: 20,
                                                opacity: .3,
                                                backgroundColor: '#959ca6',
                                                width: 130,
                                            }} />
                                            <Button
                                                title={"8 Incorrect"}
                                                textstyle={{ right: 4 }}
                                                btnstyle={{
                                                    width: 130,
                                                    height: 30,

                                                    position: 'absolute',
                                                    backgroundColor: null
                                                }}
                                                MyIcon={<Image source={require("../../../../Assets/cross1.png")} style={{
                                                    height: 20,
                                                    right: 10,

                                                    width: 20, resizeMode: 'contain'
                                                }} />}
                                            />
                                        </View>
                                        {/* <Button
                                        title={"8 Incorrect"}
                                        textstyle={{ marginLeft: 10 }}
                                        btnstyle={styles.btn}
                                       

                                    /> */}
                                    </View>

                                    <Button title={"Go to Next Round"}
                                        onPress={() => {
                                            navigation.goBack()
                                            SetRepeateIndexData({
                                                title: "Tournament",
                                                idx: "cCount",

                                            })(dispatch)
                                            SetTooclose(null)(dispatch)

                                        }}

                                        textstyle={{
                                            color: style.yellow
                                        }}
                                        btnstyle={styles.btn1} />


                                </View>
                                : tooClose === "YouWon" ? <View style={styles.container}>
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
                                            <View style={[styles.imgStyler, { borderColor: style.yellow }]}>
                                                <Image source={{ uri: 'https://images.unsplash.com/photo-1602546005687-372f3c6455ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }} style={styles.imgs} />
                                            </View>
                                            <Text style={styles.nameTxt}>Talan George</Text>

                                        </View>
                                        <Text style={[styles.vsTxt, { color: '#fff' }]}>VS</Text>
                                        <TouchableOpacity
                                            onPress={() => {

                                            }} style={{ alignItems: 'center', top: 10 }}>
                                            <View style={styles.imgStyler}>
                                                <Image source={{ uri: 'https://images.unsplash.com/photo-1605192554106-d549b1b975cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }} style={styles.imgs} />
                                            </View>
                                            <Text style={styles.nameTxt}>Randy Lipshurtz</Text>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={[styles.wingnTxt, { fontSize: 24, fontFamily: style.Bold }]}>
                                            {"Congratulations!"}
                                        </Text>

                                        <Text style={[styles.wingnTxt, {
                                            fontFamily: style.Regular,
                                            color: 'white',
                                            width: 300,
                                            textAlign: 'center', top: "15%"
                                        }]}>Lorem ipsum dolor sit elit adipiscing consectetur adipiscing elit.</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: "10%" }}>
                                        <View>
                                            <View style={{
                                                height: 30,
                                                top: 10,
                                                borderRadius: 20,
                                                opacity: .3,
                                                backgroundColor: '#959ca6',
                                                width: 130,
                                            }} />
                                            <Button
                                                title={"2 Correct"}
                                                textstyle={{ right: 10 }}
                                                btnstyle={{
                                                    width: 130,
                                                    height: 30,

                                                    position: 'absolute',
                                                    backgroundColor: null
                                                }}
                                                MyIcon={<Image source={require("../../../../Assets/check.png")} style={{
                                                    height: 20,
                                                    right: 16,

                                                    width: 20, resizeMode: 'contain'
                                                }} />}
                                            />
                                        </View>
                                        <View style={{ marginLeft: 6 }}>
                                            <View style={{
                                                height: 30,
                                                top: 10,
                                                borderRadius: 20,
                                                opacity: .3,
                                                backgroundColor: '#959ca6',
                                                width: 130,
                                            }} />
                                            <Button
                                                title={"8 Incorrect"}
                                                textstyle={{ right: 4 }}
                                                btnstyle={{
                                                    width: 130,
                                                    height: 30,

                                                    position: 'absolute',
                                                    backgroundColor: null
                                                }}
                                                MyIcon={<Image source={require("../../../../Assets/cross1.png")} style={{
                                                    height: 20,
                                                    right: 10,

                                                    width: 20, resizeMode: 'contain'
                                                }} />}
                                            />
                                        </View>

                                    </View>
                                    <Text style={[styles.wingnTxt, {
                                        top: "4%",
                                        marginTop: '15%',
                                        fontSize: 14, fontFamily: style.Bold
                                    }]}>
                                        {"You Won"}
                                    </Text>
                                    <View style={{ alignItems: 'center', marginTop: '10%' }}>

                                        <View style={{
                                            height: 50,
                                            opacity: .2,
                                            backgroundColor: 'black',
                                            width: 200,
                                            borderRadius: 25
                                        }} />

                                        <View style={{
                                            height: 50,
                                            borderWidth: 1,
                                            borderColor: style.yellow,
                                            borderRadius: 25,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 12,
                                            width: 200,
                                            position: 'absolute'
                                        }}>
                                            <Image source={require("../../../../Assets/4.png")} style={{ height: 35, width: 35, resizeMode: 'contain' }} />
                                            <Text style={{ fontSize: 25, fontFamily: style.Bold, color: style.yellow }}>1000 coins</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', top: '22%' }}>
                                        <View style={{
                                            height: 50,
                                            backgroundColor: style.yellow,
                                            opacity: .2,
                                            width: '45%', alignSelf: 'center', borderRadius: 30
                                        }} />
                                        <Button title={"Next Tournament"}
                                            onPress={() => {
                                                navigation.navigate("Tournament")
                                                SetTooclose(null)(dispatch)
                                                SetRepeateIndexData(null)(dispatch)
                                            }}
                                            textstyle={{
                                                color: style.yellow
                                            }}
                                            btnstyle={{
                                                backgroundColor: null,
                                                borderWidth: 1,
                                                left: -10,
                                                height: 50,
                                                width: "45%",
                                                // right:0,
                                                position: 'absolute',
                                                borderColor: style.yellow
                                            }} />
                                        <View style={{ flex: 1 }}>
                                            <View style={{
                                                height: 50,
                                                backgroundColor: style.yellow,
                                                opacity: .2,

                                                width: '90%',
                                                alignSelf: 'center', borderRadius: 30
                                            }} />
                                            <Button title={"Go to Home"}
                                                onPress={() => {
                                                    navigation.navigate("Tab")
                                                    SetTooclose(null)(dispatch)
                                                    SetRepeateIndexData(null)(dispatch)

                                                }}

                                                textstyle={{
                                                    color: style.yellow
                                                }}
                                                btnstyle={{
                                                    backgroundColor: null,
                                                    borderWidth: 1,
                                                    position: 'absolute',
                                                    width: "90%",
                                                    height: 50,
                                                    top: -9,
                                                    borderColor: style.yellow
                                                }}
                                            />
                                        </View>
                                    </View>



                                </View> : tooClose === "leaGueRematch" && !rematchHandler ?
                                    <View style={styles.container}>
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
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={[styles.wingnTxt, { fontSize: 24, fontFamily: style.Bold }]}>
                                                {"You were to close"}
                                            </Text>
                                            <Text style={[styles.wingnTxt, {
                                                fontFamily: style.Regular,
                                                color: 'white',
                                                width: 300,
                                                textAlign: 'center', top: "15%"
                                            }]}>Lorem ipsum dolor sit elit adipiscing consectetur adipiscing elit.</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: "10%" }}>
                                            <View>
                                                <View style={{
                                                    height: 30,
                                                    top: 10,
                                                    borderRadius: 20,
                                                    opacity: .3,
                                                    backgroundColor: '#959ca6',
                                                    width: 130,
                                                }} />
                                                <Button
                                                    title={"2 Correct"}
                                                    textstyle={{ right: 10 }}
                                                    btnstyle={{
                                                        width: 130,
                                                        height: 30,

                                                        position: 'absolute',
                                                        backgroundColor: null
                                                    }}
                                                    MyIcon={<Image source={require("../../../../Assets/check.png")} style={{
                                                        height: 20,
                                                        right: 16,

                                                        width: 20, resizeMode: 'contain'
                                                    }} />}
                                                />
                                            </View>
                                            <View style={{ marginLeft: 6 }}>
                                                <View style={{
                                                    height: 30,
                                                    top: 10,
                                                    borderRadius: 20,
                                                    opacity: .3,
                                                    backgroundColor: '#959ca6',
                                                    width: 130,
                                                }} />
                                                <Button
                                                    title={"8 Incorrect"}
                                                    textstyle={{ right: 4 }}
                                                    btnstyle={{
                                                        width: 130,
                                                        height: 30,

                                                        position: 'absolute',
                                                        backgroundColor: null
                                                    }}
                                                    MyIcon={<Image source={require("../../../../Assets/cross1.png")} style={{
                                                        height: 20,
                                                        right: 10,

                                                        width: 20, resizeMode: 'contain'
                                                    }} />}
                                                />
                                            </View>
                                            {/* <Button
                                        title={"8 Incorrect"}
                                        textstyle={{ marginLeft: 10 }}
                                        btnstyle={styles.btn}
                                       

                                    /> */}
                                        </View>

                                        <Button title={"Rematch"}
                                            onPress={() => {
                                                setrematchHandler(true)
                                            }}
                                            textstyle={{
                                                color: style.yellow
                                            }}
                                            btnstyle={styles.btn1} />


                                    </View> :
                                    <View style={styles.container}>
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
                                                <View style={[styles.imgStyler, { borderColor: style.yellow }]}>
                                                    <Image source={{ uri: 'https://images.unsplash.com/photo-1602546005687-372f3c6455ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }} style={styles.imgs} />
                                                </View>
                                                <Text style={styles.nameTxt}>Talan George</Text>
                                                <View style={{
                                                    height: 30,
                                                    alignItems: 'center'
                                                }}>
                                                    <Image source={require("../../../../Assets/curveIcon.png")} style={{
                                                        width: 100,
                                                        height: 30,
                                                        tintColor: style.green,
                                                        resizeMode: 'contain'
                                                    }} />
                                                    <View style={{ position: 'absolute', bottom: -8 }}>
                                                        <Text style={styles.nameTxt}>Play Again</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <Text style={[styles.vsTxt, { color: '#fff' }]}>VS</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate("LooserProfile", { looser: false })

                                                }} style={{ alignItems: 'center' }}>
                                                <View style={styles.imgStyler}>
                                                    <Image source={{ uri: 'https://images.unsplash.com/photo-1605192554106-d549b1b975cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }} style={styles.imgs} />
                                                </View>
                                                <Text style={styles.nameTxt}>Randy Lipshurtz</Text>
                                                <View style={{ height: 30, alignItems: 'center' }}>
                                                    <Image source={require("../../../../Assets/curveIcon.png")} style={{
                                                        width: 100,
                                                        height: 30,
                                                        tintColor: 'grey',
                                                        resizeMode: 'contain'
                                                    }} />
                                                    <View style={{ position: 'absolute', bottom: -5 }}>
                                                        <Text style={styles.nameTxt}>...</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={[styles.wingnTxt, { fontSize: 24, fontFamily: style.Bold }]}>
                                                {"Congratulations!"}
                                            </Text>
                                            <Text style={[styles.wingnTxt, {
                                                fontFamily: style.Regular,
                                                color: 'white',
                                                width: 300,
                                                textAlign: 'center', top: "15%"
                                            }]}>Lorem ipsum dolor sit elit adipiscing consectetur adipiscing elit.</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: "10%" }}>
                                            <View>
                                                <View style={{
                                                    height: 30,
                                                    top: 10,
                                                    borderRadius: 20,
                                                    opacity: .3,
                                                    backgroundColor: '#959ca6',
                                                    width: 130,
                                                }} />
                                                <Button
                                                    title={"2 Correct"}
                                                    textstyle={{ right: 10 }}
                                                    btnstyle={{
                                                        width: 130,
                                                        height: 30,

                                                        position: 'absolute',
                                                        backgroundColor: null
                                                    }}
                                                    MyIcon={<Image source={require("../../../../Assets/check.png")} style={{
                                                        height: 20,
                                                        right: 16,

                                                        width: 20, resizeMode: 'contain'
                                                    }} />}
                                                />
                                            </View>
                                            <View style={{ marginLeft: 6 }}>
                                                <View style={{
                                                    height: 30,
                                                    top: 10,
                                                    borderRadius: 20,
                                                    opacity: .3,
                                                    backgroundColor: '#959ca6',
                                                    width: 130,
                                                }} />
                                                <Button
                                                    title={"8 Incorrect"}
                                                    textstyle={{ right: 4 }}
                                                    btnstyle={{
                                                        width: 130,
                                                        height: 30,

                                                        position: 'absolute',
                                                        backgroundColor: null
                                                    }}
                                                    MyIcon={<Image source={require("../../../../Assets/cross1.png")} style={{
                                                        height: 20,
                                                        right: 10,

                                                        width: 20, resizeMode: 'contain'
                                                    }} />}
                                                />
                                            </View>
                                            {/* <Button
                                        title={"8 Incorrect"}
                                        textstyle={{ marginLeft: 10 }}
                                        btnstyle={styles.btn}
                                       

                                    /> */}
                                   
                                        </View>
                                        <Text style={  {fontSize: 14,
                                            marginTop:'7%',
                                            fontFamily: style.Bold,
                                            top:"2%",
                                            color:style.white
                                            }}>
                                                {"You Won!"}
                                            </Text>
                                        <View style={{backgroundColor:'red',alignItems:'center',justifyContent:'center'}}>

                                            <View style={{
                                                height: 50,
                                                backgroundColor: 'black',
                                                opacity: .5,
                                                marginTop: 20,
                                                width:null,
                                            
                                                borderRadius: 25
                                            }} />

                                            <View style={{
                                                height: 50,
                                                bottom: 0,
                                                borderWidth: 1,
                                                borderRadius: 25,
                                                borderColor:style.yellow,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                paddingHorizontal: 12,
                                                width: null, position: 'absolute'
                                            }}>
                                                <Image source={require("../../../../Assets/4.png")} style={{ height: 35, width: 35, resizeMode: 'contain' }} />
                                                <Text style={{ fontSize: 32, fontFamily: style.Bold, color: style.yellow }}>250 Coins</Text>
                                            </View>
                                        </View>
                                    </View>
                    }

                </View>

            </View>
        </ImageBackground>
    )
}

export default Rematchscreen


const styles = StyleSheet.create({

    itemsContainer: {
        flex: 1,
        // backgroundColor: 'red'
    },
    container: {
        flex: 1,
        alignItems: 'center',
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