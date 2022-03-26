import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./account.styles";

export default function Addmeals({ navigation }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => navigation.navigate("add_meals")}>
        <Text style={{ fontSize: 18, color: "#444", margin: 8,paddingVertical:2 }}>
          <Icon name="fast-food-outline" color="#444" size={24} />  Meals
        </Text>
      </TouchableOpacity>
    </View>
  );
}
