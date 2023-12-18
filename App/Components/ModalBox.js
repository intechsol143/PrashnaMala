import { StyleSheet, Text, View, Alert, Image } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import { style } from '../Constants';
import Button from './Button';
import Icon from 'react-native-vector-icons/Entypo'
import { SetMilestoneRefresh, SetQcounterRefres, SetRepeateIndexData } from '../Redux/actions/appactions/Index';
import { useDispatch, useSelector } from 'react-redux';
import { _ToLeavegame, _ToLeaveTournamentgame } from '../Utils/Apis';
const ModalBox = ({ handlemodal,
    navigation,
    handleModal,
    test,
    test2,
    bank,
    alert,
    gameClose,
    item,
    coin_id,
    box_id,
    tournamentId,
    testL }) => {

    const { user, saveTitles } = useSelector(({ appReducer }) => appReducer);
    console.log("my tournament Id", tournamentId)
    const dispatch = useDispatch()
    const apiToken = user?.token;

    const _Leavegame = () => {
        const userdata = new FormData()
        userdata.append("league_id", box_id)
        userdata.append("coin_id", coin_id)
        _ToLeavegame({ userdata, apiToken }).then((responce) => {
            if (responce.status == "success") {
                handleModal(!handlemodal)
                navigation.navigate("Tab")
            }
        }).catch((error) => {
        })

    }
    const _LeaveTournamentgame = () => {
        const userdata = new FormData()
        userdata.append("box_id", box_id)
        userdata.append("tournament_id", tournamentId)
        _ToLeaveTournamentgame({ userdata, apiToken }).then((responce) => {
            console.log("responce of leave",responce)
            if (responce.status == "success") {
                handleModal(!handlemodal)
                navigation.navigate("Tab")
            }
        }).catch((error) => {
            console.log("err-----",error.response)
        })

    }

    return (
        <>
            <Modal
                style={{
                    margin: 0,
                    paddingHorizontal: 24,
                    backgroundColor: 'rgba(0,0,0,.4)'
                }}
                isVisible={handlemodal}>
                {test ? <View style={styles.modalContainer}>
                    <View style={styles.paymentCard1}>
                        <View style={{ flex: 1, width: '100%', paddingHorizontal: 12 }}>
                            <View style={{
                                flexDirection: 'row',
                                paddingTop: 20,
                                paddingHorizontal: 12,
                                alignItems: 'center', justifyContent: 'space-between',
                                padding: 12
                            }}>
                                <Text style={{ fontSize: 18, color: '#000', fontFamily: style.SemiBold }}>Audiunce Poll</Text>
                                <Icon onPress={() => handleModal(!handlemodal)} name={"cross"} size={24} color={"#979797"} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <View style={{
                                    height: 30,
                                    borderRadius: 20,
                                    marginVertical: 6,
                                    width: "100%",
                                    backgroundColor: "#E9EEF0"
                                }}>
                                    <View style={{
                                        height: 30,
                                        justifyContent: 'center',
                                        backgroundColor: style.yellow,
                                        borderRadius: 20,
                                        // paddingHorizontal:12,
                                        width: `${item.lfl_audience_option1}%`
                                    }}>
                                        <Text style={{

                                            fontFamily: style.SemiBold, color: '#000', fontSize: 16
                                        }}>{`A.${item.lfl_audience_option1}`}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    height: 30,
                                    borderRadius: 20,
                                    marginVertical: 6,
                                    backgroundColor: "#E9EEF0"
                                }}>
                                    <View style={{
                                        height: 30,
                                        justifyContent: 'center',
                                        backgroundColor: style.yellow,
                                        borderRadius: 20,
                                        width: item?.lfl_audience_option2
                                    }}>
                                        <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>{`B.${item.lfl_audience_option2}`}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    height: 30,
                                    borderRadius: 20,
                                    marginVertical: 6,
                                    backgroundColor: "#E9EEF0"
                                }}>
                                    <View style={{
                                        height: 30,
                                        justifyContent: 'center',
                                        backgroundColor: style.yellow,
                                        borderRadius: 20,
                                        width: item.lfl_audience_option3
                                    }}>
                                        <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>{`C.${item?.lfl_audience_option3}`}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    height: 30,
                                    borderRadius: 20,
                                    marginVertical: 6,
                                    backgroundColor: "#E9EEF0"
                                }}>
                                    <View style={{
                                        height: 30,
                                        justifyContent: 'center',
                                        backgroundColor: style.yellow,
                                        borderRadius: 20,
                                        paddingHorizontal: 12,
                                        width: item?.lfl_audience_option4 + 40
                                    }}>
                                        <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>{`D.${item?.lfl_audience_option4}`}</Text>
                                    </View>
                                </View>
                                {/* {["1", "2", "3", "4"].map((item, index) => {
                                    return (
                                        <View style={{
                                            height: 30,
                                            borderRadius: 20,
                                            marginVertical: 6,
                                            backgroundColor: "#E9EEF0"
                                        }}>
                                            <View style={{
                                                height: 30,
                                                justifyContent: 'center',
                                                backgroundColor: style.yellow,
                                                borderRadius: 20,
                                                paddingHorizontal: 12,
                                                width: index === 0 ? '80%' : index === 1 ? "38%" : index === 2 ? "34%" : index === 3 ? "30%" : 0
                                            }}>
                                                <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>{index === 0 ? "A. 80%" : index === 1 ? "B. 20%" : index === 2 ? "C. 30%" : index === 3 ? "D. 25%" : null}</Text>
                                            </View>
                                        </View>
                                    )
                                })} */}

                            </View>
                        </View>

                    </View>
                </View> : test2 ?
                    <View style={styles.modalContainer}>
                        <View style={[styles.paymentCard1, { height: 370 }]}>
                            <View style={{ flex: 1, width: '100%', paddingHorizontal: 12, paddingTop: 10 }}>
                                <View style={{
                                    flexDirection: 'row', alignItems: 'center',
                                    justifyContent: 'space-between', padding: 12
                                }}>
                                    <Text style={{ fontSize: 18, color: '#000', fontFamily: style.SemiBold }}>Expert Opinion</Text>
                                    <Icon onPress={() => handleModal(!handlemodal)} name={"cross"} size={24} color={"#979797"} />
                                </View>
                                <View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                                        <Image source={{ uri: item?.lfl_expert_image }} style={{
                                            height: 120,
                                            borderWidth: 2,
                                            borderColor: '#979797',
                                            borderRadius: 60, width: 120
                                        }} />
                                        <Text style={{ fontSize: 16, color: '#000', fontFamily: style.Bold, marginTop: 12 }}>{item?.lfl_expert_name}</Text>
                                        <Text style={{ fontSize: 16, color: style.btnColor, fontFamily: style.SemiBold }}>Expert</Text>
                                        <Button
                                            title={item?.correct_option == 1 ? `A.${item?.lfl_expert_answer}` : item?.correct_option == 2 ? `B.${item?.lfl_expert_answer}` : item?.correct_option == 3 ? `C.${item?.lfl_expert_answer}` : item?.correct_option == 4 ? `D.${item?.lfl_expert_answer}` : null}
                                            onPress={() => handleModal(!handlemodal)}
                                            btnstyle={{ height: 45, marginTop: 40 }}
                                        />
                                    </View>
                                </View>

                            </View>

                        </View>
                    </View> :
                    bank ? <View style={styles.modalContainer}>
                        <View style={[styles.paymentCard1, { height: 290 }]}>
                            <View style={{ flex: 1, width: '100%', paddingHorizontal: 12, }}>
                                <View style={{
                                    flexDirection: 'row',
                                    //  alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingVertical: 5
                                }}>
                                    {/* <Text style={{ fontSize: 18, color: '#000', fontFamily: style.SemiBold }}>Bank Detail</Text>
                                    <Icon onPress={() => handleModal(!handlemodal)} name={"cross"} size={24} color={"#979797"} /> */}
                                </View>
                                <View>
                                    <View style={{
                                        justifyContent: 'center',
                                        // backgroundColor:'red',
                                        alignItems: 'center',
                                    }}>
                                        <Image source={require('../Assets/price.png')} style={{
                                            height: 100,
                                            resizeMode: 'contain',
                                            borderColor: '#979797',
                                            width: 100
                                        }} />
                                        <Text style={{ fontSize: 16, color: '#000', fontFamily: style.Bold, marginTop: 12 }}>Congratulation!</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: style.silver,
                                            top: 10,
                                            width: 270,

                                            fontFamily: style.Medium, textAlign: 'center'
                                        }}>Your cash prize has been deposited to your account.</Text>
                                        <Button
                                            title={"Ok Great!"}
                                            onPress={() => {
                                                handleModal(!handlemodal)
                                                SetRepeateIndexData(null)(dispatch)
                                                navigation.navigate("Tab")
                                            }}
                                            btnstyle={{ height: 45, marginTop: "15%" }}
                                        />
                                    </View>
                                </View>

                            </View>

                        </View>
                    </View> :

                        alert ?
                            <View style={styles.modalContainer}>
                                <View style={styles.paymentCard}>
                                    <Text style={styles.txt}>Are you sure you want to leave?</Text>
                                    <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                        <Button onPress={() => {
                                            handleModal(!handlemodal)
                                            SetMilestoneRefresh(1)(dispatch)
                                            SetQcounterRefres(1)(dispatch)
                                            navigation.navigate("OOpscreens")
                                        }} title={"Leave"}
                                            textstyle={{ color: '#fff' }}
                                            btnstyle={{
                                                width: 120, height: 50,
                                                borderRadius: 30,
                                                backgroundColor: style.btnColor
                                            }} />
                                        <Button onPress={() => {
                                            handleModal(!handlemodal)

                                        }} title={"Keep Playing"} btnstyle={{
                                            backgroundColor: style.green,
                                            width: 120, height: 50,
                                            borderRadius: 30,

                                        }} />
                                    </View>
                                </View>
                            </View> : !testL ?
                                <View style={styles.modalContainer}>
                                    <View style={styles.paymentCard}>
                                        <Text style={[styles.txt, { width: 240 }]}>Your Opponent will win if you leave!</Text>
                                        <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                            <Button onPress={() => {
                                                if (gameClose == true) {
                                                    _Leavegame()

                                                } else if (saveTitles == "Tournament") {
                                                    _LeaveTournamentgame()
                                                } else {
                                                    handleModal(!handlemodal)
                                                    SetMilestoneRefresh(1)(dispatch)
                                                    SetQcounterRefres(1)(dispatch)
                                                    navigation.navigate("Tab")
                                                }



                                            }} title={"Leave"}
                                                textstyle={{ color: '#fff' }}
                                                btnstyle={{
                                                    width: 120, height: 50,
                                                    borderRadius: 30,
                                                    backgroundColor: style.btnColor
                                                }} />
                                            <Button onPress={() => {
                                                handleModal(!handlemodal)

                                            }} title={"Keep Playing"} btnstyle={{
                                                backgroundColor: style.green,
                                                width: 120, height: 50,
                                                borderRadius: 30,

                                            }} />
                                        </View>
                                    </View>
                                </View> :
                                <View style={styles.modalContainer}>
                                    <View style={styles.paymentCard}>
                                        <Text style={styles.txt}>Are you sure you want to buy?</Text>
                                        <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                            <Button onPress={() => handleModal(!handlemodal)} title={"NO"}
                                                textstyle={{ color: '#979797' }}
                                                btnstyle={{ width: 100, height: 40, backgroundColor: 'lightgrey' }} />
                                            <Button onPress={() => {
                                                handleModal(!handlemodal)
                                                Alert.alert(
                                                    "Are you sure",
                                                    "Payment will be called from there sdk so wait plz?",
                                                    [
                                                        {
                                                            text: "Cancel",
                                                            onPress: () => console.log("Cancel Pressed"),
                                                            style: "cancel"
                                                        },
                                                        { text: "OK", onPress: () => console.log("ok") }
                                                    ]
                                                )
                                            }} title={"Yes"} btnstyle={{ width: 100, height: 40, }} />
                                        </View>
                                    </View>
                                </View>}
            </Modal>
        </>
    )
}

export default ModalBox

const styles = StyleSheet.create({
    txt: {
        color: 'black',
        fontSize: 18,
        width: 200,
        textAlign: 'center',

        fontFamily: style.Bold
    },
    paymentCard: {
        height: 200, backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center', borderRadius: 15
    },
    paymentCard1: {
        height: 270,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 15
    },
    modalContainer: {
        flex: 1,
        // backgroundColor:'rgba(1,0,1,.7)',
        // opacity:.2,
        justifyContent: 'center'
    }
})