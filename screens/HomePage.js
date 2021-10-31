import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import TopPage from "../components/home/TopPage";
import Orders from "./Orders";
import Icon from "react-native-vector-icons/Ionicons";
import PastOrders from "./PastOrders";
import AccountSettings from "./AccountSettings";
import { PrimaryColor, SecondaryColor } from "../Colors";
import { ActivityIndicator } from "react-native";

const Tab = createMaterialBottomTabNavigator();

function MyTabs({ navigation }) {
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
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Meals"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="fast-food-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Past Orders"
        component={PastOrders}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="calendar-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={AccountSettings}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="cog-outline"
              color={color}
              selectionColor={"red"}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Growth"
        component={AccountSettings}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="cog-outline"
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

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      ...this.props.profile,
    };
  }

  render() {
    const {
      restaurant_name,
      _id,
      owner_name,
      phone,
      email,
      locality,
      city,
      state,
      country,
      postal_code,
      status,
      about,
      cuisine_type,
      documents,
      meals,
      plan,
      bank_info,
      login,
    } = this.state;
    if (login) {
      return (null
        // <NavigationContainer>
        //   <MyTabs
        //     restaurant_name={restaurant_name}
        //     city={city}
        //     id={_id}
        //     details={{
        //       restaurant_name: restaurant_name,
        //       owner_name: owner_name,
        //       phone: phone,
        //       email: email,
        //       status: status,
        //       locality: locality,
        //       cuisine_type: cuisine_type,
        //       city: city,
        //       state: state,
        //       country: country,
        //       postal_code: postal_code,
        //       about: about,
        //     }}
        //     documents={documents}
        //     meals={meals}
        //     bank_info={bank_info}
        //     plan={plan}
        //   />
        // </NavigationContainer>
      );
    } else {
      return <ActivityIndicator />;
    }
  }
}
