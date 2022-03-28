import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import CalTab from "../CalTab";
import ToggleLunchDinner from "../header/ToggleLunchDinner";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import Notification from "../header/Notification";
import axios from "axios";
import moment from "moment";

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
  const [isToday,setisToday]=useState(false)

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
      "http://18.117.221.34:5000/api/orders/forchefhome/" + restaurant
    );
    const { data } = response;
    const { activeorders, count } = data;
    setOrders(activeorders);
  };

  const getAddOnCounts = () => {
    let addons = {};
    try {
      const addOns = orders.map((el) => el.add_on);
      let todayExtras = addOns.map((extras) =>{
        
        return extras.filter(
          (item) => item.order_date === moment().format("DD-MMM-YYYY")
        )
      }
      );
      if (todayExtras.length > 0) {
        let quantities = todayExtras.map((extras) =>
        extras.map((item) => item.qty)
        );
        
        let addonssubtotal = [];
        for (let index = 0; index <= quantities.length; index++) {
          addonssubtotal.push(arrayColumn(quantities, index));
        }
        
        let subtotal = quantities.map((item) => item.reduce(add, 0));
        let totalCount = subtotal.reduce(add, 0);
        if (index === 0) {
          let mytotal = addonssubtotal.map((item) => item.reduce(add, 0));
          console.log(mytotal);
          setPartCounts(mytotal);
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
  }, []);

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
    <SafeAreaView style={styles.mainPage}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainPage: {
    flex: 1,
    //backgroundColor:PrimaryDark
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
