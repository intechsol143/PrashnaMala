import {
    StyleSheet, Text, View, ImageBackground, Image,
    Share,
    Alert,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import Subheader from '../../Components/Subheader'
import Button from '../../Components/Button'
import { style } from '../../Constants'
const bgImg = require("../../Assets/bgg.png")
import Icon from 'react-native-vector-icons/AntDesign'
import dynamicLinks from '@react-native-firebase/dynamic-links';

const RequestDetail = ({ navigation, route }) => {
    const { item } = route.params;
    console.log("itemmcc  nnnn",item)


    const onShare = async (i,x) => {
        console.log("1 and 2",i,x.refer_code)
        try {
            const result = await Share.share({
                message:
                    `Hi, i am inviting you to join this amazing game with my referal code and start winning by playing. \n link: \n ${i} \n Ref Code: ${x.refer_code} \n\n Thank You!`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("iffff",result.activityType)
                    // shared with activity type of result.activityType
                } else {
                    console.log("else",result)

                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    const buildLink = async (a) => {
        console.log("build Id",a)
        const link = await dynamicLinks().buildShortLink({
            link: `https://prashnaapp.page.link/ ${a.refer_code}`,
            android: {
                packageName: 'com.prashnamala',
            },
            domainUriPrefix: 'https://prashnaapp.page.link',
        });
        console.log("final linllll",link)
        onShare(link,item);
    };
    return (
        <ImageBackground source={bgImg} style={styles.container}>
            <View style={styles.subc}>
                <Subheader title={"Request Detail"} onPress={()=>navigation.goBack()} />
                <View style={{ flex: 5 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            title={"Cash Prize"}
                            btnstyle={styles.cashBtn}
                            MyIcon={<Image source={require("../../Assets/cash.png")} style={styles.img} />}
                        />
                        <Text style={styles.text}>USD {item.cash}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "3%" }}>
                            <Icon name={"calendar"} color={"#fff"} size={18} />
                            <Text style={[styles.datetext, { marginLeft: 8 }]}>{item.cash_request_date}</Text>
                        </View>
                        <View style={{ marginTop: '15%' }}>
                            <View>
                                <Text style={[styles.datetext, {
                                    textAlign: 'center', color: style.btnColor,
                                    fontSize: 14,
                                    paddingVertical: 10
                                }]}>Invitation code</Text>
                            </View>
                            <View style={{
                                height: 50,
                                backgroundColor: "#cdcaca", opacity: .4,
                                // alignItems: 'center',
                                // justifyContent: 'center',
                                borderColor: '#fff', width: 220, borderRadius: 5
                            }}>

                            </View>
                            <View style={{ position: 'absolute', top: "17%" }}>
                                <View style={styles.codeView}>
                                    <Text style={[styles.text, { color: '#fff', fontSize: 18, fontFamily: style.SemiBold }]}>{item.refer_code}</Text>
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '10%' }}>
                                <View>
                                    <View style={{
                                        height: 100, width: 100,
                                        borderRadius: 15,
                                        backgroundColor: "#cdcaca", opacity: .4
                                    }}>

                                    </View>
                                    <View style={{ position: 'absolute' }}>
                                        <TouchableOpacity onPress={() => navigation.navigate("Pendingscreen", {
                                            item
                                            // title: 'Joined',
                                            // joined: true,
                                            // count: '6'
                                        })} style={styles.recView}>
                                            <Text style={[styles.text, { color: style.green, fontFamily: style.Medium, textAlign: 'center', }]}>{item.joined}</Text>
                                            <Text style={[styles.text, { color: '#fff', fontSize: 14, fontFamily: style.Medium, textAlign: 'center' }]}>joined</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View>
                                    <View style={{
                                        height: 100, width: 100,
                                        borderRadius: 15,
                                        backgroundColor: "#cdcaca", opacity: .4
                                    }}>

                                    </View>
                                    <View style={{ position: 'absolute' }}>
                                        <TouchableOpacity 
                                        disabled={true}
                                        // onPress={() => navigation.navigate("Pendingscreen", {
                                        //     count: '4',
                                        //     joined: false
                                        // })} 
                                        style={styles.recView}>
                                            <Text style={[styles.text, { color: style.btnColor, fontFamily: style.Medium, textAlign: 'center' }]}>{item.pending}</Text>
                                            <Text style={[styles.text, { color: '#fff', fontFamily: style.Medium, textAlign: 'center', fontSize: 14 }]}>Pending</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.shareView}>
                    <Button title={"Share"} onPress={() => buildLink(item)} />
                </View>
            </View>
        </ImageBackground>
    )
}

export default RequestDetail

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    codeView: {
        height: 50, borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff', width: 220, borderRadius: 5
    },
    shareView: { flex: 1, },
    subc: { flex: 1, paddingHorizontal: 12, marginTop: '5%' },
    cashBtn: {
        height: 30,
        width: 125
    },
    img: {
        height: 20,
        marginRight: 6,
        width: 20, resizeMode: 'contain'
    },
    recView: {
        height: 100, width: 100,
        borderRadius: 15,
        justifyContent: 'center',
        borderWidth: 1, borderColor: '#fff'
    },
    text: {
        fontSize: 30,
        color: style.yellow,
        fontFamily: style.Bold
    },
    datetext: {
        fontSize: 16,
        color: style.white,
        fontFamily: style.Medium
    },
})