import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { width } from "../../Dimens";

export default function ViewAddOn({ add_on }) {
  const renderItem = ({ item }) => {
    try {
      return (
        <View
          key={item.index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 16,
            marginVertical: 4,
          }}
        >
          <View style={{ width: width / 3 }}>
            <Text style={{ fontSize: 14, color: "#000" }}>{item.add_on}</Text>
          </View>
          <View style={{ width: width / 2 }}>
            <Image
              source={{ uri: item.add_on_image }}
              style={{ width: "80%", height: 80 }}
            />
          </View>
          <View style={{ width: width / 3 }}>
            <Text style={{ fontSize: 14, color: "#000" }}>
              ${item.add_on_price}
            </Text>
          </View>
        </View>
      );
    } catch (error) {
      return null;
    }
  };
  return (
    <FlatList
      renderItem={renderItem}
      data={add_on}
      key={(item, index) => index}
    />
  );
}
