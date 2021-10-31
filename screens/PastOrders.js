import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Export from "../components/header/Export";
import Header from "../components/header/Header";
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
  }, [orders]);
  const renderItem = ({ item }) => (
    <Item item={item} index={item._id} navigation={navigation} />
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Header title={restaurant.restaurant_name + ", " + restaurant.city}>
        <Export />
      </Header>
      <FlatList
        data={orders}
        contentContainerStyle={{ paddingBottom: 10 }}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
