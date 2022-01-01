import moment from "moment";
import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { avatarify } from "../../helpers/truncate_string";
import { useSelector } from "react-redux";

export default function Review({ item, index }) {
  const [isReplying, setReplying] = useState(false);
  const restaurant = useSelector((state) => state.restaurant);
  const { restaurant_name } = restaurant;
  const sendReview = () => {
    setReplying(!isReplying);
  };
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
      <Text
        style={{
          color: "orange",
          fontWeight: "bold",
          textTransform: "uppercase",
          padding: 8,
          textAlign: "right",
        }}
      >
        details
      </Text>

      <View>
        <View
          style={{ flexDirection: "row", alignItems: "flex-start", margin: 2 }}
        >
          <View
            style={{
              height: 48,
              width: 48,
              borderRadius: 24,
              backgroundColor: "purple",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 8,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FFF" }}>
              {avatarify(item.user_name)}
            </Text>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Order #{item.order_id} (Bill total: ${item.base_price})
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {item.user_name}
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: 24 }}>
          <View style={{ flexDirection: "row", padding: 4 }}>
            <Text>
              Delivered on: {item.delivered_on} |{" "}
              {item.plan_name === "twoPlan"
                ? "2 Meals"
                : item.plan_name === "fifteenPlan"
                ? "15 Meals"
                : "30 Meals"}
            </Text>
          </View>
          <View style={{ padding: 4 }}>
            <Text>
              Ordered on: {moment(item.order_time).format("DD-MMM-YYYY")}{" "}
            </Text>
          </View>
          <View style={{ flexDirection: "row", padding: 4 }}>
            <Text>Rating:{"  "}</Text>
            <View
              style={{
                borderRadius: 2,
                backgroundColor: "orange",
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Icon name="star" color="#fff" size={12} />
              <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 12 }}>
                {item.rating}
              </Text>
            </View>
          </View>
          {Array.isArray(item.likes) && (
            <View style={{ flexDirection: "row", padding: 4 }}>
              <Text>Likes:{"   "}</Text>
              {item.likes.map((issue, index) => (
                <View
                  style={{
                    paddingHorizontal: 4,
                    padding: 2,
                    backgroundColor: "#0064b7",
                    borderRadius: 2,
                    marginHorizontal: 2,
                  }}
                >
                  <Text
                    key={index}
                    style={{ fontWeight: "bold", color: "#fff", fontSize: 12 }}
                  >
                    {issue}
                  </Text>
                </View>
              ))}
            </View>
          )}
          <View style={{ flexDirection: "row", padding: 4 }}>
            <Text style={{ color: "#000" }}>Comment: </Text>
            <Text style={{ color: "#000" }}>{item.details}</Text>
          </View>
        </View>
        <View style={{ marginLeft: 60 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 12, marginRight: 4 }}>
              {restaurant_name}
            </Text>
            <View
              style={{
                paddingHorizontal: 4,
                padding: 1,
                backgroundColor: "#4464b7",
                borderRadius: 14,
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 2,
              }}
            >
              <Text
                style={{ color: "#fff", fontSize: 10, textAlign: "center" }}
              >
                Replied ✔
              </Text>
            </View>
          </View>
          <Text>Comment from Chef</Text>
        </View>
      </View>

      {isReplying ? (
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 8,
            margin: 2,
            borderRadius: 20,
            borderColor: "#777",
            borderWidth: 1,
            alignItems: "baseline",
          }}
        >
          <TextInput
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              minWidth: "88%",
            }}
            multiline={true}
            maxLength={450}
            placeholder="Type a message"
          />
          <TouchableOpacity onPress={sendReview}>
            <Icon name="ios-send-outline" size={24} color="#3646ee" />
          </TouchableOpacity>
        </View>
      ) : (
        <Text
          style={{
            color: "#226cff",
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: "right",
            padding: 4,
          }}
          onPress={setReplying}
        >
          reply
        </Text>
      )}
    </View>
  );
}
