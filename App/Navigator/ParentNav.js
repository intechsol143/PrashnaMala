// In App.js in a new project

import React, { Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNav from './AuthNav';
import TabNav from './TabNav';
import WiningScreen from '../Screens/Appscreens/Tabs/Home/WiningScreen';
import Questionscreen from '../Screens/Appscreens/Tabs/Home/Questionscreen';
import Rematchscreen from '../Screens/Appscreens/Tabs/Home/Rematchscreen';
import CongratesScreen from '../Screens/Appscreens/Tabs/Home/CongratesScreen';
import LooserProfile from '../Screens/Appscreens/Tabs/Home/LooserProfile';
import Settingsscreen from '../Screens/Settings/Settingsscreen';
import CashwithdrawelScreen from '../Screens/Settings/CashwithdrawelScreen';
import RequestDetail from '../Screens/Settings/RequestDetail';
import Pendingscreen from '../Screens/Settings/Pendingscreen';
import Claimscreen from '../Screens/Appscreens/Tabs/Home/Claimscreen';
import Tournaments from '../Screens/Appscreens/Tabs/Home/Tournaments';
import TotalFriend from '../Screens/Appscreens/Tabs/Home/TotalFriend';
import Editprofile from '../Screens/Appscreens/Tabs/Home/Editprofile';
import Privacypolicy from '../Screens/Settings/Privacypolicy';
import Termsscreen from '../Screens/Settings/Termsscreen';
import SelectDificulty from '../Screens/Appscreens/Tabs/Home/SelectDificulty';
// import SelectCity from '../Screens/Appscreens/Tabs/Home/SelectCity';
import SelectCity from '../Screens/Appscreens/Tabs/Home/Classic/CityScreen'
import UserCongratulation from '../Screens/Appscreens/Tabs/Home/UserCongratulation';
import OOpscreens from '../Screens/Appscreens/Tabs/Home/OOpscreens';
import Bankdetailscreen from '../Screens/Appscreens/Tabs/Home/Bankdetailscreen';
import Milestone from '../Screens/Appscreens/Tabs/Home/Milestone';
import RoundCount from '../Screens/Appscreens/Tabs/Home/RoundCount';
import SelectGame from '../Screens/Appscreens/Tabs/Home/Leagues/SelectGame';
import { useSelector } from 'react-redux'
import LeagueLoss from '../Screens/Appscreens/Tabs/Home/Leagues/LeagueLoss';
import LeagueWin from '../Screens/Appscreens/Tabs/Home/Leagues/LeagueWin';
import LeagueRematch from '../Screens/Appscreens/Tabs/Home/Leagues/LeagueRematch';
import { navigationRef } from '../config/RootNavigationservice';
const Stack = createNativeStackNavigator();

function ParentNav() {
    const { user } = useSelector(({ appReducer }) => appReducer);

    const linking = {
        // https://prashnamala.page.link
        prefixes: [
            'Prashnamaala://',
            'https://prashnamala.page',
            'https://*.prashnamala.com'],
        config: {
            screens: {
                Login: {
                    path: 'InitialScreens'
                },

            },
        },
    };
    // const linking = {
    //     prefixes: [

    //     ],
    //     config: {
    //       screens: {
    //         UserTab: '*',
    //         Detail: 'InitialScreens/:item/',
    //       },
    //     },
    //   };
    const leftToRightAnimation = {
        cardStyleInterpolator: ({ current, layouts }) => {

            return {
                cardStyle: {
                    transform: [
                        {
                            translateX: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-layouts.screen.width, 1],
                            }),
                        },
                    ],
                },
            };
        },
    };
    return (
        <NavigationContainer linking={linking} ref={navigationRef}>
            <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }}>
                <Fragment>
                    {!user ? <Stack.Screen name="Auth" component={AuthNav} />
                        : <Fragment>
                            <Stack.Screen name="Tab" component={TabNav} />
                            <Stack.Screen name="WiningScreen" component={WiningScreen} />

                            <Stack.Screen name="Questionscreen" component={Questionscreen}
                                options={{
                                    headerShown: false,
                                    // presentation: 'modal',
                                    // animationTypeForReplace: "pop",
                                    // animation: 'slide_from_right'

                                }}

                            />
                            <Stack.Screen name="Rematchscreen" component={Rematchscreen} />
                            <Stack.Screen name="CongratesScreen" component={CongratesScreen} />
                            <Stack.Screen name="LooserProfile" component={LooserProfile} />
                            <Stack.Screen name="Settingsscreen" component={Settingsscreen} />
                            <Stack.Screen name="CashwithdrawlScreen" component={CashwithdrawelScreen} />
                            <Stack.Screen name="RequestDetail" component={RequestDetail} />
                            <Stack.Screen name="Pendingscreen" component={Pendingscreen} />
                            <Stack.Screen name="Claimscreen" component={Claimscreen} />
                            <Stack.Screen name="Tournament" component={Tournaments} />
                            <Stack.Screen name="TotalFriend" component={TotalFriend} />
                            <Stack.Screen name="Editprofile" component={Editprofile} />
                            <Stack.Screen name="Privacypolicy" component={Privacypolicy} />
                            <Stack.Screen name="Terms" component={Termsscreen} />
                            <Stack.Screen name="SelectDificulty" component={SelectDificulty} />
                            <Stack.Screen name="SelectCity" component={SelectCity}
                             options={{
                                headerShown: false,
                                presentation: 'modal',
                                animationTypeForReplace: 'pop',
                                animation: 'slide_from_right',
                            }} 
                            />
                            <Stack.Screen name="UserCongratulation" component={UserCongratulation} />
                            <Stack.Screen name="OOpscreens" component={OOpscreens} />
                            <Stack.Screen name="Bankdetailscreen" component={Bankdetailscreen} />
                            <Stack.Screen name="Milestone" component={Milestone} />
                            <Stack.Screen name="RoundCount" component={RoundCount} />
                            <Stack.Screen name="SelectGame" component={SelectGame} />
                            <Stack.Screen name="LeagueLoss" component={LeagueLoss} />
                            <Stack.Screen name="LeagueWin" component={LeagueWin} />
                            <Stack.Screen name="LeagueRematch" component={LeagueRematch} />
                        </Fragment>}
                </Fragment>


            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ParentNav;