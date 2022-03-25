import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import HeaderTwo from "../header/HeaderTwo";
import { styles } from "./campaign.styles";
import Icon from "react-native-vector-icons/Ionicons";
import { SecondaryDarkColor } from "../../Colors";
import CalendarPicker from "react-native-calendar-picker";
import { onDateChange } from "../../helpers/commons";
import { RadioButton } from "react-native-paper";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";

export default function CreateBanner({ route, navigation }) {
  const { title, duration, rpc, advert_id, restaurant, restaurant_id } =
    route.params;
  let minDate = Date.now();
  // minDate = minDate + 24 * 60 * 60 * 1000;
  const [selectedEndDate, setSelecteEndDate] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [code, setCode] = useState("");
  const [expand, setExpand] = useState(false);
  const [discount, setDiscount] = useState("");
  const [discTypes, setdiscTypes] = useState(["$", "%"]);
  const [discount_type, setDiscountType] = useState("%");
  const [plan, setPlan] = useState("");

  const dateHandler = (date, type) => {
    if (date !== null) {
      const { start, end } = onDateChange(date, duration.split(" ")[0] - 1);
      let startDate = moment(start, "DD-MM-YYYY").toDate();
      setSelectedStartDate(date);
      let myDate = moment(end, "DD-MMM-YYYY").toDate();
      setSelecteEndDate(myDate);
    }
  };
  useEffect(() => {
    setSelectedStartDate(minDate)
    let endDate = moment(minDate).add(duration - 1, "days")
    setSelecteEndDate(endDate)

  }, []);
  const submitBanner = () => {
    const start_date = moment(selectedStartDate, "DD-MMM-YYYY").toString();
    const end_date = moment(selectedEndDate, "DD-MMM-YYYY").toString();
    navigation.navigate("preview_banner", {
      title,
      duration,
      rpc,
      advert_id,
      start_date: moment().toString(),
      end_date,
      code,
      discount_type,
      discount,
      plan,
      restaurant,
    });
  };
  const toggleSelector = (state) => {
    setExpand(state);
  };
  const selectDiscount = (data) => {
    setDiscountType(data);
    setExpand(!expand);
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTwo title={title} navigation={navigation} />
      <ScrollView>
        <View>
          <Text style={[styles.bigText, { color: "#000", padding: 8 }]}>
            Campaign details
          </Text>
          <Text
            style={[
              styles.smallText,
              { color: "#000", paddingHorizontal: 8, paddingVertical: 2 },
            ]}
          >
            <Icon name="checkmark" size={16} color="#ff6600" /> Appears for most
            relevant customers
          </Text>
          <Text
            style={[
              styles.smallText,
              { color: "#000", paddingHorizontal: 8, paddingVertical: 2 },
            ]}
          >
            <Icon name="checkmark" size={16} color="#ff6600" /> Pay only when
            customers click on the ad
          </Text>
          <Text
            style={[
              styles.smallText,
              { color: "#000", paddingHorizontal: 8, paddingVertical: 2 },
            ]}
          >
            <Icon name="checkmark" size={16} color="#ff6600" /> Get upto 2.5X ROI
          </Text>
          <Text
            style={[
              styles.smallText,
              { color: "#000", paddingHorizontal: 8, paddingVertical: 2 },
            ]}
          >
            <Icon name="checkmark" size={16} color="#ff6600" /> Witness 50% growth
            in new customers
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>
            Choose duration
          </Text>
          <Text style={styles.smallText}>You are a valueable customer</Text>
          <View
            style={[
              styles.cardBody,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <Text style={styles.bigText}>{duration} days</Text>
            <Text style={[styles.bigText,{color:"#ff6600"}]}>
              <Icon name="pricetag" size={14} color="#ff6600" />$
              {rpc}
              /click
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={[styles.bigText, { fontSize: 16 }]}>
            Duration
          </Text>
          <Text
            style={[
              styles.smallText,
              { backgroundColor: "#efefef", padding: 4 },
            ]}
          >
            You can run the {title} ad campaign only if there is no ongoing{" "}
            {title} ad campaign on the selected dates
          </Text>

          <CalendarPicker
            startFromMonday={true}
            minDate={minDate}
            allowRangeSelection
            todayBackgroundColor="#e6ffe6"
            selectedDayColor="#ff6600"
            selectedDayTextColor="#FFFFFF"
            previousComponent={
              <Icon name="chevron-back" size={18} color="#ff6600" />
            }
            nextComponent={
              <Icon name="chevron-forward" size={18} color="#ff6600" />
            }
            selectedEndDate={selectedEndDate}
            selectedStartDate={selectedStartDate}
            scrollable
            onDateChange={dateHandler}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.bigText}>Add promo code</Text>
          <View style={styles.cardBody}>
            <TextInput
              selectionColor="#ff6600"
              style={styles.input}
              placeholder="PROMO CODE"
              onChangeText={setCode}
            />
          </View>
        </View>
        <View style={styles.card}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.bigText}>Add discount</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginHorizontal: 4,
                padding: 0,
              }}
            >
              {expand ? (
                <View
                  style={{
                    padding: 4,
                    borderColor: "#ff6600",
                    borderWidth: 0.2,
                    borderRadius: 1,
                  }}
                >
                  {discTypes.map((data, key) => (
                    <Text
                      key={key}
                      style={{ fontSize: 16, fontWeight: "bold",color:"#ff6600" }}
                      onPress={() => selectDiscount(data)}
                    >
                      {data}
                    </Text>
                  ))}
                </View>
              ) : (
                <View
                  style={{
                    padding: 4,
                    borderColor: "#ff6600",
                    borderWidth: 0.2,
                    borderRadius: 1,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: "bold",color:"#ff6600" }}>
                    {discount_type}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                onPress={() => toggleSelector(!expand)}
                style={{
                  borderColor: "#ff6600",
                  borderLeftWidth: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderWidth: 0.5,
                  paddingVertical: 1,
                  borderRadius: 1,
                }}
              >
                <Icon name="chevron-down" size={22} color="#ff6600" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardBody}>
            <TextInput
              style={styles.input}
              selectionColor="#ff6600"
              placeholder="$5"
              onChangeText={setDiscount}
            />
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.bigText}>Apply discount on</Text>
          <Text style={styles.smallText}>
            Choose the items valid for this discount{" "}
          </Text>
          <View style={styles.cardBody}>
            <RadioButton.Group
              onValueChange={(newValue) => setPlan(newValue)}
              value={plan}
            >
              <View style={styles.btnGroup}>
                <RadioButton.Android value="2 Meals" color="#ff6600" />
                <Text style={styles.bigText}>2 Meals</Text>
              </View>
              <View
                style={{
                  marginVertical: 6,
                  marginHorizontal: "10%",
                  borderTopColor: "#ccc",
                  borderTopWidth: 0.5,
                }}
              />
              <View style={styles.btnGroup}>
                <RadioButton.Android value="15 Meals" color="#ff6600" />
                <Text style={styles.bigText}>15 Meals</Text>
              </View>
              <View
                style={{
                  marginVertical: 6,
                  marginHorizontal: "10%",
                  borderTopColor: "#ccc",
                  borderTopWidth: 0.5,
                }}
              />
              <View style={styles.btnGroup}>
                <RadioButton.Android value="30 Meals" color="#ff6600" />
                <Text style={styles.bigText}>30 Meals</Text>
              </View>
            </RadioButton.Group>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomButtonGroup}>
        <LinearGradient colors={["#ff9900", "#ff6600"]} style={[
          styles.actionButton,
          { width: "96%",borderColor:"#ff6600",marginHorizontal:"2%" },
        ]}>
          <TouchableOpacity onPress={submitBanner}>
            <Text style={[styles.btnText, { color: "#FFF" }]}>
              REVIEW CPC AD CAMPAIGN
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}
