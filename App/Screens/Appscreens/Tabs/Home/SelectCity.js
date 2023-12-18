import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
const bgImg = require("../../../../Assets/bg1.png")
import Subheader from '../../../../Components/Subheader'
import Cities from '../../../../Components/Cities'
const SelectCity = ({ navigation, route }) => {
    const [checkIdx, setcheckIdx] = useState(-1)
    // const { title } = route.params;
    console.log("My title------>>>>>>", title)



    const citiesList = [
        {
            id: 1,
            img: require("../../../../Assets/city.png"),
            country: "Paris",
            price: "2500"
        },
        {
            id: 2,
            img: require("../../../../Assets/city3.png"),
            country: "New York",
            price: "2500"
        },

        {
            id: 4,
            img: require("../../../../Assets/city5.png"),
            country: "Beijing",
            price: "2500"
        },
        {
            id: 3,
            img: require("../../../../Assets/cit.png"),
            country: "Rome",
            price: "2500"
        },
        {
            id: 5,
            img: require("../../../../Assets/city6.png"),
            country: "Rome",
            price: "2500"
        },
        {
            id: 6,
            img: require("../../../../Assets/city7.png"),
            country: "Rome",
            price: "2500"
        },
    ]

    const _Testfunction = (idx) => {
        setTimeout(() => {
            navigation.navigate("Questionscreen",{title})
            // navigation.navigate("Questionscreen", {
            //     tournMent: false,
            //     city: true,
            // })

        }, 1000);
        setcheckIdx(idx)

    }
    return (
        <ImageBackground source={bgImg} style={styles.container}>
            <View style={styles.subcontainer}>
                <Subheader title={"Select City"} onPress={()=>navigation.goBack()} />
                <View style={{ height: 25 }} />
                <FlatList
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={citiesList}
                    renderItem={({ item, index }) => {
                        return (
                            <Cities
                                item={item}
                                onPress={() => _Testfunction(index)}
                                state={checkIdx}
                                navigation={navigation}
                                idx={index} 
                                />
                        )
                    }}
                />

            </View>
        </ImageBackground>
    )
}

export default SelectCity

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subcontainer: {
        flex: 1,
        padding: 12
    }
})