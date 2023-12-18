import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { style } from '../Constants'
import Icon from 'react-native-vector-icons/MaterialIcons'
const WithdrawlComp = ({ navigation,item }) => {
    return (
        <View style={{flex:1}}>
            <View style={{ height: 80, backgroundColor: style.white, opacity: .1,margin: 10, }}>
            </View>
            <View style={{ position: 'absolute', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.navigate("RequestDetail",{item:item})} style={styles.card}>
                    <View style={styles.calendarView}>
                        <View style={styles.dates}>
                            <Text style={[styles.textstyle, { color: '#000',width:50,textAlign:'center' }]}>{item.cash_request_date}</Text>
                            {/* <Text style={styles.textstyle, { color: '#000',fontSize:14,fontFamily:style.SemiBold }}>Oct</Text> */}
                        </View>
                    </View>
                    <View style={styles.curencyView}>
                        <View style={{height:40,justifyContent:'space-between'}}>
                            <Text style={[styles.textstyle,{fontFamily:style.SemiBold,fontSize:16}]}>USD {item.cash}</Text>
                            <Text style={[styles.textstyle, { fontFamily: style.Medium,fontSize:12 }]}>{item.joined} Joined | 3 Pending</Text>
                        </View>
                        <View>
                            <Icon name={"arrow-forward-ios"} color={style.btnColor} size={20} style={{marginRight:8}}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
  
    )
}

export default WithdrawlComp

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        height: 80,
        margin: 10,
        borderRadius: 5,
        borderWidth: 1,
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