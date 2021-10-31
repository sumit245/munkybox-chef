import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { PrimaryDark, WHITE } from "../../Colors";
import PromoCard from "./PromoCard";
import Icon from "react-native-vector-icons/Ionicons";
import HeaderTwo from "../header/HeaderTwo";

export default function SelectCoupon({ navigation }) {
  const onTypeSelected = (type) => {
    navigation.navigate("create_coupon", { title: "% Discount", type: type });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PrimaryDark }}>
      <HeaderTwo title="Select Promotion" navigation={navigation} />
      <PromoCard
        title="What type of promotion is it?"
        icon="shopping-sale"
        head="% Discount"
        subhead="Increasing order volumes, Increasing average order value"
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
    </SafeAreaView>
  );
}
