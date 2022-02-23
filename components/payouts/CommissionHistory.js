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
    <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
      <Text style={styles.smallText}>{item.status}</Text>
    </View>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View>
        <Text style={styles.bigText}>#{item.order_id}</Text>
        <Text style={styles.bigText}>Plan Name</Text>
        <Text style={styles.bigText}>Base Price</Text>
        <Text style={styles.bigText}>Discount</Text>
        <Text style={styles.bigText}>Commission</Text>
      </View>
      <View>
        <></>
        <Text style={styles.smallText}>{item.plan}</Text>
        <Text style={styles.smallText}>${item.base_price}</Text>
        <Text style={styles.smallText}>${item.discount}</Text>
        <Text style={styles.smallText}>{item.commission}</Text>
      </View>
    </View>
  </View>
);

export default function CommissionHistory({ route, navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState(null);
  const [DATA, setData] = useState([]);
  const { orders, netCommission } = route.params;

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
    return <Item item={item} key={item.id} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="Commission History" />
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
          style={{ width: "90%", height: 28, marginRight: 8 }}
        />
        <TouchableOpacity style={{ width: "8%", marginLeft: 4 }}>
          <Icon name="calendar" size={20} color="#205000" />
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: "center", fontWeight: "bold", padding: 6 }}>
        Total Commission Amount: $ {netCommission}
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
