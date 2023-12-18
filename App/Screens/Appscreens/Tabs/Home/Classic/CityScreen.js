import { FlatList, ImageBackground, StyleSheet, Text, View, Alert, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
const bgImg = require("../../../../../Assets/bg1.png")
import Subheader from '../../../../../Components/Subheader'
import Cities from '../../../../../Components/Cities'
import { _CitiesList, _classicQuestions, _getMilstone } from '../../../../../Utils/Apis'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../../../Components/Loader'
import {
    SetQues,
    SetMiletone,
    SetRepeateIndexData, SetUser, StoreQcounter
} from '../../../../../Redux/actions/appactions/Index'
import moment from 'moment'
const SelectCity = ({ navigation, route }) => {
    const [checkIdx, setcheckIdx] = useState(-1)
    const [allCities, setallCities] = useState([])
    const { user, questionsList } = useSelector(({ appReducer }) => appReducer);
    const [Loading, setLoading] = useState(false)
    const apiToken = user.token
    const dispatch = useDispatch();







    let p = ""

    useEffect(() => {
        _allCitiesList(apiToken)
    }, [apiToken])
    let y = moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
    p = y



    const _Testfunction = (idx, id, myitem) => {
        // setTimeout(() => {
        _getcityQuestions(id, apiToken, myitem)
        // }, 1000);
        setcheckIdx(idx)
        SetMiletone(null)(dispatch)
    }
    const _allCitiesList = (apiToken) => {
        setLoading(true)
        _CitiesList(apiToken).then((responce) => {
            console.log("My responce check", responce)
            setLoading(false)
            setallCities(responce.classic_cities)
        }).catch((error) => {
            console.log("Error is here", error)
            setLoading(false)
        })
    }
    const _getcityQuestions = (qId, apiToken, myitem) => {
        _classicQuestions({ qId, apiToken }).then((responce) => {
            setLoading(false)
            let res = { ...user }
            let b = parseInt(res.userdata.coin) - parseInt(myitem.max_coin)
            res.userdata.coin = b,
                SetUser(res)(dispatch)
            if (questionsList == null) {
                let arr = { ...responce }
                for (let i = 0; i < arr.classic_questions.length; i++) {
                    let ar = []
                    ar.push(arr.classic_questions[i].option1)
                    ar.push(arr.classic_questions[i].option2)
                    ar.push(arr.classic_questions[i].option3)
                    ar.push(arr.classic_questions[i].option4)
                    arr.classic_questions[i]["options"] = ar
                    let hours = arr.classic_questions[i].time_counter.split(':')[0]
                    let minutes = arr.classic_questions[i].time_counter.split(':')[1]
                    let seconds = arr.classic_questions[i].time_counter.split(':')[2]
                    let h = 0, m = 0
                    if (hours > 0) {
                        h = (parseInt(hours) * 60) * 60
                    }
                    if (minutes > 0) {
                        m = (parseInt(minutes) * 60)
                    }
                    let t = parseInt(h) + parseInt(m) + parseInt(seconds)
                    arr.classic_questions[i]["myTime"] = {
                        currenttim: 0,
                        gametime: t,
                        dumy: t,
                    }
                }

                SetQues(arr)(dispatch)
                if (Platform.OS == "android") {
                    navigation.navigate("Questionscreen", {
                        id: qId,
                        res: myitem,
                    })
                } else {
                    navigation.replace("Questionscreen", {
                        id: qId,
                        res: myitem,
                    })
                }

            }
            else {
                // SetQues(null)(dispatch)
                let arr = { ...questionsList }
                let remaingtime = 0
                for (let i = 0; i < arr.classic_questions.length; i++) {
                    if (arr.classic_questions[i].myTime.currenttim == 0) {
                        let hours = arr.classic_questions[i].time_counter.split(':')[0]
                        let minutes = arr.classic_questions[i].time_counter.split(':')[1]
                        let seconds = arr.classic_questions[i].time_counter.split(':')[2]
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
                for (let i = 0; i < arr.classic_questions.length; i++) {
                    let r = i + 1
                    if (arr.classic_questions[r].myTime.currenttim == 0) {
                        y = i
                    }

                }
                if (y != undefined) {
                    let oldtime = arr.classic_questions[y].myTime.currenttim
                    let p = ""
                    let y = moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
                    p = y
                    var now = p;
                    //    var then = questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].myTime.currenttim;
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
                        navigation.navigate("Questionscreen", {
                            id: qId,
                            res: myitem,
                        })
                    }
                    else {
                        SetQues(null)(dispatch)
                        SetRepeateIndexData(null)(dispatch)
                        if (Platform.OS == "android") {
                            navigation.navigate("Questionscreen", {
                                id: qId,
                                res: myitem,
                            })
                        } else {
                            navigation.replace("Questionscreen", {
                                id: qId,
                                res: myitem,
                            })
                        }
                        // navigation.navigate("Questionscreen", {
                        //     id: qId,
                        //     res: myitem,
                        // })
                    }
                }
                else {
                    SetQues(null)(dispatch)
                    SetRepeateIndexData(null)(dispatch)
                    if (Platform.OS == "android") {
                        navigation.navigate("Questionscreen", {
                            id: qId,
                            res: myitem,
                        })
                    } else {
                        navigation.replace("Questionscreen", {
                            id: qId,
                            res: myitem,
                        })
                    }
                    // navigation.navigate("Questionscreen", {
                    //     id: qId,
                    //     res: myitem,
                    // })
                }

            }







            SetQues(arr)(dispatch)
            if (questionsList == null) {
                let hours = arr.classic_questions[0].time_counter.split(':')[0]
                let minutes = arr.classic_questions[0].time_counter.split(':')[1]
                let seconds = arr.classic_questions[0].time_counter.split(':')[2]
                let h = 0, m = 0
                if (hours > 0) {
                    h = (parseInt(hours) * 60) * 60
                }
                if (minutes > 0) {
                    m = (parseInt(minutes) * 60)
                }
                let t = parseInt(h) + parseInt(m) + parseInt(seconds)
                arr["myTime"] = {
                    currenttim: p,
                    gametime: t,
                    dumy: t,
                }
                SetQues(arr)(dispatch)
                if (Platform.OS == "android") {
                    navigation.navigate("Questionscreen", {
                        id: qId,
                        res: myitem,
                    })
                } else {
                    navigation.replace("Questionscreen", {
                        id: qId,
                        res: myitem,
                    })
                }
                // navigation.navigate("Questionscreen", {
                //     id: qId,
                //     res: myitem,
                // })
            }
            else {
                let p = ""
                let y = moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
                p = y
                console.log("device time", p)
                console.log("prevouius time", questionsList.myTime.currenttim)
                var now = p;
                var then = questionsList.myTime.currenttim;

                const check = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
                console.log("checkcheck", check)

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
                let t = parseInt(h) + parseInt(m) + parseInt(seconds)

                console.log("hello check it", t)
                if (parseInt(t) < parseInt(questionsList.myTime.dumy)) {
                    // navigation.navigate("Questionscreen", {
                    //     id: qId,
                    //     res: myitem,
                    // })
                    if (Platform.OS == "android") {
                        navigation.navigate("Questionscreen", {
                            id: qId,
                            res: myitem,
                        })
                    } else {
                        navigation.replace("Questionscreen", {
                            id: qId,
                            res: myitem,
                        })
                    }
                }
                else {
                    SetQues(null)(dispatch)
                    let hours = arr.classic_questions[0].time_counter.split(':')[0]
                    let minutes = arr.classic_questions[0].time_counter.split(':')[1]
                    let seconds = arr.classic_questions[0].time_counter.split(':')[2]
                    let h = 0, m = 0
                    if (hours > 0) {
                        h = (parseInt(hours) * 60) * 60
                    }
                    if (minutes > 0) {
                        m = (parseInt(minutes) * 60)
                    }
                    let t = parseInt(h) + parseInt(m) + parseInt(seconds)


                    arr["myTime"] = {
                        currenttim: p,
                        gametime: t,
                        dumy: t,
                    }
                    SetQues(arr)(dispatch)
                    if (Platform.OS == "android") {
                        navigation.navigate("Questionscreen", {
                            id: qId,
                            res: myitem,
                        })
                    } else {
                        navigation.replace("Questionscreen", {
                            id: qId,
                            res: myitem,
                        })
                    }
                    // navigation.navigate("Questionscreen", {
                    //     id: qId,
                    //     res: myitem,
                    // })
                }
            }


        }).catch((error) => {
            setLoading(false)

            console.log("my eroorrrrrr", error)
            Alert.alert(
                "Sorry",
                `${error.response.data.message}`,
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            // console.log("Error chatch", error.response.data.message)
        })
    }
    return (
        <ImageBackground source={bgImg} style={styles.container}>
            {Loading && <Loader />}
            <View style={styles.subcontainer}>
                <Subheader title={"Select City"} onPress={() => navigation.goBack()} />
                <View style={{ height: 25 }} />
                <FlatList
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={allCities}
                    renderItem={({ item, index }) => {
                        return (
                            <Cities
                                item={item}
                                onPress={() => _Testfunction(index, item.id, item)}
                                state={checkIdx}
                                navigation={navigation}
                                idx={index} />
                        )
                    }}
                />

            </View>
        </ImageBackground>
    )
}

export default SelectCity

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subcontainer: {
        flex: 1,
        padding: 12
    }
})