import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthRoutes from "./routes/AuthRoutes";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import restaurantReducer from "./store/reducers/reducer";

const loginReducer = combineReducers({
  restaurant: restaurantReducer,
});
const store = createStore(loginReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AuthRoutes />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
