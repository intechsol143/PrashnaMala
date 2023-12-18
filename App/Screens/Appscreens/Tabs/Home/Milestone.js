import { FlatList, ImageBackground, StyleSheet, Image, Text, View, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { style } from '../../../../Constants'
const back = require("../../../../Assets/bgg.png")
import LinearGradient from 'react-native-linear-gradient';
import { _getMilstone } from '../../../../Utils/Apis'
import { useSelector } from 'react-redux'
import Loader from '../../../../Components/Loader'
const Milestone = ({ navigation }) => {
    const { user, questionsList, curentMileStone, myStone } = useSelector(({ appReducer }) => appReducer);
    const [Loading, setLoading] = useState(false)
    const [myms, setmyms] = useState([])
    const apiToken = user.token
    console.log("curentMileStonecurentMileStone", curentMileStone)
    useEffect(() => {
        _userMilstones()
    }, [])
    const _userMilstones = () => {
        _getMilstone(apiToken).then((resopnce) => {
            setmyms(resopnce.milestone)
            // SetMiletone(resopnce.milestone)(dispatch)
        }).catch((error) => {
            console.log("Error", error)
        })
    }

    return (
        <View style={styles.container1}>
            <LinearGradient
                start={{ x: 0.5, y: 0.25 }} end={{ x: 0.0, y: 1.0 }}
                colors={['#BE1E2D', '#EB4137']} style={styles.linearGradient}>
                <View style={styles.header}>
                    <Text style={styles.mStoneText}>Milestone</Text>
                    <Icon name={"cross"} color={'#fff'} size={30} onPress={() => navigation.goBack()} />
                </View>
            </LinearGradient>
            <ImageBackground source={back} style={styles.contain}>
                {Loading && <Loader />}
                {/* <View style={styles.paymentCOntainer}>
                    <Image source={require('../../../../Assets/flagIcon.png')} style={[styles.flag, { marginLeft: 0 }]} />
                    <Text style={styles.WithdrawAmount}>
                        AED {highestMilston}
                    </Text>
                </View> */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={myms}
                    // refreshControl={<RefreshControl
                    //     refreshing={refreshing}
                    //     onRefresh={() => _RefreshPage(apiToken)}
                    // />}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item, index }) => {

                        return (
                            <View style={styles.flatListcontainer}>
                                <View style={[styles.Pview, {
                                    backgroundColor: index == curentMileStone - 1 ? "#25c30b" : '#848c97',
                                    opacity: index == curentMileStone - 1 ? 1 : .2
                                }]} />
                                <View style={[styles.subP, {
                                    borderColor: item.is_flag ? "#ffa800" : '#959ca6'
                                }]}>
                                    <View style={styles.flagMain}>
                                        <View style={styles.flagMain2}>
                                            <View style={[styles.x1, {
                                                alignItems: item.is_flag ? "flex-start" : 'center',
                                                paddingLeft: item.is_flag ? 4 : 0,
                                            }]}>
                                                {item.is_flag ? <Image source={require('../../../../Assets/flagIcon.png')} style={styles.flag} /> :
                                                    item.user_image != null ?
                                                        <Image source={{ uri: item.user_image }} style={styles.flag1} /> :
                                                        item.user_image == null && index == curentMileStone - 1 ?
                                                            <Image source={require('../../../../Assets/user.png')} style={styles.userIcon} />
                                                            : <Image source={{ uri: item.user_image }} style={styles.userIcon} />}
                                            </View>
                                            <View style={styles.priceView}>
                                                <Text style={{
                                                    color: index == curentMileStone - 1 ? "#fff" : "#979797",
                                                    fontSize: 18,
                                                    fontFamily: style.SemiBold
                                                }}>
                                                    USD {item.price}
                                                </Text>
                                            </View>
                                            <View style={{ height: 50, width: '33%' }} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </ImageBackground>
        </View>

    )
}

export default Milestone

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        paddingHorizontal: 40
    },
    flatListcontainer: { marginTop: '5%' },
    flag: {
        height: 30,
        width: 30,
        marginLeft: 8,
        resizeMode: 'contain',
    },
    paymentCOntainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10%'
    },
    WithdrawAmount: {
        color: style.yellow,
        fontSize: 30,
        marginLeft: 20,
        fontFamily: style.Bold
    },
    mStoneText: { fontFamily: style.SemiBold, fontSize: 20, color: '#fff' },
    flag1: {
        height: 40, width: 40,
        borderRadius: 20,
        resizeMode: 'contain'
    },
    flagMain: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center', flex: 1
    },
    flagMain2: {
        height: 50,
        flexDirection: 'row',
        width: '100%'
    },
    Pview: {
        height: 50,
        borderRadius: 25
    },
    subP: {
        height: 50,
        borderRadius: 25,
        width: '100%',
        position: 'absolute',
        borderWidth: .5,

    },
    x1: {
        height: 50,
        justifyContent: 'center',
        width: '33%'
    },
    priceView: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%'
    },
    userIcon: {
        height: 40, width: 40,
        borderRadius: 20,
        marginRight: 40,
        resizeMode: 'contain'
    },
    header: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        // backgroundColor: 'blue'
    },
    container1: { flex: 1 },
    linearGradient: {
        height: 70,
        paddingLeft: 15,
        paddingRight: 15,
        // borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
})