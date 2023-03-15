

import React, { useState, useContext } from 'react';
import {
 
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StatusBar
} from 'react-native';
import * as Const from '../constant/Const'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Foundation from 'react-native-vector-icons/Foundation'
const { height, width } = Dimensions.get("window");
import database from '@react-native-firebase/database'
import { AuthContext } from '../CreateContext';
import { useDispatch, useSelector } from 'react-redux';
import { setuser } from '../Redux/Actions/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login({ navigation }) {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const Dispath = useDispatch();
  const { login } = useContext(AuthContext);
  setuserdata = async (obj) => {
    await AsyncStorage.setItem("userData", JSON.stringify(obj));
  }
  logintest = () => {
    database()
      .ref('/users/')
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() == null) {
          ToastAndroid.show("Invalid Email ", ToastAndroid.SHORT)
          return false;
        }

        let usedata = Object.values(snapshot.val())[0];
        if (usedata.pass != pass) {
          ToastAndroid.show("Invalid pass ", ToastAndroid.SHORT)
          return false
        }
        setuserdata(usedata)
        Dispath({
          type:setuser,
          payload:usedata
        })
        login()
        navigation.navigate("AppStack")

      })

  }

  return (
    <>
    
      <View style={styles.Container}>
      <StatusBar backgroundColor={Const.first_color}/>
        <View style={styles.headerbox}>
          <Image source={require('../images/logoss.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.box2}>
          <Text style={styles.text1}>Login</Text>
          <Text style={styles.text2}>
            in order to login your account please enter credentials
          </Text>

          <View style={styles.inputview}>
            <View style={styles.iconview}>
              <EvilIcons name="envelope" size={20} color={"#fff"}
              />
            </View>
            <TextInput
              style={styles.textinput}
              placeholder={"Enter Email"}
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={(value) => {
                setEmail(value)
              }}
            >

            </TextInput>
          </View>
          <View style={styles.inputview}>
            <View style={styles.iconview}>
              <Foundation name="key" color={"#fff"} />
            </View>
            <TextInput
              style={styles.textinput}
              placeholder={"Enter password"}
              placeholderTextColor="#aaa"
              value={pass}
              onChangeText={(value) => {
                setPass(value)
              }}
            >

            </TextInput>
          </View>
          <TouchableOpacity style={styles.stylebutton}
            onPress={() => {
              // navigation.navigate("AppStack")
              logintest()

            }}

          >
            <Text style={styles.textbutton}>Login Now</Text>
          </TouchableOpacity>


          <View style={styles.lastview}>
            <Text style={styles.textnew}>
              New User?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register")
              }}
            >
              <Text style={styles.textregister}> Register Now</Text>
            </TouchableOpacity>
          </View>


        </View>
      </View>
    </>
  )
}



const styles = StyleSheet.create({
  Container: {
    height: height,
    width: width,
    backgroundColor: "#fff",
    // justifyContent:"space-around",
    alignItems: "center"
  },
  headerbox: {
    height: height * .3,
    width: width,
    backgroundColor: Const.first_color,
    alignItems: "center",
    justifyContent: "center",
    // borderBottomEndRadius: 5,
    // borderBottomLeftRadius: 5
  },
  image: {
    height: height * .13,
    width: width * .4,
    borderRadius: 200
  },
  text: {
    fontSize: 15,
    color: "#fff",
    marginTop: height * .02,
    fontFamily: "Almarai-ExtraBold"
  },
  box2: {
    height: height * .45,
    width: width * .9,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    marginTop: height * .1,
    alignItems: "center"
  },
  text1: {
    fontSize: 15,
    marginVertical: height * .02,
    fontFamily: "Almarai-ExtraBold",
    color: "#000"
  }, text2: {
    textAlign: "center",
    color: "#aaa",
    fontFamily: "Almarai-Regular",
    fontSize: 12,
    width: width * .6

  },
  inputview: {
    height: height * .06,
    width: width * .8,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: "row",
    // padding:1,
    elevation: 1,
    backgroundColor: "#fff"

  },
  iconview: {
    height: height * .06,
    width: width * .15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Const.first_color,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20
  },
  textinput: {
    height: height * .06,
    width: width * .634,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    fontSize: 12,
    fontFamily: "Almarai-Regular",
    marginLeft: 5,
    color:Const.first_color
  },
  stylebutton: {
    height: height * .06,
    width: width * .8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Const.first_color,
    borderRadius: 20
  },
  textbutton: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Almarai-ExtraBold"

  },
  lastview: {
    flexDirection: "row",
    marginTop: height * .02
  }, textnew: {
    color: "#aaa",
    marginRight: 1
  }, textregister: {
    color: "#000",
    textDecorationLine: "underline",
    fontFamily: "Almarai-ExtraBold",
    fontSize: 11,
    color: Const.first_color,


  }
});


