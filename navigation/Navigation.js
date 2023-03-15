import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Stack_Auth from './AuthStack'
import AppStack from './AppStack'
import * as Const from '../constant/Const'
import { AuthContext } from '../CreateContext';
import { Provider } from 'react-redux';
import { Store } from '../Redux/Store';
import Splash from '../register/Splash'
const Stack = createNativeStackNavigator();
export default function Navigation() {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [showsplashscrenn, setShowsplashscreen] = useState(true);
    const login = () => {
        setIsLoading(true);
        setUserToken('login');
        AsyncStorage.setItem("userToken", 'login');
        setIsLoading(false);
    }

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem("userToken");
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem("userToken");
            setUserToken(userToken);
            setIsLoading(false);
        } catch (e) {
            console.log('islogged in error ${e}')
        }
    }

    useEffect(() => {
        isLoggedIn();
        setTimeout(() => {
            setShowsplashscreen(false)
        }, 400);
    }, []);


    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
                <ActivityIndicator size={"large"} color={Const.first_color}></ActivityIndicator>
            </View>
        );

    }

    
    return (
        <>
            <Provider store={Store}>
                <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>

                    <NavigationContainer>

                        <Stack.Navigator>
                            {
                                showsplashscrenn ?
                                    (
                                        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                                    ) :
                                    null
                            }


                            {userToken == null ?
                                <Stack.Screen name="Stack_Auth" component={Stack_Auth} options={{ headerShown: false }} />
                                :
                                <Stack.Screen name="AppStack" component={AppStack} options={{ headerShown: false }} />

                            }
                        </Stack.Navigator>
                    </NavigationContainer>
                </AuthContext.Provider>
            </Provider>
        </>
    )
}
