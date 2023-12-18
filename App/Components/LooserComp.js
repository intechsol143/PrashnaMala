import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { style } from '../Constants'
const img1 = require("../Assets/A.png")
const img2 = require("../Assets/B.png")
const img3 = require("../Assets/C.png")
const LooserComp = ({ index,
    amount,
    classicPercentage,
    classTotalPlayed,
    countryRank,
    coin,

    oneOonePercentage,
    oneOoneTotalPlayed,
    oneOoneLeague_win,
    world_rank,
    classWin

}) => {
    const { height } = Dimensions.get("screen");
    return (
        <View style={{ flex: 1 }}>
            <View style={{ margin: 6 }}>
                <View style={{
                    height: 90,
                    borderRadius: 15,
                    backgroundColor: "#be1e2d", opacity: .1,
                }}>
                </View>
                <View style={{ position: 'absolute', width: '100%' }}>
                    <TouchableOpacity style={styles.card}>
                        <View style={{
                            height: 100,
                            flexDirection: 'row',
                            width: '100%'
                        }}>
                            <View style={{ height: 100, width: "33%", alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{
                                    height: 40, width: '100%',
                                    borderRightColor: "#4b1f21",
                                    borderRightWidth: 1
                                }}>
                                    <View style={{
                                        alignItems: 'center',
                                        height: 40,
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text style={styles.headingText}>{world_rank}</Text>
                                        <Text style={styles.rankText}>{"World Rank"}</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={{ height: 100, width: "33%", alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{
                                    height: 40, width: '100%',
                                    borderRightColor: "#4b1f21",

                                    borderRightWidth: 1
                                }}>
                                    <View style={{
                                        alignItems: 'center',
                                        height: 40,
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text style={styles.headingText}>{countryRank}</Text>
                                        <Text style={styles.rankText}>{"Country Rank"}</Text>
                                    </View>
                                </View>
                            </View>
                            {/* <View style={{ height: 100, width: "33%", alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: 50, width: '100%', }}>
                                    <View style={{
                                        alignItems: 'center',
                                        height: 40,
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text style={styles.headingText}>{item.num3}</Text>
                                        <Text style={styles.rankText}>{item.r3}</Text>
                                    </View>
                                </View>
                            </View> */}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 100 }} />
            <ImageBackground
                resizeMode='contain'
                source={img1} style={{ height: 100, }}>
                {/* <Text style={{fontFamily:style.SemiBold,
                                fontSize:16,
                                color:'#fff',paddingLeft:16,top:8}}>Classic</Text> */}

                <TouchableOpacity style={[styles.card, { paddingTop: 10 }]}>
                    <View style={{
                        height: 100,
                        flexDirection: 'row',
                        width: '100%'
                    }}>
                        <View style={{ height: 100, width: "25%", alignItems: 'center', justifyContent: 'center' }}>

                            <View style={{
                                height: 40, width: '100%',
                                borderRightColor: '#ff9c64',
                                // backgroundColor: 'blue',
                                borderRightWidth: 1,
                            }}>
                                <View style={{
                                    // alignItems: 'center',
                                    paddingLeft: 25,
                                    height: 40,
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={styles.headingText}>{classTotalPlayed}</Text>
                                    <Text style={styles.rankText}>{"Total"}</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{
                            height: 100,
                            width: "25%", alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                height: 40,
                                width: '100%',
                                borderLeftColor: '#dc3000',
                                borderLeftWidth: 1

                            }}>
                                <View style={{
                                    alignItems: 'center',
                                    height: 40,
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={styles.headingText}>{classWin}</Text>
                                    <Text style={styles.rankText}>{"Win"}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            height: 100, width: "48%",
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View style={{ height: 40, width: '48%', }}>
                                <View style={{
                                    paddingLeft: 25,
                                    height: 40,
                                    borderLeftWidth: 1,
                                    borderLeftColor: '#dc3000',
                                    width: 100,
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={styles.headingText}>{classicPercentage}%</Text>
                                    <Text style={styles.rankText}>{"Win rate"}</Text>
                                </View>
                            </View>

                            <View style={{
                                position: 'absolute',
                                height: 40,
                                borderLeftWidth: 1,
                                borderLeftColor: '#ff9c64'
                            }}>
                                <View style={{ height: 40, width: '48%', }}>
                                    <View style={{
                                        paddingLeft: 25,
                                        height: 40,
                                        borderLeftWidth: 1,
                                        borderLeftColor: '#dc3000',
                                        // backgroundColor:,
                                        width: 100,
                                        justifyContent: 'space-between'
                                    }}>
                                        {/* <Text style={styles.headingText}>{item.num3}</Text> */}
                                        {/* <Text>{item.r3}</Text> */}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <Text style={{
                    fontFamily: style.SemiBold,
                    fontSize: 16,
                    position: 'absolute',
                    top: 6,
                    color: '#fff', paddingLeft: 24,
                }}>Classic</Text>
            </ImageBackground>
            <View style={{height:10}}/>
            <ImageBackground
                    resizeMode='contain'
                    source={img3} style={{ height: 100 }}>
                    <TouchableOpacity style={[styles.card, { paddingTop: 10 }]}>
                        <View style={{
                            height: 100,
                            flexDirection: 'row',
                            width: '100%'
                        }}>
                            <View style={{ height: 100, width: "25%", alignItems: 'center', justifyContent: 'center' }}>

                                <View style={{
                                    height: 40, width: '100%',
                                    borderRightColor: '#e23e86',
                                    // backgroundColor: 'blue',
                                    borderRightWidth: 1,
                                }}>
                                    <View style={{
                                        // alignItems: 'center',
                                        paddingLeft: 25,
                                        height: 40,
                                        justifyContent: 'space-between'
                                    }}>
                                         <Text style={styles.headingText}>{oneOoneTotalPlayed}</Text>
                                    <Text style={styles.rankText}>{"Total"}</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={{
                                height: 100,
                                width: "25%", alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <View style={{
                                    height: 40,
                                    width: '100%',
                                    borderLeftColor: '#77003d',
                                    borderLeftWidth: 1

                                }}>
                                    <View style={{
                                        alignItems: 'center',
                                        height: 40,
                                        justifyContent: 'space-between'
                                    }}>
                                           <Text style={styles.headingText}>{oneOoneLeague_win}</Text>
                                    <Text style={styles.rankText}>{"Win"}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                height: 100, width: "48%",
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={{ height: 40, width: '48%', }}>
                                    <View style={{
                                        paddingLeft: 25,
                                        height: 40,
                                        borderLeftWidth: 1,
                                        borderLeftColor: '#77003d',
                                        width: 100,
                                        justifyContent: 'space-between'
                                    }}>
                                      <Text style={styles.headingText}>{oneOonePercentage}%</Text>
                                    <Text style={styles.rankText}>{"Win rate"}</Text>
                                    </View>
                                </View>

                                <View style={{
                                    position: 'absolute',
                                    height: 40,
                                    borderLeftWidth: 1,
                                    borderLeftColor: '#e23e86'
                                }}>
                                    <View style={{ height: 40, width: '48%', }}>
                                        <View style={{
                                            paddingLeft: 25,
                                            height: 40,
                                            borderLeftWidth: 1,
                                            borderLeftColor: '#77003d',
                                            // backgroundColor:,
                                            // width: 100,
                                            justifyContent: 'space-between'
                                        }}>
                                            {/* <Text style={styles.headingText}>{item.num3}</Text> */}
                                            {/* <Text style={styles.rankText}>{item.r3}</Text> */}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Text style={{
                        fontFamily: style.SemiBold,
                        fontSize: 16,
                        position: 'absolute',
                        top: 6,
                        color: '#fff', paddingLeft: 24,
                    }}>Player 1 on 1</Text>

                </ImageBackground>


        </View>

        // <View style={{ marginVertical: 6 }}>
        //     {index === 0 ? <View style={{ flex: 1 }}>
        //         <View style={{
        //             height: 90,
        //             borderRadius: 15,
        //             backgroundColor: "#be1e2d", opacity: .1,
        //         }}>
        //         </View>
        //         <View style={{ position: 'absolute', width: '100%' }}>
        //             <TouchableOpacity style={styles.card}>
        //                 <View style={{
        //                     height: 100,
        //                     flexDirection: 'row',
        //                     width: '100%'
        //                 }}>
        //                     <View style={{ height: 100, width: "33%", alignItems: 'center', justifyContent: 'center' }}>
        //                         <View style={{
        //                             height: 40, width: '100%',
        //                             borderRightColor: "#4b1f21",
        //                             borderRightWidth: 1
        //                         }}>
        //                             <View style={{
        //                                 alignItems: 'center',
        //                                 height: 40,
        //                                 justifyContent: 'space-between'
        //                             }}>
        //                                 <Text style={styles.headingText}>{item.num1}</Text>
        //                                 <Text style={styles.rankText}>{"World Rank"}</Text>
        //                             </View>
        //                         </View>

        //                     </View>
        //                     <View style={{ height: 100, width: "33%", alignItems: 'center', justifyContent: 'center' }}>
        //                         <View style={{
        //                             height: 40, width: '100%',
        //                             borderRightColor: "#4b1f21",

        //                             borderRightWidth: 1
        //                         }}>
        //                             <View style={{
        //                                 alignItems: 'center',
        //                                 height: 40,
        //                                 justifyContent: 'space-between'
        //                             }}>
        //                                 <Text style={styles.headingText}>{item.num2}</Text>
        //                                 <Text style={styles.rankText}>{"Country Rank"}</Text>
        //                             </View>
        //                         </View>
        //                     </View>
        //                     {/* <View style={{ height: 100, width: "33%", alignItems: 'center', justifyContent: 'center' }}>
        //                         <View style={{ height: 50, width: '100%', }}>
        //                             <View style={{
        //                                 alignItems: 'center',
        //                                 height: 40,
        //                                 justifyContent: 'space-between'
        //                             }}>
        //                                 <Text style={styles.headingText}>{item.num3}</Text>
        //                                 <Text style={styles.rankText}>{item.r3}</Text>
        //                             </View>
        //                         </View>
        //                     </View> */}
        //                 </View>
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        //         : index === 1 ? <ImageBackground
        //             resizeMode='contain'
        //             source={img1} style={{ height: 100, }}>
        //             {/* <Text style={{fontFamily:style.SemiBold,
        //                         fontSize:16,
        //                         color:'#fff',paddingLeft:16,top:8}}>Classic</Text> */}

        //             <TouchableOpacity style={[styles.card, { paddingTop: 10 }]}>
        //                 <View style={{
        //                     height: 100,
        //                     flexDirection: 'row',
        //                     width: '100%'
        //                 }}>
        //                     <View style={{ height: 100, width: "25%", alignItems: 'center', justifyContent: 'center' }}>

        //                         <View style={{
        //                             height: 40, width: '100%',
        //                             borderRightColor: '#ff9c64',
        //                             // backgroundColor: 'blue',
        //                             borderRightWidth: 1,
        //                         }}>
        //                             <View style={{
        //                                 // alignItems: 'center',
        //                                 paddingLeft: 25,
        //                                 height: 40,
        //                                 justifyContent: 'space-between'
        //                             }}>
        //                                 <Text style={styles.headingText}>{item.num1}</Text>
        //                                 <Text style={styles.rankText}>{"Total"}</Text>
        //                             </View>
        //                         </View>

        //                     </View>
        //                     <View style={{
        //                         height: 100,
        //                         width: "25%", alignItems: 'center',
        //                         justifyContent: 'center'
        //                     }}>
        //                         <View style={{
        //                             height: 40,
        //                             width: '100%',
        //                             borderLeftColor: '#dc3000',
        //                             borderLeftWidth: 1

        //                         }}>
        //                             <View style={{
        //                                 alignItems: 'center',
        //                                 height: 40,
        //                                 justifyContent: 'space-between'
        //                             }}>
        //                                 <Text style={styles.headingText}>{item.num2}</Text>
        //                                 <Text style={styles.rankText}>{"Win"}</Text>
        //                             </View>
        //                         </View>
        //                     </View>
        //                     <View style={{
        //                         height: 100, width: "48%",
        //                         flexDirection: 'row',
        //                         alignItems: 'center',
        //                     }}>
        //                         <View style={{ height: 40, width: '48%', }}>
        //                             <View style={{
        //                                 paddingLeft: 25,
        //                                 height: 40,
        //                                 borderLeftWidth: 1,
        //                                 borderLeftColor: '#dc3000',
        //                                 width: 100,
        //                                 justifyContent: 'space-between'
        //                             }}>
        //                                 <Text style={styles.headingText}>{item.num3}</Text>
        //                                 <Text style={styles.rankText}>{"Win rate"}</Text>
        //                             </View>
        //                         </View>

        //                         <View style={{
        //                             position: 'absolute',
        //                             height: 40,
        //                             borderLeftWidth: 1,
        //                             borderLeftColor: '#ff9c64'
        //                         }}>
        //                             <View style={{ height: 40, width: '48%', }}>
        //                                 <View style={{
        //                                     paddingLeft: 25,
        //                                     height: 40,
        //                                     borderLeftWidth: 1,
        //                                     borderLeftColor: '#dc3000',
        //                                     // backgroundColor:,
        //                                     width: 100,
        //                                     justifyContent: 'space-between'
        //                                 }}>
        //                                     {/* <Text style={styles.headingText}>{item.num3}</Text> */}
        //                                     {/* <Text>{item.r3}</Text> */}
        //                                 </View>
        //                             </View>
        //                         </View>
        //                     </View>
        //                 </View>
        //             </TouchableOpacity>
        //             <Text style={{
        //                 fontFamily: style.SemiBold,
        //                 fontSize: 16,
        //                 position: 'absolute',
        //                 top: 6,
        //                 color: '#fff', paddingLeft: 24,
        //             }}>Classic</Text>
        //         </ImageBackground> : <ImageBackground
        //             resizeMode='contain'
        //             source={img3} style={{ height: 100 }}>
        //             <TouchableOpacity style={[styles.card, { paddingTop: 10 }]}>
        //                 <View style={{
        //                     height: 100,
        //                     flexDirection: 'row',
        //                     width: '100%'
        //                 }}>
        //                     <View style={{ height: 100, width: "25%", alignItems: 'center', justifyContent: 'center' }}>

        //                         <View style={{
        //                             height: 40, width: '100%',
        //                             borderRightColor: '#e23e86',
        //                             // backgroundColor: 'blue',
        //                             borderRightWidth: 1,
        //                         }}>
        //                             <View style={{
        //                                 // alignItems: 'center',
        //                                 paddingLeft: 25,
        //                                 height: 40,
        //                                 justifyContent: 'space-between'
        //                             }}>
        //                                 <Text style={styles.headingText}>{item.num1}</Text>
        //                                 <Text style={styles.rankText}>{item.r1}</Text>
        //                             </View>
        //                         </View>

        //                     </View>
        //                     <View style={{
        //                         height: 100,
        //                         width: "25%", alignItems: 'center',
        //                         justifyContent: 'center'
        //                     }}>
        //                         <View style={{
        //                             height: 40,
        //                             width: '100%',
        //                             borderLeftColor: '#77003d',
        //                             borderLeftWidth: 1

        //                         }}>
        //                             <View style={{
        //                                 alignItems: 'center',
        //                                 height: 40,
        //                                 justifyContent: 'space-between'
        //                             }}>
        //                                 <Text style={styles.headingText}>{item.num2}</Text>
        //                                 <Text style={styles.rankText}>{item.r2}</Text>
        //                             </View>
        //                         </View>
        //                     </View>
        //                     <View style={{
        //                         height: 100, width: "48%",
        //                         flexDirection: 'row',
        //                         alignItems: 'center',
        //                     }}>
        //                         <View style={{ height: 40, width: '48%', }}>
        //                             <View style={{
        //                                 paddingLeft: 25,
        //                                 height: 40,
        //                                 borderLeftWidth: 1,
        //                                 borderLeftColor: '#77003d',
        //                                 width: 100,
        //                                 justifyContent: 'space-between'
        //                             }}>
        //                                 <Text style={styles.headingText}>{item.num3}</Text>
        //                                 <Text style={styles.rankText}>{item.r3}</Text>
        //                             </View>
        //                         </View>

        //                         <View style={{
        //                             position: 'absolute',
        //                             height: 40,
        //                             borderLeftWidth: 1,
        //                             borderLeftColor: '#e23e86'
        //                         }}>
        //                             <View style={{ height: 40, width: '48%', }}>
        //                                 <View style={{
        //                                     paddingLeft: 25,
        //                                     height: 40,
        //                                     borderLeftWidth: 1,
        //                                     borderLeftColor: '#77003d',
        //                                     // backgroundColor:,
        //                                     // width: 100,
        //                                     justifyContent: 'space-between'
        //                                 }}>
        //                                     {/* <Text style={styles.headingText}>{item.num3}</Text> */}
        //                                     {/* <Text style={styles.rankText}>{item.r3}</Text> */}
        //                                 </View>
        //                             </View>
        //                         </View>
        //                     </View>
        //                 </View>
        //             </TouchableOpacity>
        //             <Text style={{
        //                 fontFamily: style.SemiBold,
        //                 fontSize: 16,
        //                 position: 'absolute',
        //                 top: 6,
        //                 color: '#fff', paddingLeft: 24,
        //             }}>Player 1 on 1</Text>

        //         </ImageBackground>}

        // </View>
    )
}

export default LooserComp

const styles = StyleSheet.create({

    cardParent: {
        height: 100, backgroundColor: 'red',
        justifyContent: 'space-between',
        borderRadius: 10,
        flexDirection: "row"
    },
    headingText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: style.SemiBold
    },
    rankText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: style.Medium
    },
    profileText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: style.SemiBold
    },
    img: {
        width: '100%',
        height: 100,
        justifyContent: 'center'
        // resizeMode: 'contain'
    },
    userImg: {
        height: 50, width: 50, borderRadius: 50
    },
    bacView: {
        height: 35,
        alignItems: 'center',
        justifyContent: "center",
        width: 35, borderRadius: 20, backgroundColor: '#fff'
    },
    card: {
        height: 90,
        // margin: 10,
        width: '100%',
        borderRadius: 15,
        // borderWidth: 1,
        borderColor: '#979797',
        flexDirection: 'row'
    },
    calendarView: {
        height: 80, width: "25%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textstyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: style.Bold
    },
    dates: {
        height: 65, width: 65,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: style.yellow, borderRadius: 10
    },
    curencyView: {
        height: 80, width: "75%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})