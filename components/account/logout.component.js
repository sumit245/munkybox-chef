import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

export default function Logout({ navigation }) {
  const logout = () => {
    navigation.replace("Login");
  };
  return (
    <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 12,
      marginHorizontal:"36%"
    }}>
      <TouchableOpacity
        onPress={logout}
      >
        <Icon name="power-sharp" color={"#fff"} size={28} brand />
      </TouchableOpacity>
    </LinearGradient>
  );
}

