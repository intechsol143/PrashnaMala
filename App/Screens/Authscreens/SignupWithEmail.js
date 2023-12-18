import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import InputField from '../../Components/InputField'
import { Sheet } from './styles'
import Button from '../../Components/Button'
import { style } from '../../Constants'
import { useState } from 'react'
const bg1 = require("../../Assets/bgg.png")
import Icon from 'react-native-vector-icons/Entypo'
import Picker from '../../Components/Countrypicker'
import Subheader from '../../Components/Subheader'
import ImagePicker from 'react-native-image-crop-picker'
import { SetUser } from '../../Redux/actions/appactions/Index'
import { useDispatch } from 'react-redux'
import { userRegister } from '../../Utils/Apis'
import Loader from '../../Components/Loader'
import CodePick from '../../Components/Codepicker'

const SignupWithEmail = ({ navigation }) => {
    const dispatch = useDispatch()
    const [data, setdata] = useState({
        firstname: '',
        lastname: '',
        password: '',
        confirmpassword: '',
        email: "",
        phone: '',
        city: "",
        eye1: true,
        eye2: true,
        cityPicker: false,
        image: '',
        loader: false,
        numCode: '+92'

    })
    const [dataErr, setdataErr] = useState({
        firstnameErr: '',
        lastnameErr: '',
        passwordErr: '',
        confirmpasswordErr: '',
        emailErr: "",
        phoneErr: "",
        cityErr: "",
        matchErr: '',
        imageErr: '',
        invalidNumErr: '',
        already:"",
        invalidPhoneErr:""

    })

    const phoneNumber = data.numCode + data.phone

    const _registerUser = () => {
        if (_validator()) {
            setdata({ ...data, loader: true })
            const userData = new FormData()
            userData.append("name", data.firstname + ' ' + data.lastname)
            userData.append("email", data.email)
            userData.append("phoneno", phoneNumber)
            userData.append("country", data.city)
            userData.append("password", data.password)
            userData.append("refer_code", data.userrefCode)
            userData.append("password_confirmation", data.confirmpassword)
            userData.append('image', {
                uri: data.image,
                type: 'image/jpeg',
                name: 'image' + new Date() + '.jpg',
            })
            userRegister(userData).then((responce) => {
                if (responce.status === "success") {
                    setdata({ ...data, loader: false })
                    SetUser(responce)(dispatch)
                    // SetRefCode("")(dispatch)

                }

            }).catch((error) => {
                setdata({ ...data, loader: false })
                setdataErr({ ...dataErr, invalidPhoneErr: error.response.data.message.phoneno })
                setdataErr({
                    ...dataErr,
                    already: error.response.data.message.email[0],
                })

            })
        }

    }
    const _validator = () => {
        if (!data.firstname && !data.lastname && !data.email && !data.password && !data.confirmpassword && !data.phone && !data.city && !data.image) {
            setdataErr({ ...dataErr, firstnameErr: 'txt', lastnameErr: 'txt', emailErr: 'txt', passwordErr: 'txt', confirmpasswordErr: 'txt', phoneErr: 'txt', cityErr: 'txt', imageErr: 'txt' })
            return false;

        } else if (!data.firstname) {
            setdataErr({ ...dataErr, firstnameErr: 'txt' })
            return false;
        }
        else if (!data.image) {
            setdataErr({ ...dataErr, imageErr: 'txt' })
            return false;
        }
        else if (!data.lastname) {
            setdataErr({ ...dataErr, lastnameErr: 'txt' })
            return false;
        }
        else if (!data.email) {
            setdataErr({ ...dataErr, emailErr: 'txt' })
            return false;
        }
        else if (!data.phone) {
            setdataErr({ ...dataErr, phoneErr: 'txt' })
            return false;
        }
        else if (!data.city) {
            setdataErr({ ...dataErr, cityErr: 'txt' })
            return false;
        }
        else if (!data.password) {
            setdataErr({ ...dataErr, passwordErr: 'txt' })
            return false;
        }
        else if (!data.confirmpassword) {
            setdataErr({ ...dataErr, confirmpasswordErr: 'txt' })
            return false;
        }
        else if (data.password != data.confirmpassword) {
            setdataErr({ ...dataErr, matchErr: 'txt' })
            return false;
        }
        return true
    }

    const onSelectCountry = (country) => {
        console.log("country", country)
        setdata({ ...data, city: country?.name })
        if (country) {
            setdataErr({ ...dataErr, cityErr: '' })
        }


    };
    const _pickImage = (i) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setdata({ ...data, image: image.path })
            setdataErr({ ...dataErr, imageErr: '' })
            console.log(image.path);
        });
    }
    const getCode = (code) => {
        setdata({ ...data, numCode: code })

    };
    return (
        <ImageBackground source={bg1} style={Sheet.container}>
            {data.loader && <Loader />}
            <View style={{ margin: 12 }}>
                <Subheader onPress={() => navigation.goBack()} title={"Sign up"} />
            </View>

            <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
                <ScrollView>
                    <TouchableOpacity onPress={() => _pickImage()} style={{ alignSelf: 'center', borderWidth: dataErr.imageErr ? 1 : 0, borderColor: dataErr.imageErr ? 'red' : null, borderRadius: 50 }}>
                        {!data.image ? <Image source={require("../../Assets/user.png")} style={styles.profile} /> : <Image source={{ uri: data.image }} style={styles.profile} />}
                    </TouchableOpacity>
                    <View>
                        <View style={{ height: 20 }} />
                        <View style={styles.field} />
                        <View style={{ position: 'absolute', width: '100%', top: 9 }}>
                            <InputField
                                placeholder={"First Name"}
                                value={data.firstname}
                                onChangeText={(txt) => {
                                    setdata({ ...data, firstname: txt })
                                    setdataErr({ ...dataErr, firstnameErr: "" })
                                }}
                                getstyle={{
                                    borderColor: dataErr.firstnameErr ? 'red' : null,
                                    borderWidth: dataErr.firstnameErr ? .5 : null,
                                    backgroundColor: null,
                                    paddingLeft: 20
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={styles.field} />
                        <View style={{ position: 'absolute', width: '100%', top: -10 }}>
                            <InputField
                                placeholder={"Last Name"}
                                value={data.lastname}
                                onChangeText={(txt) => {
                                    setdata({
                                        ...data,
                                        lastname: txt
                                    })
                                    setdataErr({ ...dataErr, lastnameErr: "" })
                                }}
                                getstyle={{
                                    borderColor: dataErr.lastnameErr ? 'red' : null,
                                    borderWidth: dataErr.lastnameErr ? .5 : null,
                                    backgroundColor: null,
                                    paddingLeft: 20
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={styles.field} />
                        <View style={{ position: 'absolute', width: '100%', top: -10 }}>
                            <InputField
                                placeholder={"Email"}
                                autoCapitalize={'none'}
                                value={data.email}
                                onChangeText={(txt) => {
                                    setdata({
                                        ...data,
                                        email: txt
                                    })
                                    setdataErr({ ...dataErr, emailErr: "" })
                                }}
                                getstyle={{
                                    borderColor: dataErr.emailErr ? 'red' : null,
                                    borderWidth: dataErr.emailErr ? .5 : null,
                                    backgroundColor: null,
                                    paddingLeft: 20
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', height: 50 }}>
                            <View style={{ height: 50, width: "20%" }}>
                                <CodePick
                                    ss={{ width: "100%" }}
                                    GetNumcode={(a) => getCode(a)}
                                />
                            </View>
                            <View style={{ height: 50, width: "77%", marginLeft: 4 }}>
                                <View style={styles.field} />
                                <View style={{ position: 'absolute', width: "100%", top: -10 }}>
                                    <InputField
                                        placeholder={"Phone no"}
                                        value={data.phone}
                                        keyboardType={'number-pad'}
                                        onChangeText={(txt) => {
                                            setdata({
                                                ...data,
                                                phone: txt
                                            })
                                            setdataErr({ ...dataErr, invalidPhoneErr: "" })
                                        }}
                                        getstyle={{
                                            borderColor: dataErr.phoneErr ? 'red' : null,
                                            borderWidth: dataErr.phoneErr ? .5 : null,
                                            backgroundColor: null,
                                            width: "100%",
                                            paddingLeft: 20
                                        }}
                                    />
                                </View>
                            </View>


                        </View>
                        {/* */}

                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Picker
                            st={dataErr.cityErr ? "asd" : null}
                            Getcountry={(e) => onSelectCountry(e)}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={styles.field} />
                        <View style={{ position: 'absolute', width: '100%', top: -12 }}>
                            <InputField
                                placeholder={"Password"}
                                secureTextEntry={data.eye1}
                                value={data.password}
                                onChangeText={(txt) => {
                                    setdata({
                                        ...data,
                                        password: txt
                                    })
                                    setdataErr({ ...dataErr, passwordErr: "", matchErr: '' })
                                }}
                                getstyle={{
                                    borderColor: dataErr.passwordErr ? 'red' : null,
                                    borderWidth: dataErr.passwordErr ? .5 : null,
                                    paddingLeft: 20,
                                    backgroundColor: null,
                                }}
                                MyIcon={<Icon
                                    onPress={() => setdata({ ...data, eye1: !data.eye1 })}
                                    name={data.eye1 ? "eye-with-line" : "eye"} color={"#fff"} size={20} />}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={styles.field} />
                        <View style={{ position: 'absolute', width: '100%', bottom: 0, top: -12 }}>
                            <InputField
                                placeholder={"Confirm password"}
                                secureTextEntry={data.eye2}
                                value={data.confirmpassword}
                                onChangeText={(txt) => {
                                    setdata({
                                        ...data,
                                        confirmpassword: txt
                                    })
                                    setdataErr({ ...dataErr, confirmpasswordErr: "", matchErr: '' })
                                }}
                                getstyle={{
                                    borderColor: dataErr.passwordErr ? 'red' : null,
                                    borderWidth: dataErr.passwordErr ? .5 : null,
                                    paddingLeft: 20,
                                    backgroundColor: null,

                                }}
                                MyIcon={<Icon
                                    onPress={() => setdata({ ...data, eye2: !data.eye2 })}
                                    name={data.eye2 ? "eye-with-line" : "eye"} color={"#fff"} size={20} />
                                     }
                            />
                        </View>
                    </View>
                    {dataErr.emailErr ? <Text style={styles.invalidEmail}>{dataErr.already}</Text> : null}
                    
                    {/* 
                    {dataErr.phoneErr ? <Text style={styles.invalidPhone}>{dataErr.phoneErr}</Text> : null}
                    {dataErr.invalidPhoneErr ? <Text style={styles.invalidPhone}>{dataErr.invalidPhoneErr}</Text> : null} */}

                    {dataErr.matchErr ? <Text style={{ color: 'red', textAlign: 'center', fontFamily: style.Regular, paddingVertical: 10 }}>Passwords don't match </Text> : null}
                    <Button title={"Sign Up"} onPress={() => _registerUser()} btnstyle={{ marginTop: 40 }} />
                    <Text onPress={() => navigation.goBack()} style={{ color: '#fff', textAlign: 'center', fontFamily: style.Regular, paddingVertical: 10 }}>Alreay have an account? <Text style={{ color: '#fff', fontFamily: style.SemiBold }}>SignIn</Text></Text>
                </ScrollView>
            </View>

        </ImageBackground>
    )
}

export default SignupWithEmail

const styles = StyleSheet.create({
    field: {
        height: 50,
        borderRadius: 25,
        // borderColor: 'white',
        // borderWidth: 1,
        width: '100%',
        backgroundColor: '#cdcaca',
        opacity: .2
    },
    invalidEmail: {
        textAlign: 'center', color: 'red',
        top: 8,
        fontFamily: style.Regular,
        fontSize: 14
    },
    backButton: {
        height: 40, width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        margin: 14,
        backgroundColor: '#cdcaca',
        opacity: .2
    },
    profile: {
        height: 100,
        width: 100,
        borderRadius: 50

    },
    invalidPhone: {
        textAlign: 'center', color: 'red',
        top: 8,
        fontFamily: style.Regular,
        fontSize: 14
    }
})