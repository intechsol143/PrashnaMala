import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
import { Sheet } from '../../../Authscreens/styles'
import { style } from '../../../../Constants'
import InputField from '../../../../Components/InputField'
import Button from '../../../../Components/Button'
import Picker from '../../../../Components/Countrypicker'
import Subheader from '../../../../Components/Subheader'
import IconCam from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker';
import { editUserprofile } from '../../../../Utils/Apis'
import Loader from '../../../../Components/Loader'
import { SetUser } from '../../../../Redux/actions/appactions/Index'
const bg1 = require("../../../../Assets/bgg.png")
import { countriesRecord } from '../../../../Components/countriesList'
import { countriCodes } from '../../../../Components/Countrycodes'
import { SvgUri } from 'react-native-svg'
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
const Editprofile = ({ navigation }) => {
    const { user } = useSelector(({ appReducer }) => appReducer);
    const dispatch = useDispatch()
    const apiToken = user.token
    let countryresult = countriesRecord.filter((i) => i.name == user.userdata.country)
    //     const results = countriCodes.filter(({ name: id1 }) => countriesRecord.some(({ name: id2 }) => id2 != id1));
    let uniqueResultOne = countriesRecord.filter(function (obj) {
        return !countriCodes.some(function (obj2) {
            return obj.name == obj2.name;
        });
    });

    //Find values that are in result2 but not in result1
    let uniqueResultTwo = countriCodes.filter(function (obj) {
        return countriesRecord.some(function (obj2) {
            return obj.name == obj2.name;


        });
    });

  




    //Combine the two arrays of unique entries
    // let result = uniqueResultOne.concat(uniqueResultTwo);
    // console.log("hi this is result", uniqueResultTwo)
    const [data, setData] = useState({
        fullName: user.userdata.name ? user.userdata.name : '',
        Email: user.userdata.name === "Guest" ? "" : user.userdata.email ? user.userdata.email : '',
        Phone: user.userdata.phoneno ? user.userdata.phoneno : '',
        Country: user.userdata.country ? user.userdata.country : '',
        image: user.userdata.image ? user.userdata.image : '',
        editImage: "",
        editCountry: "",
        loading: false
    })

    const [countryState, setcountryState] = useState(false)

    const [cca2, setCca2] = useState('US'); // you can set ur country here
    const [callingCode, setCallingCode] = useState('1');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('PK');
    const [country,setCountry ] = useState(null);
    const [withFlag, setWithFlag] = useState(true);
    const [withEmoji, setWithEmoji] = useState(true);
    const [withFilter, setWithFilter] = useState(true);
    const [withAlphaFilter, setWithAlphaFilter] = useState(false);
    const [withCallingCode, setWithCallingCode] = useState(false);
    const [modal, setmodal] = useState(false)

    console.log("country Checking",country,countryCode)

    useEffect(() => {
        if (countriCodes.length > 0) {
            const newState =  countriCodes.map(obj => {
                // console.log("::",obj.name)
                if(obj.name === countryresult[0]?.name)
                {
                    setCountryCode(obj.code)
                    setCountry(obj?.name)
                    console.log("Find ho gya",obj)
                }
            })
          
        }
    }, [])

    const onSelectCountry = (country) => {
        setData({ ...data, editCountry: country?.cca2 })
    };

    // console.log("country check", user.userdata.country)


    const _editUser = () => {
        setData({ ...data, loading: true })
        const userData = new FormData()
        userData.append("name", data.fullName ? data.fullName : "")
        userData.append("email", data.Email ? data.Email : "")
        userData.append("phoneno", data.Phone ? data.Phone : "")
        country && userData.append("country", country ? country : "")
        data.editImage &&
            userData.append('image', {
                uri: data.editImage,
                type: 'image/jpeg',
                name: 'image' + new Date() + '.jpg',
            });
        editUserprofile({ userData, apiToken }).then((responce) => {
            console.log("responce", responce)
            setData({ ...data, loading: false })
            SetUser(responce)(dispatch)
            navigation.navigate("LooserProfile", {
                looser: true,
                btn: true
            })
        }).catch((error) => {
            console.log("Error", error)
            setData({ ...data, loading: false })
        })
    }

    const _PictureUpload = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setData({ ...data, editImage: image.path })
            console.log(image);
        });
    }

    const onSelect = (country) => {
        console.log("country tsett", country)
        setCountryCode(country?.cca2);
        setCountry(country?.name);
        setCca2(country?.cca2);
        setCallingCode(country?.callingCode);
    };

    return (
        <ImageBackground source={bg1} style={Sheet.container}>
            {data.loading && <Loader />}
            <ScrollView>
                <View style={{ padding: 12 }}>
                    <Subheader title={"Edit profile"}
                        onPress={() => navigation.goBack()}
                        navigation={navigation} />
                </View>
                <View style={[Sheet.container, { paddingHorizontal: 12 }]}>
                    <View style={{ flex: 1, }}>
                        <View style={[Sheet.prfileContainer, { marginTop: "10%", height: 100, width: 100 }]}>
                            {data?.image ? <Image source={{ uri: data?.editImage ? data?.editImage : data?.image }} style={{
                                height: 100,
                                borderWidth: 1,
                                borderColor: '#fff',
                                width: 100, borderRadius: 50
                            }} /> :
                                data.editImage ? <Image source={{ uri: data?.editImage }} style={{
                                    height: 100,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    width: 100, borderRadius: 50
                                }} /> :
                                    <Image source={require("../../../../Assets/user.png")} style={{
                                        height: 100,
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        width: 100, borderRadius: 50
                                    }} />}

                            <TouchableOpacity onPress={() => _PictureUpload()} style={{ position: 'absolute', alignSelf: 'center', top: 50, left: 80 }}>
                                <View style={{
                                    height: 30, width: 30,
                                    backgroundColor: style.btnColor,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 20, borderWidth: 1, borderColor: '#fff'
                                }}>
                                    <IconCam name={"camera"} size={18} color={'#fff'} />
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={{ marginTop: '15%' }}>
                            <Text style={styles.Ntxt}>Full Name</Text>
                            <View style={{ marginTop: 10 }}>
                                <View style={{
                                    height: 50,
                                    borderRadius: 25,
                                    borderColor: 'white',
                                    borderWidth: 1,
                                    width: '100%',
                                    backgroundColor: '#cdcaca',
                                    opacity: .2
                                }}>
                                </View>
                                <View style={{ position: 'absolute', width: '100%', top: -10 }}>
                                    <InputField
                                        placeholder={"Full Name"}
                                        value={data.fullName}
                                        onChangeText={(txt) => setData({ ...data, fullName: txt })}
                                        getstyle={{
                                            borderColor: 'grey',
                                            borderWidth: 1,
                                            backgroundColor: null,
                                            paddingLeft: 20
                                        }}
                                    />
                                </View>
                            </View>
                            {data.fullName != "Guest" ? <View>
                                <Text style={[styles.Ntxt, { marginTop: 10 }]}>Email</Text>
                                <View style={{ marginTop: 10 }}>
                                    <View style={{
                                        height: 50,
                                        borderRadius: 25,
                                        borderColor: 'white',
                                        borderWidth: 1,
                                        width: '100%',
                                        backgroundColor: '#cdcaca',
                                        opacity: .2
                                    }}>
                                    </View>
                                    <View style={{ position: 'absolute', width: '100%', top: -10 }}>
                                        <InputField
                                            placeholder={"email"}
                                            value={data.Email}
                                            onChangeText={(txt) => setData({ ...data, Email: txt })}
                                            getstyle={{
                                                borderColor: 'grey',
                                                borderWidth: 1,
                                                backgroundColor: null,
                                                paddingLeft: 20
                                            }}
                                        />
                                    </View>
                                </View>
                                <Text style={[styles.Ntxt, { marginTop: 10 }]}>Phone</Text>

                                <View style={{ marginTop: 10 }}>
                                    <View style={{
                                        height: 50,
                                        borderRadius: 25,
                                        borderColor: 'white',
                                        borderWidth: 1,
                                        width: '100%',
                                        backgroundColor: '#cdcaca',
                                        opacity: .2
                                    }}>
                                    </View>
                                    <View style={{ position: 'absolute', width: '100%', top: -10 }}>
                                        <InputField
                                            placeholder={"Phone"}
                                            value={data.Phone}
                                            onChangeText={(txt) => setData({ ...data, Phone: txt })}
                                            getstyle={{
                                                borderColor: 'grey',
                                                borderWidth: 1,
                                                backgroundColor: null,
                                                paddingLeft: 20
                                            }}
                                        />
                                    </View>
                                </View>
                                <Text style={[styles.Ntxt, { marginTop: 10 }]}>Country</Text>
                                <View style={{ marginTop: 10 }}>

                                    {/* <TouchableOpacity
                                        onPress={() => {
                                            setcountryState(true)
                                            // onSelect()
                                        }}
                                        style={{ position: 'absolute', width: '100%', top: -10 }}>

                                        <InputField
                                            placeholder={"Select Country"}
                                            // value={data.Phone}
                                            editable={false}
                                            onChangeText={(txt) => setData({ ...data, Phone: txt })}
                                            getstyle={{
                                                borderColor: 'grey',
                                                borderWidth: 1,
                                                width: '100%',
                                                backgroundColor: null,
                                                paddingLeft: 20
                                            }}
                                        />
                                        <View style={{ position: 'absolute', alignSelf: 'flex-end', top: 15, right: 15 }}>

                                            <View style={{
                                                alignItems: 'center',
                                                borderColor: 'white',
                                                justifyContent: 'center',

                                            }}>
                                                <SvgUri
                                                    width={30}
                                                    height={30}
                                                    uri={result[0]?.file_url}
                                                />

                                            </View>
                                        </View>
                                    </TouchableOpacity> : */}
                                    <View>
                                        <View style={{
                                            height: 50,
                                            borderRadius: 30,
                                            backgroundColor: '#cdcaca',
                                            opacity: .2
                                        }}>

                                        </View>
                                        <View style={{ position: 'absolute', width: '100%' }}>
                                            <View style={[styles.countrystyl, {
                                                borderWidth: 0,
                                                backgroundColor: null,
                                                borderRadius: 30,
                                                flexDirection: 'row',
                                                paddingTop: 8,
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                borderColor: 'red'
                                            }]}>
                                                <View>
                                                    <Text style={[styles.txtstyle, {
                                                        color: 'grey',
                                                        paddingLeft: 12
                                                    }]}>{country != null ? country : "Select Country"}</Text>
                                                </View>
                                                <CountryPicker
                                                    // withCallingCode={true}
                                                    // withCallingCodeButton={true}


                                                    withFlagButton={{
                                                    }}
                                                    theme={{
                                                        flagSizeButton: 23,



                                                        // borderRadius:20
                                                    }}


                                                    {...{
                                                        countryCode,
                                                        withFilter,
                                                        withFlag,
                                                        withAlphaFilter,
                                                        withCallingCode,
                                                        withEmoji,
                                                        // Getcountry,
                                                        onSelect,


                                                    }}



                                                    containerButtonStyle={{
                                                        marginRight: 30,
                                                        // bottom:5

                                                    }}




                                                    visible={modal ? true : false}
                                                />
                                            </View>
                                        </View>

                                        {/* 
                                       <TouchableOpacity activeOpacity={1} onPress={() => {
                                           setmodal(!modal)
                                       }} style={{ position: 'absolute', 
                                       // backgroundColor:'red',
                                       right:"20%",
                                       height:50,
                                       top:10
                                      
                                            }}>
                                           <Image source={require("../Assets/circle.png")} style={{
                                               height: 30,
                                               left:6,
                                               tintColor: style.inputfiedlColor,
                                               width: 30, resizeMode: 'contain'
                                           }} />
                                       </TouchableOpacity> */}
                                        {/* <View style={{
                                                position: 'absolute',

                                                alignSelf: 'flex-end', top: 19, right: "7%"
                                            }}>
                                                <Icon name={"arrow-down"} color={"red"} size={13} />
                                            </View> */}

                                    </View>

                                </View>
                                <View style={{ height: 10 }} />

                                {/* <Picker
                                    Getcountry={(a) => onSelectCountry(a)}
                                    st={false}
                                    changeCountry={data?.Country}

                                /> */}
                            </View> : null}
                            <Button
                                btnstyle={{
                                    marginTop: "20%"
                                }}
                                title={"Save Changes"}
                                onPress={() => _editUser()}
                            // onPress={() => navigation.navigate("LooserProfile", {
                            //     looser: true,
                            //     btn: true
                            // })}
                            />
                        </View>
                    </View>

                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default Editprofile

const styles = StyleSheet.create({
    Ntxt: {
        color: style.btnColor,
        fontFamily: style.Regular,
        paddingLeft: 20,
    }
})