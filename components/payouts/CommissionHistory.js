import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  StyleSheet,
} from "react-native";

import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

const Item = ({ item }) => (
  <View style={styles.card}>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View>
        <Text style={styles.bigText}>Order Id</Text>
        <Text style={styles.bigText}>Plan Name</Text>
        <Text style={styles.bigText}>Base Price</Text>
        <Text style={styles.bigText}>Discount</Text>
        <Text style={styles.bigText}>Commission</Text>
        <Text style={styles.bigText}>Commission Amount</Text>
        <Text style={styles.bigText}>Status</Text>
      </View>
      <View>
        <Text style={styles.smallText}>{item.order_id}</Text>
        <Text style={styles.smallText}>{item.plan_name}</Text>
        <Text style={styles.smallText}>{item.base_price}</Text>
        <Text style={styles.smallText}>N/A</Text>
        <Text style={styles.smallText}>{item.commission}</Text>
        <Text style={styles.smallText}>{item.commission_amt}</Text>
        <Text style={styles.smallText}>{item.status}</Text>
      </View>
    </View>
  </View>
);

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    order_id: "ORD001",
    plan_name: "2 Meals",
    base_price: "$15.00",
    commission: "10%",
    commission_amt: "$1.50",
    status: "In Progress",
  },
  {
    id: "bd7acbea-c1b1-46c4-aed5-3ad53abb28ba",
    order_id: "ORD002",
    plan_name: "15 Meals",
    base_price: "$200.00",
    commission: "10%",
    commission_amt: "$20.00",
    status: "Pending",
  },
  {
    id: "bd7acbea-c1b1-36c4-aed5-3ad53abb28ba",
    order_id: "ORD003",
    plan_name: "30 Meals",
    base_price: "$400.00",
    commission: "10%",
    commission_amt: "$40.00",
    status: "Completed",
  },
];

export default function CommissionHistory() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState(null);
  const [orders, setOrders] = useState([]);
  const onChangeSearch = (query) => {
      setSearchQuery(query);
      if (query !== "") {
          let item = DATA.filter((item) => item.order_id === query);
          setOrders(item); 
      } else {
          setOrders(DATA)
      }
  };
  const ListEmptyContent = () => (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>No orders to display</Text>
    </View>
  );
  const renderItem = ({ item }) => {
    return <Item item={item} key={item.id} />;
  };
  useEffect(() => {
    setOrders(DATA);
  }, []);
  return (
    <SafeAreaView>
      <Header title="Commission History" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 2,
          marginHorizontal: 2,
        }}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ width: "90%", height: 28, marginRight: 8 }}
        />
        <TouchableOpacity style={{ width: "8%", marginLeft: 4 }}>
          <Icon name="calendar" size={20} color="#205000" />
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: "center", fontWeight: "bold", padding: 6 }}>
        Total Commission Amount: $ 0.00{" "}
      </Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        ListEmptyComponent={ListEmptyContent}
      />
    </SafeAreaView>
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
