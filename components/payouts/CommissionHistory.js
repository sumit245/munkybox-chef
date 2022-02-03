import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  StyleSheet,
} from "react-native";

import React, { useState } from "react";
import Header from "../header/Header";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export default function CommissionHistory() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState(null);
  const onChangeSearch = (query) => setSearchQuery(query);
  const ListEmptyContent = () => (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>No orders to display</Text>
    </View>
  );
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
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
      <Text>Total Commission Amount: $ 0.00 </Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        ListEmptyComponent={ListEmptyContent}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
