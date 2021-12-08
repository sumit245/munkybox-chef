import React, { Component } from "react";
import { TouchableOpacity, Alert, View } from "react-native";
import { SecondaryColor } from "../../Colors";
import Icon from "react-native-vector-icons/Ionicons";
import ToggleLunchDinner from "./ToggleLunchDinner";

export default function Export({ navigation }) {
  const ExportData = () => {
    return null;
  };
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-sharp" color="#22ccfc" size={24} />
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={ExportData}>
          <Icon name="download-outline" size={26} color={SecondaryColor} />
        </TouchableOpacity>
        <Icon name="options-outline" size={26} color={SecondaryColor} />
      </View>
    </View>
  );
}
