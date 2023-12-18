import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Switch, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
const bgImg = require("../../Assets/bgg.png")

import { style } from '../../Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Button from '../../Components/Button'
import Subheader from '../../Components/Subheader'
import { SetMilestoneRefresh, SetQcounterRefres, SetUser } from '../../Redux/actions/appactions/Index'
import { useDispatch, useSelector } from 'react-redux'
import { editUserprofile, _showcashRequest } from '../../Utils/Apis'
const Settingsscreen = ({ navigation }) => {
    const { user } = useSelector(({ appReducer }) => appReducer);

    const apiToken = user.token
    const [isEnabled, setIsEnabled] = useState(user.userdata.is_notification ? true : false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(!isEnabled)
        _handleNotifications(!isEnabled)
    };
    const toggleSwitch2 = () => {
        setIsEnabled2(!isEnabled2)
        // _handleNotifications(!isEnabled2)
    };
    const [cashes, setcashes] = useState([])
    const disptach = useDispatch()

    useEffect(() => {
        getWithdrawls();
    }, [])

    const _handleNotifications = (res) => {
        const userData = new FormData();
        userData.append("is_notification", res == true ? 1 : 0)
        editUserprofile({apiToken,userData}).then((responce) => {
            SetUser(responce)(disptach)
        }).catch((error) => {
            console.log("Error", error)
        })

    }



    const getWithdrawls = () => {
        _showcashRequest(apiToken).then((responce) => {
            setcashes(responce.cash_request)
        }).catch((error) => {
            // setLoading(false)
            console.log("Erro", error)
        })
    }
    return (
        <ImageBackground source={bgImg} style={styles.container}>
            <View style={{ flex: 1, paddingHorizontal: 12, marginTop: '5%' }}>
                <View style={{ flex: 5 }}>
                    <View>
                        <Subheader title={"Settings"} onPress={() => navigation.goBack()} />
                        <View style={{ marginTop: '10%' }}>
                            <View style={{ height: 50, backgroundColor: style.yellow, opacity: .1 }}>

                            </View>
                            <View style={{ position: 'absolute', width: '100%' }}>
                                <TouchableOpacity onPress={() => navigation.navigate("CashwithdrawlScreen")} style={styles.btn}>
                                    <Text style={[styles.btnsTxt, { color: style.yellow }]}>Cash Withdrawl Requests ({cashes.length})</Text>
                                    <AntDesign name={"arrowright"} color={style.yellow} size={22} />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.rowStyle, { marginTop: '10%' }]}>
                                <Text style={styles.btnsTxt}>Login with</Text>
                                <Text style={[styles.btnsTxt, { fontFamily: style.SemiBold, color: style.facebookColor }]}>facebook</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Privacypolicy")}
                                style={styles.rowStyle}>
                                <Text style={styles.btnsTxt}>Privacy Policy</Text>
                                <MaterialIcon name={"arrow-forward-ios"} color={style.btnColor} size={20} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Terms")}
                                style={styles.rowStyle}>
                                <Text style={styles.btnsTxt}>Terms and conditions</Text>
                                <MaterialIcon name={"arrow-forward-ios"} color={style.btnColor} size={20} />
                            </TouchableOpacity>
                            <View style={[styles.rowStyle, { marginTop: 50 }]}>
                                <Text style={[styles.btnsTxt, { fontSize: 16, fontFamily: style.SemiBold, color: style.btnColor }]}>Game Options</Text>
                            </View>
                            <View style={styles.rowStyle}>
                                <Text style={styles.btnsTxt}>Sound Effects</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: style.btnColor }}
                                    thumbColor={isEnabled2 ? "#f4f3f4" : "#f4f3f4"}
                                    onValueChange={toggleSwitch2}
                                    value={isEnabled2}
                                />
                            </View>
                            <View style={styles.rowStyle}>
                                <Text style={styles.btnsTxt}>Notifications</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: style.btnColor }}
                                    thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>
                            <View style={styles.rowStyle}>
                                <Text style={styles.btnsTxt}>Delete Account</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            "Are you sure!",
                                            "to delete your account",
                                            [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => console.log("Cancel Pressed"),
                                                    style: "cancel"
                                                },
                                                { text: "OK", onPress: () => SetUser(null)(disptach) }
                                            ]
                                        );
                                    }}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.btnsTxt, { color: style.btnColor }]}>Delete</Text>
                                    <MaterialIcon name={"arrow-forward-ios"} color={style.btnColor} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.endView}>
                    <Button
                        title={"Log Out"}
                        onPress={() => {
                            SetUser(null)(disptach)
                            SetMilestoneRefresh(1)(disptach)
                            SetQcounterRefres(1)(disptach)
                        }}
                    // onPress={()=>navigation.navigate("Auth")}
                    />
                </View>
            </View>


        </ImageBackground>
    )
}

export default Settingsscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    endView: { flex: 1, justifyContent: 'center' },
    btn: {
        height: 50,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: style.yellow,
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconsColor: {
        color: style.btnColor
    },
    rowStyle: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    profileText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: style.SemiBold
    },
    btnsTxt: {
        color: '#fff',
        fontSize: 14,
        fontFamily: style.Medium
    }
})