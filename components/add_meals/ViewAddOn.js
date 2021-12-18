import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { width } from "../../Dimens";

export default function ViewAddOn({ add_on }) {
  const renderItem = ({ item, index }) => {
    try {
      if (item.add_on_image !== "") {
        return (
          <View
            key={index}
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
      } else {
        return (
          <View style={{ marginHorizontal: 4, marginVertical: 4 }} key={index}>
            <Text>No add ons on this day</Text>
          </View>
        );
      }
    } catch (error) {
      return null;
    }
  };
  return (
    <FlatList
      style={{
        marginTop: 16,
        paddingBottom: 4,
        borderColor: "#ccc",
        borderWidth: 0.5,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        padding: 4,
      }}
      ListHeaderComponent={() => (
        <Text style={{ margin: 8, fontWeight: "bold", fontSize: 14 }}>
          Add ons
        </Text>
      )}
      renderItem={renderItem}
      data={add_on}
      key={(item, index) => item.index}
    />
  );
}
