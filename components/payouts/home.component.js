import { View, Text, SafeAreaView, useWindowDimensions } from "react-native";
import React from "react";
import Header from "../header/Header";
import { TabView, TabBar } from "react-native-tab-view";
import {
  PrimaryColor,
  SecondaryColor,
  PrimaryDark,
  PrimaryLight,
} from "../../Colors";
import CurrentPayout from "./CurrentPayout";
import PastPayouts from "./PastPayouts";
const PayoutHome = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Current Payout" },
    { key: "second", title: "Past Payout" },
  ]);
  const [payhistory, setPayHistory] = React.useState([]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{ backgroundColor: PrimaryDark }}
      indicatorStyle={{ backgroundColor: SecondaryColor }}
    />
  );
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <CurrentPayout
            current_cycle="1st Feb - 15th Feb"
            payout_date="17th Feb"
            revenue="0"
            orders="0"
            navigation={navigation}
          />
        );
      case "second":
        return <PastPayouts payouts={payhistory} navigation={navigation} />;

      default:
        break;
    }
  };

  return (
    <SafeAreaView>
      <Header title="Payouts & Finance" />
      {/* <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}> */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        style={{ minHeight: 480 }}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

export default PayoutHome;
