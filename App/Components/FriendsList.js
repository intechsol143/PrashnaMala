import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { style } from '../Constants'
import Button from './Button'
const FriendsList = ({ item, idx, leader, pending, joined,coins }) => {
    return (
        <View style={styles.userView}>
            <View style={styles.userViewSubparent}>
                <View>
                    <Image source={{ uri: item.user_image ? item.user_image:item.image }} style={{ height: 40, width: 40, borderRadius: 50 }} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.txt}>{item.user_name ? item.user_name :item.name} <Text style={{ color: idx === 5 || idx === 6 ? style.btnColor : style.green, fontSize: 12 }}> {!pending ? leader ? null : '\u2B24' : null}</Text></Text>
                    {!pending ? !leader ? <Text style={[styles.txt, { color: style.yellow, marginTop: 0, fontSize: 12, fontFamily: style.SemiBold }]}>Rank {item.Rank}</Text> :
                        <>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require("../Assets/4.png")} style={styles.coinimg} />
                                <Text style={[styles.txt, { color: style.yellow, left: 4 }]}>{coins}</Text>
                            </View>

                        </>
                        : null}
                </View>
            </View>
            {leader ? <Text style={[styles.txt, { fontSize: 16, color: style.yellow }]}>{idx}</Text> :
                <Button
                    title={idx === 1 ? "Sent" : joined ? "Joined" : pending ? "Pending" : "Challenge"}
                    btnstyle={{
                        width: 90,
                        height: 40,
                        backgroundColor: idx === 5 || idx === 6 ? "grey" : joined ? style.green : pending ? style.grey : style.green
                    }}
                    textstyle={{
                        fontSize: 12,
                        color: idx === 5 || idx === 6 ? "#979797" : idx === 1 ? "grey" : 'white'
                    }}
                />

            }
        </View>
    )
}

export default FriendsList

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container2: {
        paddingTop: 20,
        paddingHorizontal: 10
    },
    coinimg: { height: 10, width: 10, borderRadius: 50, resizeMode: 'contain' },

    btnNewstyle: {
        width: 90,
        height: 40,
        backgroundColor: style.green
    },
    subcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userView: {
        flexDirection: 'row',
        marginTop: '5%',
        alignItems: 'center', justifyContent: 'space-between'
    },
    txt: {
        color: '#fff',
        fontSize: 14,
        fontFamily: style.SemiBold
    },
    userViewSubparent: { flexDirection: 'row', alignItems: 'center' }
})