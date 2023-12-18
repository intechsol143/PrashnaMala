import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Line = ({lineHeight}) => {
    return (
        <View>
            <View style={{
                height: lineHeight,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: 'grey',
                 width: '100%'
            }}>
                <View style={{
                    height: lineHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '45%'
                }}>
                    <View style={{ height: lineHeight, width: .5, backgroundColor: 'red' }} />
                </View>
                <View style={{ height: lineHeight,
                     width: '45%' }}>
                    <View style={{
                        height: lineHeight,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <View style={{ height: lineHeight, width: .5, backgroundColor: 'red' }} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Line

const styles = StyleSheet.create({})