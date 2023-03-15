import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../home/Home';
import Search from '../home/Search';
import Chat from '../home/Chat'
import Profile from '../home/Profile'
const Stack_Home = createNativeStackNavigator();
import { Store } from '../Redux/Store';
import { Provider } from 'react-redux';
export default function AppStack() {
    return (
        <Provider store={Store}>
            <Stack_Home.Navigator>
                <Stack_Home.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack_Home.Screen name="Search" component={Search} options={{ headerShown: false }} />
                <Stack_Home.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                <Stack_Home.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            </Stack_Home.Navigator>
        </Provider>
    );
}

