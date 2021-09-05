import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Logout({ navigation }) {
  const logout = () => {
    AsyncStorage.multiRemove(["credential", "restaurant"], (err) => {
      if (err) {
        console.log(err);
      } else {
        navigation.replace("Login");
      }
    });
  };
  return (
    <TouchableOpacity style={styles.row} onPress={() => logout()}>
      <Icon name="power-outline" color="#777" size={28} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  row: {
    width: "98%",
    marginHorizontal: "1%",
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 2,
    justifyContent: "center",
  },
});
