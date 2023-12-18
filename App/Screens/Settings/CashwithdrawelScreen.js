import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import Subheader from '../../Components/Subheader'
const bgImg = require("../../Assets/bgg.png")
import {useSelector} from 'react-redux'
import { style } from '../../Constants'
import WithdrawlComp from '../../Components/WithdrawlComp'
import { _showcashRequest } from '../../Utils/Apis'
import Loader from '../../Components/Loader'
const CashwithdrawelScreen = ({ navigation }) => {
    const { user } = useSelector(({ appReducer }) => appReducer);
    const [cashes,setcashes] = useState([])
    const [Loading,setLoading] = useState(false)

    const apiToken = user.token
  
    useEffect(() => {
        getWithdrawls();
    }, [])



    const getWithdrawls = () => {
        setLoading(true)
        _showcashRequest(apiToken).then((responce) => {
            setLoading(false)
            setcashes(responce.cash_request)
        }).catch((error) => {
            setLoading(false)
            console.log("Erro", error)
        })
    }
    return (
        <ImageBackground source={bgImg} style={styles.container}>
            {Loading && <Loader />}
            <View style={{ padding: 6, marginTop: '5%' }}>
                <Subheader title={"Cash Withdrawl Requests"} onPress={()=>navigation.goBack()} />
                <View style={{ marginTop: '7%' }}>
                    <FlatList
                        data={cashes}
                        renderItem={({ item }) => {
                            return (
                                <WithdrawlComp item={item} navigation={navigation} />
                            )
                        }}
                    />

                </View>
            </View>


        </ImageBackground>
    )
}

export default CashwithdrawelScreen

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
        fontSize: 14,
        color: "#fff",
        fontFamily: style.SemiBold
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