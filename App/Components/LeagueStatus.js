import { StyleSheet, Text, ImageBackground, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { style } from '../Constants'
import { SetTitles } from '../Redux/actions/appactions/Index'
import { useDispatch } from 'react-redux'
const LeagueStatus = ({ item, navigation,onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <ImageBackground
                borderRadius={10}
                resizeMode='cover'
                source={{ uri: item.image_bg }} style={styles.imgS} >
                <View style={{ height: 90, flexDirection: 'row' }}>
                    <View style={{ height: 90, width: "60%" }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ marginLeft: 20, marginTop: 6 }}>
                                <Text style={styles.txt}>{item.title}</Text>

                                <View style={{flexDirection:'row'}}>
                                <Text style={{ color: item.is_online === "1" ? style.green : "green", fontSize: 10 }}><Text style={{fontSize:12,fontFamily: style.Medium,color:'#fff'}}>Players Online   </Text> {'\u2B24'}</Text>
                                <Text style={{ fontFamily: style.SemiBold,color:'#fff' }}>{"233"}</Text>
                                </View>
                                
                                <View style={styles.playbtn}>
                                    <Text style={[styles.txt, { fontSize: 14 }]}>Play</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 90, width: "40%", alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={{ uri: item.icon }} style={{ height: 65, width: 65, resizeMode: "contain" }} />
                    </View>
                </View>

            </ImageBackground>
        </TouchableOpacity>
    )
}

export default LeagueStatus

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    playbtn: {
        height: 25, width: 60,
        borderRadius: 40,
        marginTop: 5,
        borderColor: '#fff',
        backgroundColor: '#002A55',
        borderWidth: 1, alignItems: 'center', justifyContent: 'center'
    },
    imgS: {
        height: 90,
    },
    txt: {
        color: '#fff',
        // letterSpacing:1,
        fontSize: 16,
        fontFamily: style.SemiBold
    },
    slideView: {
        height: 200,
        width: '100%',
        padding: 4
    },
    horizontalView: { marginTop: "15%", flexDirection: 'row' },
    slider: {
        height: 100,
        marginTop: '5%',
        flexDirection: 'row',
    }
})