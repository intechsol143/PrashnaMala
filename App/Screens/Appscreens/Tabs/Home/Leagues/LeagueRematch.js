import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, BackHandler, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState, useRef, useCallback } from 'react'
const bgImg = require("../../../../../Assets/bg3.png")
// const bgImg2 = require("../../../../Assets/cong1.png")
const bgImg2 = require("../../../../../Assets/ii.png")
import IconBack from 'react-native-vector-icons/Entypo'
import { style } from '../../../../../Constants'
import Button from '../../../../../Components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

import {
  SetAccept,
  SetAnsCount,
  SetBox,
  SetLeave,
  SetMyTotalQues,
  SetQues,
  SetRepeateIndexData,
  SetStop,
  SetTournamentLooser,
  SetTournamentWinner,
  SetUser
} from '../../../../../Redux/actions/appactions/Index'
import { acceptLeagueRematch, GameResult, get_league_questions, get_Tournament_questions, LeagueRmatch, SearchUserForMatch, tournamentResult, unsetPoints, _ToLeavegame, setWinnerLeagueRank, setWinnerTournamentRank } from '../../../../../Utils/Apis'
import Loader from '../../../../../Components/Loader'
let interval = null;

const LeagueRematch = ({ route, navigation }) => {
  const {
    item,
    List,
    price,
    box_id,
    coin_id,
    tournamentId
  } = route.params;
  const {
    totalQlist,
    user,
    leaveGame,
    saveBox,
    questionsList, stop, saveAccept, saveTitles, tournamentWinner, tournamentLooser } = useSelector(({ appReducer }) => appReducer);
  const dispatch = useDispatch()
  const win = Dimensions.get('window');


  const ratio = win.width / 200;
  const apiToken = user.token
  const [winerStatus, setwinnerStatus] = useState("")
  const [t, sett] = useState("wait")
  const [isStart, setIsStart] = useState(false);
  const funRef = useRef(null);
  const [join, setjoin] = useState(false)
  const incorectresult = totalQlist - item;
  const timer = useRef();
  const [toggle, settoggle] = useState(false)
  const [leagueStatus, setleagueStatus] = useState("")
  const [loading, setloading] = useState(false)
  const [intervalID, setInterID] = useState(0);
  const [leagueLoader, setleagueLoader] = useState(false)

  // const [checkWinnerresponce, setcheckWinnerresponce] = useState({})
  // let intervalID = 0
  //check winner data...

  useEffect(() => {
    // if(saveTitles !="Tournament"){
    // _showLeagueWinner(box_id, coin_id, item)
    // }
    if (saveTitles != "Tournament") {
      _showLeagueWinner(box_id, coin_id, item)
      if (t == "wait") {
        let letintervalID = setInterval(() => {
          _showLeagueWinner(box_id, coin_id, item)
        }, 5000);
        setInterID(letintervalID);
      } else if (t != "wait") {
        clearInterval(intervalID);
      }
    } else {
      _showTournamentWinner(box_id, item, tournamentId)
      if (t == "wait") {
        let letintervalID = setInterval(() => {
          _showTournamentWinner(box_id, item, tournamentId)
        }, 5000);
        setInterID(letintervalID);
      } else if (t != "wait") {
        clearInterval(intervalID);
      }

    }

  }, [t, box_id, coin_id, item, price, tournamentId, saveTitles]);

  console.log("check stoppppp", stop)

  //check accepted data status...

  useEffect(() => {
    if (saveTitles != "Tournament") {
      if (saveAccept != "accepted") {
        const interval = setInterval(() => {
          _usersSearch()
        }, 3000);
        return () => clearInterval(interval);
      } else if (saveAccept == "accepted") {
        _accePtrematch()
        const interval = setInterval(() => {
        }, 3000);
        return () => clearInterval(interval);
      }
    }
    else {
      console.log("test")
    }

  }, [toggle])
  //..................


  //...........Leave Game api Call
  const _Leavegame = () => {
    setloading(true)
    SetTournamentWinner("")(dispatch)
    const userdata = new FormData()
    userdata.append("league_id", box_id)
    userdata.append("coin_id", coin_id)
    _ToLeavegame({ userdata, apiToken }).then((responce) => {
      setloading(false)
      if (responce.status == "success") {
        clearInterval(timer.current);
        SetLeave(false)(dispatch)
        SetAnsCount(null)(dispatch)
        SetStop("wait")(dispatch)
        SetTournamentWinner("")(dispatch)
        clearInterval(intervalID)
        SetMyTotalQues(0)(dispatch)

        navigation.replace("Tab")
      }
    }).catch((error) => {
      setloading(false)

    })

  }

  const _LeaveTournamentgame = () => {
    SetTournamentWinner("")(dispatch)
    clearInterval(intervalID)
    setwinnerStatus("")
    SetMyTotalQues(0)(dispatch)
    SetBox(false)(dispatch)
    navigation.navigate("Tab")
    SetStop("")(dispatch)
    SetAccept("")(dispatch)
  }


  useEffect(() => {
    if (stop == "close" && saveTitles != "Tournament" ) {
      _SetWinnerLeagueRank(coin_id)
    }
  }, [stop])

  useEffect(() => {
    if (stop == "close" && saveTitles == "Tournament") {
      _SetWinnerTournamentRank()
    }
  }, [stop,saveTitles])





  const _showLeagueWinner = (a, b, c) => {
    const userdata = new FormData()
    userdata.append("league_id", a)
    userdata.append("coin_id", b)
    userdata.append("correct_answers", c)
    GameResult({ userdata, apiToken }).then((responce) => {
      console.log("resultttt of league", responce)
      setwinnerStatus(responce.is_winner)
      sett(responce.is_winner)
      if (responce.is_winner == "wait") {
        SetStop("wait")(dispatch)
      } else if (responce.is_winner == "winner") {
        SetStop("winner")(dispatch)
        SetBox(false)(dispatch)
        clearInterval(intervalID)
      } else if (responce.is_winner == "close") {
        SetStop("close")(dispatch)
        clearInterval(intervalID)

        SetBox(false)(dispatch)
      } else if (responce.is_winner == "draw") {
        SetStop("draw")(dispatch)
        SetBox(false)(dispatch)
        // SetTournamentLooser("T_Looser")(dispatch)
      }

    }).catch((error) => {
      console.log("Api Error", error.response)
      // console.log("Result Error", error.response)
    })
  }





  const _showTournamentWinner = (a, b) => {
    const userdata = new FormData()
    userdata.append("box_id", a)
    userdata.append("correct_answers", b)
    userdata.append("tournament_id", tournamentId)
    tournamentResult({ userdata, apiToken }).then((responce) => {
      setwinnerStatus(responce.is_winner)
      sett(responce.is_winner)
      if (responce.is_winner == "wait") {
        SetStop("wait")(dispatch)
      } else if (responce.is_winner == "winner") {
        SetStop("winner")(dispatch)
        SetBox(false)(dispatch)
        SetTournamentWinner("T_Winner")(dispatch)
        clearInterval(intervalID)
      } else if (responce.is_winner == "close") {
        SetStop("close")(dispatch)
        SetBox(false)(dispatch)
        SetTournamentLooser("T_Looser")(dispatch)
        clearInterval(intervalID)
      } else if (responce.is_winner == "draw") {
        SetStop("draw")(dispatch)
        SetBox(false)(dispatch)
        // SetTournamentLooser("T_Looser")(dispatch)
      }

    }).catch((error) => {
      console.log("Result Error", error.response)
    })
  }


  //..........Rematch Game api call
  const _reMatch = () => {
    setleagueLoader(true)
    const userdata = new FormData()
    userdata.append("league_id", box_id)
    userdata.append("coin_id", coin_id)
    userdata.append("operant_id", List?.userdata?.id)
    LeagueRmatch({ userdata, apiToken }).then((responce) => {
      setleagueLoader(false)

      if (responce) {
        setIsStart(true)
      }
    }).catch((error) => {
      setleagueLoader(false)

      console.log("Error----------", error)
    })
    // navigation.navigate("Tab")
    // SetAnsCount(null)(dispatch)
  }

  //..........Search User
  const _usersSearch = () => {
    settoggle(!toggle)
    const userdata = new FormData()
    userdata.append("league_id", box_id)
    userdata.append("coin_id", coin_id)
    SearchUserForMatch({ userdata, apiToken }).then((responce) => {
      if (responce.status === "success") {
        setjoin(responce.is_rematch)
      }
      if (responce.league_start == "accepted") {
        SetAccept("accepted")(dispatch)
        setleagueStatus(responce.league_start)
        // _accePtrematch();
      }

    }).catch((error) => {
      console.log("Error hellooooo", error.response)

    })
  }






  const _accePtrematch = () => {
    setleagueLoader(true)

    const userdata = new FormData()
    userdata.append("league_id", box_id)
    userdata.append("coin_id", coin_id)
    acceptLeagueRematch({ userdata, apiToken }).then((responce) => {
      if (responce.status === "success") {
        setleagueLoader(false)

        _getLeagueQuestions();
      }
      console.log("responce Of accept", responce)
    }).catch((error) => {
      setleagueLoader(false)

      console.log("Error", error.response)
    })
  }
  const _getLeagueQuestions = () => {
    SetRepeateIndexData(null)(dispatch)
    const userdata = new FormData()
    userdata.append("league_id", box_id)
    userdata.append("coin_id", coin_id)
    userdata.append("second_user_id", List.userdata.id)
    userdata.append("is_rematch", true)
    get_league_questions({ userdata, apiToken }).then((responce) => {
      // SetLeave(false)(dispatch)
      SetBox(true)(dispatch)

      clearInterval(timer.current);
      let amountEmbed = { ...user }
      let b = parseInt(amountEmbed.userdata.coin) - price
      amountEmbed.userdata.coin = b,
        SetUser(amountEmbed)(dispatch)
      if (questionsList == null) {
        clearInterval(timer.current);
        clearInterval(intervalID)
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
        SetStop("")(dispatch)
        SetAccept("")(dispatch)
        navigation.replace("Questionscreen", {
          id: List.userdata.id,
          res: responce.league,
          name: user.userdata.name,
          price: price,
          data: List,
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
            clearInterval(timer.current);
            clearInterval(intervalID)
            navigation.replace("Questionscreen", {
              id: List.userdata.id,
              res: responce.league,
              name: user.userdata.name,
              price: price,
              data: List,
              box_id,
              coin_id
            })
          }
          else {
            SetQues(arr)(dispatch)
            SetRepeateIndexData(null)(dispatch)
            clearInterval(timer.current);
            clearInterval(intervalID)
            SetStop("")(dispatch)
            SetAccept("")(dispatch)
            navigation.replace("Questionscreen", {
              id: List.userdata.id,
              res: responce.league,
              name: user.userdata.name,
              price: price,
              data: List,
              box_id,
              coin_id
            })
          }
        }
        else {
          SetQues(arr)(dispatch)
          SetRepeateIndexData(null)(dispatch)
          clearInterval(timer.current);
          clearInterval(intervalID)
          SetStop("")(dispatch)
          SetAccept("")(dispatch)
          navigation.replace("Questionscreen", {
            id: List.userdata.id,
            res: responce.league,
            name: user.userdata.name,
            price: price,
            data: List,
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

  const _gettournament_Questions = () => {
    setloading(true)
    // SetQues(null)(dispatch)
    clearInterval(funRef.current);
    const userdata = new FormData()
    userdata.append("box_id", box_id)
    // userdata.append("coin_id", coin_id)
    userdata.append("second_user_id", List.id)
    get_Tournament_questions({ userdata, apiToken }).then((responce) => {
      setloading(false)
      clearInterval(funRef.current);
      if (saveTitles == "Tournament" && stop == "draw") {
        setwinnerStatus("")
        SetMyTotalQues(0)(dispatch)
        SetBox(false)(dispatch)
        SetStop("")(dispatch)
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
            id: List.id,
            res: responce.league,
            name: user.userdata.name,
            price: price,
            data: List,
            box_id,
            coin_id
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
                id: List.id,
                res: responce.league,
                name: user.userdata.name,
                price: price,
                data: List,
                box_id,
                coin_id
              })
            }
            else {
              SetQues(arr)(dispatch)
              SetRepeateIndexData(null)(dispatch)
              navigation.push("Questionscreen", {
                id: List.id,
                res: responce.league,
                name: user.userdata.name,
                price: price,
                data: List,
                box_id,
                coin_id
              })
            }
          }
          else {
            SetQues(arr)(dispatch)
            SetRepeateIndexData(null)(dispatch)
            navigation.push("Questionscreen", {
              id: List.id,
              res: responce.league,
              name: user.userdata.name,
              price: price,
              data: List,
              box_id,
              coin_id
              // data
            })
          }

        }

      } else {
        navigation.navigate("Tournament", { box_id, item: List })

      }




    }).catch((error) => {
      console.log("Error------", error)
    })


  }


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




  const _SetWinnerLeagueRank = (coinId) => {
    const userdata = new FormData();
    userdata.append('coin_id', coinId)
    setWinnerLeagueRank({ userdata, apiToken }).then((responce) => {
      if (responce) {
        _countgamePoints()
      }
    }).catch((error) => {
      console.log("ERROR on winner", error.response)
    })
  }

  const _countgamePoints = () => {
    const userdata = new FormData();
    userdata.append('user1', user.userdata.id)
    userdata.append('user2', List?.userdata?.id)
    console.log("hello userdata", userdata)
    unsetPoints({ userdata, apiToken }).then((responce) => {
      console.log("points responce on league", responce)

    }).catch((error) => {
      console.log("ERROR on count", error.response)
    })
  }

  const _SetWinnerTournamentRank = () => {
    setWinnerTournamentRank(apiToken).then((responce) => {
      console.log("tournament rank responce",responce)
      if (responce) {
        _countgamePoints()
      }
    }).catch((error) => {
      console.log("ERROR on tournament winner", error.response)
    })
  }
  return (
    <ImageBackground
      // source={stop == "winner" || leaveGame == true ? bgImg2 : bgImg}
      source={saveBox ? bgImg : stop == "winner" ? bgImg2 : bgImg}
      style={styles.container}>
      {loading && <Loader />}
      {leagueLoader && <Loader />}
      {saveTitles != "Tournament" ? <View style={{ flex: 1 }}>
        <View style={styles.iconView}>
          <IconBack name='cross'
            onPress={() => {
              if (saveTitles != "Tournament") {
                _Leavegame()

              } else {
                _LeaveTournamentgame()
              }

            }}
            color={"#fff"} size={32} style={{ marginRight: 20 }} />
        </View>
        <View style={{ flex: 4, alignItems: 'center' }}>
          <View style={styles.itemsContainer}>
            <View style={styles.container}>
              <View style={[styles.parentContainer, { marginTop: '10%' }]}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {stop == "draw" ? <View>
                  </View> : stop == "winner" ? <View style={styles.playerscontainer}>
                    <View style={styles.playerscontainer}>
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
                        position: 'absolute',
                        bottom: -5
                      }]}>Winner</Text>
                    </View>
                  </View> : stop == "close" ? <View>
                    <Text style={{ color: '#fff', fontFamily: style.Bold, fontSize: 20 }}>Looser</Text>
                  </View> : null}

                  <View style={[styles.imgStyler, {
                    borderColor: style.yellow,
                  }]}>
                    {user.userdata.image ? <Image source={{ uri: user.userdata.image }} style={styles.imgs} /> : <Image source={require("../../../../../Assets/user.png")} style={styles.imgs} />}
                  </View>
                  <Text style={styles.nameTxt}>{user.userdata.name.split(' ')[0]}</Text>
                </View>

                <Text style={[styles.vsTxt, {
                  color: '#fff',
                  paddingHorizontal: 12
                }]}>VS</Text>
                <TouchableOpacity
                  onPress={() => { }} style={{
                    alignItems: 'center',
                  }}>

                  {/* <Text style={{ color: '#fff', fontFamily: style.Bold, fontSize: 20 }}>{leaveGame ? "Looser" : null}</Text> */}
                  <View style={styles.imgStyler}>
                    {List?.userdata?.image ? <Image source={{ uri: List?.userdata.image }} style={styles.imgs} />
                      : List?.image ? <Image source={{ uri: List?.image }} style={styles.imgs} /> : <Image source={require("../../../../../Assets/user.png")} style={styles.imgs} />}
                  </View>

                  <Text style={styles.nameTxt}>{List?.userdata?.name.split(' ')[0] ? List?.userdata?.name.split(' ')[0] : List?.name.split(' ')[0]}</Text>
                  {join || saveAccept == "accepted" ? <TouchableOpacity style={{
                    height: 30,
                    bottom: 6,
                    alignItems: 'center'
                  }}>
                    <Image source={require("../../../../../Assets/curveIcon.png")} style={{
                      width: 100,
                      height: 30,
                      tintColor: style.green,
                      resizeMode: 'contain'
                    }} />
                    <View style={{ position: 'absolute', bottom: -8 }}>
                      <Text style={[styles.nameTxt, { fontSize: 12 }]}>Play Again</Text>
                    </View>
                  </TouchableOpacity> : null}
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center', height: 100 }}>
                {saveBox == true ? <View style={{ alignItems: 'center' }}>
                  <Text style={styles.wingnTxt}>Wait for operant</Text>
                  <Text style={styles.wingnTxt}>{"operant is still playing"}</Text>
                </View> : stop == "winner" ? <View style={{ alignItems: 'center' }}>
                  <Text style={[styles.wingnTxt, { fontSize: 24 }]}>{"Congratulation"}</Text>
                  <Text style={[styles.wingnTxt, { fontFamily: style.Regular }]}>{"You have won the match sucessfully!"}</Text>
                </View> : stop == "close" ? <View style={{ alignItems: 'center' }}>
                  <Text style={[styles.wingnTxt, { fontFamily: style.Regular }]}>{"You lose"}</Text>
                </View> : stop == "draw" && winerStatus == "draw" ? <View style={{ alignItems: 'center' }}>
                  <Text style={[styles.wingnTxt, { fontFamily: style.Regular }]}>{"The match has been draw"}</Text>
                </View> :
                  <View>
                  </View>}
                {stop == "winner" ? <View style={[styles.rxd, { marginTop: 30 }]}>
                  <Image source={require("../../../../../Assets/4.png")} style={{ height: 35, width: 35, resizeMode: 'contain' }} />
                  <Text style={{ fontSize: 16, fontFamily: style.Bold, color: style.yellow }}>{parseInt(price) * 2} Coins</Text>
                </View> : null}


              </View>



              <View style={[styles.txtcontroll, { marginTop: stop == "winner" ? 60 : 0 }]}>
                <View>
                  <View style={styles.commondesign} />
                  <View style={styles.commondesign2}>
                    <Image source={require("../../../../../Assets/check.png")} style={styles.iconstylecommon} />
                    <Text style={[styles.textcomon, { marginLeft: 8 }]}>{parseInt(item)} Correct</Text>
                  </View>
                </View>
                <View style={{ marginLeft: 6 }}>
                  <View style={styles.commondesign} />
                  <View style={styles.commondesign2}>
                    <Image source={require("../../../../../Assets/cross1.png")} style={styles.iconstylecommon} />
                    <Text style={[styles.textcomon, { marginLeft: 6 }]}>{parseInt(incorectresult)} InCorrect</Text>
                  </View>
                </View>

              </View>

              {!saveBox ? <Button title={join || saveAccept == "accepted" ? "Join" : tournamentWinner == "T_Winner" ? "Go to Next round" : tournamentLooser == "T_Looser" ? "Go to Home" : "Rematch"}
                onPress={() => {
                  if (join) {
                    _accePtrematch()
                  } else if (tournamentWinner == "T_Winner") {
                    _gettournament_Questions();

                  } else if (tournamentLooser == "T_Looser") {
                    SetTournamentWinner("")(dispatch)
                    clearInterval(intervalID)
                    navigation.replace("Tab")
                  }
                  else {
                    _reMatch()
                  }


                }}
                textstyle={{
                  color: join || saveAccept == "accepted" ? "#fff" : style.yellow,
                  fontSize: join ? 20 : 14
                }}
                btnstyle={{
                  backgroundColor: join || saveAccept == "accepted" ? style.green : null,
                  borderWidth: 1,
                  alignSelf: 'center',
                  width: "70%",
                  marginTop: "10%",
                  borderColor: style.yellow
                }}
              /> : null}
            </View>



          </View>
        </View>
      </View> : <View style={{ flex: 1 }}>
        <View style={styles.iconView}>
          <IconBack name='cross'
            onPress={() => {
              if (saveTitles != "Tournament") {
                _Leavegame()

              } else {
                _LeaveTournamentgame()
              }

            }}
            color={"#fff"} size={32} style={{ marginRight: 20 }} />
        </View>
        <View style={{ flex: 4, alignItems: 'center' }}>
          <View style={styles.itemsContainer}>
            <View style={styles.container}>
              <View style={[styles.parentContainer, { marginTop: '10%' }]}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {stop == "draw" ? <View>
                    {/* <Text>Match draw</Text> */}
                  </View> : stop == "winner" && winerStatus == "winner" ? <View style={styles.playerscontainer}>
                    <View style={styles.playerscontainer}>
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
                        position: 'absolute',
                        bottom: -5
                      }]}>Winner</Text>
                    </View>
                  </View> : stop == "close" ? <View>
                    <Text>Close</Text>
                  </View> : null}

                  <View style={[styles.imgStyler, {
                    borderColor: style.yellow,
                  }]}>
                    {user.userdata.image ? <Image source={{ uri: user.userdata.image }} style={styles.imgs} /> : <Image source={require("../../../../../Assets/user.png")} style={styles.imgs} />}
                  </View>
                  <Text style={styles.nameTxt}>{user.userdata.name.split(' ')[0]}</Text>
                </View>
                <Text style={[styles.vsTxt, {
                  color: '#fff',
                  paddingHorizontal: 12
                }]}>VS</Text>
                <TouchableOpacity
                  onPress={() => { }} style={{
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: '#fff', fontFamily: style.Bold, fontSize: 20 }}>{stop == "winner" && winerStatus == "winner" ? "Looser" : null}</Text>

                  {/* <Text style={{ color: '#fff', fontFamily: style.Bold, fontSize: 20 }}>{stop == "draw" ? null : leaveGame ? "Looser" : null}</Text> */}
                  <View style={styles.imgStyler}>
                    {List?.userdata?.image ? <Image source={{ uri: List?.userdata.image }} style={styles.imgs} />
                      : List?.image ? <Image source={{ uri: List?.image }} style={styles.imgs} /> : <Image source={require("../../../../../Assets/user.png")} style={styles.imgs} />}
                  </View>

                  <Text style={styles.nameTxt}>{List?.userdata?.name.split(' ')[0] ? List?.userdata?.name.split(' ')[0] : List?.name.split(' ')[0]}</Text>

                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center' }}>
                {saveBox == true ? <View style={{ alignItems: 'center' }}>
                  <Text style={styles.wingnTxt}>Wait for operant</Text>
                  <Text style={styles.wingnTxt}>{"operant is still playing"}</Text>
                </View> : stop == "winner" && winerStatus == "winner" ? <View style={{ alignItems: 'center' }}>
                  <Text style={[styles.wingnTxt, { fontSize: 24 }]}>{"Congratulation"}</Text>
                  <Text style={[styles.wingnTxt, { fontFamily: style.Regular }]}>{"You have won the match sucessfully!"}</Text>
                </View> : stop == "close" && winerStatus == "close" ? <View style={{ alignItems: 'center' }}>
                  <Text style={[styles.wingnTxt, { fontFamily: style.Regular }]}>{"You lose"}</Text>
                </View> : stop == "draw" && winerStatus == "draw" ? <View style={{ alignItems: 'center' }}>
                  <Text style={[styles.wingnTxt, { fontFamily: style.Regular }]}>{"The match has been draw"}</Text>
                </View> :
                  <View>
                  </View>}

              </View>

              <View style={styles.txtcontroll}>
                <View>
                  <View style={styles.commondesign} />
                  <View style={styles.commondesign2}>
                    <Image source={require("../../../../../Assets/check.png")} style={styles.iconstylecommon} />
                    <Text style={[styles.textcomon, { marginLeft: 8 }]}>{parseInt(item)} Correct</Text>
                  </View>
                </View>
                <View style={{ marginLeft: 6 }}>
                  <View style={styles.commondesign} />
                  <View style={styles.commondesign2}>
                    <Image source={require("../../../../../Assets/cross1.png")} style={styles.iconstylecommon} />
                    <Text style={[styles.textcomon, { marginLeft: 6 }]}>{parseInt(incorectresult)} InCorrect</Text>
                  </View>
                </View>

              </View>

              {winerStatus != "wait" ? <Button title={join || saveAccept == "accepted" ? "Join" : tournamentWinner == "T_Winner" ? "Go to Next round" : tournamentLooser == "T_Looser" ? "Go to Home" : "Rematch"}
                onPress={() => {
                  if (join) {
                    _accePtrematch()
                  } else if (tournamentWinner == "T_Winner") {
                    _gettournament_Questions();

                  } else if (tournamentLooser == "T_Looser") {
                    SetTournamentWinner("")(dispatch)
                    clearInterval(intervalID)
                    navigation.replace("Tab")
                  }
                  else if (saveTitles == "Tournament" && stop == "draw") {
                    _gettournament_Questions();

                  }
                  else {
                    _reMatch()
                  }


                }}
                textstyle={{
                  color: join || saveAccept == "accepted" ? "#fff" : style.yellow,
                  fontSize: join ? 20 : 14
                }}
                btnstyle={{
                  backgroundColor: join || saveAccept == "accepted" ? style.green : null,
                  borderWidth: 1,
                  alignSelf: 'center',
                  width: "70%",
                  marginTop: "10%",
                  borderColor: style.yellow
                }}
              /> : null}
            </View>



          </View>
        </View>
      </View>}


    </ImageBackground>
  )
}

export default LeagueRematch

const styles = StyleSheet.create({

  itemsContainer: {
    flex: 1,
    // backgroundColor: 'red'
  },
  iconView: {
    flex: .5,
    alignItems: 'center', justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  rexdblack: {
    height: 50, backgroundColor: 'black',
    opacity: .5,
    width: "50%",
    borderRadius: 25
  },
  rxd: {
    height: 50,
    // bottom: "23%",
    borderWidth: 1,
    borderColor: style.yellow,
    borderRadius: 25,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    // width: "50%",
    // position: 'absolute'
  },
  btn2: {
    backgroundColor: null,
    borderWidth: 1,
    alignSelf: 'center',
    width: "70%",
    marginTop: "10%",
    borderColor: style.yellow
  },
  txt: {
    fontFamily: style.Regular,
    color: 'white',
    width: 300,
    textAlign: 'center', top: "15%"
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    // backgroundColor:'blue',
    justifyContent: 'center'
  },
  playerscontainer: {
    alignItems: 'center',
  },
  btn: {
    width: 120,
    height: 30,
    backgroundColor: "black"
  },
  parentContainer: {
    flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center'
  },
  imgs: {
    height: 97,
    width: 97, borderRadius: 100
  },
  txtcontroll: {
    flexDirection: 'row',
    marginTop: 50,
    alignItems: 'center', justifyContent: 'space-evenly'
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
    height: 100,
    width: 100, borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 50
  },
  vsTxt: {
    fontFamily: style.Bold,
    color: style.yellow,
    fontSize: 24,
    // left: 6,
    // textAlign:'center',
    // alignSelf:'center',
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