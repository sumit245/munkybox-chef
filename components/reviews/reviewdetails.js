import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Review({ item, index }) {
  const [isReplying, setReplying] = useState(false);
  const sendReview = () => {};
  return (
    <View
      key={index}
      style={{
        marginHorizontal: 2,
        marginVertical: 2,
        borderRadius: 2,
        borderColor: "#777",
        borderWidth: 0.2,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ flexDirection: "row", padding: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Order #{item.order_id} (Bill total: ${item.base_price})
        </Text>
      </View>
      <View style={{ flexDirection: "row", padding: 8 }}>
        <Text>
          Delivered on: {item.delivered_on} |{" "}
          {item.plan_name === "twoPlan"
            ? "2 Meals"
            : item.plan_name === "fifteenPlan"
            ? "15 Meals"
            : "30 Meals"}
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
      {Array.isArray(item.likes) && (
        <View style={{ flexDirection: "row", padding: 8 }}>
          <Text>Likes: </Text>
          {item.likes.map((issue, index) => (
            <Text key={index} style={{ fontWeight: "bold" }}>
              {issue},{" "}
            </Text>
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
          onPress={setReplying}
        >
          reply
        </Text>
      </View>
      {isReplying && (
        <View style={{ flexDirection: "row", flex: 1, padding: 4 }}>
          <TextInput
            style={{
              borderBottomColor: "cyan",
              borderBottomWidth: 1,
              minWidth: "90%",
            }}
            multiline={true}
          />
          <TouchableOpacity onPress={sendReview}>
            <Icon name="ios-send" size={24} color="#226ccf" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
