import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import Profile from "../components/account/profile.component";
import BankAccount from "../components/account/bankaccount.component";
import ContactUs from "../components/account/contact.component";
import Plans from "../components/account/plan.component";
import Logout from "../components/account/logout.component";
import Reviews from "../components/account/reviews.component";
import Addmeals from "../components/account/Addmeals";
import CouponComponent from "../components/account/coupon.component";
import Skipped from "../components/account/skipped.component";

export default function AccountSettings({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "#fff",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
        <Profile />
          <BankAccount />
          <Plans />
          <Addmeals navigation={navigation} />
          <Skipped navigation={navigation} />
          {/* <Reviews navigation={navigation} /> */}
          <ContactUs navigation={navigation} />
        </View>

        {/* <CouponComponent navigation={navigation} /> */}
        <Logout navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
