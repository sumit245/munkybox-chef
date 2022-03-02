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
            <Icon name="md-document-text-outline" color="#444" size={20} /> About us
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
