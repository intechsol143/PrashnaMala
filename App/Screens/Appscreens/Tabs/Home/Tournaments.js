import { StyleSheet, View, ImageBackground, Image, ScrollView, Alert, Text,TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Competitions from '../../../../Components/Competitions'
import Subheader from '../../../../Components/Subheader'
import { style } from '../../../../Constants'
import Button from '../../../../Components/Button'
import { checkTournamentuser, startTournament, setTournamentuser } from '../../../../Utils/Apis'
const PlayerImg = require("../../../../Assets/playerImg.png")
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../../Components/Loader'
import Modal from "react-native-modal";

import { SetBox, SetUser } from '../../../../Redux/actions/appactions/Index'
const Tournaments = ({ navigation, route }) => {
    const { box_id, item } = route.params;
    const { user, saveBox } = useSelector(({ appReducer }) => appReducer);
    const dispatch = useDispatch();
    const [playersData, setplayersData] = useState({})
    const [Loading, setLoading] = useState(false)
    const [routeData, setrouteData] = useState({})
    const [operant, setoperant] = useState(false)
    const [gifloader, setgifloader] = useState(true)
    const [storeOperantId, setstoreOperantId] = useState("")
    const [allowedUsertoPlay, setallowedUsertoPlay] = useState(false)
    const [gameStatus, setgameStatus] = useState("")
    const apiToken = user.token
    const funRef = useRef(null);
    const [insuficeint, setinsuficeint] = useState(false)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            funRef.current = setInterval(() => {
                _handleTournament()
            }, 5000);
            _handleTournament()
        });
        return unsubscribe;
    }, [navigation]);


    const _updateUsercoins = (result) => {
        let res = { ...user }
        let b = user.userdata.coin
        result.remaining_coin = b,
        SetUser(res)(dispatch)
    }
    const _handleTournament = () => {
        // setLoading(saveBox ? true : false)
        const userdata = new FormData();
        userdata.append("box_id", box_id)
        startTournament({ userdata, apiToken }).then((responce) => {
            // _updateUsercoins(responce)
            setLoading(false)
            setgameStatus(responce.tournament.game_status)
            // SetBox(false)(dispatch)

            setplayersData(responce.tournament)
            setallowedUsertoPlay(responce.is_allow)
            if (responce.operant) {
                setoperant(true)
                setgifloader(false)
                setrouteData(responce)
                setactiveTournament()
                setstoreOperantId(responce.operant.id)
            }
        }).catch((error) => {
            setLoading(false)
            setgifloader(true)
            if (error.response.data.message) {
                setinsuficeint(true)
            }
            console.log("error", error.response)
        })
    }

    const setactiveTournament = () => {
        const userdata = new FormData();
        userdata.append("box_id", box_id)
        setTournamentuser({ userdata, apiToken }).then((responce) => {
        }).catch((error) => {
            console.log("Error", error)
        })
    }

    const checkactiveTournament = (opId, b_id,tid) => {
        setLoading(true)
        const userdata = new FormData();
        userdata.append("box_id", b_id)
        userdata.append("operant_id", opId)
        userdata.append("tournament_id", tid)
        checkTournamentuser({ userdata, apiToken }).then((responce) => {
            setplayersData({})
            setLoading(false)
            if (operant == true) {
                navigation.navigate("WiningScreen", {
                    box_id,
                    playersData: routeData
                })
                clearInterval(funRef.current)
            }
            SetBox(true)(dispatch)

        }).catch((error) => {
            Alert.alert('Wait Please!', 'Your oponent is still unavailable', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            setLoading(false)
            console.log("Error", error.response)
        })
    }

    const _call = () => {
        clearInterval(funRef.current);
        navigation.replace("Tab")
    }

    return (
        <ImageBackground source={require("../../../../Assets/mode.png")} style={styles.container}>
            {Loading && <Loader />}
            <View style={{ paddingHorizontal: 12, marginTop: '5%' }}>
                <Subheader
                    headerTitle={"TT"}
                    title={"Tournament mode"}
                    amount={item.max_coin}
                    onPress={() => _call()}
                />
            </View>
            <ScrollView>
                <View style={{ height: 20 }} />
                <Competitions
                    data={playersData}
                    gifloader={gifloader}
                    coinsResult={item.max_coin}
                    navigation={navigation}
                />
                {allowedUsertoPlay && gameStatus != "completed" ? <Button
                    disabled={!operant ? true : false}
                    onPress={() => checkactiveTournament(storeOperantId, box_id,routeData?.tournament?.id)}
                    title={"Play"}
                    btnstyle={{
                        backgroundColor: style.green,
                        marginTop: 20,
                        marginBottom: 20
                    }}
                /> : null}
            </ScrollView>
                <Modal isVisible={insuficeint}>
                <TouchableWithoutFeedback onPress={() =>setinsuficeint(false)}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={styles.winnercard}>
                            <Text style={[styles.nameTxt1, {
                                fontSize: 18,
                                textAlign: 'center',
                                color: '#000'
                            }]}>Sorry You have insuficient coins!</Text>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                </Modal>
        </ImageBackground>

        // </View>
    )
}

export default Tournaments

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding:12,
        backgroundColor: 'black'
    },
    container2: {
        flex: 1,
        padding: 12,
    },
    bgimm: {
        height: "90%",
        marginTop: 20,
        width: "100%"
    },
    nameTxt1: {
        color: '#fff',
        fontFamily: style.SemiBold,
        fontSize: 12,
        paddingLeft: 6
    },
    subc: {
        flex: 1,
        // paddingTop: '5%',
    },
    winnercard: {
        paddingVertical: 12,
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
})