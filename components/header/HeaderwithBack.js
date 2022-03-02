import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../../styles/headerstyle";

export default function HeaderwithBack(props) {
  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          height: 40,
        },
      ]}
    >
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Icon name="chevron-back" size={28} color="#226ccf" />
      </TouchableOpacity>
      <Text
        style={[
          styles.title,
          {
            color: "#000",
            textAlign: "center",
            fontSize: 20,
            marginLeft: "28%",
          },
        ]}
      >
        {props.title}
      </Text>
    </View>
  );
}
