import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import {
  PrimaryDark,
  SecondaryLightColor,
  WHITE,
  SecondaryColor,
  SecondaryDarkColor,
  DARKGRAY,
} from "../../Colors";
import { styles } from "../campaign/campaign.styles";
import Ants from "react-native-vector-icons/FontAwesome5";
import { TabView, TabBar } from "react-native-tab-view";
import StatCards from "./StatCards";

export default function Dashboard() {
  const layout = useWindowDimensions();

  const restaurant = useSelector((state) => state.restaurant);
  const { restaurant_name, city, restaurant_id } = restaurant;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Weekly" },
    { key: "second", title: "Monthly" },
    { key: "third", title: "yearly" },
  ]);

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
        return <StatCards />;

      case "second":
        return <View style={{ backgroundColor: "blue" }} />;
      case "third":
        return <View style={{ backgroundColor: "green" }} />;

      default:
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PrimaryDark }}>
      <Header title={restaurant_name + ", " + city} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 8,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              borderRadius: 15,
              backgroundColor: "#226ccf",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ants name="star" size={34} color={SecondaryLightColor} />
          </TouchableOpacity>
          <Text style={styles.smallText}>Customer Rating</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              borderRadius: 15,
              backgroundColor: "#226ccfcc",
              //   opacity: 0.2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ants name="wallet" size={34} color={SecondaryLightColor} />
          </TouchableOpacity>
          <Text style={styles.smallText}>Payouts & Finance</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              borderRadius: 15,
              backgroundColor: "#226ccf",
              //   opacity: 0.2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ants name="history" size={34} color={SecondaryLightColor} />
          </TouchableOpacity>
          <Text style={styles.smallText}>Past Orders</Text>
        </View>
      </View>
      <View style={{ marginHorizontal: 4, padding: 4, marginVertical: 4 }}>
        <Text style={{ color: WHITE, fontWeight: "bold" }}>
          Business Overview
        </Text>
        <Text style={{ color: WHITE, fontSize: 12 }}>
          Aggregated view of your business across all orders{" "}
        </Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
}
