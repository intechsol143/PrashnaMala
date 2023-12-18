import {
    ImageBackground, StyleSheet, Text, View,
    Dimensions,
    Image,
    Share,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native'
import React, { useState } from 'react'
import Subheader from '../../../../Components/Subheader'
import InputField from '../../../../Components/InputField'
import { style } from '../../../../Constants'
const back = require("../../../../Assets/bgg.png")
import Icon from 'react-native-vector-icons/Entypo'
import Button from '../../../../Components/Button'
import { useDispatch, useSelector } from 'react-redux'
import ModalBox from '../../../../Components/ModalBox'
import { SetQues, SetRepeateIndexData } from '../../../../Redux/actions/appactions/Index'
import { _savecashRequest } from '../../../../Utils/Apis'
import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../../../../Components/Loader'
import dynamicLinks from '@react-native-firebase/dynamic-links';

const Bankdetailscreen = ({ navigation, route }) => {
    const { cash } = route?.params;
    const { repeatIndex, user } = useSelector(({ appReducer }) => appReducer);
    const dispatch = useDispatch()
    const { width } = Dimensions.get("screen")
    const [checkModal, setcheckModal] = useState(false)
    const [userRefcode, setuserRefcode] = useState(false)
    const [data, setdata] = useState({
        accountNumber: "",
        ssnNumber: "",
        routingNUmber: "",
        licenseFrontImage: "",
        licenseBackImage: "",
        loading: false
    })
    const [dataErr, setdataErr] = useState({
        accountNumberErr: "",
        ssnNumberErr: "",
        routingNUmberErr: "",
        licenseFrontImageErr: "",
        licenseBackImageErr: ""

    })
    const apiToken = user.token;
    const _showModal = (a) => {
        if (a === "1") {
            setcheckModal(false)
        }
        else {
            setcheckModal(true)
        }
    }

    const onShare = async (i, x) => {
        try {
            const result = await Share.share({
                message:
                    `Hi, i am inviting you to join this amazing game with my referal code and start winning by playing. \n link: \n ${i} \n Ref Code: ${x} \n\n Thank You!`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("iffff", result.activityType)
                } else {
                    console.log("else", result)
                    SetRepeateIndexData(null)(dispatch)
                    SetQues(null)(dispatch)
                    navigation.navigate("Tab")
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("dismiss")
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    async function buildLink(a) {
        const link = await dynamicLinks().buildLink({
            link: `https://prashnamala.page.link/ ${a}`,
          // domainUriPrefix is created in your Firebase console
          domainUriPrefix: 'https://prashnamala.page.link',
          // optional setup which updates Firebase analytics campaign
          // "banner". This also needs setting up before hand
        //   analytics: {
        //     campaign: 'banner',
        //   },
                   android: {
                packageName: 'com.prashnamala',
            },
        });
        onShare(link, a);
        // return link;
      }

    // const buildLink = async (a) => {
    //     const link = await dynamicLinks().buildShortLink({
       
    //         link: `https://prashnamala.page.link/ ${a}`,
    //         android: {
    //             packageName: 'com.prashnamala',
    //         },
    //         domainUriPrefix: 'https://prashnamala.page.link',
    //     });
    //     console.log("final linllll", link)
    //     onShare(link, a);
    // };

    const Withdrawl = () => {
        if (_validator()) {
            setdata({ ...data, loading: true })
            const userdata = new FormData()
            userdata.append("cash", cash)
            _savecashRequest({ userdata, apiToken }).then((responce) => {
                setdata({ ...data, loading: false })
                if (responce.status === "success") {
                    Alert.alert('Congratulation', 'Refer your 10 Friends to avail the cash prize', [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'OK', onPress: () => {
                                buildLink(responce.refer_code)

                            }
                        },
                    ]);


                }
            }).catch((error) => {
                setdata({ ...data, loading: false })
                console.log("Error", error)
            })
        }

    }

    const _validator = () => {
        if (!data.accountNumber && !data.ssnNumber && !data.routingNUmber && !data.licenseFrontImage && !data.licenseBackImage) {
            setdataErr({ ...dataErr, accountNumberErr: "asd", ssnNumberErr: "asd", routingNUmberErr: "asd", licenseFrontImageErr: "asd", licenseBackImageErr: "asd" })
            return false;
        }
        else if (!data.accountNumber) {
            setdataErr({ ...dataErr, accountNumberErr: "asd" })
            return false;
        }
        else if (!data.ssnNumber) {
            setdataErr({ ...dataErr, ssnNumberErr: "asd" })
            return false;
        } else if (!data.routingNUmber) {
            setdataErr({ ...dataErr, routingNUmberErr: "asd" })
            return false;
        } else if (!data.licenseFrontImage) {
            setdataErr({ ...dataErr, licenseFrontImageErr: "asd" })
            return false;
        }
        else if (!data.licenseBackImage) {
            setdataErr({ ...dataErr, licenseBackImageErr: "asd" })
            return false;
        }
        return true

    }


    const _uploadLicenses = (i) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            if (i == "1") {
                setdata({ ...data, licenseFrontImage: image.path })
                setdataErr({ ...dataErr, licenseFrontImageErr: "" })
            } else {
                setdata({ ...data, licenseBackImage: image.path })
                setdataErr({ ...dataErr, licenseBackImageErr: "" })
            }

            console.log(image);
        });
    }
    return (
        <ImageBackground source={back} style={styles.container}>
            {data.loading && <Loader />}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ padding: 6 }}>
                    <Subheader title={"Enter Bank Details"}
                    onPress={()=>navigation.goBack()}
                    navigation={navigation} />
                </View>
                <View style={styles.subC}>
                    <View style={{ marginTop: '5%' }}>
                        <Text style={styles.txt}>Account Number *</Text>
                        <View style={{ marginTop: 10 }}>
                            <View style={{
                                height: 50,
                                borderRadius: 25,
                                borderWidth: 1,
                                width: '100%',
                                backgroundColor: '#cdcaca',
                                opacity: .2
                            }}>
                            </View>
                            <View style={{ position: 'absolute', width: '100%', top: -10 }}>
                                <InputField
                                    placeholder={"Enter account number"}
                                    value={data.accountNumber}
                                    onChangeText={(txt) => {
                                        setdata({ ...data, accountNumber: txt })
                                        setdataErr({ ...dataErr, accountNumberErr: "" })
                                    }}
                                    getstyle={{
                                        borderColor: !dataErr.accountNumberErr ? 'grey' : "red",
                                        borderWidth: 1,
                                        backgroundColor: null,
                                        paddingLeft: 20
                                    }}
                                />
                            </View>
                        </View>
                        {/* <InputField
                        placeholder={"Enter account number"}
                    /> */}
                        <Text style={[styles.txt, { marginTop: 24 }]}>SSN number *</Text>
                        <View style={{ marginTop: 10 }}>
                            <View style={{
                                height: 50,
                                borderRadius: 25,
                                // borderColor: 'white',
                                borderWidth: 1,
                                width: '100%',
                                backgroundColor: '#cdcaca',
                                opacity: .2
                            }}>
                            </View>
                            <View style={{ position: 'absolute', width: '100%', top: -10 }}>
                                <InputField
                                    placeholder={"Enter SSN number"}
                                    value={data.ssnNumber}
                                    onChangeText={(txt) => {
                                        setdata({ ...data, ssnNumber: txt })
                                        setdataErr({ ...dataErr, ssnNumberErr: "" })
                                    }}
                                    getstyle={{
                                        borderColor: !dataErr.ssnNumberErr ? 'grey' : "red",
                                        borderWidth: 1,
                                        backgroundColor: null,
                                        paddingLeft: 20
                                    }}
                                />
                            </View>
                        </View>
                        {/* <InputField
                        placeholder={"Enter SSN number"}
                    /> */}
                        <Text style={[styles.txt, { marginTop: 24 }]}>Routing Number *</Text>
                        <View style={{ marginTop: 10 }}>
                            <View style={{
                                height: 50,
                                borderRadius: 25,
                                // borderColor: 'white',
                                borderWidth: 1,
                                width: '100%',
                                backgroundColor: '#cdcaca',
                                opacity: .2
                            }}>
                            </View>
                            <View style={{ position: 'absolute', width: '100%', top: -10 }}>
                                <InputField
                                    placeholder={"Enter routing number"}
                                    value={data.routingNUmber}
                                    onChangeText={(txt) => {
                                        setdata({ ...data, routingNUmber: txt })
                                        setdataErr({ ...dataErr, routingNUmberErr: "" })
                                    }}
                                    getstyle={{
                                        borderColor: !dataErr.routingNUmberErr ? 'grey' : "red",
                                        borderWidth: 1,
                                        backgroundColor: null,
                                        paddingLeft: 20
                                    }}
                                />
                            </View>
                        </View>
                        {/* <InputField
                        placeholder={"Enter routing number"}
                    /> */}
                        <Text style={[styles.txt, { marginTop: 24 }]}>Upload License *</Text>
                        <Text style={[styles.txt, { marginTop: 0, color: '#71797e' }]}>Attach your lincense image (Front - Back)</Text>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            // backgroundColor: 'red',
                            paddingHorizontal: 12,
                            marginTop: '5%'
                        }}>


                            <View>
                                <View style={{
                                    height: 120, width: width * 0.4,

                                    borderRadius: 15,
                                    backgroundColor: '#cdcaca',
                                    opacity: .2
                                }}>

                                </View>
                                <View style={{ position: 'absolute' }}>
                                    <TouchableOpacity
                                        onPress={() => _uploadLicenses("1")}
                                        style={[styles.recView, {
                                            width: width * 0.4,
                                            borderColor: !dataErr.licenseFrontImageErr ? 'grey' : "red",
                                        }]}>
                                        {!data.licenseFrontImage ? <View style={{ alignItems: 'center' }}>
                                            <Icon name={"attachment"} color={"#727a7f"} size={24} />
                                            <Text style={[styles.text, {
                                                color: "#727a7f",
                                                top: 4,
                                                fontFamily: style.Medium, textAlign: 'center', fontSize: 14
                                            }]}>Upload Front</Text>
                                        </View> : <Image source={{ uri: data.licenseFrontImage }} style={{
                                            height: 120, width: 150,
                                            borderRadius: 20

                                        }} />}

                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <View style={{
                                    height: 120, width: width * 0.4,
                                    borderRadius: 15,
                                    backgroundColor: '#cdcaca',
                                    opacity: .2
                                }}>

                                </View>
                                <View style={{ position: 'absolute' }}>
                                    <TouchableOpacity
                                        onPress={() => _uploadLicenses("2")}
                                        style={[styles.recView, {
                                            width: width * 0.4,
                                            borderColor: !dataErr.licenseBackImageErr ? 'grey' : "red",
                                        }]}>
                                        {!data.licenseBackImage ? <View style={{ alignItems: 'center' }}>
                                            <Icon name={"attachment"} color={"#727a7f"} size={24} />
                                            <Text style={[styles.text, {
                                                color: '#727a7f',
                                                top: 4,
                                                fontFamily: style.Medium, textAlign: 'center', fontSize: 14
                                            }]}>Upload Back</Text>
                                        </View> : <Image source={{ uri: data.licenseBackImage }} style={{
                                            height: 120,
                                            width: 150,
                                            borderRadius: 20
                                        }} />}

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Button title={"Submit"}
                        onPress={() => {
                            Withdrawl()
                            // SetRepeateIndexData(null)(dispatch)
                            // SetQues(null)(dispatch)
                            // navigation.navigate("Tab")

                        }}
                    />
                </View>
            </ScrollView>

            {checkModal ? <ModalBox
                navigation={navigation}
                handlemodal={checkModal}
                bank={true}
                handleModal={() => _showModal("1")} /> : null}
        </ImageBackground>
    )
}

export default Bankdetailscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12
    },
    text: {
        fontSize: 30,
        color: style.yellow,
        fontFamily: style.Bold
    },
    recView: {
        height: 120, width: 150,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1, borderColor: 'grey'
    },
    txt: {
        color: style.btnColor,
        paddingLeft: 24,
        fontFamily: style.Regular,
        marginTop: 30
    },
    subC: {
        flex: 5,
        // backgroundColor:'green'
        // marginTop: '10%'
    },
    modalContainer: {
        flex: 1,
        // backgroundColor:'rgba(1,0,1,.7)',
        // opacity:.2,
        justifyContent: 'center'
    }
})