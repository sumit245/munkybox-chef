import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import {
  PrimaryDark,
  SecondaryLightColor,
  WHITE,
  SecondaryColor,
} from "../../Colors";
import { styles } from "../campaign/campaign.styles";
import Ants from "react-native-vector-icons/FontAwesome5";
import { TabView, TabBar } from "react-native-tab-view";
import StatCards from "./StatCards";
import axios from "axios";

export default function Dashboard({ navigation }) {
  const layout = useWindowDimensions();
  const [activecount, setActiveCount] = useState(0);
  const [completecount, setCompleteCount] = useState(0);
  const [cancelledcount, setCancelledCount] = useState(0);
  const [notstarted, setNotStarted] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [menuvisits, setMenuVisit] = useState(0);
  const [commission, setCommission] = useState("");
  const [cartconversion, setCartConversion] = useState(0);
  const [visits, setvisits] = useState(0);
  const [acceptanceRate, setAcceptanceRate] = useState(0);
  const [rejectedRate, setRejectedRate] = useState(0);
  const [dashboard, setDashboard] = useState({});
  const restaurant = useSelector((state) => state.restaurant);
  const { restaurant_name, city, restaurant_id } = restaurant;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Weekly" },
    { key: "second", title: "Monthly" },
    { key: "third", title: "yearly" },
  ]);
  const [newUser, setnewUser] = useState(0);
  const [repeatedUser, setrepeatedUser] = useState(0);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{ backgroundColor: PrimaryDark, marginHorizontal: 4 }}
      indicatorStyle={{ backgroundColor: SecondaryColor }}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <StatCards
            active={activecount}
            complete={completecount}
            cancel={cancelledcount}
            notstarted={notstarted}
            menuvisits={menuvisits}
            commission={commission}
            rejected={rejected}
            newUser={newUser}
            dashboard={dashboard}
            repeatedUser={repeatedUser}
            cartconversion={cartconversion}
            visits={visits}
          />
        );

      case "second":
        return <View style={{ backgroundColor: "blue" }} />;
      case "third":
        return <View style={{ backgroundColor: "green" }} />;

      default:
        break;
    }
  };

  const fetchOrders = async (restaurant) => {
    const res = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/orders/active/" + restaurant
    );
    const { count } = res.data;

    setActiveCount(count);
  };
  const fetchcompletedorders = async (restaurant) => {
    const res = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/orders/completed/" + restaurant
    );
    const { count } = res.data;

    setCompleteCount(count);
  };
  const fetchcancelledcount = async (restaurant) => {
    const res = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/orders/cancelled/" + restaurant
    );
    const { count } = res.data;
    setCancelledCount(count);
  };
  const fetchStats = async (restaurant) => {
    const res = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/orders/dashboard/" + restaurant
    );
    const dashboard = res.data;
    setDashboard(dashboard);
  };
  const fetchCommission = async () => {
    const resp = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/checkout"
    );
    const { commission } = resp.data.data[0];
    setCommission(commission);
  };
  const fetchRejectedcount = async (restaurant) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/orders/rejected/" + restaurant
    );
    const { count } = response.data;
    setRejected(count);
  };
  const fetchNotStartedcount = async (restaurant) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/orders/accepted/" + restaurant
    );
    const { count } = response.data;
    setNotStarted(count);
  };
  const getuserByType = async (restaurant) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/chefdashboard/getusertypesbyrestaurant/" +
        restaurant
    );
    const { newusers, repeatedUsers } = response.data;

    setnewUser(newusers);
    setrepeatedUser(repeatedUsers);
  };
  const fetchVisit = async (restaurant) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/chefdashboard/" + restaurant
    );
    const { totalOrders, orders, accptanceRate, rectanceRate, dashboard } =
      response.data;
    const { menuvisits, cartVisit } = dashboard;
    setCartConversion(totalOrders);
    setMenuVisit(menuvisits);
    setvisits(cartVisit);
    setAcceptanceRate(accptanceRate);
    setRejectedRate(rectanceRate);
  };
  useEffect(() => {
    fetchCommission();
  }, [commission]);
  useEffect(() => {
    fetchOrders(restaurant_name);
    fetchcompletedorders(restaurant_name);
    fetchcancelledcount(restaurant_name);
    fetchVisit(restaurant_id);
    fetchRejectedcount(restaurant_name);
    fetchNotStartedcount(restaurant_name);
    fetchStats(restaurant_name);
    getuserByType(restaurant_name);
  }, [restaurant_name, restaurant_id]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: PrimaryDark,
      }}
    >
      <Header title={restaurant_name + ", " + city} />
      <ScrollView>
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
              onPress={() => navigation.navigate("review_order")}
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
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("myOrders")}
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
          style={{ minHeight: 480 }}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{ width: layout.width }}
        />

        <View
          style={{
            backgroundColor: WHITE,
            marginVertical: 4,
            borderRadius: 4,
            marginHorizontal: 2,
            padding: 2,
          }}
        >
          <Text
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 16,
              padding: 6,
            }}
          >
            Performance this month
          </Text>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: WHITE,
              padding: 2,
            }}
          >
            <View style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}>
              <Text
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 22,
                  textAlign: "center",
                }}
              >
                {acceptanceRate || 0}%
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                accept rate
              </Text>
            </View>
            <View style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 22,
                  textAlign: "center",
                }}
              >
                {rejectedRate || 0}%
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                reject rate
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
