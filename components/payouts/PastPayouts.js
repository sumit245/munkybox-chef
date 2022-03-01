import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useSelector } from "react-redux";

const Item = ({ item, navigation }) => (
  <View style={styles.card}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
      }}
    >
      <View>
        <Text style={styles.smallText}>{item.payout_cycle}</Text>
        <Text style={[styles.bigText, { fontSize: 24, color: "#205000" }]}>
          $ {item.revenue}
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
          {item.status}
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
          current_cycle: item.payout_cycle,
          payout_date: item.payout_date,
          revenue: item.revenue,
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

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    payout_cycle: "1st Jan 22 - 15th Jan 22",
    revenue: "0.00",
    status: "Paid",
    status_details: "",
    status_code: 1,
  },
  {
    id: "bd7acbea-c1b1-46c4-aed5-3ad53abb28ba",
    payout_cycle: "15th Jan 22 - 31st Jan 22",
    revenue: "0.00",
    status: "On Hold",
    status_details: "Bank Details Incorrect",
    status_code: 3,
  },
  {
    id: "bd7acbea-c1b1-36c4-aed5-3ad53abb28ba",
    payout_cycle: "1st Feb 22 - 15th Feb 22",
    revenue: "0.00",
    status: "Pending",
    status_details: "",
    status_code: 2,
  },
];

export default function PastPayouts({ navigation }) {
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
  }, []);
  const ListEmptyContent = () => (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>No orders to display</Text>
    </View>
  );
  const renderItem = ({ item }) => {
    return <Item item={item} key={item.id} navigation={navigation} />;
  };
  return (
    <View>
      <FlatList
        data={payouts}
        renderItem={renderItem}
        extraData={navigation}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={ListEmptyContent}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
