import { StyleSheet, Text, View, ImageBackground, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Subheader from '../../Components/Subheader'
import FriendsList from '../../Components/FriendsList'
import PendingComp from '../../Components/PendingComp'
import { showReferstatus } from '../../Utils/Apis'
import { useSelector } from 'react-redux'
import Loader from '../../Components/Loader'
const bgImg = require("../../Assets/bgg.png")
const Pendingscreen = ({ navigation, route }) => {
    const { item } = route.params;
    const { user } = useSelector(({ appReducer }) => appReducer);
    const [joinedUsers, setjoinedUsers] = useState([])
    const [Loading, setLoading] = useState(false)
    const apiToken = user.token
   
    useEffect(() => {
        usersStatuses();
    }, [item.id])

    const usersStatuses = () => {
        setLoading(true)
        const userdata = new FormData();
        userdata.append("cash_request_id", item.id)
        userdata.append("status", "joined")
        showReferstatus({ userdata, apiToken }).then((responce) => {
            setLoading(false)
            setjoinedUsers(responce.refer_list)
        }).catch((error) => {
            setLoading(false)
            console.log("Error", error.response)
        })
    }
    return (
        <ImageBackground source={bgImg} style={styles.container}>
            {Loading && <Loader />}
            <View style={{ paddingHorizontal: 12, paddingTop: '5%' }}>
                <Subheader
                    title={"Joined"}
                    navigation={navigation} />
                <View>
                    <FlatList
                        data={joinedUsers}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <PendingComp
                                        item={item}
                                        navigation={navigation}
                                    />
                                  
                                </View>

                            )
                        }}
                    />
                </View>
            </View>

        </ImageBackground>
    )
}

export default Pendingscreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})