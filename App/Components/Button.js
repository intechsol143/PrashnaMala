import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { style } from '../Constants/index'
const Button = ({
  title,
  textstyle,
  MyIcon,
  onPress,
  btnstyle,
  disabled
}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.buttonstyle, { ...btnstyle }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View>{MyIcon}</View>
        <Text style={[styles.Txtstyle, { ...textstyle }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  buttonstyle: {
    height: 50,
    alignItems: 'center',
    margin: 10,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 50 / 2,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: style.btnColor
  },
  Txtstyle: {
    color: 'white',
    fontSize: 14,
    fontFamily: style.SemiBold
  }

})