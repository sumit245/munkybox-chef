import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./account.styles";

export default function NotificationRow({ navigation }) {
  return (
    <>
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate("notifications")}
      >
        <View>
          <Text style={{ fontSize: 18, color: "#444", margin: 8, paddingVertical: 2 }}>
            <Icon name="notifications-outline" color="#444" size={24} style={{ paddingVertical: 2 }} />  Notification
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
