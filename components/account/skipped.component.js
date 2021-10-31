import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./account.styles";

export default function Skipped({ navigation }) {
  return (
    <>
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate("Signup")}
      >
        <View>
          <Text style={{ fontSize: 18, color: "#444", margin: 8 }}>
            <Icon name="swap-vertical" color="#444" size={20} /> Skipped Meals
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
