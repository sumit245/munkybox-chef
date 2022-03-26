import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
const Item = ({ item, commission, navigation }) => {
  const fetchOrderById = async (id) => {
    const res = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/orders/getOrderbyID/" + id
    );
    const { data } = res;
    if (data !== null) {
      navigation.navigate("orderDetails", {
        order: data,
      });
    } else {
      alert("No Matching Order Found!!!");
    }
  };
  return (
    <View style={styles.card}>
      <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
        <Text
          style={[
            styles.smallText,
            { fontWeight: "normal", textTransform: "uppercase", color: item.status === "accepted" ? "#5ca85c" : item.status === "started" ? "#ffc300" : "#ff4300" },
          ]}
        >
          {item.status}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={styles.bigText}>#{item.order_id}</Text>
          <Text style={styles.bigText}>Plan Name</Text>
          <Text style={styles.bigText}>Base Price</Text>
          <Text style={styles.bigText}>Discount</Text>
          <Text style={styles.bigText}>Commission({commission}%)</Text>
        </View>
        <View>
          <Text></Text>
          <Text style={styles.smallText}>
            {item.plan === "twoPlan"
              ? "2 Days"
              : item.plan === "fifteenPlan"
                ? "15 Days"
                : "30 Days"}
          </Text>
          <Text style={styles.smallText}>${item.base_price}</Text>
          <Text style={styles.smallText}>${item.discount}</Text>
          <Text style={styles.smallText}>
            ${parseFloat(item.base_price) * parseFloat(commission) * 0.01}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => fetchOrderById(item.order_id)}>
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#226ccf" }}>
            View
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function CommissionHistory({ route, navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState(null);
  const [DATA, setData] = useState([]);
  const { orders, netCommission, commission } = route.params;

  useEffect(() => {
    setData(orders);
  }, [DATA]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query !== "") {
      let item = DATA.filter((item) => item.order_id === query);
      setOrders(item);
    } else {
      setOrders(DATA);
    }
  };

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
        commission={commission}
        navigation={navigation}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
            title="Commission History"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          alignItems: "center",
          marginVertical: 2,
          marginHorizontal: 2,
        }}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          iconColor="#000"
          style={{ width: "90%", height: 28, marginRight: 8 }}
        />
        <TouchableOpacity style={{ width: "8%", marginLeft: 4 }}>
          <Icon name="calendar" size={20} color="#ff66000" />
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: "center", fontWeight: "bold", padding: 6 }}>
        Total Commission Amount: ${parseFloat(netCommission).toFixed(2)}
      </Text>
      <FlatList
        data={orders}
        contentContainerStyle={{ paddingBottom: 10 }}
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
