import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, SafeAreaView } from "react-native";
import { Searchbar } from "react-native-paper";
import Header from "../components/Header";
import OrderItem from "../components/OrderItem";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../store/actions/actions";
import axios from "axios";
import ToggleLunchDinner from "../components/ToggleLunchDinner";

export default function Orders() {
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const [orders, setOrders] = useState([]);
  const [meal, setMeal] = useState({});
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dispatch = useDispatch();
  const { meals } = restaurant;
  const isEmpty = (arr) => !Array.isArray(arr) || arr.length === 0;
  let { restaurant_name, city } = restaurant;

  const renderItem = ({ item }) => (
    <OrderItem item={item} index={item._id} meal={meal} />
  );
  const getApiData = async () => {
    const response = await axios.get("http://munkybox-admin.herokuapp.com/api/orders");
    const orders = await response.data;
    setOrders(orders);
  };
  useEffect(() => {
    if (!isEmpty(meals)) {
      let currentMeal = meals.filter(function (e) {
        return e.day === days[new Date().getDay()];
      });
      setMeal(currentMeal[0]);
    }
    getApiData();
  }, [orders]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header chefName={restaurant_name} chefAddress={city}>
        <View
          style={[
            styles.switch,
            { flexDirection: "row", paddingHorizontal: 10 },
          ]}
        >
          <ToggleLunchDinner />
        </View>
        <Text
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            fontSize: 18,
            color: "orange",
            fontWeight: "bold",
          }}
        >
          Orders {orders.length}
        </Text>
      </Header>
      <Searchbar style={styles.searchbar} />
      <FlatList
        data={orders}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  searchbar: {
    display: "flex",
  },
  switch: {
    position: "absolute",
    right: 4,
    top: 10,
    color: "#dfdfdf",
  },
});
