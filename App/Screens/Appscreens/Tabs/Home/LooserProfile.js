import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
const bgImg = require("../../../../Assets/bgg.png")
import IconBack from 'react-native-vector-icons/Ionicons'
import { style } from '../../../../Constants'
import Button from '../../../../Components/Button'
import LooserComp from '../../../../Components/LooserComp'
import Icon from 'react-native-vector-icons/Entypo'
import Subheader from '../../../../Components/Subheader'
import Plus from 'react-native-vector-icons/Entypo'
import { images } from '../../../../Constants/Appicons'
import { useSelector } from 'react-redux'
import { showProfiles } from '../../../../Utils/Apis'
import Loader from '../../../../Components/Loader'
import Picker from '../../../../Components/Countrypicker'
import { countriesRecord } from '../../../../Components/countriesList'

import { SvgUri } from 'react-native-svg'
const LooserProfile = ({ navigation, route }) => {
    const { looser, btn, tTtalcoins } = route.params;
    const { user } = useSelector(({ appReducer }) => appReducer);
    const [profileData, setprofileData] = useState()
    const [loading, setloading] = useState(false)
    const [flag, setflag] = useState([])
    const apiToken = user.token;
    console.log("user data", user.userdata.country)

    let result = countriesRecord.filter((i) => i.name == user.userdata.country)
    console.log("resulttt", result[0]?.file_url)
    const looserArr = [
        {
            id: 1,
            num1: '7865',
            num2: '3145',
            num3: '564',
            r1: 'World Rank',
            r2: 'Country Rank',
            r3: 'League Rank'
        },
        {
            id: 1,
            num1: '132',
            num2: '85',
            num3: '23%',
            r1: 'Total',
            r2: 'Wins',
            r3: 'Win Rate'
        },
        {
            id: 1,
            num1: '132',
            num2: '85',
            num3: '85%',
            r1: 'Total',
            r2: 'Wins',
            r3: 'Win Rate'
        },
    ]

    useEffect(() => {
        _gamePlayersProfiles()
    }, [])



    const _gamePlayersProfiles = () => {
        setloading(true)
        showProfiles(apiToken).then((responce) => {
            setloading(false)
            setprofileData(responce?.userdata)
        }).catch((error) => {
            setloading(false)
            console.log("Error", error.response)
        })
    }

    const onSelectCountry = (country) => {
        console.log("Country", country)
        // setData({ ...data, Country: country?.cca2 })
        // if (country) {
        //   setErrorMessageCountry('')
        // }

    };





    return (
        <ImageBackground source={bgImg} style={styles.container}>
            {loading && <Loader />}
            <View style={{ flex: 1, margin: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.bacView}>
                            <IconBack name='chevron-back' color={"black"} size={32} />
                        </TouchableOpacity>
                        <Text style={[styles.profileText, { marginLeft: 24 }]}>Profile</Text>
                    </View>
                    {user.userdata.coin != null ? <View>
                        {looser ? <TouchableOpacity onPress={() => navigation.navigate("Shop")} style={styles.horizontalCircle}>
                            <View style={styles.Circle}>
                                <Image source={images[4]} style={{
                                    height: 17, width: 17,
                                    resizeMode: 'contain'
                                }} />
                            </View>
                            <Text style={styles.coin}>{tTtalcoins}</Text>
                            <View style={styles.addIcon}>
                                <Plus name={"plus"} color={"#fff"} size={15} />
                            </View>
                        </TouchableOpacity> : null}
                    </View> : null}

                </View>
                <View style={{ flex: 5, paddingTop: 20 }}>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {user.userdata.image ? <Image source={{ uri: user.userdata.image }} style={styles.userImg} /> : <Image source={require("../../../../Assets/user.png")} style={styles.userImg} />}
                                <View style={{ position: 'absolute', top: 30, left: 30 }}>
                                    <ImageBackground
                                        resizeMode='contain'
                                        source={require("../../../../Assets/Star.png")} style={{
                                            height: 25,
                                            width: 25,
                                        }}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: '#000', fontSize: 12, fontFamily: style.Bold }}>15</Text>
                                        </View>
                                    </ImageBackground>


                                </View>
                                <View style={{ marginLeft: 18 }}>
                                    <Text style={styles.profileText}>{user.userdata.name}</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 4,
                                        alignItems: 'center'
                                    }}>
                                        <View style={{
                                            // backgroundColor: 'red',
                                            alignItems: 'center',
                                            borderWidth:1,
                                            borderColor:'white',
                                            justifyContent: 'center',
                                            overflow:'hidden',
                                            height: 30, width: 30,borderRadius:25
                                        }}>
                                            <SvgUri
                                                width={40}
                                                height={30}
                                                
                                                uri={result[0]?.file_url}
                                            />
                                            
                                        </View>

                                        {/* <Image source={{ uri: result[0]?.file_url}} style={{
                                            height: 20,
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            width: 20, borderRadius: 30, resizeMode: 'contain'
                                        }} /> */}
                                        <Text style={[styles.profileText, { fontFamily: style.Regular, fontSize: 12, color: 'red', marginLeft: 4 }]}>{user.userdata.country == "PK" ? "Pakistan" : user.userdata.country}</Text>

                                    </View>
                                </View>
                            </View>
                            <View>
                                {looser ? <TouchableOpacity
                                    onPress={() => navigation.navigate("Editprofile")}
                                    style={styles.iconView}>
                                    <Icon name={"edit"} color={"black"} size={18} />
                                </TouchableOpacity> : null}
                            </View>

                        </View>
                        <View style={{ marginTop: '10%' }}>
                            {profileData ? <LooserComp
                                amount={profileData?.amount}
                                classicPercentage={profileData?.classic_percent}
                                classTotalPlayed={profileData?.classic_total_played}
                                classWin={profileData?.classic_win}
                                countryRank={profileData?.country_rank}
                                coin={profileData?.coin}
                                oneOonePercentage={profileData?.league_percent}
                                oneOoneTotalPlayed={profileData?.league_total_played}
                                oneOoneLeague_win={profileData?.league_win}
                                world_rank={profileData?.world_rank}
                            /> : null}
                            {/* <FlatList
                                data={looserArr}
                                renderItem={({ item, index }) => {
                                    return (
                                        <LooserComp item={item} index={index} />
                                    )
                                }}
                            /> */}

                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    {!btn ? <Button
                        title={"Add Friend"}
                        btnstyle={{ backgroundColor: style.green }}
                        onPress={() => navigation.navigate("TotalFriend")}
                    /> : null}
                </View>
            </View>
            {/* <View>
     */}

        </ImageBackground>
    )
}

export default LooserProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardParent: {
        height: 100, backgroundColor: 'red',
        justifyContent: 'space-between',
        borderRadius: 10,
        flexDirection: "row"
    },
    iconView: {
        height: 25, width: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5, backgroundColor: style.yellow
    },
    addIcon: {
        backgroundColor: style.btnColor,
        borderRadius: 4,
        marginRight: 4,
        // right:18,
        height: 16,
        width: 16,
        alignItems: 'center', justifyContent: 'center'
    },
    coin: {
        color: '#fff',
        right: 3,
        fontFamily: style.SemiBold
    },
    headingText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: style.SemiBold
    },
    rankText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: style.Regular
    },
    profileText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: style.SemiBold
    },
    img: {
        width: '100%',
        height: 100,
        justifyContent: 'center'
        // resizeMode: 'contain'
    },
    userImg: {
        height: 50, width: 50, borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff'
    },
    bacView: {
        height: 35,
        alignItems: 'center',
        justifyContent: "center",
        width: 35, borderRadius: 20, backgroundColor: '#fff'
    },
    horizontalCircle: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        // width: 100,
        justifyContent: "space-between",
        // paddingHorizontal: 6,
        // width:100,

        borderColor: style.btnColor,
        height: 25, borderRadius: 5
    },
    Circle: {
        height: 25, width: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
})