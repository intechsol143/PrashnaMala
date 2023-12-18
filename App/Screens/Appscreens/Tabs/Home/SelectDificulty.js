import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
const bgImg = require("../../../../Assets/bgg.png")
import Subheader from '../../../../Components/Subheader'
import { style } from '../../../../Constants'
import Button from '../../../../Components/Button'
const SelectDificulty = ({ navigation,route }) => {
    const [Question, setQuestion] = useState(1)

    const _selectedAns = () => {
        setTimeout(() => {
            navigation.navigate("SelectCity")
        }, 500);
    }
    return (
        <ImageBackground source={bgImg} style={styles.container}>
            <View style={{ padding: 12 }}>
                <Subheader title={"Select Difficulty"} navigation={navigation} />
            </View>
            <View style={styles.container2}>
                {["Begginer", "Intermediate", "Expert"].map((item, index) => {
                    return (
                        <View style={{ marginVertical: 8 }}>
                            <View style={{
                                height: 70,
                                borderRadius: 30,
                                backgroundColor: index === Question ? "#ee4137" : '#959ca6',
                                opacity: index === Question ? .2 : .2,
                                // marginTop:15,
                                alignItems: 'center', marginVertical: 5
                            }} />

                            <View style={{ position: 'absolute', width: '100%', }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setQuestion(index)
                                    }}
                                    style={[styles.optionsView, {
                                        borderColor: index === Question ? 'red' : 'grey',
                                    }]}>

                                </TouchableOpacity>
                                <Text style={[styles.txt, {
                                    color: index === Question ? 'white' : '#959ca6',
                                    position: 'absolute', alignSelf: 'center',
                                    top: "33%",
                                    fontSize: 16,
                                    fontFamily: style.Medium
                                }]}>{item}</Text>
                            </View>

                        </View>
                    )
                })}
                <Text style={{
                    fontFamily: style.Regular,
                    paddingLeft: 8,
                    fontSize: 12,
                    color: '#979797', marginTop: 10
                }}>Lorem Ipsum is simply dummy text of the printing.</Text>
                <Button
                    onPress={() => _selectedAns()}
                    title={"Next"} btnstyle={{
                        marginTop: "15%"
                    }} />
            </View>
        </ImageBackground>
    )
}

export default SelectDificulty

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container2: {
        flex: 1,
        paddingHorizontal: 30,
        // backgroundColor:'red',
        justifyContent: 'center'
    },
    optionsView: {
        height: 70,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: 'darkgrey',
        alignItems: 'center', marginVertical: 5
    },
})