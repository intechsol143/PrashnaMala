import { ImageBackground, StyleSheet, Text, View, Image, BackHandler, Alert } from 'react-native'
import React, { useEffect,useCallback, } from 'react'
import { useFocusEffect} from '@react-navigation/native';

import Subheader from '../../../../Components/Subheader'
import { style } from '../../../../Constants'
import Button from '../../../../Components/Button'
import { SetQues, SetRepeateIndexData, SetMilestoneRefresh, SetQcounterRefres } from '../../../../Redux/actions/appactions/Index'
import { useDispatch, useSelector } from 'react-redux'
const back = require("../../../../Assets/bgg.png")

const OOpscreens = ({ navigation }) => {
    const { repeatIndex, questionsList } = useSelector(({ appReducer }) => appReducer);
    const dispatch = useDispatch()

    const _cityCall = () => {
        SetQues(null)(dispatch)
        SetRepeateIndexData(null)(dispatch)

        SetMilestoneRefresh(1)(dispatch)
        SetQcounterRefres(1)(dispatch)

        navigation.navigate("SelectCity")

    }
    const _homeCall = () => {

        SetQues(null)(dispatch)
        SetRepeateIndexData(null)(dispatch)
        SetMilestoneRefresh(1)(dispatch)
        SetQcounterRefres(1)(dispatch)
        navigation.navigate("Tab")


    }

    const handleGoBack = useCallback(() => {
        // custom logic here
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'YES', onPress: () =>  navigation.navigate("Tab")  },
        ]);
        return true; // Returning true from onBackPress denotes that we have handled the event
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleGoBack);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
        }, [handleGoBack]))

    return (
        <ImageBackground source={back} style={styles.container}>
            <View style={{ padding: 12, marginTop: '5%', marginLeft: 10 }} />
            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require("../../../../Assets/bulb.png")} style={{ height: 250, width: 250, resizeMode: 'contain' }} />
                <View style={{ alignItems: 'center', marginTop: '15%' }}>
                    <Text style={styles.txt1}>Oops!</Text>
                    <Text style={styles.txt}>You were so close</Text>
                </View>
            </View>
            <View style={styles.btnView}>
                <Button
                    onPress={() => _cityCall()}
                    // onPress={() => navigation.navigate("SelectDificulty")}
                    title={"Play Again"} btnstyle={{
                        backgroundColor: style.green
                    }} />
                <Button onPress={() => _homeCall()
                    // SetRepeateIndexData(null)(dispatch)
                    // SetQues(null)(dispatch)

                    // setTimeout(() => {
                    //     navigation.navigate("Tab")
                    // }, 1000);

                }
                    title={"Back to Home"} btnstyle={{
                        backgroundColor: null,
                        borderWidth: 1,
                        borderColor: "#fff"
                    }} />
            </View>
        </ImageBackground>
    )
}

export default OOpscreens

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    txt: {
        fontSize: 16,
        color: '#fff',
        fontFamily: style.SemiBold
    },
    btnView: { flex: 1.5, justifyContent: 'center' },
    txt1: {
        fontSize: 35,
        color: style.btnColor,
        fontFamily: style.Bold
    }
})