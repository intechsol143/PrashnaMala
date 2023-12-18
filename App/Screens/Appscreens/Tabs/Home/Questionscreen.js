import { StyleSheet, Text, ImageBackground, Image, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { style } from '../../../../Constants'
import PlayersView from '../../../../Components/PlayersView'
import QuestionsCard from '../../../../Components/QuestionsCard'
const bgImg = require("../../../../Assets/citybg.png")
const bgImg2 = require("../../../../Assets/bg1.png")
import IconBack from 'react-native-vector-icons/Ionicons'
import Subheader from '../../../../Components/Subheader'
import { useSelector } from 'react-redux'
const Questionscreen = ({ navigation, route }) => {
    const {
        id,
        res,
        name,
        price,
        list,
        data,
        box_id,
        tournamentId,
        coin_id
    } = route?.params;
    const { saveTitles, corectCount, loginUserpoints, operantPoints } = useSelector(({ appReducer }) => appReducer);

    // const [cAns, setcAn] = useState([])

    // setcAn(cAns => [...cAns, corectRes]);


    return (
        <ImageBackground source={saveTitles === "Tournament" ? bgImg2 : saveTitles === "LeaGue" ? bgImg2 : { uri: res?.image_bg }} style={styles.container}>
            <ScrollView contentContainerStyle={{
                paddingBottom: 20,
                paddingTop: 10,
                paddingHorizontal: 12
            }}>
                {saveTitles === "Classic" ?
                    <View>
                        <QuestionsCard
                            title={saveTitles}
                            qId={id}
                            results={res}
                            navigation={navigation}
                        />
                    </View> : saveTitles === "Tournament" ?
                        <View>
                            <Subheader
                                navigation={navigation}
                                leave={false}
                                box_id={box_id}
                                tournamentId={tournamentId}
                            />
                            {saveTitles === "Tournament" ?
                                <View style={{ marginTop: '5%' }}>
                                    <PlayersView
                                        price={price}
                                        name={name}
                                        ansWer={loginUserpoints}
                                        list={data}
                                        operantCount={operantPoints}
                                    />
                                </View>
                                : null}
                            <QuestionsCard
                                title={saveTitles}
                                navigation={navigation}
                                qId={id}
                                list={data}
                                box_id={box_id}
                                coin_id={coin_id}
                                price={price}
                                tournamentId={tournamentId}

                            />
                        </View> :
                        saveTitles === "LeaGue" ?
                            <View>
                                <Subheader
                                    navigation={navigation}
                                    leave={false}
                                    gameclose={true}
                                    box_id={box_id}
                                    coin_id={coin_id}

                                />
                                <View style={{ marginTop: '5%' }}>
                                    <PlayersView
                                        price={price}
                                        name={name}
                                        ansWer={loginUserpoints}
                                        list={data}
                                        operantCount={operantPoints}
                                    />
                                </View>
                                <QuestionsCard
                                    title={saveTitles}
                                    navigation={navigation}
                                    qId={id}
                                    list={data}
                                    box_id={box_id}
                                    coin_id={coin_id}
                                    price={price}

                                />
                            </View>

                            : null
                }



                {/* <View style={{ paddingHorizontal: 12, marginTop: '5%' }}>
                    <View>
                        <Subheader
                            title={city ? "$1000" : null}
                            city={city}
                            leave={leave}
                            navigation={navigation} />

                    </View>
                    <View style={styles.spacer} />
                    {!city ? <PlayersView /> : null}
                    <View style={styles.spacer} />
                    <QuestionsCard
                        navigation={navigation}
                        leave={leave}
                        tournMent={tournMent} 
                        city={city} 
                        test={test}
                        leagueStatus={leagueStatus}
                        />
                </View> */}
            </ScrollView>
        </ImageBackground>

    )
}

export default Questionscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    spacer: { height: 15 },
    txt: { color: '#fff', fontFamily: style.SemiBold },
    imageView: {
        height: 40, width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff', borderWidth: 1, borderRadius: 20
    },
    bacView: {
        height: 35,
        alignItems: 'center',
        justifyContent: "center",
        width: 35, borderRadius: 20, backgroundColor: '#fff'
    }
})