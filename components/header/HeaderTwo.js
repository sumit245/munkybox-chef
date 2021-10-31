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
        <Icon
          name="chevron-back"
          size={20}
          color={WHITE}
          style={{ marginRight: 4 }}
          onPress={() => navigation.goBack()}
        />
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
