import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar, Text, SafeAreaView } from "react-native";
import CalTab from "../CalTab";
import ToggleLunchDinner from "../header/ToggleLunchDinner";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import Notification from "../header/Notification";
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
  const [slot, setSlot] = useState("Lunch");
  const { restaurant_name, city, meals } = restaurant;
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
      <Header title={restaurant_name + ", " + city}>
        <View style={styles.switch}>
          <ToggleLunchDinner handleToggle={(e) => setSlot(e)} />
          <Notification navigation={navigation} />
        </View>
      </Header>
      <CalTab onDayChanged={(day) => onDayChanged(day)} />
      <Menu meal={meal} slot={slot} />
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
