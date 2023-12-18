import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Spacer = ({eStyle}) => {
  return (
    <View style={[styles.sheet,{...eStyle}]}>
      
    </View>
  )
}

export default Spacer

const styles = StyleSheet.create({
    sheet:{
        height:30,
        width:.5,
        borderRightWidth:.5,
        borderRightColor:'red',
        backgroundColor:null,
        alignSelf:"center"
    }
})