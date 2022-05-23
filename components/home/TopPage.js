import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, RefreshControl, Platform, StatusBar } from "react-native";
import CalTab from "../CalTab";
import ToggleLunchDinner from "../header/ToggleLunchDinner";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import Notification from "../header/Notification";
import axios from "axios";
import moment from "moment";
import { sendPushNotification } from "../../helpers/NotificationServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function TopPage({ navigation }) {
  const restaurant = useSelector((state) => state.restaurant);
  const [meal, setMeal] = useState({});
  const [orders, setOrders] = useState([]);
  const [mealcount, setMealCount] = useState(0);
  const [addOn, setAddOn] = useState("");
  const [qty, setQty] = useState(0);
  const [slot, setSlot] = useState("Lunch");
  const [index, setIndex] = useState(0);
  const [partAddOn, setPartCounts] = useState([]);
  const { restaurant_name, city, restaurant_id, meals } = restaurant;
  const [isToday, setisToday] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [count, setCount] = useState(0)

  const isEmpty = (arr) => !Array.isArray(arr) || arr.length === 0;
  const arrayColumn = (arr, n) =>
    arr.map((x) => (x[n] !== undefined ? x[n] : 0));
  function add(accumulator, a) {
    return parseFloat(accumulator) + parseFloat(a);
  }

  const mealSelector = (day) => {
    if (typeof day !== "undefined") {
      if (!isEmpty(meals)) {
        let currentMeal = meals.filter(function (e) {
          return e.day === day;
        });
        setMeal(currentMeal[0]);
      }
    } else {
      if (!isEmpty(meals)) {
        let currentMeal = meals.filter(function (e) {
          return e.day === "Sunday";
        });
        setMeal(currentMeal[0]);
      }
    }
  };

  useEffect(() => {
    mealSelector(days[new Date().getDay()]);
  }, []);

  const fetchTotalOrders = async (restaurant) => {
    const response = await axios.get(
      "http://54.146.133.108:5000/api/orders/forchefhome/" + restaurant
    );
    const { data } = response;
    const { activeorders, count } = data;
    setOrders(activeorders);
    setCount(count)
    const token = await AsyncStorage.getItem('notificationToken')
    sendPushNotification(token, 'New Order', 'You have a new order')
  };

  const getAddOnCounts = () => {
    let addons = {};
    try {
      let addOns = orders.map((el) => el.add_on);
      addOns=[].concat.apply([],addOns)
      let todayExtras = addOns.map(item=>
        item.filter(
          (item) => item.order_date === moment().format("DD-MMM-YYYY")
          ) 
          );
      
          todayExtras=[].concat.apply([],todayExtras)
          if (todayExtras.length > 0) {
            let quantities = todayExtras.map(item=>item.qty);
            let totalCount=quantities.reduce(add,0)
        if (index === 0) {
          setPartCounts(totalCount);
          setAddOn(totalCount);
          setQty(totalCount);

        }
      } else {
        let mytotal = addonssubtotal.map((item) => 0);
        setPartCounts(mytotal);
        setAddOn(0);
        setQty(0);
      }
    } catch (error) {
      addons = {};
    }
  };

  useEffect(() => {
    getAddOnCounts();
  }, [orders, index]);

  useEffect(() => {
    fetchTotalOrders(restaurant_id);
  }, [count]);

  const onRefresh = () => {
    setRefreshing(true)
    fetchTotalOrders(restaurant_id)
    getAddOnCounts()
    setRefreshing(false)
  }


  const onDayChanged = (day) => {
    if (day === "Today") {
      mealSelector(days[new Date().getDay()]);
      const today = moment();
      let todayOrders = orders.filter((item) =>
        today.isBetween(item.start_date, moment(item.end_date).add(1, "day"))
      );
      setMealCount(todayOrders.length);
      setIndex(0);
      setisToday(true)
    } else if (day === "Tomorrow") {
      let tomorrow = moment().add(1, "days");
      let todayOrders = orders.filter((item) =>
        tomorrow.isBetween(item.start_date, moment(item.end_date).add(1, "day"))
      );
      setMealCount(todayOrders.length);
      mealSelector(days[new Date().getDay() + 1]);
      setIndex(1);
      setisToday(false)
    } else {
      let dayafter = moment().add(2, "days");
      let todayOrders = orders.filter((item) =>
        dayafter.isBetween(item.start_date, moment(item.end_date).add(1, "day"))
      );
      setMealCount(todayOrders.length);
      mealSelector(days[new Date().getDay() + 2]);
      setIndex(2);
      setisToday(false)
    }
  };

  return (
    <SafeAreaView style={styles.mainPage} >

      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#f00",
          "#0f0", "#00f"]}

        />
      } >
        <Header title={restaurant_name + ", " + restaurant_id}>
          <View style={styles.switch}>
            <ToggleLunchDinner handleToggle={(e) => setSlot(e)} />
            <Notification navigation={navigation} />
          </View>
        </Header>
        <CalTab onDayChanged={(day) => onDayChanged(day)} />
        <Menu
          meal={meal}
          slot={slot}
          count={mealcount}
          add_on_name={addOn}
          partAdds={partAddOn}
          add_on_count={qty}
          isToday={isToday}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainPage: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
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
