import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Text } from "react-native";
// import { Searchbar } from "react-native-paper";
import Header from "../components/Header";
import OrderItem from "../components/OrderItem";
import { useSelector, useDispatch } from "react-redux";
import ToggleLunchDinner from "../components/ToggleLunchDinner";
import { getOrder } from "../actions/actions";
import { truncate_string } from "../helpers/truncate_string";
import { PrimaryColor, SecondaryColor, SecondaryDarkColor } from "../Colors";
import { Badge } from "react-native-paper";
// import Accordion from "react-native-collapsible/Accordion";
// import { SECTIONS } from "../models/SECTIONS";
// import SlotMeal from "../components/SlotMeal";
// import CollapsibleList from "../components/orders/CollapsibleList";

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
  let { restaurant_name, _id } = restaurant;

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        chefName={restaurant_name}
        chefAddress={truncate_string("REST", _id, 5)}
      >
        <View
          style={[
            styles.switch,
            { flexDirection: "row", paddingHorizontal: 10 },
          ]}
        >
          <ToggleLunchDinner />
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 40,
            backgroundColor: "#009faf",
            padding: 2,
            paddingHorizontal: 2,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: SecondaryDarkColor,
              borderBottomWidth: 4,
              borderBottomLeftRadius: 1,
              borderBottomRightRadius: 1,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: "#FFF", fontWeight: "bold",marginEnd:1 }}>
              11:00AM-12:00PM
            </Text>
            <Badge
              style={{
                fontWeight: "bold",
                backgroundColor: "red",
                fontSize: 12,
                color: "#fff",
                position:"relative",
                bottom:8
                
              }}
              size={14}
            >
              2
            </Badge>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: "#FFF" }}>
            12:00PM-1:00PM
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: "#FFF" }}>
            1:00PM-2:00PM 
            </Text>
          </View>
        </View>
      </Header>
      {/* <Searchbar style={styles.searchbar} />
      <CollapsibleList/>
          */}
      <View style={{marginTop:28}} >
        <FlatList
          data={orders}
          // contentContainerStyle={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    display: "flex",
  },
  switch: {
    position: "absolute",
    right: 4,
    top: 8,
    color: "#dfdfdf",
  },
});
