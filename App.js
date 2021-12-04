import React, { useEffect } from "react";
import AuthRoutes from "./routes/AuthRoutes";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {
  // useEff6476412
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AuthRoutes />
      </Provider>
    </NavigationContainer>
  );
}
