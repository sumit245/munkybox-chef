import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Profile from "../components/account/profile.component";
import BankAccount from "../components/account/bankaccount.component";
import ContactUs from "../components/account/contact.component";
import Plans from "../components/account/plan.component";
import Logout from "../components/account/logout.component";
import Reviews from "../components/account/reviews.component";
import Addmeals from "../components/account/Addmeals";

export default function AccountSettings({ navigation }) {

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: "#fff" }}>
      <Profile />
      <BankAccount />
      <Plans />
      <Addmeals/>
      <Reviews navigation={navigation} />
      <ContactUs navigation={navigation} />
      <Logout navigation={navigation} />
    </ScrollView>
  );
}
