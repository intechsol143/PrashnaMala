
import { CountryPicker } from "react-native-country-codes-picker";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import { style } from "../Constants";

export default function CodePick({ GetNumcode,ss }) {
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+92');
    useEffect(() => {
        GetNumcode(countryCode)
    }, [countryCode])
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                onPress={() => setShow(true)}
                style={[styles.ff,{...ss}]}
            >
                <Text style={{
                    color: 'white',
                    fontSize: 14,
                    fontFamily: style.Regular
                    // position:'absolute',
                    // top:12,
                    // left:13,
                    // bottom:0,
                    // right:0
                    // top:10,
                }}>
                    {countryCode}
                </Text>
            </TouchableOpacity>


            <CountryPicker
                show={show}
                // initialState={'+92'}
                // when picker button press you will get the country object with dial code
                pickerButtonOnPress={(item) => {
                    console.log("Itemmm", item)
                    setCountryCode(item.dial_code);
                    setShow(false);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    ff: {
        width: '20%',
        height: 50,
        borderRadius: 25,
        paddingLeft: 12,
        justifyContent: 'center',
        backgroundColor: '#222323'

    }
})