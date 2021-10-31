import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./account.styles";

export default function CouponComponent({ navigation }) {
  return (
    <>
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate("coupons")}
      >
        <View>
          <Text style={{ fontSize: 18, color: "#444", margin: 8 }}>
            <Icon name="pricetags-outline" color="#444" size={20} /> Promote
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
