
import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    
} from 'react-native';
import LottieView from 'lottie-react-native';
import * as Const from '../constant/Const'
const { height, width } = Dimensions.get("window");

export default function Splash() {


    return (


        <View style={styles.Container}>

            {/* <LottieView
                source={require("../images/logo2.json")}
                size={10}
                style={{
                    height: height * .4,
                    width: width * .9,
                    alignSelf: "center",
                
                }}
                autoPlay
            /> */}
            <Image
                style={{
                    height: height * .2,
                    width: width * .5,
                    backgroundColor:"#fff"
                }}
                source={require("../images/logoo.png")}
            >



            </Image>



        </View>

    )
}



const styles = StyleSheet.create({
    Container: {
        height: height,
        width: width,
        backgroundColor: "#fff",
        // justifyContent:"space-around",
        alignItems: "center",
        justifyContent: "center",
    },

});


