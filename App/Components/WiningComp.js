import {
    StyleSheet, Text, View, ImageBackground,
    BackHandler, Alert,
    Image, TouchableOpacity
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { style } from '../Constants'
import Button from './Button'
const bgImg = require("../Assets/bg1.png")
import { useSelector, useDispatch } from 'react-redux'
import firestore, { firebase } from '@react-native-firebase/firestore';
import { changeUserStatus, get_league_questions, get_Tournament_questions, startTournament, _getRandomUser } from '../Utils/Apis'
import { SetQues, SetRepeateIndexData, SetUser } from '../Redux/actions/appactions/Index'
const WiningComp = ({
    navigation,
    price,
    box_id,
    coin_id,
    Totalquestions,
    playersData,
}) => {

    // console.log("playersData",playersData.tournament.id)



    const { saveTitles, user, questionsList } = useSelector(({ appReducer }) => appReducer);
    const apiToken = user.token
    const dispatch = useDispatch()
    const [listData, setListData] = useState({});

    const funRef = useRef(null);
    const [gifloader, setgifloader] = useState(true)

    useEffect(() => {
        funRef.current = setInterval(() => {
            { saveTitles != "Tournament" ? getActiveusers() : null }
        }, 5000);
        { saveTitles != "Tournament" ? getActiveusers() : null }
    }, []);

    useEffect(() => {
        { saveTitles == "Tournament" ? _gettournament_Questions(playersData) : null }
    }, [])



    const getActiveusers = () => {
        const userdata = new FormData()
        userdata.append("box_id", box_id)
        userdata.append("coin_id", coin_id)
        userdata.append("type", "league")
        _getRandomUser({ userdata, apiToken }).then((responce) => {
            if (responce.is_found == true) {
                setgifloader(false)
                _getLeagueQuestions(responce)
                clearInterval(funRef.current)
            }
            setListData(responce.userdata)
        }).catch((error) => {
            setgifloader(true)
        })
            .finally(() => {
            })


    }

    const navigateToNextScreen = () => {
        navigation.goBack()
        clearInterval(funRef.current);
    };

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => navigateToNextScreen() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);


    const _getLeagueQuestions = (res) => {
        clearInterval(funRef.current);
        const userdata = new FormData()
        userdata.append("league_id", box_id)
        userdata.append("coin_id", coin_id)
        userdata.append("second_user_id", res.userdata.id)
        get_league_questions({ userdata, apiToken }).then((responce) => {
            clearInterval(funRef.current);
            let amountEmbed = { ...user }
            let b = parseInt(amountEmbed.userdata.coin) - price
            amountEmbed.userdata.coin = b,
                SetUser(amountEmbed)(dispatch)
            if (questionsList == null) {
                let arr = { ...responce }
                for (let i = 0; i < arr.league_questions.length; i++) {
                    let ar = []
                    ar.push(arr.league_questions[i].option1)
                    ar.push(arr.league_questions[i].option2)
                    ar.push(arr.league_questions[i].option3)
                    ar.push(arr.league_questions[i].option4)
                    arr.league_questions[i]["options"] = ar
                    let hours = arr.league_questions[i].time_counter.split(':')[0]
                    let minutes = arr.league_questions[i].time_counter.split(':')[1]
                    let seconds = arr.league_questions[i].time_counter.split(':')[2]
                    let h = 0, m = 0
                    if (hours > 0) {
                        h = (parseInt(hours) * 60) * 60
                    }
                    if (minutes > 0) {
                        m = (parseInt(minutes) * 60)
                    }
                    let t = parseInt(h) + parseInt(m) + parseInt(seconds)
                    arr.league_questions[i]["myTime"] = {
                        currenttim: 0,
                        gametime: t,
                        dumy: t,
                    }
                }

                SetQues(arr)(dispatch)
                navigation.push("Questionscreen", {
                    id: res.userdata.id,
                    res: responce.league,
                    name: user.userdata.name,
                    price: price,
                    data: res,
                    box_id,
                    coin_id
                })
            }
            else {
                let arr = { ...questionsList }
                let remaingtime = 0
                for (let i = 0; i < arr.league_questions.length; i++) {
                    if (arr.league_questions[i].myTime.currenttim == 0) {
                        let hours = arr.league_questions[i].time_counter.split(':')[0]
                        let minutes = arr.league_questions[i].time_counter.split(':')[1]
                        let seconds = arr.league_questions[i].time_counter.split(':')[2]
                        let h = 0, m = 0
                        if (hours > 0) {
                            h = (parseInt(hours) * 60) * 60
                        }
                        if (minutes > 0) {
                            m = (parseInt(minutes) * 60)
                        }
                        let t = parseInt(h) + parseInt(m) + parseInt(seconds)
                        remaingtime = remaingtime + t
                    }

                }
                let y = -1
                for (let i = 0; i < arr.league_questions.length; i++) {
                    let r = i + 1
                    if (arr.league_questions[r].myTime.currenttim == 0) {
                        y = i
                    }

                }
                if (y != undefined) {
                    let oldtime = arr.league_questions[y].myTime.currenttim
                    let p = ""
                    let y = moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
                    p = y
                    var now = p;
                    const check = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(oldtime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
                    let hours = check.split(':')[0]
                    let minutes = check.split(':')[1]
                    let seconds = check.split(':')[2]
                    let h = 0, m = 0
                    if (hours > 0) {
                        h = (parseInt(hours) * 60) * 60
                    }
                    if (minutes > 0) {
                        m = (parseInt(minutes) * 60)
                    }
                    let total = parseInt(h) + parseInt(m) + parseInt(seconds)
                    if (total < remaingtime) {
                        navigation.push("Questionscreen", {
                            id: res.userdata.id,
                            res: responce.league,
                            name: user.userdata.name,
                            price: price,
                            data: res,
                            box_id,
                            coin_id
                        })
                    }
                    else {
                        SetQues(arr)(dispatch)
                        SetRepeateIndexData(null)(dispatch)
                        navigation.push("Questionscreen", {
                            id: id,
                            res: responce.league,
                            name: user.userdata.name,
                            price: price,
                            data: res,
                            box_id,
                            coin_id
                        })
                    }
                }
                else {
                    SetQues(arr)(dispatch)
                    SetRepeateIndexData(null)(dispatch)
                    navigation.push("Questionscreen", {
                        id: res.userdata.id,
                        res: responce.league,
                        name: user.userdata.name,
                        price: price,
                        data: res,
                        box_id,
                        coin_id
                        // data
                    })
                }

            }


        }).catch((error) => {
            console.log("Error------", error)
        })


    }

    const _gettournament_Questions = (res) => {
        clearInterval(funRef.current);
        const userdata = new FormData()
        userdata.append("box_id", box_id)
        // userdata.append("coin_id", coin_id)
        userdata.append("second_user_id", res.operant.id)
        console.log("check Ids",userdata)
        get_Tournament_questions({ userdata, apiToken }).then((responce) => {
            clearInterval(funRef.current);
            // let amountEmbed = { ...user }
            // let b = parseInt(amountEmbed.userdata.coin) - price
            // amountEmbed.userdata.coin = b,
            //     SetUser(amountEmbed)(dispatch)
            if (questionsList == null) {
                let arr = { ...responce }
                for (let i = 0; i < arr.tournament_questions.length; i++) {
                    let ar = []
                    ar.push(arr.tournament_questions[i].option1)
                    ar.push(arr.tournament_questions[i].option2)
                    ar.push(arr.tournament_questions[i].option3)
                    ar.push(arr.tournament_questions[i].option4)
                    arr.tournament_questions[i]["options"] = ar
                    let hours = arr.tournament_questions[i].time_counter.split(':')[0]
                    let minutes = arr.tournament_questions[i].time_counter.split(':')[1]
                    let seconds = arr.tournament_questions[i].time_counter.split(':')[2]
                    let h = 0, m = 0
                    if (hours > 0) {
                        h = (parseInt(hours) * 60) * 60
                    }
                    if (minutes > 0) {
                        m = (parseInt(minutes) * 60)
                    }
                    let t = parseInt(h) + parseInt(m) + parseInt(seconds)
                    arr.tournament_questions[i]["myTime"] = {
                        currenttim: 0,
                        gametime: t,
                        dumy: t,
                    }
                }

                SetQues(arr)(dispatch)
                navigation.push("Questionscreen", {
                    id: res.operant.id,
                    res: responce.league,
                    name: user.userdata.name,
                    price: price,
                    data: res.operant,
                    box_id,
                    coin_id,
                    tournamentId:playersData?.tournament?.id
                })
            }
            else {
                let arr = { ...questionsList }
                let remaingtime = 0
                for (let i = 0; i < arr.tournament_questions.length; i++) {
                    if (arr.tournament_questions[i].myTime.currenttim == 0) {
                        let hours = arr.tournament_questions[i].time_counter.split(':')[0]
                        let minutes = arr.tournament_questions[i].time_counter.split(':')[1]
                        let seconds = arr.tournament_questions[i].time_counter.split(':')[2]
                        let h = 0, m = 0
                        if (hours > 0) {
                            h = (parseInt(hours) * 60) * 60
                        }
                        if (minutes > 0) {
                            m = (parseInt(minutes) * 60)
                        }
                        let t = parseInt(h) + parseInt(m) + parseInt(seconds)
                        remaingtime = remaingtime + t
                    }

                }
                let y = -1
                for (let i = 0; i < arr.tournament_questions.length; i++) {
                    let r = i + 1
                    if (arr.tournament_questions[r].myTime.currenttim == 0) {
                        y = i
                    }

                }
                if (y != undefined) {
                    let oldtime = arr.tournament_questions[y].myTime.currenttim
                    let p = ""
                    let y = moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
                    p = y
                    var now = p;
                    const check = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(oldtime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
                    let hours = check.split(':')[0]
                    let minutes = check.split(':')[1]
                    let seconds = check.split(':')[2]
                    let h = 0, m = 0
                    if (hours > 0) {
                        h = (parseInt(hours) * 60) * 60
                    }
                    if (minutes > 0) {
                        m = (parseInt(minutes) * 60)
                    }
                    let total = parseInt(h) + parseInt(m) + parseInt(seconds)
                    if (total < remaingtime) {
                        navigation.push("Questionscreen", {
                            id: res.operant.id,
                            res: responce.league,
                            name: user.userdata.name,
                            price: price,
                            data: res.operant,
                            box_id,
                            coin_id,
                            tournamentId:playersData?.tournament?.id
                        })
                    }
                    else {
                        SetQues(arr)(dispatch)
                        SetRepeateIndexData(null)(dispatch)
                        navigation.push("Questionscreen", {
                            id: res.operant.id,
                            res: responce.league,
                            name: user.userdata.name,
                            price: price,
                            data: res.operant,
                            box_id,
                            coin_id,
                            tournamentId:playersData?.tournament?.id
                        })
                    }
                }
                else {
                    SetQues(arr)(dispatch)
                    SetRepeateIndexData(null)(dispatch)
                    navigation.push("Questionscreen", {
                        id: res.operant.id,
                        res: responce.league,
                        name: user.userdata.name,
                        price: price,
                        data: res.operant,
                        box_id,
                        coin_id,
                        tournamentId:playersData?.tournament?.id
                        // data
                    })
                }

            }


        }).catch((error) => {
            console.log("Error------", error.response)
        })


    }


    //Handle Tournament section......




    //........................//

    return (
        <View style={styles.container}>
            {saveTitles == "LeaGue" ? <View style={styles.container2}>
                <View style={styles.scontainer} >
                    <View style={styles.bbcoat} />
                    <View style={styles.coinView}>
                        <Image source={require("../Assets/4.png")} style={{ height: 35, width: 35, resizeMode: 'contain' }} />
                        <Text style={styles.numCoins}> {price * 2} coins</Text>
                    </View>
                </View>
                <View style={styles.imgView}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.imageCircle}>
                            {user.userdata.image ? <Image source={{ uri: user.userdata.image }} style={styles.imgs} />
                                : <Image source={require("../Assets/user.png")} style={styles.imgs} />}
                        </View>
                        <Text style={styles.nameTxt}>{user.userdata.name}</Text>
                    </View>
                    <Text style={styles.vsTxt}>VS</Text>
                    {gifloader ? <Image source={require("../Assets/mygif.gif")} style={styles.imgs} /> :
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={styles.imageCircle}>
                                {listData?.image ? <Image source={{ uri: listData?.image }} style={styles.imgs} /> : <Image source={require("../Assets/user.png")} style={styles.imgs} />}

                            </TouchableOpacity>
                            <Text style={styles.nameTxt}>{listData?.name}</Text>
                        </View>
                    }

                </View>
            </View> : saveTitles == "Tournament" ? <View style={styles.container2}>
                <View style={styles.scontainer} >
                    <View style={styles.bbcoat} />
                    <View style={{ alignItems: 'center', width: 190 }}>
                        <Text style={[styles.nameTxt2, { ...styles.txt }]}>Tournament</Text>
                        <Text style={[styles.nameTxt, { ...styles.txt }]}>Mode</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.imageCircle}>
                            <Image source={{ uri: user?.userdata?.image }} style={styles.imgs} />
                        </View>
                        <Text style={styles.nameTxt}>{user.userdata.name.split(' ').slice(0, -1).join(' ')}</Text>
                    </View>
                    <Text style={styles.vsTxt}>VS</Text>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.imageCircle}>
                            <Image source={{ uri: playersData?.operant?.image }} style={styles.imgs} />

                        </View>
                        <Text style={styles.nameTxt}>{playersData?.operant?.name}</Text>
                    </View>
                </View>
            </View> : null}
        


            {saveTitles === "Tournament" || saveTitles === "LeaGue" ? <View style={styles.statusView}>
                <View style={{ height: 8, width: 8, backgroundColor: 'white', borderRadius: 20 }} />
                <View style={{ height: 8, width: 8, backgroundColor: 'white', borderRadius: 20 }} />
                <View style={{ height: 8, width: 8, backgroundColor: 'grey', borderRadius: 20 }} />

            </View> : null}


        </View>
    )
}

export default WiningComp


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Gif: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#000',
    },
    txt: {
        fontSize: 24,
        textAlign: 'center'
    },
    scontainer: {
        width: "100%",
        alignItems: 'center'
    },
    imageCircle: {
        height: 120,
        borderRadius: 120 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120, borderWidth: 1, borderColor: '#fff'
    },
    imgView: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
    container2: {
        alignItems: 'center',

    },
    coinView: {
        height: 50,
        bottom: 0,
        borderWidth: 1,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: style.yellow,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        position: 'absolute'
    },
    statusView: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '20%',
        justifyContent: 'space-between',
        width: 35
    },
    numCoins: { fontSize: 25, fontFamily: style.Bold, color: style.yellow },
    btn: {
        width: 120,
        height: 30,
        backgroundColor: "black"
    },
    parentContainer: {
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-around'
    },
    imgs: { height: 115, width: 115, borderRadius: 100 },
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
        // left: 6,
        paddingHorizontal: 12,
        bottom: 16

        // padding: 12
    },
    bbcoat: {
        height: 50,
        backgroundColor: 'black',
        opacity: .2,
        width: 200,
        borderRadius: 25
    },
    nameTxt: {
        // backgroundColor:'red',
        width: 140,
        marginTop: 6,
        textAlign: 'center',
        fontFamily: style.SemiBold,
        color: '#fff',
    },
    nameTxt2: {
        // backgroundColor:'red',
        marginTop: 6,
        textAlign: 'center',
        fontFamily: style.SemiBold,
        color: '#fff',
    }
})