import { ImageBackground, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { style } from '../../Constants'
import Subheader from '../../Components/Subheader'
const bgImg = require("../../Assets/bgg.png")
import { useSelector } from 'react-redux'
import { Privacy } from '../../Utils/Apis'
import RenderHtml from 'react-native-render-html';
import Loader from '../../Components/Loader'

const Privacypolicy = ({ navigation }) => {
    const { width } = useWindowDimensions();

  
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    const [currentDate, setCurrentDate] = useState('');
    const { user } = useSelector(({ appReducer }) => appReducer);
    const [policy, setpolicy] = useState({})
    const [loading, setloading] = useState(false)
    const apiToken = user.token

    useEffect(() => {
        const Cdate = new Date().getDate(); //Current Date
        const name = month[d.getMonth()]; //month name
        const year = new Date().getFullYear(); //Current Year
        setCurrentDate( name + ' ' + Cdate + ', ' + year)
    }, [])
    
    





    useEffect(() => {
        _Privacy();
    }, [])

    const _Privacy = () => {
        setloading(true)
        Privacy(apiToken).then((responce) => {
            setloading(false)
            setpolicy(responce.cms)

        }).catch((error) => {
            setloading(false)

            console.log("Error", error.response)
        })
    }
    const html = '<div style="color: white">' + policy?.page_content + '</div>';
    const source = {
        html: html
    };

    return (
        <ImageBackground source={bgImg} style={styles.contain}>
            {loading && <Loader />}
            <View style={styles.subcontainer}>
                <Subheader onPress={() => navigation.goBack()} title={"Privacy Policy"} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        paddingHorizontal: 4
                    }}>
                    <Text style={[styles.txt, { fontFamily: style.SemiBold, marginTop: '10%' }]}>Update on {currentDate}</Text>
                    {policy ? <RenderHtml
                        contentWidth={width}
                        source={source}
                        classesStyles = {{
                            'ql-size-small': {
                                fontSize:12,
                                color:'green'
                            }
                        }
                       }
                    /> : null}
     

                </ScrollView>
            </View>
        </ImageBackground>
    )
}

export default Privacypolicy

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