import { ImageBackground, StyleSheet, Text, TouchableOpacity, Dimensions, View, Image, Platform } from 'react-native'
import React from 'react'
import { style } from '../Constants'
import { SetTitles, SetQcounterRefres, SetMilestoneRefresh, SetMyTotalQues, SetBox } from '../Redux/actions/appactions/Index';
import { useDispatch } from 'react-redux';

const Tournaments = ({ item, navigation, idx }) => {
    const dispatch = useDispatch()
    const { width } = Dimensions.get("screen");

    return (
        <TouchableOpacity
            // disabled={item.title === "Tournament" ? true :false}
            onPress={() => {
                if (item.title === "Classic") {
                    navigation.navigate("SelectCity")
                    SetTitles(item.title)(dispatch)
                    SetMilestoneRefresh(1)(dispatch)
                    SetQcounterRefres(1)(dispatch)
                } else if (item.title === "Tournament") {
                    navigation.navigate("Tournament", { box_id: item.id,item })
                    SetTitles(item.title)(dispatch)
                    SetMilestoneRefresh(1)(dispatch)
                    SetQcounterRefres(1)(dispatch)
                    SetMyTotalQues(item.total_question)(dispatch)
                    SetBox(true)(dispatch)

                }
            }}
            style={styles.toutnmantCard}>
            <ImageBackground
                borderRadius={15}
                source={{ uri: item.image_bg }} resizeMode={"contain"} style={[styles.bgimg, {
                    height: Platform.OS === "ios" ? width * 0.5 - 15 : width * 0.5 - 5,
                    width: width * 0.43 + 2
                }]}>
                <View style={styles.headingView}>
                    <Image source={{ uri: item.icon }} style={{ height: 60, width: 60, resizeMode: 'contain' }} />
                    <Text style={[styles.txt, { top: idx == 0 ? 8 : 0 }]}>{item.title}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>


    )
}

export default Tournaments

const styles = StyleSheet.create({
    txt: {
        color: '#fff',
        // marginTop:"40%",
        fontSize: 16,
        fontFamily: style.Bold
    },
    bgimg: {
        height: 170,
        alignItems: 'center',
        justifyContent: 'center',


    },
    toutnmantCard: {
        flex: 1,
        margin: 5,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15,
        alignItems: 'center',
    },
    linearGradient: {
        height: 200,
        flex: 1,
        margin: 5,
        borderRadius: 5

        // borderRadius: 5
    },
    headingView: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})