import { SafeAreaView, useWindowDimensions, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { TabView, TabBar } from "react-native-tab-view";
import { SecondaryColor, PrimaryDark } from "../../Colors";
import CurrentPayout from "./CurrentPayout";
import PastPayouts from "./PastPayouts";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons"

const PayoutHome = ({ route, navigation }) => {
  const { commission } = route.params;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [commi, setCommission] = useState(0);
  const [addOns, setTotalAddOns] = useState(0);
  const [addOnReveneue, setTotalAddOnRevenue] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [totalOrderRevenue, setOrderRevenue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [numOrders, setNumOrders] = useState(0);
  const [due, setDue] = useState(0);
  const [payDuration, setPayDuration] = useState("");
  const [netCommission, setNetCommission] = useState(0);

  const [routes] = React.useState([
    { key: "first", title: "Current Payout" },
    { key: "second", title: "Past Payout" },
  ]);
  const [payDate, setPayDate] = useState("");

  const restaurant = useSelector((state) => state.restaurant);
  const { restaurant_id } = restaurant;
  const chefPayouts = async (id) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/admintochefpayments/getchefpayout/" +
      id
    );
    const {
      totalBaseIncome,
      totalDiscount,
      orders,
      numOrders,
      due,
      payout_start_date,
      payout_end_date,
      totalAddOns,
      totalAddOnRevenue,
    } = response.data;
    let tbre = parseFloat(totalBaseIncome) * 0.01 * parseFloat(commission);
    let tbc = parseFloat(addOnReveneue) * 0.01 * parseFloat(commission);
    let amt = parseFloat(totalBaseIncome) + parseFloat(addOnReveneue);
    let adminCommission = parseFloat(tbre) + parseFloat(tbc);
    setNetCommission(adminCommission);
    setRevenue(
      parseFloat(amt) -
      parseFloat(adminCommission) -
      parseFloat(totalDiscount) -
      parseFloat(due)
    );
    setNumOrders(numOrders);
    setDiscount(totalDiscount);
    setOrderRevenue(totalBaseIncome);
    setOrders(orders);
    setDue(due);
    setTotalAddOns(totalAddOns);
    setTotalAddOnRevenue(totalAddOnRevenue);
    let sd = moment(payout_start_date).format("Do MMM").toString();
    let nd = moment(payout_end_date).format("Do MMM").toString();
    let payDuration = sd + " - " + nd;
    setPayDuration(payDuration);
    let paydate = moment(payout_end_date)
      .add(2, "days")
      .format("Do MMM")
      .toString();
    setPayDate(paydate);
  };

  useEffect(() => {
    setCommission(commission);
    chefPayouts(restaurant_id);
  }, [revenue]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#ff9900", marginHorizontal: 60, width: 100, }}
      style={{
        backgroundColor: "transparent",
        height: 40,
      }}
      activeColor="#ff6600"
      labelStyle={{ fontWeight: "bold" }}
      inactiveColor="#272727"
    />
  );
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <CurrentPayout
            current_cycle={payDuration}
            payout_date={payDate}
            revenue={revenue}
            orders={orders}
            discount={discount}
            numOrders={numOrders}
            totalAddOns={addOns}
            due={due}
            commission={commi}
            totalOrderRevenue={totalOrderRevenue}
            totalAddOnReveneue={addOnReveneue}
            netCommission={netCommission}
            navigation={navigation}
          />
        );
      case "second":
        return <PastPayouts navigation={navigation} commission={commi} />;

      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", width: "100%", paddingHorizontal: 4, alignItems: "center" }}>
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
            title="Payouts & Finance"
          />
        </View>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        style={{ minHeight: 480 }}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
      />

    </SafeAreaView>
  );
};

export default PayoutHome;
