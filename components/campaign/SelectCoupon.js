import React from "react";
import { Alert, SafeAreaView } from "react-native";
import PromoCard from "./PromoCard";
import HeaderTwo from "../header/HeaderTwo";
import { LinearGradient } from "expo-linear-gradient";

export default function SelectCoupon({ navigation }) {
  const onTypeSelected = (type) => {
    if (type === "per") {
      Alert.alert("Alert", "This promotion category coming soon")
    } else {

      navigation.navigate("create_coupon", { title: "% Discount", type: type });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#ff8800", "#ff6600"]} style={{ flex: 1 }} end={{ x: 0.1, y: 0.9 }}>
        <HeaderTwo title="Select Promotion" navigation={navigation} />
        <PromoCard
          title="What type of promotion is it?"
          icon="shopping-sale"
          head="% Discount (Coming Soon *)"
          subhead="Increasing order volumes, Increasing average order value."
          ok="SELECT"
          okHandler={() => onTypeSelected("per")}
        />
        <PromoCard
          icon="ios-logo-usd"
          head="Net Discount"
          subhead="Increasing order volumes, Increasing average order value"
          ok="SELECT"
          okHandler={() => onTypeSelected("net")}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}
