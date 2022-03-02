import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

export default function Policy() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "tnc",
      title: "T&C",
      content:
        'The following terms and conditions, together with any referenced documents (collectively, "Terms of Use") form a legal agreement between you and your employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).',
    },
    {
      key: "privacy",
      title: "Privacy",
      content:
        "A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data.",
    },
    {
      key: "return",
      title: "Return Policy",
      content:
        "Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.",
    },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      style={{
        marginBottom: 8,
      }}
      tabStyle={{ backgroundColor: "#000" }}
      indicatorStyle={{ backgroundColor: "#dddd44" }}
    />
  );
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "tnc":
        return (
          <View style={{ marginHorizontal: 4 }}>
            <Text style={{ textAlign: "justify" }}>{route.content}</Text>
          </View>
        );
      case "privacy":
        return (
          <View style={{ marginHorizontal: 4 }}>
            <Text style={{ textAlign: "justify" }}>{route.content}</Text>
          </View>
        );
      case "return":
        return (
          <View style={{ marginHorizontal: 4 }}>
            <Text style={{ textAlign: "justify" }}>{route.content}</Text>
          </View>
        );
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        lazy
        swipeEnabled
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}
