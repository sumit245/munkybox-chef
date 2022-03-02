import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import Profile from "../components/account/profile.component";
import BankAccount from "../components/account/bankaccount.component";
import ContactUs from "../components/account/contact.component";
import Plans from "../components/account/plan.component";
import Logout from "../components/account/logout.component";
import Addmeals from "../components/account/Addmeals";
import Skipped from "../components/account/skipped.component";
import AddDocument from "../components/account/adddocument.component";

export default function AccountSettings({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "#fff",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Profile />
          <BankAccount navigation={navigation} />
          <Plans />
          <Addmeals navigation={navigation} />
          <Skipped navigation={navigation} />
          <AddDocument navigation={navigation} />
          <ContactUs navigation={navigation} />
        </View>

        <Logout navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
