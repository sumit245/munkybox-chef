import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Header from "../components/header/Header";
import Export from "../components/header/Export";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Item from "../components/pastorders/Item";
import Icon from "react-native-vector-icons/Ionicons";

export default function PastOrders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const restaurant = useSelector((state) => state.restaurant);
  const getApiData = async () => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/orders"
    );
    const orders = await response.data;
    let myOrders = await orders.filter(
      (item) => (item.restaurant === restaurant.restaurant_name)
    );

    setOrders(myOrders.reverse());
  };
  useEffect(() => {
    getApiData();
  }, []);
  const renderItem = ({ item }) => (
    <Item item={item} index={item._id} navigation={navigation} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={restaurant.restaurant_name + ", " + restaurant.restaurant_id}
      >
        
      </Header>
      <TouchableOpacity
        style={{
          alignSelf: "flex-start",
          marginHorizontal: 8,
          marginVertical: 4,
        }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={24} color="#2277fc" />
      </TouchableOpacity>
      <FlatList
        data={orders}
        contentContainerStyle={{ paddingBottom: 10 }}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
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
    left: "90%",
    bottom: 2,
    color: "#dfdfdf",
    flexDirection: "row",
    padding: 4,
    alignItems: "center",
  },
});
