import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Appscreens/Tabs/Home/Index'
import Friends from '../Screens/Appscreens/Tabs/Friends/Index'
import Shop from '../Screens/Appscreens/Tabs/Shop/index'
import LeaderBoard from '../Screens/Appscreens/Tabs/LeaderBoard/Index'

import CustomTabBar from '../Components/Tabbar';


const Tab = createBottomTabNavigator();

export default function TabNav() {

  return (
    <Tab.Navigator
      tabBar={(props) =>
        <CustomTabBar {...props} />
      }

      screenOptions={{
        headerShown:false
      }}

    >
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: { name: "", img: require("../Assets/home.png") }

        }}
      />

      <Tab.Screen name="Shop" component={Shop}
        options={{
          tabBarLabel: { name: "1", img: require("../Assets/store.png") }

        }}
      />
      <Tab.Screen name="Friends" component={Friends}
        options={{
          tabBarLabel: { name: "", img: require("../Assets/people.png") }

        }}
      />
      <Tab.Screen name="LeaderBoard" component={LeaderBoard}
        options={{
          tabBarLabel: { name: "", img: require("../Assets/graph.png") }

        }}
      />
    </Tab.Navigator>

  );
}

const styler = StyleSheet.create({
  imgstyle: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  }
})