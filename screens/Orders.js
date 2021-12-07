import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Text } from "react-native";
import Header from "../components/header/Header";
import OrderItem from "../components/OrderItem";
import { useSelector, useDispatch } from "react-redux";
import ToggleLunchDinner from "../components/header/ToggleLunchDinner";
import { getOrder, getActiveOrder } from "../actions/actions";
import { truncate_string } from "../helpers/truncate_string";
import {
  PrimaryDark,
  SecondaryDarkColor,
  SecondaryLightColor,
  WHITE,
} from "../Colors";
import { Badge, Divider } from "react-native-paper";
import HeaderTabSwitch from "../components/header/HeaderTabSwitch";
import axios from "axios";
import Loader from "../helpers/Loader";
import { ORDERS } from "../EndPoints";

export default function Orders() {
  const restaurant = useSelector((state) => state.restaurant);
  const [orders, setOrders] = useState([]);
  const [meal, setMeal] = useState({});
  const [slot, setSlot] = useState("Lunch");
  const [myslot, setmyslots] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
  const fetchSlots = async () => {
    setLoaded(false);
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/slots"
    );
    const slots = await response.data;
    const { lunchSlots, dinnerSlots } = slots[0];
    let mylunch = lunchSlots.map((el) => el.slot_time);
    let myDinner = dinnerSlots.map((el) => el.slot_time);
    setLunch(mylunch);
    setDinner(myDinner);
    setLoaded(true);
  };
  const fetchOrders = async (restaurant_name) => {
    const response = await axios.get(ORDERS);
    let orders = response.data;
    let neworders = orders.filter((item) => item.status === "started");
    if (orders !== null) {
      setOrders(neworders);
    }
  };
  useEffect(() => {
    fetchSlots();
  }, []);

  useEffect(() => {
    if (!isEmpty(meals)) {
      let currentMeal = meals.filter(function (e) {
        return e.day === days[new Date().getDay()];
      });
      setMeal(currentMeal[0]);
    }
    fetchOrders(restaurant_name);
  }, []);
  const handleToggle = (slot) => {
    setSlot(slot);
  };
  if (loaded) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header title={restaurant_name + ", " + restaurant_id}>
          <View style={styles.switch}>
            <ToggleLunchDinner handleToggle={handleToggle} />
          </View>
        </Header>
        <HeaderTabSwitch items={slot === "Lunch" ? lunch : dinner}>
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
  } else {
    return <Loader />;
  }
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
