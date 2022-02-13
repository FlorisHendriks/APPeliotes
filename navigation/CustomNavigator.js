import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
//import Settings from "../screens/Settings";
//import ChangeCity from "../screens/ChangeCity";
//import ChangePassword from "../screens/ChangePassword";
//import ChangeUserType from "../screens/ChangeUserType";
//import Event from "../screens/Event";
import { theme } from "../core/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//import CreateEvent from "../screens/CreateEvent";
import TabOneScreen from "../screens/TabOneScreen"
import TabTwoScreen from "../screens/TabTwoScreen"
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.headerText,
          fontSize: "20",
        },
        headerTintColor: theme.colors.primary,
        headerTitleAlign: "left",
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
    
  );
};

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.main },
        headerTintColor: theme.colors.headerText,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        // options={{ headerShown: false }}
        name="Settings"
        component={Settings}
        options={{ tabBarLabel: "Settings" }}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        name="ChangeCity"
        component={ChangeCity}
        options={{ title: "Change Location" }}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: "Change Password" }}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        name="ChangeUserType"
        component={ChangeUserType}
        options={{ title: "Change User Type" }}
      />
    </Stack.Navigator>
  );
};

const CustomNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: theme.colors.main,
          tabBarStyle: {
            paddingHorizontal: 8,
            borderRadius: 20,
            paddingVertical: 8,
            borderColor: theme.colors.main,
            borderWidth: 5,
          },
          //   headerTitle: () => (
          //     <MaterialCommunityIcons
          //       name="checkerboard"
          //       color={"#fff"}
          //       size={28}
          //     />
          //   ),
          headerTitle: "GameLot",
          headerStyle: {
            backgroundColor: theme.colors.main,
          },
          headerTintColor: theme.colors.headerText,
          headerRight: () => (
            <MaterialCommunityIcons
              name="bell"
              color={"#fff"}
              size={28}
              onPress={() => {
                // Do something
              }}
              style={{ marginRight: 12 }}
            />
          ),
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Create Event"
          component={TabOneScreen}
          //   options={({ route }) => ({ title: route.params.name })}
          options={{
            tabBarLabel: "Create Event",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="calendar-plus"
                  color={color}
                  size={size}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={TabTwoScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons name="cog" color={color} size={size} />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export { CustomNavigation };