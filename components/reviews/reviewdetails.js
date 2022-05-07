import moment from "moment";
import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { avatarify } from "../../helpers/truncate_string";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Review({ item, index, navigation }) {
  const [isReplying, setReplying] = useState(false);
  const [text, onChangeText] = useState("");
  const restaurant = useSelector((state) => state.restaurant);
  const { restaurant_name } = restaurant;
  const [star, setStars] = useState([]);

  const fetchStar = () => {
    let stars = [];
    for (let index = 0; index < parseInt(item.rating); index++) {
      stars.push(index);
    }
    setStars(stars);
  };

  useEffect(() => {
    fetchStar();
  }, [item]);

  const fetchOrderById = async (id) => {
    const res = await axios.get(
      "http://54.146.133.108:5000/api/orders/getOrderbyID/" + id
    );
    const { data } = res;
    if (data !== null) {
      navigation.navigate("orderDetails", {
        order: data,
      });
    } else {
      alert("No Matching Order Found!!!");
    }
  };

  const submitReply = async () => {
    setReplying(!isReplying);
    let reply = {
      role: "chef",
      body: text,
      restaurant_name: restaurant_name,
      commented_at: moment(),
    };
    let myReply = [reply];
    let id = item._id;
    const response = await axios.put(
      "http://54.146.133.108:5000/api/review/" + id,
      { comments: myReply }
    );
    const { data } = response;

    if (data !== null) {
      alert("Your reply has been updated!!!");
    }
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 8,
          marginHorizontal: 4,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          #{item.order_id} (Bill total: ${item.base_price})
        </Text>
        <Text
          style={{
            color: "#ff6600",
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: "right",
          }}
          onPress={() => fetchOrderById(item.order_id)}
        >
          details
        </Text>
      </View>
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
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {item.user_name}
            </Text>
            <Text style={{ fontSize: 14, marginVertical: 2 }}>
              Reviewed at:{" "}
              {moment(item.review_at).format("DD MMM YYYY hh:mm:ss")}
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: 24 }}>
          <View
            style={{
              flexDirection: "row",
              padding: 4,
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <Text>Start Date: {item.start_date}</Text>
            <Text>End Date: {item.end_date}</Text>
          </View>
          <View style={{ padding: 4 }}>
            <Text>
              Ordered on: {moment(item.order_time).format("DD-MMM-YYYY")} |{" "}
              {item.plan_name === "twoPlan"
                ? "2 Meals"
                : item.plan_name === "fifteenPlan"
                ? "15 Meals"
                : "30 Meals"}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", padding: 4, alignItems: "center" }}
          >
            <Text>Rating:{"  "}</Text>
            {star.map((x, i) => (
              <Icon
                name="star"
                color="#ff6600"
                size={14}
                style={{ padding: 2 }}
                key={i}
              />
            ))}
          </View>
          {Array.isArray(item.likes) && (
            <View
              style={{ flexDirection: "row", padding: 4, flexWrap: "wrap" }}
            >
              <Text>Likes:{"   "}</Text>
              {/* <View style={{ flexDirection: "row" }}> */}
              {item.likes.map((issue, index) => (
                <View
                  style={{
                    paddingHorizontal: 4,
                    padding: 2,
                    backgroundColor: "#ff9900",
                    borderRadius: 2,
                    marginHorizontal: 2,
                    marginVertical: 2,
                  }}
                >
                  <Text
                    key={index}
                    style={{
                      fontWeight: "bold",
                      color: "#fff",
                      fontSize: 12,
                    }}
                  >
                    {issue}
                  </Text>
                </View>
              ))}
              {/* </View> */}
            </View>
          )}
          <View style={{ flexDirection: "row", padding: 4 }}>
            <Text style={{ color: "#000" }}>Comment: </Text>
            <Text style={{ color: "#000", flex: 1, flexWrap: "wrap" }}>
              {item.details}
            </Text>
          </View>
        </View>
        {item.comments.length > 0 ? (
          <View
            style={{
              marginLeft: 60,
              marginVertical: 16,
              backgroundColor: "#ededed",
              padding: 8,
              borderRadius: 12,
              maxWidth: "80%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 12, marginRight: 4 }}
              >
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
            <Text>{item.comments[0].body}</Text>
          </View>
        ) : null}
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
              flex:1,
              flexWrap:'wrap'
            }}
            onChangeText={onChangeText}
            multiline={true}
            numberOfLines={4}
            selectionColor="#ff6600"
            maxLength={450}
            placeholder="Type a message"
          />
          <TouchableOpacity onPress={submitReply}>
            <Icon name="ios-send-sharp" size={24} color="#ff6600" />
          </TouchableOpacity>
        </View>
      ) : (
        <Text
          style={{
            color: "#226ccf",
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
