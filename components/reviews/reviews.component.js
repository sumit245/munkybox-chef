import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Switch } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Review from "./reviewdetails";
import { useSelector } from "react-redux";
import axios from "axios";
import { width } from "../../Dimens";
import Loader from "../../helpers/Loader";

export default function Reviews({ navigation }) {
  const restaurant = useSelector((state) => state.restaurant);
  const [reviews, setReviews] = useState([]);
  const [tempreview, setTempReview] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState(false);

  const fetchReviews = async (id) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/review/getmyreview/" + id
    );
    const { data } = response;
    setTempReview(data.reverse());
    setReviews(data);
    setLoading(false);
  };
  useEffect(() => {
    const { restaurant_id } = restaurant;
    fetchReviews(restaurant_id);
  }, []);

  const calendar = () => {};

  const filterStar = (star) => {
    setLoading(true);
    let allreview = [...tempreview];
    let fliteredReview = allreview.filter((item) => item.rating === star);
    setReviews(fliteredReview);
    setLoading(false);
  };
  const filterwithComment = () => {
    setComment(!comment);
    console.log(comment);
    let allreview = [...tempreview];
    let filteredReview = allreview.filter((item) => item.details !== "");

    if (!comment) {
      setReviews(filteredReview);
    } else {
      setReviews(tempreview);
    }
  };
  const stars = ["5", "4", "3", "2", "1"];
  
  const renderItem = ({ item }) => (
    <Review item={item} index={item.index} navigation={navigation} />
  );

  const ListHeaderComponent = () => (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 4,
          height: 80,
          borderColor: "#ddd",
          borderWidth: 0.5,
          borderRadius: 2,
          backgroundColor: "#fff",
          margin: 2,
          marginBottom: 8,
          paddingHorizontal: "4%",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <View style={{ marginRight: 12 }}>
            <Text>FROM</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                minWidth: width / 3,
                borderBottomColor: "#000",
                borderBottomWidth: 1,
                marginVertical: 2,
              }}
            >
              {start}
            </Text>
          </View>
          <TouchableOpacity onPress={calendar}>
            <Icon name="ios-calendar" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <View style={{ marginRight: 12 }}>
            <Text>TO</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                minWidth: width / 3,
                borderBottomColor: "#000",
                borderBottomWidth: 1,
                marginVertical: 2,
              }}
            >
              {end}
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
          backgroundColor: "#fff",
          borderRadius: 2,
          margin: 2,
          paddingHorizontal: "4%",
          marginVertical: 8,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 14, marginVertical: 8 }}>
          {" "}
          {reviews.length} USER REVIEW
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginVertical: 20,
          }}
        >
          {stars.map((star, index) => (
            <TouchableOpacity
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
              onPress={() => filterStar(star)}
            >
              <Icon name="star" size={16} color="#666" />
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#666" }}
                key={index}
              >
                {" "}
                {star}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Switch value={comment} onValueChange={filterwithComment} />
          <Text style={{ fontWeight: "bold", color: "#000", marginLeft: 4 }}>
            {"  "}Show only orders with comments
          </Text>
        </View>
      </View>
    </>
  );
  const ListEmptyComponent = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        You don't have any reviews yet!!!
      </Text>
      <Text>Start accepting orders to stay on top pick of user</Text>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 4,
          borderBottomColor: "#ddd",
          borderBottomWidth: 0.5,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={28} color="#223fdc" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>User feedback</Text>
        <View />
      </View>
      {/* Header done */}

      {!loading ? (
        <FlatList
          data={reviews}
          style={{ marginBottom: 4 }}
          ListEmptyComponent={ListEmptyComponent}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          contentContainerStyle={{ marginBottom: 10 }}
        />
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
}
