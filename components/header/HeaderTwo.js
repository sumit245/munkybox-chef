import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { WHITE } from "../../Colors";

export default function HeaderTwo({ title, navigation, children }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 8,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>

        <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
          height: 28,
          width: 28,
          marginHorizontal: 4,
          borderRadius: 14,
        }}>
          <TouchableOpacity

            onPress={() => {
              Actions.pop();
            }}
          >
            <Icon name="chevron-back-sharp" size={28} color="#ffffff" />
          </TouchableOpacity>
        </LinearGradient>
        <Text
          style={{
            marginLeft: 6,
            color: WHITE,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}
