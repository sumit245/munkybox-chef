import { View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";

const Item = ({ item }) => (
  <View style={styles.card}>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View>
        <Text style={styles.smallText}>{item.payout_cycle}</Text>
        <Text style={[styles.bigText,{fontSize:24,color:"#205000"}]}>$ {item.revenue}</Text>
      </View>
      <View style={{alignItems:"flex-end"}}>
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
  </View>
);

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    payout_cycle: "1st Jan - 15th Jan",
    revenue: "0.00",
    status: "Paid",
    status_details: "",
    status_code: 1,
  },
  {
    id: "bd7acbea-c1b1-46c4-aed5-3ad53abb28ba",
    payout_cycle: "15th Jan - 31st Jan",
    revenue: "0.00",
    status: "On Hold",
    status_details: "Bank Details Incorrect",
    status_code: 3,
  },
  {
    id: "bd7acbea-c1b1-36c4-aed5-3ad53abb28ba",
    payout_cycle: "1st Feb - 15th Feb",
    revenue: "0.00",
    status: "Pending",
    status_details: "",
    status_code: 2,
  },
];

export default function PastPayouts() {
  const [payouts, setPayouts] = useState([]);
  useEffect(() => {
    setPayouts(DATA);
  }, []);
  const ListEmptyContent = () => (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>No orders to display</Text>
    </View>
  );
  const renderItem = ({ item }) => {
    return <Item item={item} key={item.id} />;
  };
  return (
    <View>
      <FlatList
        data={payouts}
        renderItem={renderItem}
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
