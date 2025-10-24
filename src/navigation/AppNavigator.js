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

import StudentListScreen from '../screens/studentListScreen';
import StudentAddScreen from '../screens/studentAddScreen';
import StudentUpdateScreen from '../screens/studentUpdateScreen';

import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login Mahasiswa' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Daftar Akun' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Beranda' }} />
        <Stack.Screen name="Activation" component={ActivationScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="DataKamera" component={DataCameraScreen} />

        <Stack.Screen
          name="StudentList"
          component={StudentListScreen}
          options={{ title: 'Data Mahasiswa' }}
        />
        <Stack.Screen
          name="StudentAdd"
          component={StudentAddScreen}
          options={{ title: 'Tambah Mahasiswa' }}
        />
        <Stack.Screen
          name="StudentUpdate"
          component={StudentUpdateScreen}
          options={{ title: 'Edit Mahasiswa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
