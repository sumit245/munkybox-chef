import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./account.styles";

export default function Skipped({ navigation }) {
  return (
    <>
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate("policies")}
      >
        <View>
          <Text style={{ fontSize: 18, color: "#444", margin: 8, paddingVertical: 2, textAlignVertical: "center" }}>
            <Icon name="information-circle-outline" color="#444" size={24} style={{ paddingVertical: 2 }} />  About us
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
