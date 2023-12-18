import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { style } from '../Constants'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
const PlayersView = ({ list, price, ansWer, operantCount }) => {
    // console.log("listtttt",list)
    console.log("proce", price)
    const { user } = useSelector(({ appReducer }) => appReducer);


    return (
        <View style={styles.prviewContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.imageView}>
                    {user.userdata.image ? <Image source={{ uri: user.userdata.image }} style={{ height: 35, width: 35, borderRadius: 20 }} /> : <Image source={require("../Assets/user.png")} style={{ height: 35, width: 35, borderRadius: 20 }} />}
                </View>
                <View style={{ marginLeft: 12 }}>
                    <Text style={styles.txt}>{user.userdata.name}</Text>
                    <Text style={[styles.txt, {
                        fontFamily: style.SemiBold,
                        fontSize: 12,
                        color: style.yellow
                    }]}>{ansWer ? ansWer : 0} points</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 12 }}>
                    <Text style={[styles.txt, { textAlign: 'right' }]}>{list?.userdata?.name ? list?.userdata?.name : list.name}</Text>
                    <Text style={[styles.txt, {
                        fontFamily: style.SemiBold,
                        fontSize: 12,
                        textAlign: "right",
                        color: style.yellow
                    }]}>{operantCount ? operantCount : 0} points</Text>
                </View>
                <View style={styles.imageView}>
                    {list?.userdata?.image ?
                        <Image source={{ uri: list?.userdata?.image ? list?.userdata?.image : list?.image }} style={{ height: 35, width: 35, borderRadius: 20 }} /> :
                        list.image ? <Image source={{ uri: list?.image }} style={{ height: 35, width: 35, borderRadius: 20 }} /> :
                            <Image source={require("../Assets/user.png")} style={{ height: 35, width: 35, borderRadius: 20 }} />}
                </View>
            </View>
        </View>
    )
}

export default PlayersView

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    txt: {
        color: '#fff',

        fontFamily: style.SemiBold
    },
    imageView: {
        height: 40, width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff', borderWidth: 1, borderRadius: 20
    },
    prviewContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    }
})