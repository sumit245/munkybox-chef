import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Export from "../components/header/Export";
import Header from "../components/header/Header";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Item from "../components/pastorders/Item";
import ToggleLunchDinner from "../components/header/ToggleLunchDinner";

export default function PastOrders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [slot, setSlot] = useState("");
  const restaurant = useSelector((state) => state.restaurant);
  const getApiData = async () => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/orders"
    );
    const orders = await response.data;
    setOrders(orders);
  };
  useEffect(() => {
    getApiData();
  }, []);
  const renderItem = ({ item }) => (
    <Item item={item} index={item._id} navigation={navigation} />
  );
  const ListHeaderComponent = () => <Export />;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Header
        title={restaurant.restaurant_name + ", " + restaurant.restaurant_id}
      >
        <View style={styles.switch}>
          <ToggleLunchDinner handleToggle={(e) => setSlot(e)} />
        </View>
      </Header>

      <FlatList
        data={orders}
        contentContainerStyle={{ paddingBottom: 10 }}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
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
    right: 4,
    bottom: 2,
    color: "#dfdfdf",
    flexDirection: "row",
    padding: 4,
    alignItems: "center",
  },
});
