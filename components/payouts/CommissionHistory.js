import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import Header from "../header/Header";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

export default function CommissionHistory() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <SafeAreaView>
      <Header title="Commission History" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 2,
          marginHorizontal: 2,
        }}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ width: "90%", height: 28, marginRight: 8 }}
        />
        <TouchableOpacity style={{ width: "8%", marginLeft: 4 }}>
          <Icon name="calendar" size={20} color="#205000" />
        </TouchableOpacity>
          </View>
          <Text>Total Commission Amount</Text>
      <View style={{ justifyContent: "center", alignItems: "center",flex:1 }}>
        <Text>No orders to display</Text>
          </View>
        
    </SafeAreaView>
  );
}
