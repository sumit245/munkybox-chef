import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../../styles/headerstyle";

export default function HeaderwithBack(props) {
  return (
    <View
      style={[styles.header, { backgroundColor: "#ddd", flexDirection: "row" }]}
    >
      <Icon name="chevron-back" size={24} color="#226ccf" />
      <Text style={[styles.title, { color: "#226ccf", textAlign: "center" }]}>
        {props.title}
      </Text>
    </View>
  );
}
