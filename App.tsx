
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    FlatList
} from 'react-native';
// import * as Const from '../constant/Const'
// import Ionicons from 'react-native-vector-icons/Ionicons'
const { height, width } = Dimensions.get("window");

export default function Search({ navigation }) {
  



    // search = (value) => {
    //     setAllUser(allUserBackup.filter((it) => it.name.match(value)))
    // }
   
  
    return (
        <>
            <StatusBar backgroundColor={Const.first_color} />
<View>
            
            </View>

               
            
        </>
    )
}



const styles = StyleSheet.create({
     Container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center"
    }, header: {
        height: height * .09,
        width: width,
        paddingHorizontal: width * .02,
        backgroundColor: "#fff",
        alignItems: "center",
        flexDirection: "row",
        elevation: 5,
        margin:1
    },
  
  

});


