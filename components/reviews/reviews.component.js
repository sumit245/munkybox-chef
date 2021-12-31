import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import { Switch } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Review from "./reviewdetails";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Reviews({ navigation }) {
  const restaurant = useSelector((state) => state.restaurant);
  const [reviews, setReviews] = useState([]);
  const fetchReviews = async (id) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/review/getmyreview/" + id
    );
    const { data } = response;
    setReviews(data);
  };
  useEffect(() => {
    const { restaurant_id } = restaurant;
    fetchReviews(restaurant_id);
  }, []);
  const stars = [5, 4, 3, 2, 1];
  const renderItem = ({ item }) => <Review item={item} index={item.index} />;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 4,
            borderBottomColor: "#ddd",
            borderBottomWidth: 0.5,
          }}
        >
          <Icon name="chevron-back" size={24} />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            User Feedback
          </Text>
          <Icon name="search" size={24} />
        </View>
        {/* Header */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 4,
            borderColor: "#ddd",
            borderWidth: 0.5,
            borderRadius: 2,
            margin: 2,
            paddingHorizontal: "4%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <View style={{ marginRight: 12 }}>
              <Text>From</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                01 Dec,2021
              </Text>
            </View>
            <Icon name="ios-calendar" size={20} color="#666" />
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <View style={{ marginRight: 12 }}>
              <Text>To</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                20 Dec,2021
              </Text>
            </View>
            <Icon name="ios-calendar" size={20} color="#666" />
          </View>
        </View>
        {/* Date Picker */}
        <View
          style={{
            padding: 4,
            borderColor: "#ddd",
            borderWidth: 0.5,
            borderRadius: 2,
            margin: 2,
            paddingHorizontal: "4%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {" "}
            {reviews.length} USER REVIEW
          </Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            {stars.map((star, index) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 4,
                  width: 60,
                  borderColor: "#ddd",
                  borderRadius: 2,
                  borderWidth: 0.8,
                  marginHorizontal: 4,
                  justifyContent: "center",
                }}
              >
                <Icon name="star" size={16} color="#666" />
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#666" }}
                  key={index}
                >
                  {" "}
                  {star}
                </Text>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Switch value={true} />
            <Text style={{ fontWeight: "bold", color: "#000" }}>
              Show only orders with comments
            </Text>
          </View>
        </View>
        {/* Review Selectors */}
      </View>
      {/* <View> */}
      <FlatList
        data={reviews}
        style={{ marginBottom: 4 }}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        // contentContainerStyle={{marginBottom:10}}
      />
      {/* </View> */}
    </SafeAreaView>
  );
}
