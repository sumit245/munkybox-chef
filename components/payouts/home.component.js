import { SafeAreaView, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { TabView, TabBar } from "react-native-tab-view";
import { SecondaryColor, PrimaryDark } from "../../Colors";
import CurrentPayout from "./CurrentPayout";
import PastPayouts from "./PastPayouts";
import axios from "axios";
import { useSelector } from "react-redux";

const PayoutHome = ({ route, navigation }) => {
  const { commission, totalAddOns, totalAddOnRevenue } = route.params;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [commi, setCommission] = useState(0);
  const [addOns, setTotalAddOns] = useState(0);
  const [addOnReveneue, setTotalAddOnRevenue] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [numOrders, setNumOrders] = useState(0);
  const [netCommission, setNetCommission] = useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Current Payout" },
    { key: "second", title: "Past Payout" },
  ]);
  const [payhistory, setPayHistory] = React.useState([]);

  const restaurant = useSelector((state) => state.restaurant);
  const { restaurant_id } = restaurant;
  const chefPayouts = async (id) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/admintochefpayments/getchefpayout/" +
        id
    );
    const { totalBaseIncome, totalDiscount, orders, numOrders } = response.data;
    let tbre = parseFloat(totalBaseIncome) * 0.01 * parseFloat(commission);
    let tbc = parseFloat(addOnReveneue) * 0.01 * parseFloat(commission);
    let amt=parseFloat(totalBaseIncome)+parseFloat(addOnReveneue)
    let adminCommission = tbre+tbc;
    setNetCommission(adminCommission);
    setRevenue(parseFloat(amt) - parseFloat(adminCommission));
    setNumOrders(numOrders);
    setDiscount(totalDiscount);
    setOrders(orders);
  };

  useEffect(() => {
    setCommission(commission);
    setTotalAddOns(totalAddOns);
    setTotalAddOnRevenue(totalAddOnRevenue);
    chefPayouts(restaurant_id);
  }, []);

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
            current_cycle="15th Feb - 02nd Mar"
            payout_date="4th Mar"
            revenue={revenue}
            orders={orders}
            discount={discount}
            numOrders={numOrders}
            totalAddOns={addOns}
            commission={commi}
            totalAddOnReveneue={addOnReveneue}
            netCommission={netCommission}
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
