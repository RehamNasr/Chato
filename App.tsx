
import React,{useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as Const from './constant/Const'
import Search from './home/Search';
const{height,width}=Dimensions.get("window");
import Navigation from './navigation/Navigation';
// import Chat from './home/Chat'
import {Provider} from 'react-redux'
import  {Store}  from './Redux/Store';
import Splash from './register/Splash';
export default function App(){
   
  return(
    <>
    <Provider store={Store}>
    <Navigation/>
         {/* <Splash/> */}
    </Provider>
    </>

  )
}


