import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar, Text, SafeAreaView } from "react-native";
import CalTab from "../CalTab";
import ToggleLunchDinner from "../header/ToggleLunchDinner";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import Notification from "../header/Notification";
import axios from "axios";
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
  const { restaurant_name, city, restaurant_id, meals } = restaurant;
  const isEmpty = (arr) => !Array.isArray(arr) || arr.length === 0;

  const mealSelector = (day) => {
    if (!isEmpty(meals)) {
      let currentMeal = meals.filter(function (e) {
        return e.day === day;
      });
      setMeal(currentMeal[0]);
    }
  };
  useEffect(() => {
    mealSelector(days[new Date().getDay()]);
  }, []);
  const fetchTotalOrders = async () => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/orders/custom/active"
    );
    const { data } = response;
    const { activeorders, count } = data;
    setOrders(activeorders);
    setMealCount(count);
  };
  const getAddOnCounts = () => {
    try {
      const addOns = orders.map((el) => el.add_on);
      if (Array.isArray(addOns)) {
        let addons = addOns[0][0];
        let { item, qty } = addons;
        setAddOn(item);
        setQty(qty);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAddOnCounts();
  }, [orders]);
  useEffect(() => {
    fetchTotalOrders();
  }, [mealcount]);

  const onDayChanged = (day) => {
    if (day === "Today") {
      mealSelector(days[new Date().getDay()]);
    } else if (day === "Tomorrow") {
      mealSelector(days[new Date().getDay() + 1]);
    } else {
      mealSelector(days[new Date().getDay() + 2]);
    }
  };
  return (
    <SafeAreaView style={styles.mainPage}>
      <StatusBar />
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
        add_on_count={qty}
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
    right: 4,
    bottom: 2,
    color: "#dfdfdf",
    flexDirection: "row",
    padding: 4,
    alignItems: "center",
  },
});
