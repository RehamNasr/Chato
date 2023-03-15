
import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import * as Const from '../constant/Const'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import uuid from 'react-native-uuid'
const { height, width } = Dimensions.get("window");
import database from '@react-native-firebase/database'
import { AuthContext } from '../CreateContext';
import { useDispatch } from 'react-redux';
import { setuser } from '../Redux/Actions/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  const Dispath = useDispatch();
  const [inform, setInforma] = useState({
    id: uuid.v4(),
    name: "",
    email: "",
    pass: "",
    about: "",
    image: "https://i.pinimg.com/564x/8f/a7/cd/8fa7cd28afff93e45b664f19b12f5864.jpg"
  })
  setuserdata = async (obj) => {
    await AsyncStorage.setItem("userData", JSON.stringify(obj));
  }
  Register = async () => {
    let obj = { ...inform }
    let errorname = "";
    let erroremail = "";
    let errorpass = "";
    let count = 0;


    // name
    if (obj.name.length < 4) {
      errorname = "invalid name";
      count++;
    } else {
      errorname = ""
    }
    // email
    if (obj.email.trim() === "") {
      erroremail = "you should enter an email ";
      count++;
    } else if (!obj.email.includes("@") || !obj.email.includes(".")) {
      erroremail = "invalid email";
      count++;
    } else if (
      obj.email.indexOf("@") + 1 == obj.email.lastIndexOf(".") ||
      obj.email.lastIndexOf(".") < obj.email.indexOf("@")
    ) {
      erroremail = "invalid email";
      count++;
    } else if (
      !obj.email.includes("gmail.com") &&
      !obj.email.includes("yahoo.com") &&
      !obj.email.includes("facebook.com")
    ) {
      erroremail = "invalid email";
      count++;
    } else {
      erroremail = "";
    }
    // pass
    if (obj.pass < 6) {
      errorpass = "password must be more than six numbers"
      count++;
    } else {
      errorpass = ""
    }

    if (count == 0) {

      database()
        .ref('/users/')
        .orderByChild('email').
        equalTo(obj.email)
        .once('value')
        .then(snapshot => {
          if (snapshot.val() != null) {
            ToastAndroid.show("Email already used ", ToastAndroid.SHORT)
            return false;
          }
          database()
            .ref('/users/' + obj.id)
            .set(obj)
            .then(() => {
              setuserdata(inform)
              Dispath({
                type: setuser,
                payload: inform
              })
              setInforma({
                id: uuid.v4(),
                name: "",
                email: "",
                pass: "",
                about: "",
                image: "https://i.pinimg.com/564x/8f/a7/cd/8fa7cd28afff93e45b664f19b12f5864.jpg"
              })
              login()
              navigation.navigate("AppStack")
            })
        });
    } else {
      let error = ""
      if (errorname != "")
        error += errorname + "\n"
      if (erroremail != "")
        error += erroremail + "\n"
      if (errorpass != "")
        error += errorpass

      ToastAndroid.show(error, ToastAndroid.SHORT)

    }
  };

  return (
    <>
      <View style={styles.Container}>
        <View style={styles.headerbox}>
          <Image source={require('../images/logoss.png')}
            style={styles.image}
          />

        </View>

        <View style={styles.box2}>
          <Text style={styles.text1}>Register</Text>
          <Text style={styles.text2}>
            in order to Register your account please fill out all fields
          </Text>

          <View style={styles.inputview}>
            <View style={styles.iconview}>
              <EvilIcons name="envelope" size={20} color={"#fff"}
              />
            </View>
            <TextInput
              style={styles.textinput}
              placeholder={"Enter Full Name"}
              value={inform.name}
              placeholderTextColor="#aaa"
              onChangeText={(value) => {
                let obj = { ...inform }
                obj.name = value
                setInforma(obj)
              }}
            >

            </TextInput>
          </View>
          <View style={styles.inputview}>
            <View style={styles.iconview}>
              <EvilIcons name="envelope" size={20} color={"#fff"}
              />
            </View>
            <TextInput
              style={styles.textinput}
              placeholder={"Enter Email"}
              placeholderTextColor="#aaa"
              keyboardType={"email-address"}
              value={inform.email}
              onChangeText={(value) => {
                let obj = { ...inform }
                obj.email = value
                setInforma(obj)
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
              value={inform.pass}
              onChangeText={(value) => {
                let obj = { ...inform }
                obj.pass = value
                setInforma(obj)
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
              placeholder={"Enter about"}
              placeholderTextColor="#aaa"
              value={inform.about}
              onChangeText={(value) => {
                let obj = { ...inform }
                obj.about = value
                setInforma(obj)
              }}
            >

            </TextInput>
          </View>
          <TouchableOpacity style={styles.stylebutton}
            onPress={() => {
              // navigation.navigate("AppStack")
              // showToast()
              Register()
            }}

          >
            <Text style={styles.textbutton}>Register Now</Text>
          </TouchableOpacity>


          <View style={styles.lastview}>
            <Text style={styles.textnew}>
              Existing User?
            </Text>
            <TouchableOpacity
              onPress={() => {

                navigation.goBack()

              }}

            >
              <Text style={styles.textregister}> Login Now</Text>
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
    height: height * .6,
    width: width * .9,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    marginTop: height * .05,
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
    color: Const.first_color
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


