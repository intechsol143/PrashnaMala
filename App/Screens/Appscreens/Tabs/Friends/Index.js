import { StyleSheet, Text, View, ImageBackground, Image, FlatList } from 'react-native'
import React from 'react'
import Button from '../../../../Components/Button'
import { style } from '../../../../Constants/index'
import Facbookicon from 'react-native-vector-icons/EvilIcons'
import FriendsList from '../../../../Components/FriendsList'
const bgImg = require("../../../../Assets/bgg.png")

const Index = () => {

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
    <ImageBackground source={bgImg} style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.subcontainer}>
          {/* <Text style={styles.txt}>Friends - 56</Text> */}
          <Text style={styles.txt}>Friends - 0</Text>

          {/* <Text style={styles.txt}><Text style={{ color:style.green,fontSize:12 }}> {'\u2B24'} </Text><Text style={[styles.txt,{fontSize:14,fontFamily:style.Medium}]}>4 Online </Text></Text> */}
        </View>
        <View>
          <Button
            btnstyle={{
              backgroundColor: "#1777f2",
              height: 40,
              width:'100%',
              marginTop: 20
            }}
            MyIcon={<Facbookicon name='sc-facebook' size={24} color={"#fff"} />}
            title={"Invite Friends"}
            textstyle={{ color: '#fff' }}

          />
          <View>
            <Text style={{color:'#fff',fontSize:18,textAlign:'center',marginTop:20}}>No user found</Text>
            {/* <FlatList
              data={friends}
              renderItem={({ item, index }) => {
                return (
                  <FriendsList
                    idx={index}
                    item={item} />
                )
              }}
            /> */}
          </View>
        </View>

      </View>
    </ImageBackground>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container2: {
    // paddingTop: 20,
    marginTop:'5%',
    paddingHorizontal: 10
  },
  btnNewstyle: {
    width: 90,
    height: 40
  },
  subcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  userView: {
    flexDirection: 'row',
    marginTop: '5%',
    alignItems: 'center', justifyContent: 'space-between'
  },
  txt: {
    color: '#fff',
    fontSize: 16,
    fontFamily: style.SemiBold
  },
  userViewSubparent: { flexDirection: 'row', alignItems: 'center' }
})