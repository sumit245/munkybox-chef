import React from "react";
import { FlatList, Text, View, Dimensions } from "react-native";
import { Card, Avatar, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";

export default function Review({ item, index }) {
  return (
    <View
      key={index}
      style={{
        marginHorizontal: 2,
        marginVertical:2,
        borderRadius: 2,
        borderColor: "#777",
        borderWidth: 0.2,
      }}
    >
      <View style={{ flexDirection: "row", padding: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Order #{item.order_id} (Bill total: ${item.base_price})
        </Text>
      </View>
      <View style={{ flexDirection: "row", padding: 8 }}>
        <Text>
          Delivered on: {item.delivered_on} | {item.plan_name}
        </Text>
      </View>
      <View style={{ flexDirection: "row", padding: 8 }}>
        <Text>Rating</Text>
        <View
          style={{
            borderRadius: 2,
            backgroundColor: "orange",
            flexDirection: "row",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Icon name="star" color="#fff" size={16} />
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 14 }}>
            {item.rating}
          </Text>
        </View>
      </View>
      {Array.isArray(item.issues) && (
        <View style={{ flexDirection: "row", padding: 8 }}>
          <Text>Issues</Text>
          {item.issues.map((issue, index) => (
            <Text key={index}>{issue}</Text>
          ))}
        </View>
      )}
      <View style={{ flexDirection: "row", padding: 8 }}>
        <Text style={{ color: "#000" }}>{item.details}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 8,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "orange",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          View order details
        </Text>
        <Text
          style={{
            color: "#226cff",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          reply
        </Text>
      </View>
    </View>
  );
}
