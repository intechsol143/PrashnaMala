import { ImageBackground, Text, View, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button'
import { Sheet } from './styles'
import Facbookicon from 'react-native-vector-icons/EvilIcons'
const bgImg = require('../../Assets/bg.png')
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import DeviceInfo from 'react-native-device-info';
import { userRegister, _Guestlogin } from '../../Utils/Apis'
import { SetUser } from '../../Redux/actions/appactions/Index'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Components/Loader'
import { appleAuth } from '@invertase/react-native-apple-authentication';
import IconApple from 'react-native-vector-icons/AntDesign'
import { style } from '../../Constants'
const InitialScreens = ({ navigation }) => {
  const { refercode } = useSelector(({ appReducer }) => appReducer);
  const { user, isEmail } = useSelector(({ appReducer }) => appReducer);

  const [deviceId, setdeviceId] = useState("")
  const [loader, setloader] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId: '1033589534753-sd8vgsopolhesrpevgfjfogsiu4lou4e.apps.googleusercontent.com',
      iosClientId: '1033589534753-tsj1alfj2dtdk4tsdrvoacev9d3bh9k9.apps.googleusercontent.com',
      offlineAccess: true
    });
    _GetdeviceInfo();
  }, []);

  const _GetdeviceInfo = () => {
    DeviceInfo.getUniqueId().then((responce) => {
      setdeviceId(responce)
    }).catch((error) => {
      console.log("Error", error)
    })

  }

  const getCurrentUserInfo = async () => {
    setloader(true)
    try {
      await GoogleSignin.hasPlayServices();
      const json = await GoogleSignin.signIn();
      if (json) {
         setloader(false)
        _LoginuserGoogle(json)
      }


    } catch (error) {
      setloader(false)
      console.log("Error in google", error)
    }
  };

  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log("appleAuthRequestResponseappleAuthRequestResponse", appleAuthRequestResponse)
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    if (credentialState === appleAuth.State.AUTHORIZED) {

      // user is authenticated
      if (!appleAuthRequestResponse.email) {
        setloader(true)
        const userdata = new FormData();
        userdata.append('email', isEmail.userdata.email)
        userdata.append('name', isEmail.userdata.name)
        userdata.append('password', isEmail.userdata.email)
        userdata.append("is_guest", 0)
        userdata.append("device_id", deviceId)
        console.log("userdataaaa goes here---", userdata)
        _Guestlogin(userdata).then((responce) => {
          setloader(false)
          console.log("responce checkkkkk", responce)
          setloader(false)
          SetUser(responce)(dispatch)
        }).catch((error) => {
          setloader(false)
          if (error) {
            // navigation.navigate("FacebookSignup", {
            //   refc: refercode,
            //   user: appleAuthRequestResponse,
            //   type: 'Apple'
            // })
          }
          setloader(false)
          // console.log("Error", error)
        });
      } else {
        navigation.navigate("FacebookSignup", {
          refc: refercode,
          user: appleAuthRequestResponse,
          type: 'Apple'
        })
      }

      //Apple login end

    } else {
      setData({ ...data, loader: false })

      console.log("wait")
    }
  }

  const Faceboologin = async () => {
    setloader(true)
    LoginManager.logOut();
    LoginManager.setLoginBehavior('web_only');
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('cancled');
          setloader(false)
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends,picture&access_token=' + data.accessToken)
              .then(response => response.json())
              .then(json => {
                setloader(false)
                // navigation.navigate("FacebookSignup", { user: json })
                _Loginuser(json)
              }).catch((error) => {
                setloader(false)

                console.log("Erorr", error)
              })
            console.log("dataa", data)
          });
        }
      },

      function (error) {
        setloader(false)
        alert(error);
        console.log('error', error);
      },
    ).catch((err) => {
      console.log("Error", err)
    });
  };


  const _LoginAsGuest = () => {
    setloader(true)
    const userdata = new FormData();
    userdata.append("device_id", deviceId)
    userdata.append("is_guest", 1)
    _Guestlogin(userdata).then((responce) => {
      setloader(false)
      SetUser(responce)(dispatch)
    }).catch((error) => {
      setloader(false)
      console.log("Error", error)
    })
  }

  const _LoginuserGoogle = (json) => {
    console.log("check json", json)
    const userData = new FormData()
    userData.append("email", json.user.email)
    userData.append("password", json.user.email)
    userData.append("name", json.user.name)
    userData.append("is_guest", 0)
    userData.append("device_id", deviceId)
    // userData.append('image', {
    //   uri: json?.picture?.data.url ? json?.picture?.data.url : json.user.photo,
    //   type: 'image/jpeg',
    //   name: 'image' + new Date() + '.jpg',
    // })
    _Guestlogin(userData).then((responce) => {
      setloader(false)
      SetUser(responce)(dispatch)
    }).catch((error) => {
      console.log("Error", error.response)
      setloader(false)
      if (error) {
        navigation.navigate("FacebookSignup", {
          refc: refercode,
          user: json
        })
      }
    })
  }
  const _Loginuser = (json) => {
    const userData = new FormData()
    userData.append("email", json.email)
    userData.append("password", json.email)
    userData.append("name", json.name)
    userData.append("is_guest", 0)
    userData.append("device_id", deviceId)
    // userData.append('image', {
    //   uri: json?.picture?.data.url ? json?.picture?.data.url : json.user.photo,
    //   type: 'image/jpeg',
    //   name: 'image' + new Date() + '.jpg',
    // })
    _Guestlogin(userData).then((responce) => {
      setloader(false)
      SetUser(responce)(dispatch)
    }).catch((error) => {
      console.log("Error", error.response)
      setloader(false)
      if (error) {
        navigation.navigate("FacebookSignup", {
          refc: refercode,
          user: json
        })
      }
    })
  }
  return (
    <ImageBackground source={bgImg} style={Sheet.container}>
      {loader && <Loader />}
      <View style={Sheet.subcontainer}>
        <Text style={Sheet.text1}>Welcome to </Text>
        <Text style={Sheet.text}>Prashna Mala</Text>
      </View>
      <View style={Sheet.Endcontainer}>

        {Platform.OS != "android" ? <Button
          btnstyle={{
            backgroundColor: '#fff'
          }}
          onPress={() => onAppleButtonPress()}
          // onPress={() => navigation.navigate("FacebookSignup")}
          MyIcon={<IconApple name={"apple1"} size={26} color={"black"} />}
          title={"Connect with Apple"}
          textstyle={{ color: 'black', marginLeft: 14 }}
        /> : null}
        <Button
          btnstyle={{
            backgroundColor: '#fff'
          }}
          onPress={() => getCurrentUserInfo()}
          // onPress={() => navigation.navigate("FacebookSignup")}
          MyIcon={<Image source={require("../../Assets/search.png")} style={{ height: 20, width: 20, resizeMode: 'contain' }} />}
          title={"Connect with Google"}
          textstyle={{ color: 'black', marginLeft: 14 }}
        />
        <Button
          btnstyle={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: '#fff'
          }}
          // onPress={() => getCurrentUserInfo()}
          onPress={() => navigation.navigate("SignupwithEmail")}
          // MyIcon={<Image source={require("../../Assets/search.png")} style={{ height: 20, width: 20, resizeMode: 'contain' }} />}
          title={"Sign up with email"}
          textstyle={{ color: '#fff', marginLeft: 14 }}
        />
        <Text
          onPress={() => _LoginAsGuest()}
          style={{
            color: '#fff', textAlign: 'center', marginTop: 10,
            fontFamily: style.Regular,
            textDecorationLine: 'underline'
          }}>Play As  Guest</Text>
        {/* <Button title={"Play As  Guest"}
          btnstyle={{
            // marginTop: 40
          }}
          onPress={() => _LoginAsGuest()}
        /> */}
      </View>

    </ImageBackground>
  )
}

export default InitialScreens

