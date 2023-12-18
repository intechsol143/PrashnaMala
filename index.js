
import React, { useEffect } from 'react';
import { AppRegistry, View, SafeAreaView } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { navigate, navigate2 } from './App/config/RootNavigationservice'
import dynamicLinks from '@react-native-firebase/dynamic-links'
import { Store } from './App/Redux/config/Index'
import { SetRefCode } from './App/Redux/actions/appactions/Index';
const Application = () => {

    const handleDynamicLink = link => {
        const res = Store.getState()
        const codeExtraction = link.url
        const refer_code = codeExtraction.split("//")[1].split('/')[1]
        console.log("My refer code",refer_code)
        // if (res.appReducer.user.userdata.refer_code == "") {
            Store.dispatch(SetRefCode(refer_code))
        // }
    }


    useEffect(() => {
        const unsubscribe = dynamicLinks()
            .getInitialLink()
            .then(link => {
                handleDynamicLink(link)
            });
        return () => unsubscribe();
    }, []);
    return (

        <View style={{ flex: 1 }}>
            <App />
        </View>

    )
}


AppRegistry.registerComponent(appName, () => Application);

