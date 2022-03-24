import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { WHITE } from "../../Colors";
import { styles } from "../../styles/headerstyle";

export default function HeaderTwo({ title, navigation, children }) {
  return (
    <View
      style={[styles.header,{flexDirection:"row"}]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: "4%" }}>

        <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
          height: 28,
          width: 28,
          marginHorizontal: 4,
          borderRadius: 14,
        }}>
          <TouchableOpacity

            onPress={() => {
              navigation.goBack()
            }}
          >
            <Icon name="chevron-back-sharp" size={28} color="#ffffff" />
          </TouchableOpacity>
        </LinearGradient>
        <Text
          style={{
            marginLeft: 6,
            color: "#000",
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
