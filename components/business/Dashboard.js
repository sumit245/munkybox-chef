import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  RefreshControl
} from "react-native";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import { WHITE } from "../../Colors";
import { styles } from "../campaign/campaign.styles";
import Ants from "react-native-vector-icons/FontAwesome5";
import { TabView, TabBar } from "react-native-tab-view";
import StatCards from "./StatCards";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

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
  const [totalAddOnRevenue, setTotalAddOnRevenue] = useState(0);
  const [totalAddOns, setTotalAddOns] = useState(0);
  const [campaignDue, setCampaignDue] = useState(0);
  const [refreshing, setRefreshing] = useState(false)
  const [routes] = React.useState([
    { key: "first", title: "Weekly" },
    { key: "second", title: "Monthly" },
    { key: "third", title: "yearly" },
  ]);
  const [newUser, setnewUser] = useState(0);
  const [repeatedUser, setrepeatedUser] = useState(0);


  function add(accumulator, a) {
    return parseFloat(accumulator) + parseFloat(a);
  }

  const fetchOrders = async (restaurant) => {
    const res = await axios.get(
      "http://54.146.133.108:5000/api/orders/active/" + restaurant
    );
    const { count } = res.data;
    if (count !== null) {
      setActiveCount(count);
    }
  };

  const fetchcompletedorders = async (restaurant) => {
    const res = await axios.get(
      "http://54.146.133.108:5000/api/orders/completed/" + restaurant
    );
    const { count } = res.data;
    if (count !== null) {
      setCompleteCount(count);
    }
  };

  const fetchcancelledcount = async (restaurant) => {
    const res = await axios.get(
      "http://54.146.133.108:5000/api/orders/cancelled/" + restaurant
    );
    const { count } = res.data;
    if (count !== null) {
      setCancelledCount(count);
    }
  };

  const fetchStats = async (restaurant) => {
    const res = await axios.get(
      "http://54.146.133.108:5000/api/orders/dashboard/" + restaurant
    );
    const dashboard = res.data;
    if (dashboard !== null) {
      setDashboard(dashboard);
    }
  };

  const fetchCommission = async () => {
    const resp = await axios.get(
      "http://54.146.133.108:5000/api/checkout"
    );
    const { commission } = resp.data.data[0];
    if (commission !== null) {
      setCommission(commission);
    }
  };

  const fetchRejectedcount = async (restaurant) => {
    const response = await axios.get(
      "http://54.146.133.108:5000/api/orders/rejected/" + restaurant
    );
    const { count } = response.data;
    if (count !== null) {
      setRejected(count);
    }
  };

  const fetchNotStartedcount = async (restaurant) => {
    const response = await axios.get(
      "http://54.146.133.108:5000/api/orders/accepted/" + restaurant
    );
    const { count } = response.data;
    if (count !== null) {
      setNotStarted(count);
    }
  };

  const getuserByType = async (restaurant) => {
    const response = await axios.get(
      "http://54.146.133.108:5000/api/chefdashboard/getusertypesbyrestaurant/" +
      restaurant
    );
    const { newusers, repeatedUsers } = response.data;
    if (newusers !== null && repeatedUsers !== null) {
      setnewUser(newusers);
      setrepeatedUser(repeatedUsers);
    }
  };

  const fetchVisit = async (restaurant) => {
    const response = await axios.get(
      "http://54.146.133.108:5000/api/chefdashboard/" + restaurant
    );
    const { totalOrders, orders, accptanceRate, rectanceRate, dashboard, due } =
      response.data;
    const { menuvisits, cartVisit } = dashboard;
    if (
      acceptanceRate !== null &&
      rectanceRate !== null &&
      totalOrders !== null &&
      orders !== null
    ) {
      setCartConversion(totalOrders);
      setMenuVisit(menuvisits);
      setvisits(cartVisit);
      setAcceptanceRate(accptanceRate);
      setRejectedRate(rectanceRate);
      setCampaignDue(due);
    }
  };

  const getAddOnCounts = async (id) => {
    const res = await axios.get(
      "http://54.146.133.108:5000/api/orders/"
    );
    let orders = res.data;
    orders = orders.filter(
      (item) => item.restaurant_id === id && item.status !== "rejected"
    );
    const addOns = orders.map((el) => el.add_on);
    let quantities = addOns.map((extras) => extras.map((item) => item.qty));
    let subtotal = quantities.map((item) => item.reduce(add, 0));
    let totalCount = subtotal.reduce(add, 0);
    setTotalAddOns(totalCount);
    let prices = addOns.map((extras) => extras.map((item) => item.subtotal));
    let subtotalPrice = prices.map((item) => item.reduce(add, 0));
    let totalPrice = subtotalPrice.reduce(add, 0);
    setTotalAddOnRevenue(totalPrice);
  };

  useEffect(() => {
    getAddOnCounts(restaurant_id);
  });

  useEffect(() => {
    fetchCommission();
  }, [commission]);

  useEffect(() => {
    fetchOrders(restaurant_id);
    fetchcompletedorders(restaurant_id);
    fetchcancelledcount(restaurant_id);
    fetchVisit(restaurant_id);
    fetchRejectedcount(restaurant_id);
    fetchNotStartedcount(restaurant_id);
    fetchStats(restaurant_id);
    getuserByType(restaurant_name);
  }, [
    restaurant_name,
    restaurant_id,
    acceptanceRate,
    rejectedRate,
    activecount,
    commission,
    completecount,
  ]);

  const onRefresh = () => {
    setRefreshing(true)
    fetchOrders(restaurant_id);
    fetchcompletedorders(restaurant_id);
    fetchcancelledcount(restaurant_id);
    fetchVisit(restaurant_id);
    fetchRejectedcount(restaurant_id);
    fetchNotStartedcount(restaurant_id);
    fetchStats(restaurant_id);
    getuserByType(restaurant_name);
    fetchCommission()
    getAddOnCounts(restaurant_id)
    setRefreshing(false)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Header title={restaurant_name + ", " + city} />
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#f00", "#0f0", "#00f"]} />
      } >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 8,
            backgroundColor: "#fff", marginTop: 8
          }}
        >
          <View style={{ alignItems: "center" }}>
            <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
              height: 60,
              width: 60,
              borderRadius: 15,
              backgroundColor: "#226ccf",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <TouchableOpacity

                onPress={() => navigation.navigate("review_order")}
              >
                <Ants name="star" size={34} color="#FFF" />
              </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.smallText}>Customer Rating</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
              height: 60,
              width: 60,
              borderRadius: 15,
              backgroundColor: "#226ccfcc",
              alignItems: "center",
              justifyContent: "center",
            }}
            >
              <TouchableOpacity

                onPress={() =>
                  navigation.navigate("payouts", {
                    commission: commission,
                    totalAddOns: totalAddOns,
                    totalAddOnRevenue: totalAddOnRevenue,
                  })
                }
              >
                <Ants name="wallet" size={28} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.smallText}>Payouts & Finance</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
              height: 60,
              width: 60,
              borderRadius: 15,
              backgroundColor: "#226ccf",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("myOrders")}
              >
                <Ants name="history" size={28} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.smallText}>Past Orders</Text>
          </View>

        </View>

        <View style={{ marginHorizontal: 4, padding: 4, marginVertical: 4 }}>
          <Text style={{ color: "#000", fontWeight: "bold" }}>
            Business Overview
          </Text>
          <Text style={{ color: "#000", fontSize: 12 }}>
            Aggregated view of your business across all orders{" "}
          </Text>
        </View>

        <View style={{ height: 10 }} />
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
          campaignDue={campaignDue}
          addOnCounts={totalAddOns}
          addOnRevenue={totalAddOnRevenue}
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
                {acceptanceRate.toFixed(2) || 0}%
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
                {rejectedRate.toFixed(2) || 0}%
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
