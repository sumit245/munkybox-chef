import React, { useState, useEffect } from "react";
import ViewMeals from "./ViewMeals";
import Header from "../header/Header";
import { TabView, TabBar } from "react-native-tab-view";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import { SafeAreaView, View,TouchableOpacity } from "react-native";
import { width } from "../../Dimens";
import Icon from "react-native-vector-icons/Ionicons"
import { LinearGradient } from "expo-linear-gradient";
import AddEditMeals from "./AddEditMeals";
import axios from "axios";

export default function AddMealsLayout({ navigation }) {
  const restaurant = useSelector((state) => state.restaurant);
  const [index, setIndex] = useState(0);
  const [day, setDay] = useState([]);
  const [addState, setAddState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [slot, setSlot] = useState("Lunch");
  const [meals, setMeals] = useState([]);
  const [routes] = useState([
    { key: "first", title: "Monday" },
    { key: "second", title: "Tuesday" },
    { key: "third", title: "Wednesday" },
    { key: "fourth", title: "Thursday" },
    { key: "fifth", title: "Friday" },
    { key: "sixth", title: "Saturday" },
    { key: "seventh", title: "Sunday" },
  ]);
  const { restaurant_id } = restaurant;
  const fetchMeals = async (id) => {
    const response = await axios.get(
      "http://18.117.221.34:5000//api/newrest/getchefbyId/" + id
    );
    const { data } = response;
    const { meals } = data;
    setMeals(meals);
  };
  useEffect(() => {
    fetchMeals(restaurant_id);
  }, [meals]);
  
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      tabStyle={{ width: width / 3 }}
      scrollEnabled
      style={{
        backgroundColor: "transparent",
      }}
      activeColor="#ff6600"
      labelStyle={{ fontWeight: "bold" }}
      inactiveColor="#272727"
      indicatorStyle={{ backgroundColor: "#ff9900", marginHorizontal: 2 }}
    />
  );
  useEffect(() => {
    let day = meals.map((data, key) => data.day);
  }, [meals, addState, editState]);

  const handleToggle = (data) => {
    setSlot(data);
  };

  const changeEditState = (state) => {
    setEditState(state);
  };
  const onChangeAddHandler = (state) => {
    setAddState(state);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return addState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            index={index}
            addState={true}
            changeEditState={onChangeAddHandler}
          />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            addState={false}
            meal={meals.find((o) => o.day === route.title)}
            changeEditState={changeEditState}
          />
        ) : (
          <ViewMeals
            meal={meals.find((o) => o.day === route.title)}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
            addHandler={onChangeAddHandler}
          />
        );
      case "second":
        return addState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            index={index}
            addState={true}
            changeEditState={onChangeAddHandler}
          />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            addState={false}
            meal={meals.find((o) => o.day === route.title)}
            changeEditState={changeEditState}
          />
        ) : (
          <ViewMeals
            meal={meals.find((o) => o.day === route.title)}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
            addHandler={onChangeAddHandler}
          />
        );
      case "third":
        return addState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            index={index}
            addState={true}
            changeEditState={onChangeAddHandler}
          />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            addState={false}
            meal={meals.find((o) => o.day === route.title)}
            changeEditState={changeEditState}
          />
        ) : (
          <ViewMeals
            meal={meals.find((o) => o.day === route.title)}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
            addHandler={onChangeAddHandler}
          />
        );
      case "fourth":
        return addState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            index={index}
            addState={true}
            changeEditState={onChangeAddHandler}
          />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            addState={false}
            meal={meals.find((o) => o.day === route.title)}
          />
        ) : (
          <ViewMeals
            meal={meals.find((o) => o.day === route.title)}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
            addHandler={onChangeAddHandler}
          />
        );
      case "fifth":
        return addState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            index={index}
            addState={true}
            changeEditState={onChangeAddHandler}
          />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            addState={false}
            meal={meals.find((o) => o.day === route.title)}
            changeEditState={changeEditState}
          />
        ) : (
          <ViewMeals
            meal={meals.find((o) => o.day === route.title)}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
            addHandler={onChangeAddHandler}
          />
        );
      case "sixth":
        return addState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            index={index}
            addState={true}
            changeEditState={onChangeAddHandler}
          />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            addState={false}
            meal={meals.find((o) => o.day === route.title)}
            changeEditState={changeEditState}
          />
        ) : (
          <ViewMeals
            meal={meals.find((o) => o.day === route.title)}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
            addHandler={onChangeAddHandler}
          />
        );
      case "seventh":
        return addState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            index={index}
            addState={true}
            changeEditState={onChangeAddHandler}
          />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            addState={false}
            meal={meals.find((o) => o.day === route.title)}
            changeEditState={changeEditState}
          />
        ) : (
          <ViewMeals
            meal={meals.find((o) => o.day === route.title)}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
            addHandler={onChangeAddHandler}
          />
        );
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", width: "100%", paddingHorizontal: 4, alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
            height: 28,
            width: 28,
            marginHorizontal: 4,
            borderRadius: 14,
          }}>
            <TouchableOpacity
              style={{ alignItems: "center", justifyContent: "center" }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-back" size={24} color="#ffffff" />
            </TouchableOpacity>
          </LinearGradient>
          <Header
            title="Meals"
          />
        </View>
      </View>
      <Divider />
      <TabView
        lazy
        swipeEnabled
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: width }}
      />
    </SafeAreaView>
  );
}
