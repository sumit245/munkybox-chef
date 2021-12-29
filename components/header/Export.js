import React from "react";
import { TouchableOpacity, Alert, View } from "react-native";
import { SecondaryColor } from "../../Colors";
import Icon from "react-native-vector-icons/Ionicons";

export default function Export({ navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Icon name="options-outline" size={26} color={SecondaryColor} />
    </View>
  );
}
