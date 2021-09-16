import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/auth/login.component";
import Signup from "../components/auth/signup.component";
import MainRoutes from "./MainRoutes";
import PinPage from "../components/auth/pin.component";
import OtpComponent from "../components/auth/otp.component";
import PastOrders from "../screens/PastOrders";
import OrderDetails from "../components/pastorders/OrderDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function AuthRoutes({ navigation }) {
  const [entry, setEntry] = useState(true);
  const [readyState, setReadyState] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("credential")
      .then((res) => {
        let data = JSON.parse(res);
        const { entry, pin } = data;
        setEntry(entry);
        setReadyState(true);
      })
      .catch((err) => {
        setReadyState(true);
      });
  }, [entry]);
  if (readyState) {
    return (
      <Stack.Navigator
        initialRouteName={entry ? "Login" : "Pin"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Pin">
          {(props) => <PinPage {...props} entry={entry} />}
        </Stack.Screen>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OTP">
          {(props) => <OtpComponent {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="myOrders" component={PastOrders} />
        <Stack.Screen name="orderDetails" component={OrderDetails} />
        <Stack.Screen name="Main" component={MainRoutes} />
      </Stack.Navigator>
    );
  } else {
    return null;
  }
}
