import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import WiningComp from '../../../../Components/WiningComp'
import Subheader from '../../../../Components/Subheader';
const bgImg = require("../../../../Assets/bgg.png")
import IconBack from 'react-native-vector-icons/Ionicons'

const WiningScreen = ({ navigation, route }) => {
    const {
        box_id,
        coin_id,
        price,
        totalquestions,
        playersData
    } = route.params;



    return (
        <ImageBackground source={bgImg} style={styles.container}>
            <View style={{ marginTop: '5%', paddingLeft: 12 }} />
            <View style={{ flex: 1 }}>
                <WiningComp
                    navigation={navigation}
                    coin_id={coin_id}
                    price={price}
                    box_id={box_id}
                    Totalquestions={totalquestions}
                    playersData={playersData}
                />

            </View>

        </ImageBackground>
    )
}

export default WiningScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bacView: {
        margin: 10,
        height: 35,
        alignItems: 'center',
        justifyContent: "center",
        width: 35, borderRadius: 20, backgroundColor: '#fff'
    }
})