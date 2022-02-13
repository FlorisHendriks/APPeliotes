import { StatusBar } from "expo-status-bar";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Button, View } from "react-native";
import { Provider } from "react-native-paper";
import { theme } from "./core/theme";
import { useState } from "react";
import { CustomNavigation } from "./navigation/CustomNavigator";
import { initializeApp } from "firebase/app";
import { LogBox } from 'react-native';
import { useEffect } from "react";
import _ from 'lodash';
import { NavigationContainer, StackActions } from "@react-navigation/native";
import Login from "./screens/Login";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCPnQqT4C2pVk9tKmSfY6H3wBnrsEnA2y4",
    authDomain: "appeliotes.firebaseapp.com",
    projectId: "appeliotes",
    storageBucket: "appeliotes.appspot.com",
    messagingSenderId: "609374989286",
    appId: "1:609374989286:web:41f91a4aa7058d5cd5c427",
    measurementId: "G-WM29H9YXBB"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  const [isLoading, setIsLoading] = useState(true);
  
  const [userProfile, setUserProfile] = useState(null);

  const [userLogged, setUserLogged] = useState(false);

  const Stack = createStackNavigator();
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUserLogged(user ? true : false);
      setIsLoading(false);
      setUserProfile(user);
    });
  }, []);
return (
  <Provider theme={theme}>
   <NavigationContainer>
    <Stack.Navigator>
      {userLogged == false ? (
        <>
          <Stack.Screen name="Login Appeliotes" component={Login} />
        </>
      ) : (
        <>
          <Stack.Screen name="CustomNavigator" options={{headerShown: false,}}>
            {() => <CustomNavigation />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);
}