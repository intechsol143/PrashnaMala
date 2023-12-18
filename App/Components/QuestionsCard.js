import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, Alert, BackHandler } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { style } from '../Constants'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ModalBox from './ModalBox'
import Modal from 'react-native-modal'
import IconC from 'react-native-vector-icons/Entypo'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import { useFocusEffect } from '@react-navigation/native';

import {
    SetAns,
    SetQues,
    SetRepeateIndexData,
    SetMilestone,
    SetTooclose,
    SetUser,
    SetQcounter,
    SetCorrectAns,
    SetCMStone,
    SetAnsCount,
    SetLeave,
    SetCorectCount,
    SetLoginuserPoints,
    SetOperantPoints
} from '../Redux/actions/appactions/Index'
import { _classicQuestions, _correctAnswers, refreshLifeLines, checkLiveuser, checkTournamentLiveuser, getPoints, setWinnerClassicRank } from '../Utils/Apis'
import Subheader from './Subheader'
import moment from 'moment'
const QuestionsCard = ({
    navigation,
    qId,
    box_id,
    coin_id,
    price,
    leave,
    results,
    tournamentId,
    list }) => {
    const { user } = useSelector(({ appReducer }) => appReducer);
    const { width } = Dimensions.get("screen");
    const apiToken = user.token
    const { repeatIndex, saveTitles, questionsList, totalQlist, qCounter, milestone, anscount } = useSelector(({ appReducer }) => appReducer);
    const [Question, setQuestion] = useState(-1)
    const [checkModal, setcheckModal] = useState(false)
    const [releaseData, setreleaseData] = useState()
    const [Qhandler, setQhandler] = useState(true)
    const [correctAnser, setcAns] = useState(1)
    // let correctAnser = ""
    const dispatch = useDispatch()



    const [expertmodal, setexpertmodal] = useState(false)
    const [audiencemodal, setaudiencemodal] = useState(false)
    const [fiftymodal, setfifitymodal] = useState(false)

    const [expertmodal2, setexpertmodal2] = useState(false)
    const [audiencemodal2, setaudiencemodal2] = useState(false)
    const [fiftymodal2, setfifitymodal2] = useState(false)
    const [navState, setnavState] = useState(0)
    const [ansclick, setansclick] = useState(-1)
    const [q2, setq2] = useState(-1)
    const [state, setstate] = useState(0)
    const funRef = useRef(null);
    const [cAns, setcAn] = useState([])
    const [completed, setCompleted] = useState(0);


    const [userLeft, setuserLeft] = useState(false)
    const _updateFireBaseData = (b) => {
        clearInterval(funRef.current);
        SetQues(null)(dispatch)
        SetRepeateIndexData(null)(dispatch)
        navigation.navigate("LeagueRematch", {
            item: b,
            List: list,
            box_id,
            coin_id,
            price: price,
            tournamentId
        })

    }

    // console.log("Check List", list.userdata.id)
    const _checkuserStatus = () => {
        const userdata = new FormData()
        userdata.append("league_id", box_id)
        userdata.append("coin_id", coin_id)
        checkLiveuser({ userdata, apiToken }).then((responce) => {
            setuserLeft(responce.is_operant_left)
        }).catch((error) => {

        })
    }
    const _checkTournamentuserStatus = () => {
        const userdata = new FormData()
        userdata.append("box_id", box_id)
        userdata.append("tournament_id", tournamentId)
        checkTournamentLiveuser({ userdata, apiToken }).then((responce) => {
            setuserLeft(responce.is_operant_left)
        }).catch((error) => {
            console.log("Error checkkkkkk", error.response)

        })
    }



    useEffect(() => {
        if (userLeft == true) {
            SetLeave(true)(dispatch)
            userLeft ? navigation.navigate("LeagueRematch", {
                item: totalQlist,
                List: list,
                box_id,
                coin_id,
                price
            }) : null
        }
    }, [userLeft])

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




    const _refreshData = (a) => {
        if (a.ref == "fifty_fifty") {
            refreshLifeLines({ ref: a.ref, apiToken }).then((reponse) => {
                let res = { ...user }
                // SetMilestone()(dispatch)
                let b = parseInt(res.userdata.lfl_fifty_count) - 1
                res.userdata.lfl_fifty_count = b,
                    SetUser(res)(dispatch)
                setfifitymodal(false)

            }).catch((error) => {
                console.log("Error", error.response)
            })
        }
        else if (a.ref == "refresh") {
            if (qCounter <= questionsList.total_question) {
                SetQcounter()(dispatch)
                setQuestion(-1)
                let arr12 = { ...questionsList }
                arr12.classic_questions[repeatIndex != null ? repeatIndex : 0]["Question_correct"] = "true"
                SetQues(arr12)(dispatch)
                setreleaseData()
                SetRepeateIndexData(repeatIndex != null ? parseInt(repeatIndex.toString()) + 1 : 0 + 1)(dispatch)
                let amountEmbed = { ...user }
                let y = questionsList.classic_questions[repeatIndex != null ? repeatIndex : 0].price
                let b = parseInt(amountEmbed.userdata.amount) + parseInt(y)
                amountEmbed.userdata.amount = b,
                    SetUser(amountEmbed)(dispatch)
                let res = questionsList.milestone.findIndex((item) => item.is_flag == true)
                refreshLifeLines({ ref: a.ref, apiToken }).then((reponse) => {
                    let res = { ...user }
                    let b = parseInt(res.userdata.lfl_refresh_count) - 1
                    res.userdata.lfl_refresh_count = b,
                        SetUser(res)(dispatch)

                }).catch((error) => {
                    console.log("Error", error.response)
                })
            }


        } else if (a.ref == "audience") {
            refreshLifeLines({ ref: a.ref, apiToken }).then((reponse) => {
                let res = { ...user }
                let b = parseInt(res.userdata.lfl_audience_count) - 1
                res.userdata.lfl_audience_count = b,
                    SetUser(res)(dispatch)
                setaudiencemodal(false)
                // SetMilestone()(dispatch)
                // }

            }).catch((error) => {
                console.log("Error", error.response)
            })
        }

        else {
            refreshLifeLines({ ref: a.ref, apiToken }).then((reponse) => {
                if (a.ref == "expert") {
                    let res = { ...user }
                    let b = parseInt(res.userdata.lfl_expert_count) - 1
                    res.userdata.lfl_expert_count = b,
                        SetUser(res)(dispatch)
                    setexpertmodal(false)
                    // SetMilestone()(dispatch)
                }

            }).catch((error) => {
                console.log("Error", error.response)
            })
        }







    }


    const _refreshData2 = (a) => {
        if (a.ref == "fifty_fifty") {
            refreshLifeLines({ ref: a.ref, apiToken }).then((reponse) => {
                let res = { ...user }
                let b = parseInt(res.userdata.lfl_fifty_count) - 1
                res.userdata.lfl_fifty_count = b,
                    SetUser(res)(dispatch)
                setfifitymodal2(false)

            }).catch((error) => {
                console.log("Error", error.response)
            })
        }
        else if (a.ref == "refresh") {
            if (qCounter <= questionsList.total_question) {
                SetQcounter()(dispatch)
                setQuestion(-1)

                //changes question length
                let arr12 = { ...questionsList }
                let s = parseInt(questionsList.total_question) + repeatIndex + 1
                arr12.total_question = s


                arr12.league_questions[repeatIndex != null ? repeatIndex : 0]["Question_correct"] = "true"
                SetQues(arr12)(dispatch)
                setreleaseData()
                SetRepeateIndexData(repeatIndex != null ? parseInt(repeatIndex.toString()) + 1 : 0 + 1)(dispatch)
                let amountEmbed = { ...user }
                let y = questionsList.league_questions[repeatIndex != null ? repeatIndex : 0].price
                let b = parseInt(amountEmbed.userdata.amount) + parseInt(y)
                amountEmbed.userdata.amount = b,
                    SetUser(amountEmbed)(dispatch)
                refreshLifeLines({ ref: a.ref, apiToken }).then((reponse) => {
                    let res = { ...user }
                    let b = parseInt(res.userdata.lfl_refresh_count) - 1
                    res.userdata.lfl_refresh_count = b,
                        SetUser(res)(dispatch)

                }).catch((error) => {
                    console.log("Error", error.response)
                })
            }


        } else if (a.ref == "audience") {
            refreshLifeLines({ ref: a.ref, apiToken }).then((reponse) => {
                let res = { ...user }
                let b = parseInt(res.userdata.lfl_audience_count) - 1
                res.userdata.lfl_audience_count = b,
                    SetUser(res)(dispatch)
                setaudiencemodal2(false)
                // SetMilestone()(dispatch)
                // }

            }).catch((error) => {
                console.log("Error", error.response)
            })
        }

        else {
            refreshLifeLines({ ref: a.ref, apiToken }).then((reponse) => {
                if (a.ref == "expert") {
                    let res = { ...user }
                    let b = parseInt(res.userdata.lfl_expert_count) - 1
                    res.userdata.lfl_expert_count = b,
                        SetUser(res)(dispatch)
                    setexpertmodal(false)
                    // SetMilestone()(dispatch)
                }

            }).catch((error) => {
                console.log("Error", error.response)
            })
        }







    }

    //refresh data tournament start

    const _refreshDataTournament = (a) => {
        if (a.ref == "fifty_fifty") {
            refreshLifeLines({ ref: a.ref, apiToken }).then((reponse) => {
                let res = { ...user }
                let b = parseInt(res.userdata.lfl_fifty_count) - 1
                res.userdata.lfl_fifty_count = b,
                    SetUser(res)(dispatch)
                setfifitymodal(false)

            }).catch((error) => {
                console.log("Error", error.response)
            })
        }
        else if (a.ref == "refresh") {
            if (qCounter <= questionsList.total_question) {
                SetQcounter()(dispatch)
                setQuestion(-1)

                //changes question length
                let arr12 = { ...questionsList }
                let s = parseInt(questionsList.total_question) + repeatIndex + 1
                arr12.total_question = s


                arr12.tournament_questions[repeatIndex != null ? repeatIndex : 0]["Question_correct"] = "true"
                SetQues(arr12)(dispatch)
                setreleaseData()
                SetRepeateIndexData(repeatIndex != null ? parseInt(repeatIndex.toString()) + 1 : 0 + 1)(dispatch)
                let amountEmbed = { ...user }
                let y = questionsList.tournament_questions[repeatIndex != null ? repeatIndex : 0].price
                let b = parseInt(amountEmbed.userdata.amount) + parseInt(y)
                amountEmbed.userdata.amount = b,
                    SetUser(amountEmbed)(dispatch)
                refreshLifeLines({ ref: a.ref, apiToken }).then((reponse) => {
                    let res = { ...user }
                    let b = parseInt(res.userdata.lfl_refresh_count) - 1
                    res.userdata.lfl_refresh_count = b,
                        SetUser(res)(dispatch)

                }).catch((error) => {
                    console.log("Error", error.response)
                })
            }


        } else if (a.ref == "audience") {
            refreshLifeLines({ ref: a.ref, apiToken }).then((reponse) => {
                let res = { ...user }
                let b = parseInt(res.userdata.lfl_audience_count) - 1
                res.userdata.lfl_audience_count = b,
                    SetUser(res)(dispatch)
                setaudiencemodal2(false)
                // SetMilestone()(dispatch)
                // }

            }).catch((error) => {
                console.log("Error", error.response)
            })
        }

        else {
            refreshLifeLines({ ref: a.ref, apiToken }).then((reponse) => {
                if (a.ref == "expert") {
                    let res = { ...user }
                    let b = parseInt(res.userdata.lfl_expert_count) - 1
                    res.userdata.lfl_expert_count = b,
                        SetUser(res)(dispatch)
                    setexpertmodal(false)
                    // SetMilestone()(dispatch)
                }

            }).catch((error) => {
                console.log("Error", error.response)
            })
        }







    }

    //refresh data tournament end



    //Selected answers for tournament start



    //Selected answer for tournament end


    const _checkPoints = (a) => {
        const userdata = new FormData();
        userdata.append('question_id', a.question_id)
        userdata.append('operant', list?.userdata?.id)
        userdata.append('selected_option', a.res)
        getPoints({ userdata, apiToken }).then((response) => {
            SetLoginuserPoints(response.points)(dispatch)
            SetOperantPoints(response.operant_points)(dispatch)
        }).catch((error) => {
            console.log("Error", error)
        })
    }


    const _checkPoints2 = (a) => {
        const userdata = new FormData();
        userdata.append('question_id', a.question_id)
        userdata.append('operant', list?.id)
        userdata.append('selected_option', a.res)
        console.log("------======", userdata)
        getPoints({ userdata, apiToken }).then((response) => {
            console.log("first----------", response)
            SetLoginuserPoints(response.points)(dispatch)
            SetOperantPoints(response.operant_points)(dispatch)
        }).catch((error) => {
            console.log("Error", error)
        })
    }

    const _selectedAns = (idx, i) => {
        setTimeout(() => {
            if (saveTitles == "Classic" && milestone == 11) {
                setreleaseData()
                setQhandler(false)
                _submitAnswers()
            }
            else if (saveTitles == "Classic" &&
                questionsList.classic_questions[repeatIndex != null ?
                    repeatIndex : 0].correct_option == idx + 1 &&
                questionsList.classic_questions.length - 1 != repeatIndex) {
                if (qCounter <= questionsList.total_question) {
                    SetQcounter()(dispatch)
                    SetMilestone()(dispatch)
                    setQuestion(-1)
                    let arr12 = { ...questionsList }
                    arr12.classic_questions[repeatIndex != null ? repeatIndex : 0]["Question_correct"] = "true"
                    SetQues(arr12)(dispatch)
                    setreleaseData()
                    SetRepeateIndexData(repeatIndex != null ? parseInt(repeatIndex.toString()) + 1 : 0 + 1)(dispatch)
                    if (milestone == 3 || milestone == 5 || milestone == 8) {
                        setQhandler(false)
                        clearInterval(funRef.current);
                        // alert("Function Hit")
                        if (Platform.OS == "android") {
                            navigation.navigate("UserCongratulation",
                            {  res: results, 
                                id: qId }
                            )
                        }
                        else {
                            clearInterval(funRef.current);
                            navigation.replace("UserCongratulation",
                                { res: results, id: qId })
                        }

                    }
                }
                else {
                    // alert("all questions answered")
                    // _submitClassicAnswers()
                    _submitAnswers()

                }
            }
            else if (saveTitles == "Classic" && questionsList.classic_questions[repeatIndex != null ? repeatIndex : 0].correct_option != idx + 1) {
                setansclick(20)
                SetRepeateIndexData(repeatIndex != null ? parseInt(repeatIndex.toString()) + 1 : 0 + 1)(dispatch)
                setreleaseData()
                let y = questionsList.classic_questions[repeatIndex != null ? repeatIndex : 0].price
                let amountEmbed = { ...user }
                let b = parseInt(amountEmbed.userdata.coin) - parseInt(results.max_coin)
                amountEmbed.userdata.coin = b,
                    SetUser(amountEmbed)(dispatch)
                if (Platform.OS == "ios") {
                    navigation.replace("OOpscreens")
                } else {
                    navigation.navigate("OOpscreens")
                }


            }

            //..........................//

            // else if (saveTitles === "Tournament" && idx == 0) {
            //     navigation.navigate("Rematchscreen")
            //     SetTooclose("tooclose")(dispatch)
            // }
            // else if (saveTitles === "Tournament" && idx == 1 && repeatIndex?.idx === "cCount") {
            //     SetTooclose("YouWon")(dispatch)
            //     navigation.navigate("Rematchscreen")
            // }
            // else if (saveTitles === "Tournament" && idx == 1) {
            //     SetTooclose("toNext")(dispatch)
            //     navigation.navigate("Rematchscreen")
            // }


            //.....................................//

            //....................//

            // handle data start


            else if (saveTitles == "Tournament" && questionsList.tournament_questions[repeatIndex != null ? repeatIndex : 0].correct_option == idx + 1 && questionsList.tournament_questions.length - 1 != repeatIndex) {

                if (repeatIndex + 1 == questionsList.total_question) {
                    _updateFireBaseData(cAns.length)
                } else {
                    // alert("1")
                    setansclick(20)
                    setQuestion(-1)
                    SetQcounter()(dispatch)
                    let arr12 = { ...questionsList }
                    arr12.tournament_questions[repeatIndex != null ? repeatIndex : 0]["Question_correct"] = "true"
                    let corectRes = arr12.tournament_questions[repeatIndex != null ? repeatIndex : 0].correct_option;
                    setcAn(cAns => [...cAns, corectRes]);
                    SetQues(arr12)(dispatch)

                    let question_id = arr12.tournament_questions[repeatIndex != null ? repeatIndex : 0].id;

                    let idX = idx + 1;
                    // if (corectRes) {
                    _checkPoints2({ res: idX, question_id });
                    { saveTitles != "Tournament" ? _checkuserStatus() : null }
                    setreleaseData()
                    SetRepeateIndexData(repeatIndex != null ? parseInt(repeatIndex.toString()) + 1 : 0 + 1)(dispatch)


                }
            }
            else if (saveTitles == "Tournament" && questionsList.tournament_questions[repeatIndex != null ? repeatIndex : 0].correct_option != idx + 1 && questionsList.tournament_questions.length - 1 != repeatIndex) {
                if (repeatIndex + 1 == questionsList.total_question) {
                    // navigation.navigate("LeagueRematch", { correctAnswerscount: cAns.length })
                    _updateFireBaseData(cAns.length)
                } else {
                    // alert("2")
                    setQuestion(-1)
                    setansclick(10)
                    SetQcounter()(dispatch)
                    let arr12 = { ...questionsList }
                    arr12.tournament_questions[repeatIndex != null ? repeatIndex : 0]["Question_correct"] = "true"
                    SetQues(arr12)(dispatch)

                    let question_id = arr12.tournament_questions[repeatIndex != null ? repeatIndex : 0].id;

                    let idX = idx + 1;
                    // if (corectRes) {
                    _checkPoints2({ res: idX, question_id });

                    setreleaseData()
                    { saveTitles != "Tournament" ? _checkuserStatus() : null }
                    SetRepeateIndexData(repeatIndex != null ? parseInt(repeatIndex.toString()) + 1 : 0 + 1)(dispatch)


                }
            }
            // else {

            //     _updateFireBaseData(cAns.length)
            // }





            //handle data........end




            else if (saveTitles == "LeaGue" && questionsList.league_questions[repeatIndex != null ? repeatIndex : 0].correct_option == idx + 1 && questionsList.league_questions.length - 1 != repeatIndex) {
                if (repeatIndex + 1 == questionsList.total_question) {
                    _updateFireBaseData(cAns.length)
                } else {
                    setansclick(20)
                    setQuestion(-1)
                    SetQcounter()(dispatch)
                    let arr12 = { ...questionsList }
                    arr12.league_questions[repeatIndex != null ? repeatIndex : 0]["Question_correct"] = "true"
                    let corectRes = arr12.league_questions[repeatIndex != null ? repeatIndex : 0].correct_option;

                    let question_id = arr12.league_questions[repeatIndex != null ? repeatIndex : 0].id;

                    // let myIndexTest = arr12.league_questions[repeatIndex != null ? repeatIndex : 0];
                    console.log("myIndexTestmyIndexTest in alert 1", question_id)
                    // let Id = arr12.league_questions[repeatIndex != null ? repeatIndex : 0].id;
                    // console.log("Id check", Id)
                    setcAn(cAns => [...cAns, corectRes]);
                    let totalPoints = cAns.length
                    SetCorectCount(totalPoints)(dispatch)
                    SetQues(arr12)(dispatch)
                    _checkuserStatus()
                    let idX = idx + 1;
                    // if (corectRes) {
                    _checkPoints({ res: idX, question_id });
                    // }
                    setreleaseData()
                    SetRepeateIndexData(repeatIndex != null ? parseInt(repeatIndex.toString()) + 1 : 0 + 1)(dispatch)


                }
            }
            else if (saveTitles == "LeaGue" && questionsList.league_questions[repeatIndex != null ? repeatIndex : 0].correct_option != idx + 1 && questionsList.league_questions.length - 1 != repeatIndex) {

                if (repeatIndex + 1 == questionsList.total_question) {
                    navigation.navigate("LeagueRematch", { correctAnswerscount: cAns.length })
                    _updateFireBaseData(cAns.length)
                }

                else {
                    setQuestion(-1)
                    setansclick(10)
                    SetQcounter()(dispatch)
                    let arr12 = { ...questionsList }
                    arr12.league_questions[repeatIndex != null ? repeatIndex : 0]["Question_correct"] = "true"
                    SetQues(arr12)(dispatch)
                    setreleaseData()
                    _checkuserStatus()
                    // let myIndexTest = arr12.league_questions[repeatIndex != null ? repeatIndex : 0];
                    let corectRes = arr12.league_questions[repeatIndex != null ? repeatIndex : 0].correct_option;
                    let question_id = arr12.league_questions[repeatIndex != null ? repeatIndex : 0].id;

                    let idX = idx + 1;
                    // if (corectRes) {
                    _checkPoints({ res: idX, question_id });
                    // }
                    SetRepeateIndexData(repeatIndex != null ? parseInt(repeatIndex.toString()) + 1 : 0 + 1)(dispatch)

                }

            }
            else {

                _updateFireBaseData(cAns.length)
            }
            //  else if (saveTitles == "LeaGue" && questionsList.league_questions[repeatIndex != null ? repeatIndex : 0].correct_option != idx + 1 && questionsList.league_questions.length - 1 != repeatIndex) {
            //     // alert("Wrong Answer")
            //     SetQcounter()(dispatch)
            //     // SetMilestone()(dispatch)
            //     setQuestion(-1)
            //     let arr12 = { ...questionsList }
            //     arr12.league_questions[repeatIndex != null ? repeatIndex : 0]["Question_correct"] = "true"
            //     SetQues(arr12)(dispatch)
            //     setreleaseData()
            //     SetRepeateIndexData(repeatIndex != null ? parseInt(repeatIndex.toString()) + 1 : 0 + 1)(dispatch)
            // }
        }, 1000);



        // else if (saveTitles === "LeaGue" && idx == 0) {
        //     SetTooclose("leaGueRematch")(dispatch)
        //     navigation.navigate("Rematchscreen")
        // } 
        // else if (saveTitles === "LeaGue" && idx == 1) {
        //     SetTooclose("leaGueRematch2")(dispatch)
        //     navigation.navigate("Rematchscreen")
        // }
        // }, 1000);

    }
    const _showModal = (a) => {
        if (a === "1") {
            setcheckModal(false)
        }
        else {
            setcheckModal(true)
        }
    }







    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setnavState(0)
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (navState == 0) {
            funRef.current = setInterval(() => {
                { saveTitles == "Classic" ? userEffectData() : saveTitles == "Tournament" ? userEffectData3() : userEffectData2() };
            }, 1000);
            return () => {
                clearInterval(funRef.current);
            };
        }

    }, [state]);
    const navigateToNextScreen = () => {
        clearInterval(funRef.current);
        setnavState(1)
        navigation.push('Milestone');
    };


    // Auto select Question.....
    const userEffectData = () => {
        if (questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].myTime.currenttim == 0) {
            let y = moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
            let at = { ...questionsList }
            at.classic_questions[repeatIndex == null ? 0 : repeatIndex].myTime.currenttim = y
        }
        else {
            setstate(state + 1)
            let p = ""
            let y = moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
            p = y
            var now = p;
            var then = questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].myTime.currenttim;
            const check = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
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
            if (parseInt(questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].myTime.dumy) >= parseInt(t)) {
                let ut = { ...questionsList }
                ut.classic_questions[repeatIndex == null ? 0 : repeatIndex].myTime.gametime = parseInt(ut.classic_questions[repeatIndex == null ? 0 : repeatIndex].myTime.gametime) - 1
                SetQues(ut)(dispatch)
                // alert("Hello")
            }
            if (parseInt(questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].myTime.dumy) == parseInt(t)) {
                let ut = { ...questionsList }
                ut.classic_questions[repeatIndex == null ? 0 : repeatIndex].myTime.gametime = 0
                SetRepeateIndexData(repeatIndex != null ? parseInt(repeatIndex.toString()) + 1 <= questionsList.classic_questions.length ? parseInt(repeatIndex.toString()) + 1 : null : 0 + 1)(dispatch)
                // SetQues(ut)(dispatch)

                navigation.navigate("OOpscreens")
            }
        }

    }

    //Auto select Question 2
    //League questions auto
    const userEffectData2 = () => {
        if (questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].myTime.currenttim == 0) {
            let y = moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
            let at = { ...questionsList }
            at.league_questions[repeatIndex == null ? 0 : repeatIndex].myTime.currenttim = y
            // alert("alert1")
        }
        else {
            setstate(state + 1)
            let p = ""
            let y = moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
            p = y
            var now = p;
            var then = questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].myTime.currenttim;
            const check = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
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
            if (parseInt(questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].myTime.dumy) >= parseInt(t)) {
                let ut = { ...questionsList }
                ut.league_questions[repeatIndex == null ? 0 : repeatIndex].myTime.gametime = parseInt(ut.league_questions[repeatIndex == null ? 0 : repeatIndex].myTime.gametime) - 1
                SetQues(ut)(dispatch)
            }
            if (parseInt(questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].myTime.dumy) == parseInt(t)) {
                if (repeatIndex + 1 == questionsList.total_question) {
                    // navigation.navigate("LeagueRematch", { correctAnswerscount: cAns.length })
                    _updateFireBaseData(cAns.length)
                } else {
                    // alert("2")
                    setQuestion(-1)
                    setansclick(10)
                    SetQcounter()(dispatch)
                    let arr12 = { ...questionsList }
                    arr12.league_questions[repeatIndex != null ? repeatIndex : 0]["Question_correct"] = "true"
                    SetQues(arr12)(dispatch)
                    setreleaseData()
                    // _checkuserStatus()
                    SetRepeateIndexData(repeatIndex != null ? parseInt(repeatIndex.toString()) + 1 : 0 + 1)(dispatch)


                }
            }
        }

    }

    const userEffectData3 = () => {
        if (questionsList?.tournament_questions[repeatIndex == null ? 0 : repeatIndex].myTime.currenttim == 0) {
            let y = moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
            let at = { ...questionsList }
            at.tournament_questions[repeatIndex == null ? 0 : repeatIndex].myTime.currenttim = y
            // alert("alert1")
        }
        else {
            setstate(state + 1)
            let p = ""
            let y = moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
            p = y
            var now = p;
            var then = questionsList?.tournament_questions[repeatIndex == null ? 0 : repeatIndex].myTime.currenttim;
            const check = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
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
            if (parseInt(questionsList?.tournament_questions[repeatIndex == null ? 0 : repeatIndex].myTime.dumy) >= parseInt(t)) {
                let ut = { ...questionsList }
                ut.tournament_questions[repeatIndex == null ? 0 : repeatIndex].myTime.gametime = parseInt(ut.tournament_questions[repeatIndex == null ? 0 : repeatIndex].myTime.gametime) - 1
                SetQues(ut)(dispatch)
            }
            if (parseInt(questionsList?.tournament_questions[repeatIndex == null ? 0 : repeatIndex].myTime.dumy) == parseInt(t)) {
                if (repeatIndex + 1 == questionsList.total_question) {
                    // navigation.navigate("LeagueRematch", { correctAnswerscount: cAns.length })
                    _updateFireBaseData(cAns.length)
                } else {
                    // alert("2")
                    setQuestion(-1)
                    setansclick(10)
                    SetQcounter()(dispatch)
                    let arr12 = { ...questionsList }
                    arr12.tournament_questions[repeatIndex != null ? repeatIndex : 0]["Question_correct"] = "true"
                    SetQues(arr12)(dispatch)
                    setreleaseData()
                    // _checkTournamentuserStatus()
                    SetRepeateIndexData(repeatIndex != null ? parseInt(repeatIndex.toString()) + 1 : 0 + 1)(dispatch)


                }
            }
        }

    }




    useEffect(() => {
        if (milestone == 1) {
            SetCMStone(12)(dispatch)
        }
        else if (milestone == 2) {
            SetCMStone(11)(dispatch)
        }
        else if (milestone == 3) {
            SetCMStone(10)(dispatch)
        }
        else if (milestone == 4) {
            SetCMStone(9)(dispatch)
        }
        else if (milestone == 5) {
            SetCMStone(8)(dispatch)
        }
        else if (milestone == 6) {
            SetCMStone(7)(dispatch)
        }
        else if (milestone == 7) {
            SetCMStone(6)(dispatch)
        }
        else if (milestone == 8) {
            SetCMStone(5)(dispatch)

        }
        else if (milestone == 9) {
            SetCMStone(4)(dispatch)
        }
        else if (milestone == 10) {
            SetCMStone(3)(dispatch)
        }
        else if (milestone == 11) {
            SetCMStone(2)(dispatch)
        }
    }, [milestone])






    const _submitAnswers = () => {
        // alert("Testting")
        const userdata = new FormData()
        userdata.append("classic_city_id", qId)
        questionsList.classic_questions.forEach((item) => {
            userdata.append("correct_question[]", item.id)
        })
        _correctAnswers({ userdata, apiToken }).then((responce) => {
            if (responce.status === "success") {
                SetRepeateIndexData(null)(dispatch)
                showClassRank();
                // navigation.navigate("RoundCount")
            }
        }).catch((error) => {
            console.log("Error", error.response)
        })
    }



    const _submitClassicAnswers = () => {
        const userdata = new FormData()
        userdata.append("league_city_id", qId)
        questionsList.league_questions.forEach((item) => {
            userdata.append("correct_question[]", item.id)
        })
        _correctAnswers({ userdata, apiToken }).then((responce) => {
            if (responce.status === "success") {
                SetRepeateIndexData(null)(dispatch)
                showClassRank()
                // navigation.navigate("RoundCount")

            }
        }).catch((error) => {
            console.log("Error", error.response)
        })
    }

    useEffect(() => {
        if (saveTitles == "Classic") {
            checkFunction()
        } else if (saveTitles == "Tournament") {
            checkFunction2()
        } else {
            console.log("Notthhin to be called")
        }
    }, [correctAnser])

    const showClassRank = () => {
        console.log("Iddd check", qId)
        const userdata = new FormData();
        userdata.append('classic_city_id', qId)
        console.log("userdataaa", userdata)
        setWinnerClassicRank({ userdata, apiToken }).then((responce) => {
            console.log("reponse of classic winner rank", responce)

            if (responce) {
                navigation.navigate("RoundCount")
            }

        }).catch((error) => {
            console.log("Error is here", error.response)
        })
    }


    // {
    //     saveTitles == "Classic" ? useEffect(() => {
    //         let check = questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex]
    //         setreleaseData(check)
    //         SetCorrectAns(questionsList.classic_questions)(dispatch)
    //         setTimeout(() => {
    //             setcAns([milestone].correct_option)
    //         }, 1000);
    //     }, [correctAnser]) : saveTitles == "Tournament" ? useEffect(() => {
    //         let check = questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex]
    //         setreleaseData(check)
    //         SetCorrectAns(questionsList.tournament_questions)(dispatch)
    //         setTimeout(() => {
    //             setcAns([milestone].correct_option)
    //         }, 1000);
    //     }, [correctAnser]) : null
    // }

    const checkFunction = () => {
        let check = questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex]
        setreleaseData(check)
        SetCorrectAns(questionsList.classic_questions)(dispatch)
        setTimeout(() => {
            setcAns([milestone].correct_option)
        }, 1000);
    }

    const checkFunction2 = () => {
        let check = questionsList?.tournament_questions[repeatIndex == null ? 0 : repeatIndex]
        setreleaseData(check)
        SetCorrectAns(questionsList?.tournament_questions)(dispatch)
        setTimeout(() => {
            setcAns([milestone].correct_option)
        }, 1000);
    }

    useEffect(() => {
        setInterval(() => setCompleted(completed + 1), 5000);
    }, []);


    return questionsList && (
        <View style={{ flex: 1 }}>
            {saveTitles == "LeaGue" ? <View>
                <View style={styles.rectangle} />
                <View style={[styles.cardDataView, { top: 0, alignItems: 'center', justifyContent: 'center' }]}>
                    <View>
                        <Text style={[styles.txt1, { fontFamily: style.Medium }]}>Q-{repeatIndex == null ? 1 : parseInt(repeatIndex) + 1}</Text>
                        <Text style={[styles.txt, {
                            textAlign: 'center',
                            width: 320,
                            fontFamily: style.SemiBold,
                            fontSize: 16, color: '#fff', top: 18
                        }]}>{questionsList.league_questions[repeatIndex ? repeatIndex == null ? 0 : repeatIndex : 0].title}</Text>

                        <View style={styles.clockView}>
                            <View style={{ bottom: 10, flexDirection: 'row' }}>
                                <Icon name={"clock"} color={"#fff"} size={16} style={{ top: 10 }} />
                                <Text style={[styles.txt1, {
                                    marginLeft: 10,
                                    fontSize: 14, fontFamily: style.Medium
                                }]}>{questionsList.league_questions[repeatIndex ? repeatIndex == null ? 0 : repeatIndex : 0].myTime.gametime}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.questionsView}>
                    {questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].options?.map((item, index) => {
                        return (
                            <View style={{ marginVertical: 10 }}>
                                <View style={{
                                    height: 60,
                                    borderRadius: 30,
                                    backgroundColor: 'black',
                                    opacity: .5,
                                    alignItems: 'center',
                                }} />

                                <View style={{ position: 'absolute', width: '100%', bottom: -6 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setQuestion(index)
                                            _selectedAns(index)

                                        }} style={[styles.optionsView, {
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: Question == index ? 'green' : null


                                        }]}>
                                        <Text style={[styles.txt, {
                                            color: '#fff',
                                            // top: 17,
                                            fontSize: 14, fontFamily: style.Medium
                                        }]}>{index == 0 ? "A. " : index == 1 ? "B. " : index == 2 ? "C. " : index == 3 ? "D. " : null}{item}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                    <View style={{ marginTop: '10%', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View>
                            <TouchableOpacity
                                disabled={saveTitles === "Tournament" ? true : user.userdata.lfl_fifty_count == 0 ? true : false}
                                onPress={() => {
                                    setfifitymodal2(true)
                                }}
                                style={[styles.circles, { borderColor: style.btnColor }]}>
                                <Text style={{
                                    color: style.btnColor,
                                    fontSize: 16,
                                    fontFamily: style.JB
                                }}>50/50</Text>
                            </TouchableOpacity>
                            <View style={[styles.ratView, {
                                backgroundColor: user.userdata.lfl_fifty_count == 0 ? "red" : '#69CA19'
                            }]}>
                                <Text style={styles.txt3}>
                                    {user.userdata.lfl_fifty_count}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                disabled={saveTitles === "Tournament" ? true : user.userdata.lfl_refresh_count == 0 ? true : false}
                                onPress={() => {
                                    { saveTitles == "LeaGue" ? _refreshData2({ correctAnser, ref: "refresh" }) : _refreshData({ correctAnser, ref: "refresh" }) }
                                }}
                                style={[styles.circles, { borderColor: style.btnColor }]}>
                                <FontAwesome name={"refresh"} color={"red"} size={24} />
                            </TouchableOpacity>
                            <View style={[styles.ratView, {
                                backgroundColor: user.userdata.lfl_refresh_count == 0 ? "red" : '#69CA19'

                            }]}>
                                <Text style={styles.txt3}>
                                    {user.userdata.lfl_refresh_count}
                                </Text>
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity
                                disabled={saveTitles === "Tournament" ? true : user.userdata.lfl_audience_count == 0 ? true : false}
                                onPress={() => {
                                    setaudiencemodal2(true)

                                }}
                                style={[styles.circles, { borderColor: style.btnColor }]}>
                                <FontAwesome name={"group"} color={"red"} size={24} />
                            </TouchableOpacity>
                            <View style={[styles.ratView, {
                                backgroundColor: user.userdata.lfl_audience_count == 0 ? "red" : '#69CA19'
                            }]}>
                                <Text style={styles.txt3}>
                                    {user.userdata.lfl_audience_count}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                disabled={saveTitles === "Tournament" ? true : user.userdata.lfl_expert_count == 0 ? true : false}
                                onPress={() => {
                                    setexpertmodal2(true)
                                }}
                                style={[styles.circles, { borderColor: style.btnColor }]}>
                                <Ionicons name={"person"} color={"red"} size={24} />
                            </TouchableOpacity>
                            <View style={[styles.ratView, {
                                backgroundColor: user.userdata.lfl_expert_count == 0 ? "red" : '#69CA19'

                            }]}>
                                <Text style={styles.txt3}>
                                    {user.userdata.lfl_expert_count}
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>
                {/* Expert modal2 handle */}
                <View>
                    <Modal
                        style={{
                            margin: 0,
                            paddingHorizontal: 24,
                            backgroundColor: 'rgba(0,0,0,.4)'
                        }}
                        isVisible={expertmodal2}>
                        <View style={styles.modalContainer}>
                            <View style={[styles.paymentCard1, { height: 370 }]}>
                                <View style={{ flex: 1, width: '100%', paddingHorizontal: 12, paddingTop: 10 }}>
                                    <View style={{
                                        flexDirection: 'row', alignItems: 'center',
                                        justifyContent: 'space-between', padding: 12
                                    }}>
                                        <Text style={{ fontSize: 18, color: '#000', fontFamily: style.SemiBold }}>Expert Opinion</Text>
                                        <IconC
                                            onPress={() => {
                                                setexpertmodal2(false)
                                                _refreshData2({ milestone, ref: "expert" })
                                            }}
                                            name={"cross"} size={24} color={"#979797"} />
                                    </View>
                                    <View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                                            <Image source={{ uri: questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_image }} style={{
                                                height: 120,
                                                borderWidth: 2,
                                                borderColor: '#979797',
                                                borderRadius: 60, width: 120
                                            }} />
                                            <Text style={{ fontSize: 16, color: '#000', fontFamily: style.Bold, marginTop: 12 }}>{questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_name}</Text>
                                            <Text style={{ fontSize: 16, color: style.btnColor, fontFamily: style.SemiBold }}>Expert</Text>
                                            <Button
                                                disabled={true}
                                                title={questionsList.league_questions[repeatIndex == null ? 0
                                                    : repeatIndex].correct_option == 1 ?
                                                    `A. ${questionsList.league_questions[repeatIndex == null ? 0
                                                        : repeatIndex].lfl_expert_answer}` :
                                                    questionsList.league_questions[repeatIndex == null ? 0
                                                        : repeatIndex].correct_option == 2 ? `B. ${questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_answer}` : questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].correct_option == 3 ? `C. ${questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_answer}` : questionsList.league_questions[repeatIndex == null ? 0
                                                            : repeatIndex].correct_option == 4 ? `D. ${questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_answer}` : null}
                                                // onPress={() => {
                                                //     _refreshData({ milestone, ref: "expert" })
                                                // }}
                                                btnstyle={{
                                                    height: 45,
                                                    width: '90%',
                                                    marginTop: 40
                                                }}
                                            />
                                        </View>
                                    </View>

                                </View>

                            </View>
                        </View>
                    </Modal>
                </View>

                {/* Audience modal2 handle */}

                <View>
                    <Modal
                        style={{
                            margin: 0,
                            paddingHorizontal: 24,
                            backgroundColor: 'rgba(0,0,0,.4)'
                        }}
                        isVisible={audiencemodal2}>
                        <View style={styles.modalContainer}>
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
                                        <IconC onPress={() => {
                                            _refreshData2({ milestone, ref: "audience" })
                                        }} name={"cross"} size={24} color={"#979797"} />
                                    </View>

                                    <View style={{ margin: 10 }}>

                                        {/* try111 */}


                                        <View style={{
                                            height: 30,
                                            borderRadius: 20,
                                            marginVertical: 6,
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: "#E9EEF0"
                                        }}>
                                            <View style={{
                                                height: 30,
                                                backgroundColor: style.yellow,
                                                borderRadius: 20,
                                                alignItems: 'center',
                                                paddingHorizontal: 12,
                                                position: 'absolute',
                                                alignSelf: 'flex-start',
                                                // width:'100%'
                                                width: questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option1
                                            }}>
                                            </View>
                                            <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>A. {questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option1}</Text>

                                        </View>



                                        <View style={{
                                            height: 30,
                                            borderRadius: 20,
                                            marginVertical: 6,
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: "#E9EEF0"
                                        }}>
                                            <View style={{
                                                height: 30,
                                                backgroundColor: style.yellow,
                                                borderRadius: 20,
                                                alignItems: 'center',
                                                paddingHorizontal: 12,
                                                position: 'absolute',
                                                alignSelf: 'flex-start',
                                                width: questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option2
                                            }}>
                                            </View>
                                            <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>B. {questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option2}</Text>


                                        </View>

                                        <View style={{
                                            height: 30,
                                            borderRadius: 20,
                                            marginVertical: 6,
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: "#E9EEF0"
                                        }}>
                                            <View style={{
                                                height: 30,
                                                backgroundColor: style.yellow,
                                                borderRadius: 20,
                                                alignItems: 'center',
                                                paddingHorizontal: 12,
                                                position: 'absolute',
                                                alignSelf: 'flex-start',
                                                width: questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option3
                                            }}>
                                            </View>
                                            <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>C. {questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option3}</Text>


                                        </View>



                                        <View style={{
                                            height: 30,
                                            borderRadius: 20,
                                            marginVertical: 6,
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: "#E9EEF0"
                                        }}>
                                            {/* <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>D. {questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option4}</Text> */}
                                            <View style={{
                                                height: 30,
                                                backgroundColor: style.yellow,
                                                borderRadius: 20,
                                                alignItems: 'center',
                                                paddingHorizontal: 12,
                                                position: 'absolute',
                                                alignSelf: 'flex-start',
                                                width: questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option4,
                                            }}>
                                            </View>
                                            <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>D. {questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option4}</Text>


                                        </View>


                                    </View>
                                </View>

                            </View>
                        </View>

                    </Modal>
                </View>

                {/* fifty Modal2 */}

                <View>
                    <Modal
                        style={{
                            margin: 0,
                            paddingHorizontal: 24,
                            backgroundColor: 'rgba(0,0,0,.4)'
                        }}
                        isVisible={fiftymodal2}>
                        <View style={styles.modalContainer}>
                            <View style={[styles.paymentCard1, { height: 250 }]}>
                                <View style={{ flex: 1, width: '100%', paddingHorizontal: 12, paddingTop: 10 }}>
                                    <View style={{
                                        flexDirection: 'row', alignItems: 'center',
                                        justifyContent: 'space-between', padding: 12
                                    }}>
                                        <Text style={{ fontSize: 20, color: '#000', fontFamily: style.JB }}>50/50</Text>
                                        <IconC
                                            onPress={() => {
                                                _refreshData2({ milestone, ref: "fifty_fifty" })
                                            }
                                            }
                                            name={"cross"} size={24} color={"#979797"} />
                                    </View>
                                    <View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>

                                            <Button
                                                disabled={true}
                                                title={`A. ${questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_fifty_option1}`}
                                                // onPress={() => {
                                                //     _refreshData({ milestone, ref: "fifty_fifty" })
                                                // }}
                                                btnstyle={{
                                                    height: 45,
                                                    width: '90%',
                                                    marginTop: 40
                                                }}
                                            />
                                            <Button
                                                disabled={true}

                                                title={`B. ${questionsList.league_questions[repeatIndex == null ? 0 : repeatIndex].lfl_fifty_option2}`}
                                                // onPress={() => {
                                                //     _refreshData({ milestone, ref: "fifty_fifty" })
                                                // }}
                                                btnstyle={{
                                                    height: 45,
                                                    width: '90%',
                                                    marginTop: 10
                                                }}
                                            />
                                        </View>
                                    </View>

                                </View>

                            </View>
                        </View>
                    </Modal>
                </View>

            </View> :
                saveTitles == "Tournament" ?
                    <View style={styles.card}>
                        <View style={styles.rectangle} />
                        <View style={[styles.cardDataView, { top: 20 }]}>
                            {saveTitles == "LeaGue" || saveTitles === "Tournament" ? null :
                                <Text style={[styles.txt, { top: Platform.OS === "ios" ? 14 : 12 }]}>$ {milestone == 1 ? "100" : milestone == 2 ? "500" : milestone == 3 ? "1000" : milestone == 4 ? "10000" : milestone == 5 ? "15000" : milestone == 6 ? "20000" : milestone == 7 ? "25000" : milestone == 8 ? "30000" : milestone == 9 ? "35000" : milestone == 10 ? "40000" : milestone == 11 ? "50000" : 0}</Text>}
                            <View style={{ marginTop: '8%' }}>
                                <Text style={[styles.txt1, { fontFamily: style.Medium }]}>Q-{repeatIndex == null ? 1 : parseInt(repeatIndex) + 1}</Text>
                                <Text style={[styles.txt, {
                                    textAlign: 'center',
                                    width: 320,
                                    fontFamily: style.SemiBold,
                                    fontSize: 16, color: '#fff', top: 18
                                }]}>{questionsList.tournament_questions[repeatIndex ? repeatIndex == null ? 0 : repeatIndex : 0].title}</Text>

                                <View style={styles.clockView}>
                                    <View style={{ bottom: 10, flexDirection: 'row' }}>
                                        <Icon name={"clock"} color={"#fff"} size={16} style={{ top: 10 }} />
                                        <Text style={[styles.txt1, {
                                            marginLeft: 10,
                                            fontSize: 14, fontFamily: style.Medium
                                        }]}>{questionsList.tournament_questions[repeatIndex ? repeatIndex == null ? 0 : repeatIndex : 0].myTime.gametime}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.questionsView}>
                            {questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].options?.map((item, index) => {
                                return (
                                    <View style={{ marginVertical: 10 }}>
                                        <View style={{
                                            height: 60,
                                            borderRadius: 30,
                                            backgroundColor: 'black',
                                            opacity: .5,
                                            alignItems: 'center',
                                        }} />

                                        <View style={{ position: 'absolute', width: '100%', bottom: -6 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setQuestion(index)
                                                    _selectedAns(index)
                                                    // setq2(index)
                                                    setq2(questionsList.tournament_questions[repeatIndex ? repeatIndex == null ? 0 : repeatIndex : 0].correct_option)


                                                }} style={[styles.optionsView, {
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: Question == index ? "green" : Question == index && q2 ? "red" : null
                                                    // backgroundColor: Question == index ? 'green' : index == q2 && ansclick == 20 ? "red" : null

                                                }]}>
                                                <Text style={[styles.txt, {
                                                    color: '#fff',
                                                    // top: 17,
                                                    fontSize: 14, fontFamily: style.Medium
                                                }]}>{index == 0 ? "A. " : index == 1 ? "B. " : index == 2 ? "C. " : index == 3 ? "D. " : null}{item}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })}
                            <View style={{ marginTop: '10%', flexDirection: 'row', justifyContent: 'space-around' }}>

                                <View>
                                    <TouchableOpacity
                                        // disabled={saveTitles === "Tournament" ? true : user.userdata.lfl_fifty_count == 0 ? true : false}
                                        onPress={() => {
                                            setfifitymodal(true)
                                        }}
                                        style={[styles.circles, { borderColor: style.btnColor }]}>
                                        <Text style={{
                                            color: style.btnColor,
                                            fontSize: 16,
                                            fontFamily: style.JB
                                        }}>50/50</Text>
                                    </TouchableOpacity>
                                    <View style={[styles.ratView, {
                                        backgroundColor: user.userdata.lfl_fifty_count == 0 ? "red" : '#69CA19'
                                    }]}>
                                        <Text style={styles.txt3}>
                                            {user.userdata.lfl_fifty_count}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        disabled={user.userdata.lfl_refresh_count == 0 ? true : false}
                                        onPress={() => {
                                            _refreshDataTournament({ correctAnser, ref: "refresh" })
                                        }}
                                        style={[styles.circles, { borderColor: style.btnColor }]}>
                                        <FontAwesome name={"refresh"} color={"red"} size={24} />
                                    </TouchableOpacity>
                                    <View style={[styles.ratView, {
                                        backgroundColor: user.userdata.lfl_refresh_count == 0 ? "red" : '#69CA19'

                                    }]}>
                                        <Text style={styles.txt3}>
                                            {user.userdata.lfl_refresh_count}
                                        </Text>
                                    </View>
                                </View>

                                <View>
                                    <TouchableOpacity
                                        disabled={user.userdata.lfl_audience_count == 0 ? true : false}
                                        onPress={() => {
                                            setaudiencemodal(true)

                                        }}
                                        style={[styles.circles, { borderColor: style.btnColor }]}>
                                        <FontAwesome name={"group"} color={"red"} size={24} />
                                    </TouchableOpacity>
                                    <View style={[styles.ratView, {
                                        backgroundColor: user.userdata.lfl_audience_count == 0 ? "red" : '#69CA19'
                                    }]}>
                                        <Text style={styles.txt3}>
                                            {user.userdata.lfl_audience_count}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        disabled={user.userdata.lfl_expert_count == 0 ? true : false}
                                        onPress={() => {
                                            setexpertmodal(true)
                                        }}
                                        style={[styles.circles, { borderColor: style.btnColor }]}>
                                        <Ionicons name={"person"} color={"red"} size={24} />
                                    </TouchableOpacity>
                                    <View style={[styles.ratView, {
                                        backgroundColor: user.userdata.lfl_expert_count == 0 ? "red" : '#69CA19'

                                    }]}>
                                        <Text style={styles.txt3}>
                                            {user.userdata.lfl_expert_count}
                                        </Text>
                                    </View>
                                </View>

                            </View>
                        </View>

                        {/* Expert modal handle */}
                        <View>
                            <Modal
                                style={{
                                    margin: 0,
                                    paddingHorizontal: 24,
                                    backgroundColor: 'rgba(0,0,0,.4)'
                                }}
                                isVisible={expertmodal}>
                                <View style={styles.modalContainer}>
                                    <View style={[styles.paymentCard1, { height: 370 }]}>
                                        <View style={{ flex: 1, width: '100%', paddingHorizontal: 12, paddingTop: 10 }}>
                                            <View style={{
                                                flexDirection: 'row', alignItems: 'center',
                                                justifyContent: 'space-between', padding: 12
                                            }}>
                                                <Text style={{ fontSize: 18, color: '#000', fontFamily: style.SemiBold }}>Expert Opinion</Text>
                                                <IconC
                                                    onPress={() => {
                                                        setexpertmodal(false)
                                                        _refreshDataTournament({ milestone, ref: "expert" })
                                                    }}
                                                    name={"cross"} size={24} color={"#979797"} />
                                            </View>
                                            <View>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                                                    <Image source={{ uri: questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_image }} style={{
                                                        height: 120,
                                                        borderWidth: 2,
                                                        borderColor: '#979797',
                                                        borderRadius: 60, width: 120
                                                    }} />
                                                    <Text style={{ fontSize: 16, color: '#000', fontFamily: style.Bold, marginTop: 12 }}>{questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_name}</Text>
                                                    <Text style={{ fontSize: 16, color: style.btnColor, fontFamily: style.SemiBold }}>Expert</Text>
                                                    <Button
                                                        disabled={true}
                                                        title={questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].correct_option == 1 ? `A. ${questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_answer}` : questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].correct_option == 2 ? `B. ${questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_answer}` : questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].correct_option == 3 ? `C. ${questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_answer}` : questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].correct_option == 4 ? `D. ${questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_answer}` : null}
                                                        // onPress={() => {
                                                        //     _refreshData({ milestone, ref: "expert" })
                                                        // }}
                                                        btnstyle={{
                                                            height: 45,
                                                            width: '90%',
                                                            marginTop: 40
                                                        }}
                                                    />
                                                </View>
                                            </View>

                                        </View>

                                    </View>
                                </View>
                            </Modal>
                        </View>

                        {/* Audience modal handle */}

                        <View>
                            <Modal
                                style={{
                                    margin: 0,
                                    paddingHorizontal: 24,
                                    backgroundColor: 'rgba(0,0,0,.4)'
                                }}
                                isVisible={audiencemodal}>
                                <View style={styles.modalContainer}>
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
                                                <IconC onPress={() => {
                                                    _refreshDataTournament({ milestone, ref: "audience" })
                                                }} name={"cross"} size={24} color={"#979797"} />
                                            </View>

                                            <View style={{ margin: 10 }}>

                                                {/* try111 */}


                                                <View style={{
                                                    height: 30,
                                                    borderRadius: 20,
                                                    marginVertical: 6,
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: "#E9EEF0"
                                                }}>
                                                    <View style={{
                                                        height: 30,
                                                        backgroundColor: style.yellow,
                                                        borderRadius: 20,
                                                        alignItems: 'center',
                                                        paddingHorizontal: 12,
                                                        position: 'absolute',
                                                        alignSelf: 'flex-start',
                                                        // width:'100%'
                                                        width: questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option1
                                                    }}>
                                                    </View>
                                                    <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>A. {questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option1}</Text>

                                                </View>



                                                <View style={{
                                                    height: 30,
                                                    borderRadius: 20,
                                                    marginVertical: 6,
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: "#E9EEF0"
                                                }}>
                                                    <View style={{
                                                        height: 30,
                                                        backgroundColor: style.yellow,
                                                        borderRadius: 20,
                                                        alignItems: 'center',
                                                        paddingHorizontal: 12,
                                                        position: 'absolute',
                                                        alignSelf: 'flex-start',
                                                        width: questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option2
                                                    }}>
                                                    </View>
                                                    <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>B. {questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option2}</Text>


                                                </View>

                                                <View style={{
                                                    height: 30,
                                                    borderRadius: 20,
                                                    marginVertical: 6,
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: "#E9EEF0"
                                                }}>
                                                    <View style={{
                                                        height: 30,
                                                        backgroundColor: style.yellow,
                                                        borderRadius: 20,
                                                        alignItems: 'center',
                                                        paddingHorizontal: 12,
                                                        position: 'absolute',
                                                        alignSelf: 'flex-start',
                                                        width: questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option3
                                                    }}>
                                                    </View>
                                                    <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>C. {questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option3}</Text>


                                                </View>



                                                <View style={{
                                                    height: 30,
                                                    borderRadius: 20,
                                                    marginVertical: 6,
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: "#E9EEF0"
                                                }}>
                                                    {/* <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>D. {questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option4}</Text> */}
                                                    <View style={{
                                                        height: 30,
                                                        backgroundColor: style.yellow,
                                                        borderRadius: 20,
                                                        alignItems: 'center',
                                                        paddingHorizontal: 12,
                                                        position: 'absolute',
                                                        alignSelf: 'flex-start',
                                                        width: questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option4,
                                                    }}>
                                                    </View>
                                                    <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>D. {questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option4}</Text>


                                                </View>


                                            </View>
                                        </View>

                                    </View>
                                </View>

                            </Modal>
                        </View>

                        {/* fifty Modal */}

                        <View>
                            <Modal
                                style={{
                                    margin: 0,
                                    paddingHorizontal: 24,
                                    backgroundColor: 'rgba(0,0,0,.4)'
                                }}
                                isVisible={fiftymodal}>
                                <View style={styles.modalContainer}>
                                    <View style={[styles.paymentCard1, { height: 250 }]}>
                                        <View style={{ flex: 1, width: '100%', paddingHorizontal: 12, paddingTop: 10 }}>
                                            <View style={{
                                                flexDirection: 'row', alignItems: 'center',
                                                justifyContent: 'space-between', padding: 12
                                            }}>
                                                <Text style={{ fontSize: 20, color: '#000', fontFamily: style.JB }}>50/50</Text>
                                                <IconC
                                                    onPress={() => {
                                                        _refreshDataTournament({ milestone, ref: "fifty_fifty" })
                                                    }
                                                    }
                                                    name={"cross"} size={24} color={"#979797"} />
                                            </View>
                                            <View>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>

                                                    <Button
                                                        disabled={true}
                                                        title={`A. ${questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_fifty_option1}`}
                                                        // onPress={() => {
                                                        //     _refreshData({ milestone, ref: "fifty_fifty" })
                                                        // }}
                                                        btnstyle={{
                                                            height: 45,
                                                            width: '90%',
                                                            marginTop: 40
                                                        }}
                                                    />
                                                    <Button
                                                        disabled={true}

                                                        title={`B. ${questionsList.tournament_questions[repeatIndex == null ? 0 : repeatIndex].lfl_fifty_option2}`}
                                                        // onPress={() => {
                                                        //     _refreshData({ milestone, ref: "fifty_fifty" })
                                                        // }}
                                                        btnstyle={{
                                                            height: 45,
                                                            width: '90%',
                                                            marginTop: 10
                                                        }}
                                                    />
                                                </View>
                                            </View>

                                        </View>

                                    </View>
                                </View>
                            </Modal>
                        </View>


                    </View>
                    :
                    <View style={styles.card}>
                        {saveTitles === "Classic" ? <Subheader
                            navigation={navigation}
                            onPress={() => {
                                navigateToNextScreen()


                            }}
                            title={saveTitles === "Classic" ? milestone == 4 ? "$ 1000" : milestone == 6 ? " $ 15000" : milestone == 5 ? "$ 1000" : milestone == 6 ? "$ 15000" : milestone == 7 ? "$ 15000" : milestone == 8 ? " $ 15000" : milestone == 9 ? "$ 30000" : milestone == 10 ? "$ 30000" : milestone == 11 ? "$ 30000" : milestone == 12 ? "$ 50000" : 0 : 0}
                            headerTitle={saveTitles}
                            city={true}
                        /> : null}
                        {saveTitles === "LeaGue" ? <Image resizeMode='contain' source={require("../Assets/line.png")} style={styles.cardImg} /> :
                            saveTitles == "Tournament" ? <Image resizeMode='contain' source={require("../Assets/line.png")} style={styles.cardImg} /> :
                                <Image resizeMode='contain' source={require("../Assets/card.png")} style={styles.cardImg} />}
                        <View style={styles.cardDataView}>
                            {saveTitles == "LeaGue" || saveTitles === "Tournament" ? null :
                                <Text style={[styles.txt, { top: Platform.OS === "ios" ? 14 : 12 }]}>$ {milestone == 1 ? "100" : milestone == 2 ? "500" : milestone == 3 ? "1000" : milestone == 4 ? "10000" : milestone == 5 ? "15000" : milestone == 6 ? "20000" : milestone == 7 ? "25000" : milestone == 8 ? "30000" : milestone == 9 ? "35000" : milestone == 10 ? "40000" : milestone == 11 ? "50000" : 0}</Text>}
                            <View style={{ marginTop: '8%' }}>
                                <Text style={[styles.txt1, { fontFamily: style.Medium }]}>Q-{repeatIndex == null ? 1 : parseInt(repeatIndex) + 1}</Text>
                                <Text style={[styles.txt, {
                                    textAlign: 'center',
                                    width: 320,
                                    fontFamily: style.SemiBold,
                                    fontSize: 16, color: '#fff', top: 18
                                }]}>{questionsList.classic_questions[repeatIndex ? repeatIndex == null ? 0 : repeatIndex : 0].title}</Text>

                                <View style={styles.clockView}>
                                    <View style={{ bottom: 10, flexDirection: 'row' }}>
                                        <Icon name={"clock"} color={"#fff"} size={16} style={{ top: 10 }} />
                                        <Text style={[styles.txt1, {
                                            marginLeft: 10,
                                            fontSize: 14, fontFamily: style.Medium
                                        }]}>{questionsList.classic_questions[repeatIndex ? repeatIndex == null ? 0 : repeatIndex : 0].myTime.gametime}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.questionsView}>
                            {questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].options?.map((item, index) => {
                                return (
                                    <View style={{ marginVertical: 10 }}>
                                        <View style={{
                                            height: 60,
                                            borderRadius: 30,
                                            backgroundColor: 'black',
                                            opacity: .5,
                                            alignItems: 'center',
                                        }} />

                                        <View style={{ position: 'absolute', width: '100%', bottom: -6 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setQuestion(index)
                                                    _selectedAns(index)
                                                    // setq2(index)
                                                    setq2(questionsList.classic_questions[repeatIndex ? repeatIndex == null ? 0 : repeatIndex : 0].correct_option)


                                                }} style={[styles.optionsView, {
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: Question == index ? "green" : Question == index && q2 ? "red" : null
                                                    // backgroundColor: Question == index ? 'green' : index == q2 && ansclick == 20 ? "red" : null

                                                }]}>
                                                <Text style={[styles.txt, {
                                                    color: '#fff',
                                                    // top: 17,
                                                    fontSize: 14, fontFamily: style.Medium
                                                }]}>{index == 0 ? "A. " : index == 1 ? "B. " : index == 2 ? "C. " : index == 3 ? "D. " : null}{item}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })}
                            <View style={{ marginTop: '10%', flexDirection: 'row', justifyContent: 'space-around' }}>

                                <View>
                                    <TouchableOpacity
                                        disabled={saveTitles === "Tournament" ? true : user.userdata.lfl_fifty_count == 0 ? true : false}
                                        onPress={() => {
                                            setfifitymodal(true)
                                        }}
                                        style={[styles.circles, { borderColor: style.btnColor }]}>
                                        <Text style={{
                                            color: style.btnColor,
                                            fontSize: 16,
                                            fontFamily: style.JB
                                        }}>50/50</Text>
                                    </TouchableOpacity>
                                    <View style={[styles.ratView, {
                                        backgroundColor: user.userdata.lfl_fifty_count == 0 ? "red" : '#69CA19'
                                    }]}>
                                        <Text style={styles.txt3}>
                                            {user.userdata.lfl_fifty_count}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        disabled={saveTitles === "Tournament" ? true : user.userdata.lfl_refresh_count == 0 ? true : false}
                                        onPress={() => {
                                            _refreshData({ correctAnser, ref: "refresh" })
                                        }}
                                        style={[styles.circles, { borderColor: style.btnColor }]}>
                                        <FontAwesome name={"refresh"} color={"red"} size={24} />
                                    </TouchableOpacity>
                                    <View style={[styles.ratView, {
                                        backgroundColor: user.userdata.lfl_refresh_count == 0 ? "red" : '#69CA19'

                                    }]}>
                                        <Text style={styles.txt3}>
                                            {user.userdata.lfl_refresh_count}
                                        </Text>
                                    </View>
                                </View>

                                <View>
                                    <TouchableOpacity
                                        disabled={saveTitles === "Tournament" ? true : user.userdata.lfl_audience_count == 0 ? true : false}
                                        onPress={() => {
                                            setaudiencemodal(true)

                                        }}
                                        style={[styles.circles, { borderColor: style.btnColor }]}>
                                        <FontAwesome name={"group"} color={"red"} size={24} />
                                    </TouchableOpacity>
                                    <View style={[styles.ratView, {
                                        backgroundColor: user.userdata.lfl_audience_count == 0 ? "red" : '#69CA19'
                                    }]}>
                                        <Text style={styles.txt3}>
                                            {user.userdata.lfl_audience_count}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        disabled={saveTitles === "Tournament" ? true : user.userdata.lfl_expert_count == 0 ? true : false}
                                        onPress={() => {
                                            setexpertmodal(true)
                                        }}
                                        style={[styles.circles, { borderColor: style.btnColor }]}>
                                        <Ionicons name={"person"} color={"red"} size={24} />
                                    </TouchableOpacity>
                                    <View style={[styles.ratView, {
                                        backgroundColor: user.userdata.lfl_expert_count == 0 ? "red" : '#69CA19'

                                    }]}>
                                        <Text style={styles.txt3}>
                                            {user.userdata.lfl_expert_count}
                                        </Text>
                                    </View>
                                </View>

                            </View>
                        </View>

                        {/* Expert modal handle */}
                        <View>
                            <Modal
                                style={{
                                    margin: 0,
                                    paddingHorizontal: 24,
                                    backgroundColor: 'rgba(0,0,0,.4)'
                                }}
                                isVisible={expertmodal}>
                                <View style={styles.modalContainer}>
                                    <View style={[styles.paymentCard1, { height: 370 }]}>
                                        <View style={{ flex: 1, width: '100%', paddingHorizontal: 12, paddingTop: 10 }}>
                                            <View style={{
                                                flexDirection: 'row', alignItems: 'center',
                                                justifyContent: 'space-between', padding: 12
                                            }}>
                                                <Text style={{ fontSize: 18, color: '#000', fontFamily: style.SemiBold }}>Expert Opinion</Text>
                                                <IconC
                                                    onPress={() => {
                                                        setexpertmodal(false)
                                                        _refreshData({ milestone, ref: "expert" })
                                                    }}
                                                    name={"cross"} size={24} color={"#979797"} />
                                            </View>
                                            <View>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                                                    <Image source={{ uri: questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_image }} style={{
                                                        height: 120,
                                                        borderWidth: 2,
                                                        borderColor: '#979797',
                                                        borderRadius: 60, width: 120
                                                    }} />
                                                    <Text style={{ fontSize: 16, color: '#000', fontFamily: style.Bold, marginTop: 12 }}>{questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_name}</Text>
                                                    <Text style={{ fontSize: 16, color: style.btnColor, fontFamily: style.SemiBold }}>Expert</Text>
                                                    <Button
                                                        disabled={true}
                                                        title={questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].correct_option == 1 ? `A. ${questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_answer}` : questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].correct_option == 2 ? `B. ${questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_answer}` : questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].correct_option == 3 ? `C. ${questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_answer}` : questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].correct_option == 4 ? `D. ${questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_expert_answer}` : null}
                                                        // onPress={() => {
                                                        //     _refreshData({ milestone, ref: "expert" })
                                                        // }}
                                                        btnstyle={{
                                                            height: 45,
                                                            width: '90%',
                                                            marginTop: 40
                                                        }}
                                                    />
                                                </View>
                                            </View>

                                        </View>

                                    </View>
                                </View>
                            </Modal>
                        </View>

                        {/* Audience modal handle */}

                        <View>
                            <Modal
                                style={{
                                    margin: 0,
                                    paddingHorizontal: 24,
                                    backgroundColor: 'rgba(0,0,0,.4)'
                                }}
                                isVisible={audiencemodal}>
                                <View style={styles.modalContainer}>
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
                                                <IconC onPress={() => {
                                                    _refreshData({ milestone, ref: "audience" })
                                                }} name={"cross"} size={24} color={"#979797"} />
                                            </View>

                                            <View style={{ margin: 10 }}>

                                                {/* try111 */}


                                                <View style={{
                                                    height: 30,
                                                    borderRadius: 20,
                                                    marginVertical: 6,
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: "#E9EEF0"
                                                }}>
                                                    <View style={{
                                                        height: 30,
                                                        backgroundColor: style.yellow,
                                                        borderRadius: 20,
                                                        alignItems: 'center',
                                                        paddingHorizontal: 12,
                                                        position: 'absolute',
                                                        alignSelf: 'flex-start',
                                                        // width:'100%'
                                                        width: questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option1
                                                    }}>
                                                    </View>
                                                    <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>A. {questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option1}</Text>

                                                </View>



                                                <View style={{
                                                    height: 30,
                                                    borderRadius: 20,
                                                    marginVertical: 6,
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: "#E9EEF0"
                                                }}>
                                                    <View style={{
                                                        height: 30,
                                                        backgroundColor: style.yellow,
                                                        borderRadius: 20,
                                                        alignItems: 'center',
                                                        paddingHorizontal: 12,
                                                        position: 'absolute',
                                                        alignSelf: 'flex-start',
                                                        width: questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option2
                                                    }}>
                                                    </View>
                                                    <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>B. {questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option2}</Text>


                                                </View>

                                                <View style={{
                                                    height: 30,
                                                    borderRadius: 20,
                                                    marginVertical: 6,
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: "#E9EEF0"
                                                }}>
                                                    <View style={{
                                                        height: 30,
                                                        backgroundColor: style.yellow,
                                                        borderRadius: 20,
                                                        alignItems: 'center',
                                                        paddingHorizontal: 12,
                                                        position: 'absolute',
                                                        alignSelf: 'flex-start',
                                                        width: questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option3
                                                    }}>
                                                    </View>
                                                    <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>C. {questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option3}</Text>


                                                </View>



                                                <View style={{
                                                    height: 30,
                                                    borderRadius: 20,
                                                    marginVertical: 6,
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: "#E9EEF0"
                                                }}>
                                                    {/* <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>D. {questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option4}</Text> */}
                                                    <View style={{
                                                        height: 30,
                                                        backgroundColor: style.yellow,
                                                        borderRadius: 20,
                                                        alignItems: 'center',
                                                        paddingHorizontal: 12,
                                                        position: 'absolute',
                                                        alignSelf: 'flex-start',
                                                        width: questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option4,
                                                    }}>
                                                    </View>
                                                    <Text style={{ fontFamily: style.SemiBold, color: '#000', fontSize: 16 }}>D. {questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_audience_option4}</Text>


                                                </View>


                                            </View>
                                        </View>

                                    </View>
                                </View>

                            </Modal>
                        </View>

                        {/* fifty Modal */}

                        <View>
                            <Modal
                                style={{
                                    margin: 0,
                                    paddingHorizontal: 24,
                                    backgroundColor: 'rgba(0,0,0,.4)'
                                }}
                                isVisible={fiftymodal}>
                                <View style={styles.modalContainer}>
                                    <View style={[styles.paymentCard1, { height: 250 }]}>
                                        <View style={{ flex: 1, width: '100%', paddingHorizontal: 12, paddingTop: 10 }}>
                                            <View style={{
                                                flexDirection: 'row', alignItems: 'center',
                                                justifyContent: 'space-between', padding: 12
                                            }}>
                                                <Text style={{ fontSize: 20, color: '#000', fontFamily: style.JB }}>50/50</Text>
                                                <IconC
                                                    onPress={() => {
                                                        _refreshData({ milestone, ref: "fifty_fifty" })
                                                    }
                                                    }
                                                    name={"cross"} size={24} color={"#979797"} />
                                            </View>
                                            <View>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>

                                                    <Button
                                                        disabled={true}
                                                        title={`A. ${questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_fifty_option1}`}
                                                        // onPress={() => {
                                                        //     _refreshData({ milestone, ref: "fifty_fifty" })
                                                        // }}
                                                        btnstyle={{
                                                            height: 45,
                                                            width: '90%',
                                                            marginTop: 40
                                                        }}
                                                    />
                                                    <Button
                                                        disabled={true}

                                                        title={`B. ${questionsList.classic_questions[repeatIndex == null ? 0 : repeatIndex].lfl_fifty_option2}`}
                                                        // onPress={() => {
                                                        //     _refreshData({ milestone, ref: "fifty_fifty" })
                                                        // }}
                                                        btnstyle={{
                                                            height: 45,
                                                            width: '90%',
                                                            marginTop: 10
                                                        }}
                                                    />
                                                </View>
                                            </View>

                                        </View>

                                    </View>
                                </View>
                            </Modal>
                        </View>


                    </View>
            }






        </View>
    )
}

export default QuestionsCard

const styles = StyleSheet.create({
    card: {
        flex: 1,
    },
    ratView: {
        // padding:10,
        height: 25, width: 25,
        alignSelf: 'flex-end',
        borderRadius: 30, backgroundColor: 'red', position: 'absolute'
    },
    txt3: {

        textAlign: 'center',
        top: 3, color: '#fff', fontFamily: style.SemiBold
    },
    txt1: {
        color: '#fff',
        top: 10,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: style.Regular
    },
    optionsView: {
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#979797',
        alignItems: 'center', marginVertical: 5
    },
    rectangle: {
        height: 200, borderWidth: 1,
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 20,
        justifyContent: 'center',
        borderColor: "red"
    },
    questionsView: {
        marginTop: '5%'
    },
    clockView: {
        marginTop: '10%',
        alignItems: 'center',
        backgroundColor: 'black',
        flexDirection: 'row',
        height: 30,
        borderRadius: 15,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    circles: {
        height: 70,
        width: 70,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#fff'
    },
    txt: {
        color: '#000',
        top: 6,
        fontSize: 24,
        fontFamily: style.Bold
    },
    cardDataView: {
        position: 'absolute', width: '100%',
        // backgroundColor:'red',
        top: 65,
        height: 220, alignItems: 'center'
    },
    cardImg: {
        // height: ,
        marginTop: 20,
        width: '100%',
    },




    //modal styleee


    txt: {
        color: 'black',
        fontSize: 18,
        // width: 200,
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