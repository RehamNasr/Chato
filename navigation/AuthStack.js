import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator,TransitionPresets  } from '@react-navigation/native-stack';
import Login from '../register/Login';
import Register from '../register/Register'
import { Provider } from 'react-redux';
import { Store } from '../Redux/Store';

const Stack_Auth = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Provider store={Store}>
    <Stack_Auth.Navigator
   
    >
      <Stack_Auth.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack_Auth.Screen name="Register" component={Register} options={{ headerShown: false }}/>
    </Stack_Auth.Navigator>
    </Provider>

  );
}
0