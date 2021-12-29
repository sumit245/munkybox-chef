import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import Header from "../components/header/Header";
import Export from "../components/header/Export";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Item from "../components/pastorders/Item";

export default function PastOrders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const restaurant = useSelector((state) => state.restaurant);
  const getApiData = async () => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/orders"
    );
    const orders = await response.data;
    setOrders(orders);
  };
  useEffect(() => {
    getApiData();
  }, []);
  const renderItem = ({ item }) => (
    <Item item={item} index={item._id} navigation={navigation} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={restaurant.restaurant_name + ", " + restaurant.restaurant_id}
      >
        <View style={styles.switch}>
          <Export />
        </View>
      </Header>

      <FlatList
        data={orders}
        contentContainerStyle={{ paddingBottom: 10 }}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainPage: {
    flex: 1,
  },
  switch: {
    position: "absolute",
    left: "90%",
    bottom: 2,
    color: "#dfdfdf",
    flexDirection: "row",
    padding: 4,
    alignItems: "center",
  },
});
