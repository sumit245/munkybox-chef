import {
  View,
  Text,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../campaign/campaign.styles";
import axios from "axios";
import { useSelector } from "react-redux";

export default function CurrentPayout({
  current_cycle,
  payout_date,
  totalAddOns,
  commission,
  totalAddOnReveneue,
  navigation,
}) {
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [numOrders, setNumOrders] = useState(0);
  const restaurant = useSelector((state) => state.restaurant);
  const { restaurant_name, city, restaurant_id } = restaurant;
  const chefPayouts = async (id) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/admintochefpayments/getchefpayout/" +
        id
    );
    const { totalBaseIncome, totalDiscount, orders, numOrders } = response.data;
    setRevenue(parseFloat(totalBaseIncome) - parseFloat(totalDiscount));
    setNumOrders(numOrders);
    setDiscount(totalDiscount);
    setOrders(orders);
  };
  useEffect(() => {
    chefPayouts(restaurant_id);
    console.log(totalAddOnReveneue);
  }, []);
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={[styles.smallText, { textTransform: "uppercase" }]}>
            Current Payout Cycle
          </Text>
          <Text style={styles.bigText}>{current_cycle}</Text>
        </View>
        <View>
          <Text style={[styles.smallText, { textTransform: "uppercase" }]}>
            Payout Date
          </Text>
          <Text style={styles.bigText}>{payout_date}</Text>
        </View>
      </View>
      <View style={{ marginVertical: 16 }}>
        <Text style={[styles.smallText, { textTransform: "uppercase" }]}>
          Week So Far
        </Text>
        <Text
          style={[
            styles.bigText,
            { color: "#008000", fontSize: 22, marginBottom: 8 },
          ]}
        >
          ${revenue}
        </Text>
        <Text style={styles.smallText}>{numOrders} Orders</Text>
        <Text style={styles.smallText}>{totalAddOns} Add-ons</Text>
      </View>
      <TouchableOpacity
        style={{
          width: 200,
          alignSelf: "center",
          borderRadius: 6,
          borderWidth: 0.2,
          paddingVertical: 4,
          height: 44,
          backgroundColor: "#2962ff",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("commission_tracking", {
            current_cycle: current_cycle,
            payout_date: payout_date,
            revenue: revenue,
            orders: orders,
            numOrders: numOrders,
            totalAddOns: totalAddOns,
            totalAddOnReveneue: totalAddOnReveneue,
            totalDiscount: discount,
            commission: commission,
            navigation: navigation,
          })
        }
      >
        <Text style={[styles.btnText, { color: "#fff", textAlign: "center" }]}>
          View Payout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
