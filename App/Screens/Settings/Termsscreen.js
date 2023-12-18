import { StyleSheet, Text, View, ImageBackground, ScrollView, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { style } from '../../Constants'
import Subheader from '../../Components/Subheader'
import { Privacy, Terms } from '../../Utils/Apis'
const bgImg = require("../../Assets/bgg.png")
import RenderHtml from 'react-native-render-html';
import { useSelector } from 'react-redux'
import Loader from '../../Components/Loader'
const Termsscreen = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    const [currentDate, setCurrentDate] = useState('');
    const { user } = useSelector(({ appReducer }) => appReducer);
    const [terms, setterms] = useState({})
    const [loading,setloading] = useState(false)
    const apiToken = user.token


    useEffect(() => {
        _Terms();
    }, [])

    useEffect(() => {
        const Cdate = new Date().getDate(); //Current Date
        const name = month[d.getMonth()]; //month name
        const year = new Date().getFullYear(); //Current Year
        setCurrentDate( name + ' ' + Cdate + ', ' + year)
    }, [])

    const _Terms = () => {
        setloading(true)
        Terms(apiToken).then((responce) => {
            setloading(false)
            setterms(responce.cms)

        }).catch((error) => {
            setloading(false)

        })
    }
    const html = '<div style="color: white">' + terms?.page_content + '</div>';
    const source = {
        html: html
    };
    return (
        <ImageBackground source={bgImg} style={styles.contain}>
            {loading && <Loader />}
            <View style={styles.subcontainer}>
                <Subheader onPress={() => navigation.goBack()} title={"Terms & Conditions"} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        paddingHorizontal: 4
                    }}>
                    <View style={{ flex: 1 }}>
                    <Text style={[styles.txt, { fontFamily: style.SemiBold, marginTop: '10%' }]}>Update on {currentDate}</Text>
                       {terms ? <RenderHtml
                            contentWidth={width}
                            source={source}
                        />:null}
                    </View>

                </ScrollView>
            </View>
        </ImageBackground>
    )
}

export default Termsscreen


const styles = StyleSheet.create({
    contain: {
        flex: 1
    },
    subcontainer: {
        flex: 1,
        padding: 12,
    },
    txt: {
        color: "#8a99a8",
        fontSize: 14,
        fontFamily: style.Regular
    }
})