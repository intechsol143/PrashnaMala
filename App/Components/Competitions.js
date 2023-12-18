import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { style } from '../Constants'
import Line from './Line'
import Spacer from './Spacer'
import Modal from "react-native-modal";
import { useSelector } from 'react-redux'
const Competitions = ({ data, gifloader, coinsResult,navigation }) => {
    console.log("data check",data)
    const { user } = useSelector(({ appReducer }) => appReducer);
    // const [handleUserstate, sethandleuserstate] = useState(data?.winner?.id == user.userdata.id ? true : false)
    return (
        <View style={{ flex: 1, padding: 12 }}>
            <View>
                <View style={{
                    height: 50,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}>
                    <View style={{
                        height: 50,
                        width: '45%',
                        borderWidth: 1,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 6,
                        justifyContent: "space-between",
                        borderColor: 'red',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            {data?.al1?.name != "Guest" ? <Image source={{ uri: data?.al1?.image }} style={styles.img} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}
                            {data?.al1?.name != "Guest" ? <Text style={styles.nameTxt1}>{data?.al1?.name}</Text> : <Text style={styles.nameTxt1}>{data?.al1?.name}</Text>}
                        </View>
                    </View>
                    <View style={{
                        height: 50,
                        width: '45%',
                        borderWidth: 1,
                        borderColor: 'red',
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 6,
                        justifyContent: "space-between",
                        // backgroundColor: 'green'
                    }}>
                        <Text style={{ color: '#fff' }}></Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            {data?.ar1?.name != "Guest" ? <Text style={[styles.nameTxt1, { paddingRight: 6 }]}>{data?.ar1?.name.split(' ').slice(0, -1).join(' ')}</Text> : <Text style={styles.nameTxt1}>{data?.ar1?.name}</Text>}
                            {data?.al1?.name != "Guest" ? <Image source={{ uri: data?.ar1?.image }} style={styles.img} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}
                        </View>

                    </View>
                </View>
                <Line lineHeight={15} />

                <View style={{
                    height: 50,
                    // marginTop: 5,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    // backgroundColor: 'red'
                }}>
                    <View style={{
                        height: 50,
                        width: '45%',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: 'red',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "space-between",
                    }}>
                        <View style={styles.rowStyle}>
                            {data?.al2?.name != "Guest" ? <Image source={{ uri: data?.al2?.image }} style={[styles.img, { marginLeft: 6 }]} /> : <Image source={require("../Assets/user.png")} style={[styles.img, { marginLeft: 6 }]} />}
                            {data?.al2?.name != "Guest" ? <Text style={styles.nameTxt1}>{data?.al2?.name.split(' ').slice(0, -1).join(' ')}</Text> : <Text style={styles.nameTxt1}>{data?.al2?.name}</Text>}
                            {/* {gifloader ?
                             <Image source={require("../Assets/mygif.gif")} style={[styles.img, { marginLeft: 6 }]} /> :
                                <View>
                                    {data?.al2?.image ? <Image source={{ uri: data?.al2?.image }} style={[styles.img, { marginLeft: 6 }]} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}
                                </View>
                            }
                            {data?.al2?.name != "Guest" ? <Text style={styles.nameTxt1}>{data?.al2?.name.split(' ').slice(0, -1).join(' ')}</Text> : <Text style={styles.nameTxt1}>{data?.al2?.name}</Text>} */}
                        </View>

                    </View>
                    <View style={{
                        height: 50,
                        width: '45%',
                        borderWidth: 1,
                        borderColor: 'red',
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 10,
                        paddingHorizontal: 6,
                        justifyContent: "space-between",
                        // backgroundColor: 'green'
                    }}>
                        <Text style={{ color: '#fff' }}></Text>
                        <View style={styles.rowStyle}>
                            {data?.ar2?.name != "Guest" ? <Text style={[styles.nameTxt1, { paddingRight: 6 }]}>{data?.ar2?.name.split(' ').slice(0, -1).join(' ')}</Text> : <Text style={styles.nameTxt1}>{data?.ar2?.name}</Text>}
                            {data?.ar2?.name != "Guest" ? <Image source={{ uri: data?.ar2?.image }} style={styles.img} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}
                            {/* <Text style={styles.nameTxt1}>{data?.ar2?.name.split(' ').slice(0, -1).join(' ')}</Text>
                            <Image source={{ uri: data?.ar2?.image }} style={styles.img} /> */}

                        </View>
                    </View>
                </View>

                <Line lineHeight={50} />
                <View style={{
                    height: 50,
                    // marginTop: 5,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    //  backgroundColor: 'red'
                }}>
                    <View style={{
                        height: 50,
                        width: '45%',
                        borderWidth: 1,
                        borderColor: 'red',
                        // backgroundColor: 'green',
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 10,
                        paddingHorizontal: 6,
                        justifyContent: "space-between",
                    }}>
                        {/* <View style={{
                            height: 40, width: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30,
                            backgroundColor: 'grey'
                        }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 24,
                                fontFamily: style.SemiBold
                            }}>?</Text>
                        </View> */}
                        <View style={styles.rowStyle}>
                            {data?.al3?.name != "Guest" ? <Image source={{ uri: data?.al3?.image }} style={styles.img} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}
                            {data?.al3?.name != "Guest" ? <Text style={styles.nameTxt1}>{data?.al3?.name.split(' ').slice(0, -1).join(' ')}</Text> : <Text style={styles.nameTxt1}>{data?.al3?.name}</Text>}
                            {/* <Image source={{ uri: data?.al3?.image }} style={styles.img} />
                            <Text style={styles.nameTxt1}>{data?.al3?.name.split(' ').slice(0, -1).join(' ')}</Text> */}

                        </View>
                        <Text style={{ color: '#fff' }}></Text>
                    </View>
                    <View style={{
                        height: 50,
                        width: 100,
                        borderColor: 'red',
                        flexDirection: 'row',
                        position: 'absolute',
                        left: 142,
                        alignSelf: 'center',
                    }}>
                        <View style={{
                            height: 50,
                            width: '100%',
                            borderColor: '#fff',
                            borderBottomColor: 'red',
                            borderBottomWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        </View>
                    </View>

                    <View style={{
                        height: 50,
                        width: '45%',
                        borderWidth: 1,
                        borderColor: 'red',
                        flexDirection: 'row',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 6
                        // backgroundColor: 'green'
                    }}>

                        <Text style={{ color: '#fff' }}></Text>
                        <View style={styles.rowStyle}>
                            {data?.ar3?.name != "Guest" ? <Text style={[styles.nameTxt1, { paddingRight: 6 }]}>{data?.ar3?.name.split(' ').slice(0, -1).join(' ')}</Text> : <Text style={styles.nameTxt1}>{data?.ar3?.name}</Text>}
                            {data?.ar3?.name != "Guest" ? <Image source={{ uri: data?.ar3?.image }} style={styles.img} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}

                            {/* <Image source={{ uri: data?.ar3?.image }} style={styles.img} />
                            <Text style={styles.nameTxt1}>{data?.ar3?.name.split(' ').slice(0, -1).join(' ')}</Text> */}

                        </View>
                        {/* <View style={{
                            height: 40,
                            width: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30,
                            backgroundColor: 'grey'
                        }}>
                            <Text style={{ color: '#fff', fontSize: 24, fontFamily: style.SemiBold }}>?</Text>
                        </View> */}
                    </View>
                </View>
                <Spacer spacerHeight={50} alignSelf={"center"} />
                <View style={{
                    height: 30,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}>
                    <View style={{
                        height: 30,
                        width: '25.3%',

                        borderRightWidth: .5,
                        borderRightColor: 'red',
                        borderTopColor: 'red',
                        backgroundColor: null
                    }}>

                    </View>
                    <View style={{
                        height: 30,
                        width: '25%',
                        borderTopWidth: .5,
                        // borderWidth: 1,
                        borderTopColor: 'red',
                        backgroundColor: null
                    }}>

                    </View>

                    <View style={{
                        height: 50,
                        width: '65%',
                        // borderWidth: 1,
                        borderColor: null,
                        backgroundColor: null
                    }}>

                    </View>
                </View>
                <View style={{
                    height: 50,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    // backgroundColor: 'red'
                }}>
                    <View style={{
                        height: 50,
                        width: '45%',
                        borderWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        borderColor: data?.winner == null ? "red" : data?.winner?.id == data?.a_final?.id ? style.green : 'red',
                        borderRadius: 10,
                        paddingHorizontal: 6,
                        backgroundColor: data.winner == null ? null : data?.winner?.id == data?.a_final?.id ? style.green : style.btnColor


                    }}>
                        {data?.winner == null ? <View style={{ height: 35, width: 35, borderRadius: 20, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 24, fontFamily: style.Bold }}>?</Text>
                        </View> : <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {data?.a_final?.name != "Guest" ? <Image source={{ uri: data?.a_final?.image }} style={styles.img} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}
                            {data?.a_final?.name != "Guest" ? <Text style={styles.nameTxt1}>{data?.a_final?.name.split(' ').slice(0, -1).join(' ')}</Text> : <Text style={styles.nameTxt1}>{data?.a_final?.name}</Text>}
                        </View>}



                    </View>
                    <View style={{
                        height: 50,
                        width: '10%',
                        // borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // borderColor: 'red',
                        // backgroundColor: 'grey'
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 20,
                            fontFamily: style.BB
                        }}>VS</Text>
                    </View>
                    <View style={{
                        height: 50,
                        width: '45%',
                        borderWidth: 1,
                        borderColor: data?.winner == null ? "red" : data?.winner?.id == data?.b_final?.id ? style.green : 'red',
                        backgroundColor: data?.winner == null ? null : data?.winner?.id == data?.b_final?.id ? style.green : style.btnColor,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 6,
                        justifyContent: 'flex-end'
                    }}>
                        {data?.winner == null ? <View style={{ height: 35, width: 35, borderRadius: 20, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 24, fontFamily: style.Bold }}>?</Text>
                        </View> : <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {data?.b_final?.name != "Guest" ? <Text style={[styles.nameTxt1, { paddingRight: 4 }]}>{data?.b_final?.name.split(' ').slice(0, -1).join(' ')}</Text> : <Text style={styles.nameTxt1}>{data?.b_final?.name}</Text>}
                            {data?.b_final?.name != "Guest" ? <Image source={{ uri: data?.b_final?.image }} style={styles.img} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}
                        </View>}



                    </View>
                </View>

                {/* ..... */}
                <Spacer eStyle={{
                    alignSelf: 'flex-end',
                    marginRight: "25%",
                    height: 30,
                    backgroundColor: 'red'
                }} />


                <View style={{
                    height: 30,
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <View style={{
                        height: 30,
                        width: '25%',

                        // borderRightWidth: .5,
                        // borderRightColor: 'red',
                        // borderTopColor: 'red',
                        // backgroundColor: "blue"
                    }}>
                        {/* <Text>1</Text> */}
                    </View>
                    <View style={{
                        height: 30,
                        width: '25%',
                        // borderTopWidth: .5,

                        // borderWidth: 1,
                        borderTopColor: 'red',
                        // backgroundColor: "yellow"
                    }}>
                    </View>

                    <View style={{
                        height: 30,
                        width: '25%',
                        borderTopWidth: .5,
                        borderTopColor: 'red',
                        // borderWidth: 1,
                        borderLeftWidth: .5,
                        borderLeftColor: 'red',

                        borderColor: null,
                        // backgroundColor: "grey"
                    }}>
                        {/* <Text>3</Text> */}
                    </View>
                    <View style={{
                        height: 30,
                        width: '25%',
                        // borderWidth: 1,

                        borderColor: null,
                        // backgroundColor: "blue"
                    }}>
                    </View>
                </View>


                <View style={{
                    height: 50, width: '100%',
                    alignItems: 'center', justifyContent: 'space-between',
                    flexDirection: 'row',
                    // backgroundColor: 'red'
                }}>
                    <View style={{
                        height: 50,
                        width: '45%',
                        borderWidth: 1,
                        borderColor: 'red',
                        // backgroundColor: 'green',
                        flexDirection: 'row',
                        borderRadius: 10,
                        paddingHorizontal: 6,
                        alignItems: 'center', justifyContent: 'space-between'
                    }}>
                        <View style={styles.rowStyle}>
                            {data?.bl3?.name != "Guest" ? <Image source={{ uri: data?.bl3?.image }} style={styles.img} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}
                            {data?.bl3?.name != "Guest" ? <Text style={styles.nameTxt1}>{data?.bl3?.name.split(' ').slice(0, -1).join(' ')}</Text> : <Text style={styles.nameTxt1}>{data?.bl3?.name}</Text>}

                        </View>

                        <Text style={{ color: '#fff' }}></Text>
                    </View>
                    <View style={{
                        height: 50,
                        width: 80,
                        position: 'absolute',
                        left: 145,
                        top: .5,
                        borderTopWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopColor: 'red',
                        // backgroundColor: 'grey'
                    }}>
                    </View>
                    <View style={{
                        height: 50,
                        width: '45%',
                        borderWidth: 1,
                        borderColor: 'red',
                        // backgroundColor: 'green',
                        flexDirection: 'row',
                        borderRadius: 10,
                        paddingHorizontal: 6,
                        alignItems: 'center', justifyContent: 'space-between'
                    }}>
                        <Text style={{ color: '#fff' }}></Text>
                        {/* <View style={{
                            height: 40, width: 40,
                            alignItems: 'center', justifyContent: 'center',
                            borderRadius: 30, backgroundColor: 'grey'
                        }}>
                            <Text style={{ color: '#fff', fontSize: 24, fontFamily: style.SemiBold }}>?</Text>
                        </View> */}
                        <View style={styles.rowStyle}>
                            {data?.br3?.name != "Guest" ? <Text style={[styles.nameTxt1, { paddingRight: 6 }]}>{data?.br3?.name.split(' ').slice(0, -1).join(' ')}</Text> : <Text style={styles.nameTxt1}>{data?.br3?.name}</Text>}
                            {data?.br3?.name != "Guest" ? <Image source={{ uri: data?.br3?.image }} style={styles.img} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}
                            {/* <Text style={styles.nameTxt2}>{data?.br3?.name.split(' ').slice(0, -1).join(' ')}</Text>
                            <Image source={{ uri: data?.br3?.image }} style={styles.img} /> */}
                        </View>

                    </View>
                </View>
                <Line lineHeight={50} />
                <View style={{
                    height: 50, width: '100%',
                    alignItems: 'center', justifyContent: 'space-between',
                    flexDirection: 'row',
                    // backgroundColor: 'red'
                }}>
                    <View style={{
                        height: 50,
                        width: '45%',
                        borderWidth: 1,
                        borderColor: 'red',
                        // backgroundColor: 'green',
                        flexDirection: 'row',
                        paddingHorizontal: 6,
                        borderRadius: 10,
                        alignItems: 'center', justifyContent: 'space-between'
                    }}>
                        <View style={styles.rowStyle}>
                            {data?.bl2?.name != "Guest" ? <Image source={{ uri: data?.bl2?.image }} style={styles.img} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}
                            {data?.bl2?.name != "Guest" ? <Text style={styles.nameTxt1}>{data?.bl2?.name.split(' ').slice(0, -1).join(' ')}</Text> : <Text style={styles.nameTxt1}>{data?.bl2?.name}</Text>}

                        </View>
                        <Text style={{ color: '#fff' }}></Text>
                    </View>
                    <View style={{
                        height: 50,
                        width: '45%',
                        borderWidth: 1,
                        borderColor: 'red',
                        // backgroundColor: 'green',
                        flexDirection: 'row',
                        paddingHorizontal: 6,
                        borderRadius: 10,
                        alignItems: 'center', justifyContent: 'space-between'
                    }}>
                        <Text style={{ color: '#fff' }}></Text>
                        <View style={styles.rowStyle}>
                            {data?.br2?.name != "Guest" ? <Text style={[styles.nameTxt1, { paddingRight: 6 }]}>{data?.br2?.name.split(' ').slice(0, -1).join(' ')}</Text> : <Text style={styles.nameTxt1}>{data?.br2?.name}</Text>}
                            {data?.br2?.name != "Guest" ? <Image source={{ uri: data?.br2?.image }} style={styles.img} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}
                            {/* <Text style={styles.nameTxt2}>{data?.br2?.name.split(' ').slice(0, -1).join(' ')}</Text>
                            <Image source={{ uri: data?.br2?.image }} style={styles.img} /> */}
                        </View>
                    </View>
                </View>
                <Line lineHeight={15} />
                <View style={{
                    height: 50, width: '100%',
                    alignItems: 'center', justifyContent: 'space-between',
                    flexDirection: 'row',
                    // backgroundColor: 'red'
                }}>
                    <View style={{
                        height: 50,
                        width: '45%',
                        borderWidth: 1,
                        borderColor: 'red',
                        alignItems: 'center', justifyContent: 'space-between',
                        borderRadius: 10,
                        paddingHorizontal: 6,
                        flexDirection: 'row',
                        // backgroundColor: 'green'
                    }}>
                        <View style={styles.rowStyle}>
                            {data?.bl1?.name != "Guest" ? <Image source={{ uri: data?.bl1?.image }} style={styles.img} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}
                            {data?.bl1?.name != "Guest" ? <Text style={styles.nameTxt1}>{data?.bl1?.name.split(' ').slice(0, -1).join(' ')}</Text> : <Text style={styles.nameTxt1}>{data?.bl1?.name}</Text>}


                        </View>
                        <Text style={{ color: '#fff' }}></Text>
                    </View>
                    <View style={{
                        height: 50,
                        width: '45%',
                        borderWidth: 1,
                        borderColor: 'red',
                        alignItems: 'center', justifyContent: 'space-between',
                        borderRadius: 10,
                        paddingHorizontal: 6,
                        flexDirection: 'row',
                        // backgroundColor: 'green'
                    }}>
                        <Text style={{ color: '#fff' }}></Text>
                        <View style={styles.rowStyle}>
                            {data?.br1?.name != "Guest" ? <Text style={[styles.nameTxt1, { paddingRight: 6 }]}>{data?.br1?.name.split(' ').slice(0, -1).join(' ')}</Text> : <Text style={styles.nameTxt1}>{data?.br1?.name}</Text>}
                            {data?.br1?.name != "Guest" ? <Image source={{ uri: data?.br1?.image }} style={styles.img} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}


                        </View>
                    </View>
                </View>
            </View>
            <View>
                <Modal isVisible={data?.winner?.id == user.userdata.id ? true : false}>
                    <TouchableWithoutFeedback onPress={() =>navigation.goBack()}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <View style={styles.winnercard}>
                                <View style={styles.imageView}>
                                    {data?.winner?.name != "Guest" ? <Image source={{ uri: data?.winner?.image }} style={[styles.img, { height: 118, width: 118, borderRadius: 60 }]} /> : <Image source={require("../Assets/user.png")} style={styles.img} />}
                                </View>
                                <Text style={[styles.nameTxt1, { fontSize: 24, color: '#000' }]}>Congrations!</Text>
                                <Text style={[styles.nameTxt1, { color: '#000' }]}>{`You Won ${coinsResult} coins!`}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                </Modal>
            </View>


        </View>

    )
}

export default Competitions

const styles = StyleSheet.create({
    nameTxt1: {
        color: '#fff',
        fontFamily: style.SemiBold,
        fontSize: 14,
        paddingLeft: 6
    },
    imageView: {
        borderWidth: 1,
        height: 120,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60
    },
    nameTxt2: {
        color: '#fff',
        fontFamily: style.SemiBold,
        fontSize: 14,
        paddingRight: 4
    },
    winnercard: {
        height: 300,
        borderRadius: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        height: 40,
        width: 40,
        borderRadius: 40,

    },
    rowStyle: { flexDirection: 'row', alignItems: 'center' }
})