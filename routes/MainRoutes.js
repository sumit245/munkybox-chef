import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import TopPage from "../components/home/TopPage";
import PastOrders from "../screens/PastOrders";
import Orders from "../screens/Orders";
import { ActivityIndicator } from "react-native";
import { PrimaryColor, SecondaryColor } from "../Colors";
import AccountSettings from "../screens/AccountSettings";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();
export default function MainRoutes({
  navigation,
  restaurant_name,
  city,
  id,
  details,
  documents,
  meals,
  plan,
  bank_info,
}) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={PrimaryColor}
      inactiveColor={SecondaryColor}
      barStyle={{
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <Tab.Screen
        name="Home"
        component={TopPage}
        initialParams={{ restaurant_name, city }}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="home-outline"
              color={color}
              selectionColor={"red"}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Meals"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="fast-food-outline"
              color={color}
              selectionColor={"red"}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Past Orders"
        component={PastOrders}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="today-outline"
              color={color}
              selectionColor={"red"}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="More"
        component={AccountSettings}
        initialParams={{ id: id, details, documents, meals, plan, bank_info }}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="grid-outline"
              color={color}
              selectionColor={"red"}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}