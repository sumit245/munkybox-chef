import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ContactUs({ navigation }) {
  return (
    <>
      <View style={styles.row}>
        <TouchableOpacity
          style={{ flexDirection: "row", paddingVertical: 4 }}
          onPress={() => navigation.navigate("Signup")}
        >
          <Icon
            name="mail-sharp"
            color="#444"
            size={24}
            style={{ margin: 5 }}
          />
          <View style={{ paddingHorizontal: 2 }}>
            <Text style={{ fontSize: 18, color: "#444" }}>Contact Us</Text>
            <Text style={{ fontSize: 12, color: "#777" }}>Help & Support</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  row: {
    width: "98%",
    marginHorizontal: "1%",
    borderBottomWidth: 1,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    backgroundColor: "#FFF",
    padding: 2,
    justifyContent: "space-between",
  },
});
