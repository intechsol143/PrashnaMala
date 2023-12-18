import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { style } from '../Constants';


function CustomTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    // if (focusedOptions.tabBarVisible === false) {
    //     return null;
    // }

    return (
        <ImageBackground
            source={require("../Assets/tab.png")}

            style={styler.tabs}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <View
                        source={require("../Assets/tab.png")}

                        style={{
                            flex: 1,
                        }}
                    >


                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            activeOpacity={1}
                            onLongPress={onLongPress}
                            style={{
                                minHeight: 60,

                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image source={label.img}
                                style={[styler.imgstyle, { tintColor: isFocused ? style.btnColor : style.grey }]}
                            />
                            {/* {label.name === "1" ? <View style={styler.badge}>
                                <Text style={{ color: 'white', bottom: 2 }}>2</Text>
                            </View> : null} */}
                        </TouchableOpacity>
                    </View>
                );
            })}
        </ImageBackground>
    );
}

export default CustomTabBar;

const styler = StyleSheet.create({
    imgstyle: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    badge: {
        height: 15,
        position: 'absolute',
        bottom: 10,
        top: 10,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        left: 50,
        width: 15, borderRadius: 20, backgroundColor: style.btnColor
    },
    tabs: {
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderTopColor: 'black',
        // bottom: 15,
        // left: 20,
        // right: 20,
        flexDirection: 'row',
        zIndex: 1000,
        // elevation: 2,
        // borderRadius: 20,
        backgroundColor: "black",
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15,
        overflow: "hidden",
    },

})