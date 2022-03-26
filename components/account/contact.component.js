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
      <View style={{ alignItems: "center", flexDirection: "row", margin: 8, }}>
        <Icon name="mail-sharp" color="#444" size={24} style={{ paddingVertical: 2 }} />
        <View>
          <Text style={{ fontSize: 18, color: "#444", paddingVertical: 2, textAlignVertical: "top" }}>  Contact Us
          </Text>
          <Text
            style={[
              styles.label,
              { fontSize: 12, color: "#777",marginTop:-2 },
            ]}
          >   Help & Support
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
