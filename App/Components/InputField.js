import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Sheet } from '../Screens/Authscreens/styles'
import { style } from '../Constants'

const InputField = ({
  getstyle,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  editable,
  MyIcon,
  autoCapitalize,
  secureTextEntry
}) => {
  return (
    <View>
      <TextInput
        value={value}
        secureTextEntry={secureTextEntry}
        editable={editable}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={"#b6cbd4"}
        style={[styles.input, { ...getstyle }]}
      />
      <View style={{ position: 'absolute', alignSelf: 'flex-end', top: 24, right: 20 }}>
       {MyIcon}
      </View>
    </View>
  )
}

export default InputField

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: style.inputfiedlColor,
    // opacity:.3,
    width: '100%',
    elevation: 3,
    alignSelf: 'center',
    color: 'white',
    margin: 10,
    paddingLeft: 10,
    borderRadius: 50 / 2,
    fontFamily: style.Regular
  }
})