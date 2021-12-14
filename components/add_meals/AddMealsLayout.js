import React, { useState } from "react";
import AddMealForm from "./AddMealForm";
import Header from "../header/Header";
import HeaderTabSwitch from "../header/HeaderTabSwitch";
import ToggleLunchDinner from "../header/ToggleLunchDinner";
import { Divider } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, View } from "react-native";
import { styles } from "../../styles/headerstyle";

const slots = ["Lunch", "Dinner"];
const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
export default function AddMealsLayout() {
  const restaurant = useSelector((state) => state.restaurant);
  const [index, setIndex] = useState(0);
  const { meals } = restaurant;
  const handler = (item, index) => {
    setIndex(index);
    
    return null;
  };
  return (
    <SafeAreaView style={{flex:1}}>
      <Header title={"Add Meal"}>
        <View style={styles.switch}>
          <ToggleLunchDinner />
        </View>
      </Header>
      <Divider />
      <HeaderTabSwitch items={days} handler={handler} />
      <AddMealForm meal={meals[index]} />
    </SafeAreaView>
  );
}
