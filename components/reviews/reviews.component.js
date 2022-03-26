import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button, Switch, Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Review from "./reviewdetails";
import { styles } from "../campaign/campaign.styles";
import { useSelector } from "react-redux";
import axios from "axios";
import { width } from "../../Dimens";
import Loader from "../../helpers/Loader";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import {
  SecondaryColor,
  SecondaryDarkColor,
  SecondaryLightColor,
} from "../../Colors";
import HeaderTwo from "../header/HeaderTwo";
import { LinearGradient } from "expo-linear-gradient";

export default function Reviews({ navigation }) {
  const restaurant = useSelector((state) => state.restaurant);
  const [reviews, setReviews] = useState([]);
  const [tempreview, setTempReview] = useState([]);
  const [start, setStart] = useState(Date());
  const [end, setEnd] = useState(Date());
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startSelector, setStartSelector] = useState(false);
  const [endSelector, setEndSelector] = useState(false);
  const [selectedStar, setSelectedStar] = useState(0);

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

  const dateHandler = (date) => {
    if (startSelector) {
      setStart(date);
    } else {
      setEnd(date);
    }
    setShowCalendar(!showCalendar);
  };
  const filterFromDate = () => {
    setSelectedStar(0);
    let review = tempreview.filter(
      (item) =>
        moment(item.review_at) >= moment(start) &&
        moment(item.review_at) <= moment(end).add(1, "day")
    );
    setReviews(review);
  };
  useEffect(() => {
    filterFromDate();
  }, [start, end]);
  const selectStartDate = () => {
    setStartSelector(true);
    setShowCalendar(!showCalendar);
  };
  const selectEndDate = () => {
    setStartSelector(false);
    setEndSelector(true);
    setShowCalendar(!showCalendar);
  };
  const filterStar = (star) => {
    setLoading(true);
    setSelectedStar(star);
    let allreview = [...tempreview];
    let fliteredReview = allreview.filter((item) => item.rating === star);
    setReviews(fliteredReview);
    setLoading(false);
  };
  const filterwithComment = () => {
    setComment(!comment);
    setSelectedStar(0);
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
    <Review item={item} index={item._id} navigation={navigation} />
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
            <Text style={{ color: "#ff6600" }}>FROM</Text>
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
              {moment(start).format("DD-MMM-YYYY")}
            </Text>
          </View>
          <TouchableOpacity onPress={selectStartDate}>
            <Icon name="ios-calendar" size={20} color="#ff6600" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <View style={{ marginRight: 12 }}>
            <Text style={{ color: "#ff6600" }}>TO</Text>
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
              {moment(end).format("DD-MMM-YYYY")}
            </Text>
          </View>
          <TouchableOpacity onPress={selectEndDate}>
            <Icon name="ios-calendar" size={20} color="#ff6600" />
          </TouchableOpacity>
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
            <LinearGradient colors={star === selectedStar ? ["#ff9900", "#ff6600"] : ["#ffffff", "transparent"]} style={{
              width: 60,
              borderColor: "#ddd",
              borderRadius: 2,
              borderWidth: 0.8,
              marginHorizontal: 4,
              justifyContent: "center",

            }}>
              <TouchableOpacity
                onPress={() => filterStar(star)}
                style={{ flexDirection: "row", alignItems: "center", padding: 4,justifyContent:"center" }}
              >
                <Icon
                  name="star"
                  size={16}
                  color={star === selectedStar ? "#fff" : "#ff6600"}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: star === selectedStar ? "#fff" : "#ff6600",
                  }}
                  key={index}
                >
                  {" "}
                  {star}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
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
      <HeaderTwo title="User Feedback" />
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={showCalendar}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.calenderView}>
          <View style={styles.calendarBody}>
            <CalendarPicker
              startFromMonday={true}
              todayBackgroundColor="#fff"
              selectedDayColor="#2300e6"
              selectedDayTextColor="#FFFFFF"
              scrollable
              onDateChange={(date) => dateHandler(date)}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                mode="text"
                color="#F00"
                style={{ alignSelf: "flex-end" }}
                onPress={() => setShowCalendar(false)}
              >
                cancel
              </Button>
              <Button
                mode="text"
                color="#F00"
                style={{ alignSelf: "flex-end" }}
                onPress={() => setShowCalendar(false)}
              >
                done
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
