import React, { useState } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import AboutUs from "../about/AboutUs"
import Terms from "../about/Terms"
import { LinearGradient } from "expo-linear-gradient";
import Header from "../header/Header";
import Icon from "react-native-vector-icons/Ionicons";
import HeaderTwo from "../header/HeaderTwo";


export default function Policy({ navigation }) {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {
      key: "tnc",
      title: "Terms & Conditions",
    },
    {
      key: "privacy",
      title: "Privacy",
    },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        marginBottom: 8,
        backgroundColor: "transparent",
      }}
      activeColor="#ff6600"
      labelStyle={{ fontWeight: "bold" }}
      inactiveColor="#272727"
      indicatorStyle={{ backgroundColor: "#ff9900", marginHorizontal: 12 }}
    />
  );
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "tnc":
        return <Terms />
      case "privacy":
        return (
          <AboutUs />
        );
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderTwo title="About us"/>
      {/* <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", width: "100%", paddingHorizontal: 4, alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
            height: 28,
            width: 28,
            marginHorizontal: 4,
            borderRadius: 14,
          }}>
            <TouchableOpacity
              style={{ alignItems: "center", justifyContent: "center" }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-back" size={24} color="#ffffff" />
            </TouchableOpacity>
          </LinearGradient>
          <Header
            title="About" navigation={navigation}
          />
        </View>
      </View> */}

      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}
