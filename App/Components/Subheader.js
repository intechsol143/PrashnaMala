import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import IconBack from 'react-native-vector-icons/Ionicons'
import { style } from '../Constants'
import IconFlag from 'react-native-vector-icons/Ionicons'
import ModalBox from './ModalBox'
const Subheader = ({ navigation, title,
    onPress,
    gameclose,
    box_id,
    coin_id,
    amount,
    tournamentId,
    city, leave, headerTitle }) => {
    const [checkModal, setcheckModal] = useState(false)
    const [real, setreal] = useState(0)

    const _showModal = (a) => {
        if (a === "1") {
            setcheckModal(false)
            setreal("1")
        } else if (a === "2") {
            setcheckModal(true)
            setreal("2")
        }
        else {
            setcheckModal(true)
        }
    }
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {headerTitle === "Classic" ? <View style={styles.headerView}>
                        <TouchableOpacity
                            onPress={() => {
                                if (city === true) {
                                    _showModal()
                                } else {
                                    navigation.goBack()
                                }

                            }} style={styles.bacView1}>
                            <IconBack name='chevron-back' color={"black"} size={24} />
                        </TouchableOpacity>
                        <Text style={[styles.profileText, { marginLeft: 12, right: 6, color: style.yellow }]}>{title}</Text>
                    </View> : leave == false ?
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (leave == false) {
                                        _showModal("2")
                                    } else  {
                                        navigation.goBack()
                                    }
                                }}
                                style={styles.bacView}>
                                <IconBack name='chevron-back' color={"black"} size={24} />
                            </TouchableOpacity>
                            <Text style={[styles.profileText, { marginLeft: 16 }]}>{title}</Text>
                        </View>

                        :
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <TouchableOpacity onPress={onPress} style={styles.bacView}>
                                <IconBack name='chevron-back' color={"black"} size={24} />
                            </TouchableOpacity>
                            <Text style={[styles.profileText, { marginLeft: 16 }]}>{title}</Text>
                        </View>
                    }


                </View>

                <View>
                    {headerTitle === "Classic" ? <TouchableOpacity onPress={onPress} style={{
                        height: 40,
                        alignItems: 'center',
                        justifyContent: "center",
                        width: 40, borderRadius: 20, borderWidth: 1, borderColor: style.btnColor
                    }}>
                        <Image source={require("../Assets/fl1.png")} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                    </TouchableOpacity> : headerTitle === "TT" ? <View style={{
                        height: 30,
                        alignItems: 'center',
                        justifyContent: "center",
                        flexDirection: 'row',
                        width: 80,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: style.yellow
                    }}>

                        <Image source={require("../Assets/4.png")} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                        <Text style={{
                            color: style.yellow,
                            marginLeft: 4,
                            fontFamily: style.SemiBold
                        }}>{amount}</Text>
                    </View> : null}
                </View>

            </View>
            <ModalBox 
                handlemodal={checkModal}
                alert={!leave && real == "2" ? false : true}
                navigation={navigation}
                gameClose={gameclose}
                box_id={box_id}
                coin_id={coin_id}
                tournamentId={tournamentId}
                handleModal={() => _showModal("1")} />
        </View>
    )
}

export default Subheader

const styles = StyleSheet.create({
    bacView: {
        height: 35,
        alignItems: 'center',
        justifyContent: "center",
        width: 35, borderRadius: 20, backgroundColor: '#fff'
    },
    bacView1: {
        height: 30,
        alignItems: 'center',
        justifyContent: "center",
        width: 30, borderRadius: 20, backgroundColor: '#fff'
    },
    headerView: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 30,
        // width: 110,
        paddingVertical: 4,
        borderColor: style.btnColor,
        paddingHorizontal: 4,
        alignItems: 'center'
    },
    profileText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: style.SemiBold
    },
})