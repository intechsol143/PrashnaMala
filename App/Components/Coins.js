import { StyleSheet, Text, View, Image, Animated, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { style } from '../Constants'
import { images } from '../Constants/Appicons'
import Entypo from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import moment from 'moment'
const Coins = ({
    item,
    idT,
    onPress,
    navigation
}) => {
    const { width } = Dimensions.get("screen");
    // const { coinsTime } = useSelector(({ appReducer }) => appReducer);
    // const [result, setresult] = useState("")


    // useEffect(() => {
    //     setInterval(() => {
    //         let oldtime = coinsTime.time
    //         let p = ""
    //         let y = moment(new Date()).format("m")
    //         p = y
    //         var now = p;
    //         const check = moment.utc(moment(now, "m").diff(moment(oldtime, "m"))).format("m")
    //         setresult(check)
    //         // console.log("checkkk", check)
    //     }, 1000);

    // }, [result])


    return (
        <View style={{
            flex: 1, margin: 5,
            justifyContent: "center",
            alignItems: 'center',
            width: width * 0.45 - 5,
            // height: 75,
            // opacity: opacity
        }}>
            <TouchableOpacity
                // disabled={item.id == coinsTime.reduxId && result <= 0 ? true : item.id != coinsTime.reduxId ? false : false}
                onPress={onPress} style={styles.container}>
                <View style={styles.card} />
                <View style={styles.itemstyls}>
                    <Image source={{ uri: item.image }} style={styles.imgstyle} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.txt}>{"Free"}</Text>
                        {item.type != "mystery" ? <Text style={styles.txt}>{item.title} {item.coin}</Text> : <Text style={styles.txt}>{item.title}</Text>}
                    </View>
                </View>
                    <View style={styles.playView}>
                        <Entypo name={"play"} color={"white"} />
                    </View>


            </TouchableOpacity>
        </View>

    )
}

export default Coins

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // margin: 4,
        height: 75,
        width: 160
    },
    imgstyle: { height: 30, width: 30, resizeMode: 'contain' },
    playView: {
        height: 20, width: 20,
        zIndex: 1000,
        borderRadius: 20,
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 0,
        top: -4,
        // marginBottom:20,

        left: "90%",
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: style.btnColor
    },
    txt: {
        color: '#fff',
        fontFamily: style.SemiBold,

    },
    card: {
        height: 50,
        width: 160,
        borderRadius: 10,
        opacity: .1,
        top: 5,
        justifyContent: 'center',
        // backgroundColor:'green'
        // alignItems:'center',
        backgroundColor: style.coinsCardcolor
    },
    itemstyls: {
        position: 'absolute',
        paddingLeft: 10,
        justifyContent: 'center',
        top: 9,
        flexDirection: 'row',
        alignItems: 'center'
    }
})