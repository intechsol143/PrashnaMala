import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Fontiso from 'react-native-vector-icons/Ionicons'
import { style } from '../Constants'
import { images } from '../Constants/Appicons'
import Plus from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux'
import GuestIcon from 'react-native-vector-icons/Zocial'
const Header = ({ navigation, username, coins,tTtalcoins }) => {
    const { user } = useSelector(({ appReducer }) => appReducer);
    return (
        <View style={styles.container}>
            <View style={styles.headerParent}>
                <View style={styles.imageView}>
                    <TouchableOpacity onPress={() => navigation.navigate("LooserProfile", {
                        btn: true,
                        city: true,
                        looser: true,
                        tTtalcoins

                    })} style={styles.profileImgview}>
                        {user.userdata.image ? <Image source={{ uri: user.userdata.image }} style={{
                            height: 45,
                            borderRadius: 40,
                            width: 45, resizeMode: 'contain'
                        }} /> : <Image source={require("../Assets/user.png")} style={{
                            height: 45,
                            width: 45, borderRadius: 50
                        }} />}

                    </TouchableOpacity>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: '#fff', fontFamily: style.SemiBold, fontSize: 12, letterSpacing: 1 }}>{username}</Text>
                        {tTtalcoins != null ? <TouchableOpacity onPress={() => navigation.navigate("Shop")} style={styles.horizontalCircle}>
                            <View style={styles.Circle}>
                                <Image source={images[4]} style={{
                                    height: 17, width: 17,
                                    resizeMode: 'contain'
                                }} />
                            </View>
                            <Text style={{
                                color: '#fff',
                                right: 3,

                                fontFamily: style.SemiBold
                            }}>{tTtalcoins}</Text>
                            <View style={styles.addIcon}>
                                <Plus name={"plus"} color={"#fff"} size={15} />
                            </View>
                        </TouchableOpacity> : null}
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Settingsscreen")}>
                    <Fontiso name={"settings"} color={"white"} size={30} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerParent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imageView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImgview: {
        height: 40, width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        // backgroundColor:'green'
    },
    horizontalCircle: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        // width: 100,
        justifyContent: "space-between",
        // paddingHorizontal: 6,
        // width:100,

        borderColor: style.btnColor,
        height: 25, borderRadius: 8
    },
    Circle: {
        height: 25, width: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addIcon: {
        backgroundColor: style.btnColor,
        borderRadius: 4,
        marginRight: 4,
        // right:18,
        height: 16,
        width: 16,
        alignItems: 'center', justifyContent: 'center'
    }
})