import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native'
import React from 'react'
import FriendsList from '../../../../Components/FriendsList'
import Subheader from '../../../../Components/Subheader'
const bgImg = require("../../../../Assets/bg1.png")
const TotalFriend = ({navigation}) => {
    const friends = [
        {
            id: 1,
            name: 'Brandom Calzoni',
            Rank: '13',
            image: 'https://images.unsplash.com/photo-1500258593672-b080c40f4b02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
        },
        {
            id: 1,
            name: 'Brandom Calzoni',
            Rank: '13',
            image: 'https://images.unsplash.com/photo-1500258593672-b080c40f4b02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
        },
        {
            id: 1,
            name: 'Brandom Calzoni',
            Rank: '13',
            image: 'https://images.unsplash.com/photo-1500258593672-b080c40f4b02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
        },
        {
            id: 1,
            name: 'Brandom Calzoni',
            Rank: '13',
            image: 'https://images.unsplash.com/photo-1500258593672-b080c40f4b02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
        },
        {
            id: 1,
            name: 'Brandom Calzoni',
            Rank: '13',
            image: 'https://images.unsplash.com/photo-1500258593672-b080c40f4b02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
        },
        {
            id: 1,
            name: 'Brandom Calzoni',
            Rank: '13',
            image: 'https://images.unsplash.com/photo-1500258593672-b080c40f4b02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
        },
        {
            id: 1,
            name: 'Brandom Calzoni',
            Rank: '13',
            image: 'https://images.unsplash.com/photo-1500258593672-b080c40f4b02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
        },
    ]
    return (
        <ImageBackground source={bgImg} style={{ flex: 1 }}>
            <View style={{ paddingTop: '5%', paddingHorizontal: 12 }}>
                <Subheader title={"Friends-56"} navigation={navigation} />

                <View>
                    <FlatList
                        data={friends}
                        renderItem={({ item, index }) => {
                            return (
                                <FriendsList
                                    idx={index}
                                    item={item}/>
                            )
                        }}
                    />
                </View>
            </View>

        </ImageBackground>
    )
}

export default TotalFriend

const styles = StyleSheet.create({})