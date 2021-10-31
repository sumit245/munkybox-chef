import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Text } from "react-native";
import Header from "../components/header/Header";
import OrderItem from "../components/OrderItem";
import { useSelector, useDispatch } from "react-redux";
import ToggleLunchDinner from "../components/header/ToggleLunchDinner";
import { getOrder } from "../actions/actions";
import { truncate_string } from "../helpers/truncate_string";
import {
  PrimaryDark,
  SecondaryDarkColor,
  SecondaryLightColor,
  WHITE,
} from "../Colors";
import { Badge, Divider } from "react-native-paper";
import HeaderTabSwitch from "../components/header/HeaderTabSwitch";

export default function Orders() {
  const restaurant = useSelector((state) => state.restaurant);
  const orders = useSelector((state) => state.orders);
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
  let { restaurant_name, restaurant_id, _id } = restaurant;

  const renderItem = ({ item }) => (
    <OrderItem item={item} index={item._id} meal={meal} />
  );
  useEffect(() => {
    if (!isEmpty(meals)) {
      let currentMeal = meals.filter(function (e) {
        return e.day === days[new Date().getDay()];
      });
      setMeal(currentMeal[0]);
    }
    dispatch(getOrder(restaurant_name));
  }, []);
  const timeslots = ["11-12PM", "12-1PM", "1-2PM"];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={restaurant_name + ", " + restaurant_id}>
        <View style={styles.switch}>
          <ToggleLunchDinner />
        </View>
      </Header>
      <HeaderTabSwitch items={timeslots}>
        <Badge
          style={{
            margin: 4,
            fontSize: 12,
            backgroundColor: "red",
            color: WHITE,
          }}
          size={18}
        >
          {orders.length}
        </Badge>
      </HeaderTabSwitch>
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
  switch: {
    position: "absolute",
    right: 4,
    bottom: 2,
    color: "#dfdfdf",
    flexDirection: "row",
    padding: 4,
    alignItems: "center",
  },
});
