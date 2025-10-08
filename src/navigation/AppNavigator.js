import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ActivationScreen from "../screens/ActivationScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DataCameraScreen from "../screens/DataCameraScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login Mahasiswa' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Daftar Akun' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Beranda' }} />
        <Stack.Screen name="Activation" component={ActivationScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="DataKamera" component={DataCameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
