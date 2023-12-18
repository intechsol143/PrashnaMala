import { StyleSheet } from 'react-native'
import {style} from '../../Constants/index'
export const Sheet = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red'
  },
  subcontainer: {
    flex: 2.2,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30
  },
  prfileContainer:{
    height: 110, width: 110,
    alignSelf: 'center',
    margin: 10,
    borderRadius: 60,
    marginTop:"25%",
    top:10,
    backgroundColor: 'white'
  },
  Endcontainer: {
    flex: 1.7,
    // backgroundColor: 'green'
  },
  text1: {
    color: '#fff',
    fontFamily:style.SemiBold,
    fontSize: 14
  },
  text: {
    color: '#fff',
    fontFamily:style.Bold,
    fontSize: 22,
  },

})



