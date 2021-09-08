import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar, Text, SafeAreaView } from "react-native";
import CalTab from "../CalTab";
import ToggleLunchDinner from "../ToggleLunchDinner";
import Header from "../Header";
import { useSelector, useDispatch } from "react-redux";
import Menu from "./Menu";
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
  console.log(restaurant);
  const [currentDay, setCurrentDay] = useState(days[new Date().getDay()]);
  const [meal, setMeal] = useState({});
  const dispatch = useDispatch();
  const meals = restaurant.meals;
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

  let myProfile = {};
  (myProfile.restaurant_name = restaurant.restaurant_name),
    (myProfile.city = restaurant.city);
  const onDayChanged = (day) => {
    if (day === "Yesterday") {
      mealSelector(days[new Date().getDay() - 1]);
    } else if (day === "Tomorrow") {
      mealSelector(days[new Date().getDay() + 1]);
    } else {
      mealSelector(days[new Date().getDay()]);
    }
  };
  return (
    <SafeAreaView style={styles.mainPage}>
      <StatusBar />
      <Header chefName={myProfile.restaurant_name} chefAddress={myProfile.city}>
        <View
          style={[
            styles.switch,
            { flexDirection: "row", paddingHorizontal: 10 },
          ]}
        >
          <ToggleLunchDinner />
        </View>
      </Header>
      <CalTab onDayChanged={(day) => onDayChanged(day)} />
      <Menu meal={meal} />
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
    top: 10,
    color: "#dfdfdf",
  },
});
