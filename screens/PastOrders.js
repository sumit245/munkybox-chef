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
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Item from "../components/pastorders/Item";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

export default function PastOrders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const restaurant = useSelector((state) => state.restaurant);
  const getApiData = async () => {
    const response = await axios.get(
      "http://54.146.133.108:5000/api/orders"
    );
    const orders = await response.data;
    let myOrders = await orders.filter(
      (item) => (item.restaurant_id === restaurant.restaurant_id)
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
      <View style={{ flexDirection: "row", justifyContent: "flex-start", backgroundColor: "#fff", width: "100%", alignItems: "center" }}>
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
          title={restaurant.restaurant_name + ", " + restaurant.restaurant_id}
        />
      </View>
      {/* Header other style */}

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
