import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../../styles/headerstyle";

export default function HeaderwithBack(props) {
  return (
    <View
      style={[styles.header, { backgroundColor: "#fff", flexDirection: "row" }]}
    >
      <Icon name="chevron-back" size={28} color="#226ccf" />
      <Text
        style={[
          styles.title,
          {
            color: "#226ccf",
            textAlign: "center",
            fontSize: 28,
          },
        ]}
      >
        {props.title}
      </Text>
    </View>
  );
}
