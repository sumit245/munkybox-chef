import React from "react";
import AuthRoutes from "./routes/AuthRoutes";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AuthRoutes />
      </Provider>
    </NavigationContainer>
  );
}