import { ImageBackground, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Sheet } from './styles'
import InputField from '../../Components/InputField'
import Button from '../../Components/Button'
import Picker from '../../Components/Countrypicker'
import { style } from '../../Constants'
import { userRegister, _Guestlogin } from '../../Utils/Apis'
import { SetisEmail, SetRefCode, SetUser } from '../../Redux/actions/appactions/Index'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Components/Loader'
import Icon from 'react-native-vector-icons/AntDesign'
const bg1 = require("../../Assets/bgg.png")
import ImagePicker from 'react-native-image-crop-picker'

import CodePicker from '../../Components/Codepicker'
const FacebookSignup = ({ navigation, route }) => {
  const { refercode } = useSelector(({ appReducer }) => appReducer);

  const dispatch = useDispatch()
  const [errorMessagePhone, setErrorMessagePhone] = useState("")
  const [errorMessageCountry, setErrorMessageCountry] = useState("")

  const [numCode, setnumCode] = useState('+92')
  const { user, refc, type } = route.params;


  const [data, setData] = useState({
    fullName: user?.name ? user.name : user.user.name ? user.user.name : user.fullName.familyName ? user.fullName.familyName : '',
    Email: user?.email ? user.email : user.user.email ? user.user.email : user.email ? user.email : '',
    Phone: '',
    password: user?.id ? user.id : user.user.id ? user.user.id : user.email ? user.email : "",
    Country: '',
    userrefCode: refc ? refc : "",
    loader: false,
    image: user?.image ? user.image : ''
  })



  const onSelectCountry = (country) => {
    console.log("country",country)
    setData({ ...data, Country: country?.name })
    if (country) {
      setErrorMessageCountry('')
    }


  };
  const [err, setErr] = useState({
    emailErr: '',
    phoneErr: '',
    invalidNum: ''
  })

  const getCode = (code) => {
    setnumCode(code)

  };

  const number = numCode + data.Phone


  const _registerUser = () => {
    if (_validator()) {
      setData({ ...data, loader: true })
      const userData = new FormData()
      userData.append("name", data.fullName)
      userData.append("email", data.Email)
      userData.append("phoneno", number)
      userData.append("country", data.Country)
      userData.append("password", data.Email)
      userData.append("refer_code", data.userrefCode)
      userData.append("password_confirmation", data.Email)
      type != "Apple" ? user.picture ? userData.append('image', {
        uri: user.picture.data.url,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      }) :
        data?.image ? userData.append('image', {
          uri: data.image,
          type: 'image/jpeg',
          name: 'image' + new Date() + '.jpg',
        })
          : userData.append('image', {
            uri: user.user.photo,
            type: 'image/jpeg',
            name: 'image' + new Date() + '.jpg',
          }) : null

      console.log("userdataaaa", userData)

      userRegister(userData).then((responce) => {
        if (responce.status === "success") {
          setData({ ...data, loader: false })
          SetUser(responce)(dispatch)
          SetRefCode("")(dispatch)
          if (type == "Apple") {
            SetisEmail(responce)(dispatch)
          }
        }

      }).catch((error) => {
        console.log("Error-----", error.response)
        setErr({ ...err, invalidNum: error.response.data.message.phoneno })
        setData({ ...data, loader: false })
        setErr({
          ...err,
          emailErr: error.response.data.message.email[0],
          phoneErr: error.response.data.message.phoneno[0]
        })

      })
    }

  }


  const _validator = () => {
    if (!data.Country && data.Phone) {
      setErrorMessageCountry('asd')
      setErrorMessagePhone('asd')
      return false;
    } else if (!data.Phone) {
      setErrorMessagePhone('asd')
      return false;
    }
    else if (!data.Country) {
      setErrorMessageCountry('asd')
      return false;
    }
    else {
      return true
    }
  }


  console.log("errro of phone", errorMessagePhone)


  const _pickImage = (i) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setData({ ...data, image: image.path })
      console.log(image.path);
    });
  }


  const mobilevalidate = (text, type) => {
    let numreg = /^[1-9+]+$/;
    if (type == 'phone') {
      if (numreg.test(text)) {
        setData({ ...data, Phone: text })
      } else {
        setData({ ...data, Phone: "" })
        console.log("test not ok")
      }
    }
  }




  return (
    <ImageBackground source={bg1} style={Sheet.container}>
      {data.loader && <Loader />}
      <ScrollView>
        <View style={[Sheet.container, { paddingHorizontal: 14 }]}>
          <Text style={[Sheet.text1, {
            textAlign: 'center',
            top: 40,
            fontFamily: style.SemiBold
          }]}>Create profile</Text>
          <View style={{ flex: 1, }}>
            <TouchableOpacity onPress={() => _pickImage()} style={Sheet.prfileContainer}>
              {user.picture ? <Image source={{ uri: user.picture.data.url ? user.picture.data.url : "https://images.unsplash.com/photo-1611637576109-b6f76185ec9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Ym95c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60" }} style={{
                height: 110,
                width: 110,
                borderRadius: 60
              }} /> :
                data?.image ? <Image source={{ uri: data.image ? data.image : "https://images.unsplash.com/photo-1611637576109-b6f76185ec9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Ym95c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60" }} style={{
                  height: 110,

                  width: 110, borderRadius: 60
                }} /> :
                  <Image source={{ uri: user.user.photo ? user.user.photo : "https://images.unsplash.com/photo-1611637576109-b6f76185ec9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Ym95c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60" }} style={{
                    height: 110,

                    width: 110, borderRadius: 60
                  }} />}
              <View style={{ position: 'absolute', alignSelf: 'center', top: "70%", left: 80, right: 0 }}>
                <Icon name={"camera"} color={"#fff"} size={24} />

              </View>

            </TouchableOpacity>

            <View style={{ marginTop: '10%' }}>
              <View style={{ marginTop: 10 }}>
                <View style={{
                  height: 50,
                  borderRadius: 25,
                  // borderColor: 'white',
                  // borderWidth: 1,
                  width: '100%',
                  backgroundColor: '#cdcaca',
                  opacity: .2
                }}>
                </View>
                <View style={{ position: 'absolute', width: '100%', top: -10 }}>
                  <InputField
                    placeholder={"Full Name"}
                    value={data.fullName}
                    onChangeText={(txt) => {
                      setData({ ...data, fullName: txt })
                    }}
                    getstyle={{
                      // borderColor: 'grey',
                      // borderWidth: 1,
                      backgroundColor: null,
                      paddingLeft: 20
                    }}
                  />
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={{
                  height: 50,
                  borderRadius: 25,
                  // borderColor: 'white',
                  // borderWidth: 1,
                  width: '100%',
                  backgroundColor: '#cdcaca',
                  opacity: .2
                }}>
                </View>
                <View style={{ position: 'absolute', width: '100%', top: -10 }}>
                  <InputField
                    placeholder={"Email"}
                    value={data.Email}
                    onChangeText={(txt) => {
                      setData({
                        ...data,
                        Email: txt
                      })
                      setErr({ ...err, emailErr: "" })
                    }}
                    getstyle={{
                      // borderColor: 'grey',
                      // borderWidth: 1,
                      backgroundColor: null,
                      paddingLeft: 20
                    }}
                  />
                </View>
              </View>
              <View style={{ marginTop: 10 }}>

                {/* <View style={{ position: 'absolute', width: '100%', top: -10 }}> */}
                <CodePicker
                  GetNumcode={(a) => getCode(a)}
                />

                <View style={{ position: 'absolute', width: '100%', bottom: 0, top: -10, left: 40 }}>
                  <InputField
                    placeholder={"Phone"}
                    keyboardType={"number-pad"}
                    value={data.Phone}
                    onChangeText={(txt) => {
                      setData({ ...data, Phone: txt })
                      setErrorMessagePhone('')
                      setErr({ ...err, invalidNum: '' })
                      // setErr({...err,phoneErr:''})
                    }}
                    getstyle={{
                      borderColor: errorMessagePhone ? "red" : null,
                      borderWidth: errorMessagePhone ? 1 : 0,
                      backgroundColor: "#222323",

                      paddingLeft: 20,
                      width: "78%",
                    }}
                  />
                </View>

                {/* </View> */}
                <View style={{
                  height: 50,
                  borderRadius: 25,
                  // borderColor: 'white',
                  // borderWidth: 1,
                  width: '100%',
                  marginTop: 10,
                  alignSelf: 'center',
                  backgroundColor: '#cdcaca',
                  opacity: .2
                }} />

                <View style={{ position: 'absolute', width: '100%', top: "44%" }}>
                  <InputField
                    placeholder={"Refernce Code"}
                    // keyboardType={"number-pad"}
                    value={data.userrefCode}
                    onChangeText={(txt) => {
                      setData({ ...data, userrefCode: txt })
                    }}
                    getstyle={{
                      // borderColor: 'grey',
                      // borderWidth: 1,
                      backgroundColor: null,
                      paddingLeft: 20
                    }}
                  />
                </View>

              </View>

              {/* <InputField
                placeholder={"Phone"}
              /> */}
              <View style={{ height: 10 }} />

              <Picker
                st={errorMessageCountry ? "asd" : null}
                Getcountry={(a) => onSelectCountry(a)}
              />

              <Text style={{
                textAlign: 'center', color: 'red',
                top: 8,
                fontFamily: style.Regular,
                fontSize: 14
              }}>{err.emailErr}</Text>
              <Text style={{
                textAlign: 'center', color: 'red',
                top: 8,
                fontFamily: style.Regular,
                fontSize: 14
              }}>{err.phoneErr}</Text>
              <Text style={{
                textAlign: 'center', color: 'red',
                // top: 8,
                fontFamily: style.Regular,
                fontSize: 14
              }}>{err.invalidNum}</Text>

              <Button
                btnstyle={{
                  marginTop: 40
                }}
                title={"Save"}
                onPress={() => _registerUser()}
              // onPress={() => navigation.navigate("Tab")}
              />
            </View>
          </View>

        </View>
      </ScrollView>
    </ImageBackground>
  )
}

export default FacebookSignup

const styles = StyleSheet.create({})