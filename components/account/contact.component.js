import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./account.styles";

export default function ContactUs({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate("contacts")}
    >
      <View>
        <Text style={{ fontSize: 18, color: "#444", margin: 8,paddingVertical:2 }}>
          <Icon name="mail-sharp" color="#444" size={24} />  Contact Us
        </Text>
        <Text
          style={[
            styles.label,
            { fontSize: 12, color: "#777", marginLeft: 34, marginTop: -10 },
          ]}
        >   Help & Support
        </Text>
      </View>
    </TouchableOpacity>
  );
}
