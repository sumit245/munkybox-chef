import React from "react";
import { Platform, SafeAreaView, StatusBar } from "react-native";
// import LinearGradient  from "react-native-linear-gradient";
import Header from "../header/Header";
import PromoCard from "./PromoCard";
import { LinearGradient } from "expo-linear-gradient";

export default function Growth({ navigation }) {
  const trackAds = () => {
    navigation.navigate("trackcampaign", {
      title: "Campaigns",
      notcoupon: true,
    });
  };
  const viewAds = () => {
    return null; //insert here
  };
  const trackCoupon = () => {
    navigation.navigate("track", {
      title: "Coupons",
      notcoupon: false,
    });
  };
  const setCoupon = () => {
    navigation.navigate("selectpromo");
  };
  const setBanner = () => {
    navigation.navigate("select_banner");
  };
  return (
    <SafeAreaView style={{ flex: 1, marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
      <LinearGradient colors={["#ff8800", "#ff6600"]} style={{ flex: 1 }} end={{ x: 0.1, y: 0.9 }}  >
        <Header title={"Growth"} />
        <PromoCard
          index={0}
          title="Advertise your brands"
          icon="megaphone-outline"
          head="Ads"
          subhead="High visibility driven business growth"
          ok="VIEW PACKS"
          cancel="TRACK PERFORMANCE"
          cancelHandler={trackAds}
          okHandler={setBanner}
        />
        <PromoCard
          index={0}
          title="Give offers to customers "
          icon="ios-cash-outline"
          head="Promo Discount"
          subhead="Increase orders, average order values & target specific customer segments"
          cancel="TRACK PERFORMANCE"
          ok="VIEW PACKS"
          cancelHandler={trackCoupon}
          okHandler={setCoupon}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}
