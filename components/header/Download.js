import React from "react";
import { TouchableOpacity, Alert, View } from "react-native";
import { SecondaryColor } from "../../Colors";
import Icon from "react-native-vector-icons/Entypo";

export default function Download({ navigation }) {
  return (
    <TouchableOpacity style={{ flexDirection: "row" }}>
      <Icon name="export" size={26} color={SecondaryColor} />
    </TouchableOpacity>
  );
}
