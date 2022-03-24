import React from "react";
import { Text } from 'react-native'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import TopPage from "../components/home/TopPage";
import Orders from "../screens/Orders";
import { PrimaryColor, SecondaryLightColor } from "../Colors";
import AccountSettings from "../screens/AccountSettings";
import Growth from "../components/campaign/Growth";
import Dashboard from "../components/business/Dashboard";

const Tab = createMaterialBottomTabNavigator();
export default function MainRoutes({
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
      activeColor="#ff6600"
      inactiveColor="#ff9900"
      barStyle={{
        backgroundColor: "white",
        justifyContent: "flex-start",
        fontWeight: "bold",
      }}
      tabBarOptions={{ labelStyle: { fontWeight: "bold" } }}
    >
      <Tab.Screen
        name="Home"
        component={TopPage}
        initialParams={{ restaurant_name, city }}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" color={color} size={24} />
          ),
          tabBarLabel: (
            <Text style={{ fontWeight: "bold", color: "#ff6600" }}>Home</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Business"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="stats-chart-outline" color={color} size={24} />
          ),
          tabBarLabel: (
            <Text style={{ fontWeight: "bold", color: "#ff6600" }}>Business</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="fast-food-outline" color={color} size={24} />
          ),
          tabBarLabel: (
            <Text style={{ fontWeight: "bold", color: "#ff6600" }}>Orders</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Growth"
        component={Growth}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="easel-outline" color={color} size={24} />
          ),
          tabBarLabel: (
            <Text style={{ fontWeight: "bold", color: "#ff6600" }}>Growth</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={AccountSettings}
        initialParams={{ id: id, details, documents, meals, plan, bank_info }}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cog-outline" color={color} size={24} />
          ),
          tabBarLabel: (
            <Text style={{ fontWeight: "bold", color: "#ff6600" }}>Setting</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
