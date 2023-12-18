import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import WiningComp from '../../../../Components/WiningComp'
const bgImg = require("../../../../Assets/bg1.png")
import IconRemove from 'react-native-vector-icons/Entypo'
import Button from '../../../../Components/Button'
import { style } from '../../../../Constants'
const CongratesScreen = ({ route, navigation }) => {
  const { congrat, etitle, leagueStatus } = route.params;
  const [check, setcheck] = useState(true)

  return (
    <ImageBackground source={bgImg} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Tab")} style={styles.bacView}>
        <IconRemove name='circle-with-cross' color={"white"} size={32} />
      </TouchableOpacity>
      <WiningComp
        etitle={etitle}
        leagueStatus={leagueStatus}
        rematch={true} congrat={congrat} navigation={navigation} />
      <View style={{ justifyContent: 'center', paddingBottom: 20 }}>
        {etitle && leagueStatus != '1' ? <Button title={"Go to Next Round"}
          textstyle={{
            color: style.yellow
          }}
          btnstyle={styles.btn} /> :check &&  leagueStatus == "1" ?
          <Button title={"Rematch"}
          onPress={()=>setcheck(false)}
            textstyle={{
              color: style.yellow
            }}
            btnstyle={styles.btn} /> : null}
      </View>
    </ImageBackground>
  )
}

export default CongratesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: null,
    borderWidth: 1,
    borderColor: style.yellow

  },
  bacView: {
    margin: 10,
    height: 35,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: "center",
    width: 35, borderRadius: 20,
  }
})