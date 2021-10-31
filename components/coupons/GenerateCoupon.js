import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Header from "../header/Header";
import Icon from "react-native-vector-icons/Ionicons";
import { DARKGRAY, SecondaryLightColor, WHITE } from "../../Colors";
import { Divider } from "react-native-paper";
import DropDown from "./DropDown";
import CouponForm from "./CouponForm";

export default function GenerateCoupon() {
  const [isCoupon, setCoupon] = useState(false);

  const handlerFcn = (el) => {
    setCoupon(el);
  };
  const bannerHandler = (el) => {
    setCoupon(!el);
  };
  return (
    <SafeAreaView>
      <Header title="Promotions" />
      <DropDown styles={styles} text="COUPONS" handlerFcn={handlerFcn} />
      <Collapsible collapsed={isCoupon}>
        <CouponForm />
      </Collapsible>
      <Divider />
      <DropDown styles={styles} text="BANNER" handlerFcn={bannerHandler} />
      {/* <View style={styles.headerMenu}>
        <Text style={styles.headerText}>Banner</Text>
        <TouchableOpacity onPress={() => setCoupon(!isCoupon)}>
          <Icon
            name={!isCoupon ? "chevron-up-sharp" : "chevron-down-sharp"}
            size={22}
            color={WHITE}
          />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  menu: {
    marginHorizontal: 2,
    marginVertical: 4,
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 4,
  },
  mealDescription: {
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 4,
    color: DARKGRAY,
  },
  headerMenu: {
    backgroundColor: SecondaryLightColor,
    padding: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: WHITE,
    textTransform: "uppercase",
  },
  headerCount: {
    fontSize: 14,
    color: WHITE,
    fontWeight: "bold",
  },
  headerMenuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 2,
  },
});
