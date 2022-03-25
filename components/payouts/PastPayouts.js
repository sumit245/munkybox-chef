import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";

const Item = ({ item, commission, navigation }) => {
  const [netcommission, setNetCommission] = useState(0);
  const [revenue, setRevenue] = useState(0);
  useEffect(() => {
    let tbre = parseFloat(item.totalBaseIncome) * 0.01 * parseFloat(commission);
    let tbc =
      parseFloat(item.totalAddOnRevenue) * 0.01 * parseFloat(commission);
    let amt =
      parseFloat(item.totalBaseIncome) + parseFloat(item.totalAddOnRevenue);
    let adminCommission = parseFloat(tbre) + parseFloat(tbc);
    setNetCommission(adminCommission);
    setRevenue(
      parseFloat(amt) -
        parseFloat(adminCommission) -
        parseFloat(item.totalDiscount) -
        parseFloat(item.due)
    );
  }, [commission]);
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <View>
          <Text style={styles.smallText}>
            {moment(item.payout_start_date).format("Do MMM").toString() +
              " - " +
              moment(item.payout_end_date).format("Do MMM").toString()}
          </Text>
          <Text style={[styles.bigText, { fontSize: 24, color: "#205000" }]}>
            $ {item.totalBaseIncome}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.smallText}>
            {" "}
            <Icon
              name={
                item.status_code === 1
                  ? "checkmark-circle"
                  : item.status_code === 2
                  ? "information-circle"
                  : "information-circle"
              }
              size={18}
              color={
                item.status_code === 1
                  ? "green"
                  : item.status_code === 2
                  ? "orange"
                  : "red"
              }
            />
            {item.status || "Paid"}
          </Text>
          <Text style={styles.smallText}>{item.status_details}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: 200,
          alignSelf: "center",
          borderRadius: 6,
          borderWidth: 0.2,
          paddingVertical: 4,
          height: 28,
          backgroundColor: "#2962ff",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("commission_tracking", {
            revenue: revenue,
            orders: item.orders,
            numOrders: item.numOrders,
            totalAddOns: item.totalAddOns,
            totalOrderRevenue: item.totalBaseIncome,
            totalAddOnReveneue: item.totalAddOnRevenue,
            totalDiscount: item.totalDiscount,
            commission: commission,
            netCommission: netcommission,
            due: item.due,
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
};

export default function PastPayouts({ navigation, commission }) {
  const [payouts, setPayouts] = useState([]);
  const restaurant = useSelector((state) => state.restaurant);
  const { restaurant_id } = restaurant;
  const fetchPastPayouts = async (id) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/admintochefpayments/getpastpayout/" +
        id
    );
    setPayouts(response.data);
  };
  useEffect(() => {
    fetchPastPayouts(restaurant_id);
  }, [payouts]);
  const ListEmptyContent = () => (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>No orders to display</Text>
    </View>
  );
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        key={item.id}
        navigation={navigation}
        commission={commission}
      />
    );
  };
  return (
    <FlatList
      data={payouts}
      renderItem={renderItem}
      extraData={navigation}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={ListEmptyContent}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    margin: 4,
    borderRadius: 8,
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 2,
  },
  smallText: {
    fontWeight: "bold",
    color: "#777",
    lineHeight: 20,
    fontSize: 14,
    marginVertical: 2,
  },
});
