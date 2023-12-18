import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { style } from '../Constants'
const PendingComp = ({ item}) => {
    return (
        <View style={styles.userView}>
            <View style={styles.userViewSubparent}>
                <View>
                    <Image source={{ uri: item.image }} style={{ height: 40, width: 40, borderRadius: 50 }} />
                </View>
                <View style={{ marginLeft: 10 }}>
                <Text style={styles.txt}>{item.name}</Text>
                    {/* <Text style={styles.txt}>{item.name} <Text style={{ color: idx === 5 || idx === 6 ? style.btnColor : style.green, fontSize: 12 }}> {!pending ? '\u2B24' : null}</Text></Text> */}
                </View>
            </View>
            <View>
                <View style={{
                    width: 90,
                    height: 40,
                    // opacity: .2,
                    margin: 10,
                    borderRadius: 25,
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor: style.green
                }}>
                    <Text style={{
                        fontSize: 12,
                        color: 'white',
                        fontFamily: style.SemiBold,
                        color:'white'
                    }}>{"Joined"}</Text> 
                    {/* <Text style={{
                        fontSize: 12,
                        color: 'white',
                        fontFamily: style.SemiBold,
                        color: idx === 5 || idx === 6 ? "#979797" : idx === 1 ? "grey" : 'white'
                    }}>{pending ? "Pending" : "Challenge"}</Text> */}
                </View>
            

            </View>
        
        </View>
    )
}

export default PendingComp

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container2: {
        paddingTop: 20,
        paddingHorizontal: 10
    },
    btnNewstyle: {
        width: 90,
        height: 40,
        backgroundColor: style.green
    },
    subcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userView: {
        flexDirection: 'row',
        marginTop: '5%',
        alignItems: 'center', justifyContent: 'space-between'
    },
    txt: {
        color: '#fff',
        fontSize: 14,
        fontFamily: style.SemiBold
    },
    userViewSubparent: { flexDirection: 'row', alignItems: 'center' }
})