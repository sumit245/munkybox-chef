import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity
      style={{ alignSelf: "flex-start", padding: 10 }}
      onPress={goBack}
    >
      <Icon name="chevron-back" size={34} color="#FBECEC" />
    </TouchableOpacity>
  );
}
