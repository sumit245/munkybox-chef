import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Text } from "react-native";
import Header from "../components/header/Header";
import OrderItem from "../components/OrderItem";
import { useSelector, useDispatch } from "react-redux";
import ToggleLunchDinner from "../components/header/ToggleLunchDinner";
import { WHITE, DARKGRAY } from "../Colors";
import { Badge } from "react-native-paper";
import HeaderTabSwitch from "../components/header/HeaderOrderDispatch";
import axios from "axios";
import Loader from "../helpers/Loader";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const ListEmptyComponent = () => (
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <Icon name="sad-outline" size={64} color={DARKGRAY} />
    <Text
      style={{
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: DARKGRAY,
      }}
    >
      Sorry you don't provide any meal on this slot
    </Text>
    <Text
      style={{
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: DARKGRAY,
      }}
    >
      You can now also add meals on this slot to get more income!!!
    </Text>
  </View>
);

export default function Orders() {
  const restaurant = useSelector((state) => state.restaurant);
  const [orders, setOrders] = useState([]);
  const [meal, setMeal] = useState({});
  const [slot, setSlot] = useState("Lunch");
  const [myslot, setmyslots] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [page, selectedPage] = useState(0);
  const [currentTab, setCurrentTab] = useState("11-12 AM");
  const [selected, setSelected] = useState(0);
  const [currentPage, setCurrentPage] = useState(false);
  const [count, setCount] = useState(0);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const { meals } = restaurant;
  const isEmpty = (arr) => !Array.isArray(arr) || arr.length === 0;
  let { restaurant_name, restaurant_id, _id } = restaurant;

  const decrement = () => {
    let localcount = count;
    setCount(localcount - 1);
  };
  const renderItem = ({ item }) => (
    <OrderItem item={item} index={item._id} meal={meal} decrement={decrement} />
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

  const isSameOrder = (a, b) => a.order_id == b.order_id;

  const fetchOrders = async (restaurant) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/orders/active/" + restaurant
    );
    const { activeorders } = response.data;
    const today = moment();
    let todayOrders = activeorders.filter(
      (item) =>
        today.isBetween(
          moment(item.start_date).subtract(1, "day"),
          moment(item.end_date).add(2, "days")
        ) && item.time === currentTab
    );
    setOrders(todayOrders);
    const currentOrderResponse = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/getcurrentorder/"
    );
    const currentOrder = currentOrderResponse.data;
    const filterByReference = (arr1, arr2) => {
      let res = [];
      res = arr1.filter((el) => {
        return arr2.find((element) => {
          return element.order_id === el.order_id;
        });
      });
      return res;
    };
    let filtered_array = filterByReference(currentOrder, todayOrders);
    let unDeliveredOrders = filtered_array.filter(
      (item) => item.delivered === false
    );
    console.log("Filtered", filtered_array);
    setCount(unDeliveredOrders.length);
  };

  useEffect(() => {
    fetchSlots();
  }, [currentTab]);

  const tabHandler = (tab, index) => {
    setCurrentTab(tab);
    setSelected(index);
  };
  useEffect(() => {
    if (!isEmpty(meals)) {
      let currentMeal = meals.filter(function (e) {
        return e.day === days[new Date().getDay()];
      });
      setMeal(currentMeal[0]);
    }
    fetchOrders(restaurant_id);
  }, [currentTab]);

  const handleToggle = (slot) => {
    setLoaded(false);
    let myorders = [...orders];
    let filtered = myorders.filter((item) => item.category === slot);
    setOrders(filtered);
    setSlot(slot);
    setLoaded(true);
  };

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"#fff" }}>
      
      <Header title={restaurant_name + ", " + restaurant_id}>
        {/* <View style={styles.switch}>
          <ToggleLunchDinner handleToggle={handleToggle} />
          </View>
         */}
      </Header>
      <HeaderTabSwitch
        items={slot === "Lunch" ? lunch : dinner}
        handler={tabHandler}
        selected={selected}
        setTabHandler={(data) => setCurrentPage(data)}
        returnCurrentIndex={(page) => selectedPage(page)}
        mealCount={count}
      ></HeaderTabSwitch>
      {loaded ? (
        <FlatList
          data={orders}
          ListEmptyComponent={ListEmptyComponent}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Loader />
      )}
      
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
