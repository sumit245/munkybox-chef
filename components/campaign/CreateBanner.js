import React, { useRef, useState, useEffect } from "react";
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
import {
  DARKGRAY,
  SecondaryDarkColor,
  SecondaryLightColor,
  WHITE,
} from "../../Colors";
import CalendarPicker from "react-native-calendar-picker";
import { onDateChange } from "../../helpers/commons";
import moment from "moment";
import { IconButton } from "react-native-paper";

export default function CreateBanner({ route, navigation }) {
  const { title, duration, rpc, advert_id, restaurant } = route.params;
  const minDate = Date.now();
  const [selectedEndDate, setSelecteEndDate] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [discTypes, setdiscTypes] = useState(["%", "$"]);

  const dateHandler = (date, type) => {
    if (date !== null) {
      const { start, end } = onDateChange(date, duration.split(" ")[0] - 1);
      let startDate = moment(start, "DD-MM-YYYY").toDate();
      setSelectedStartDate(date);
      let myDate = moment(end, "DD-MMM-YYYY").toDate();
      setSelecteEndDate(myDate);
    }
  };
  const submitBanner = () => {
    const start_date = moment(selectedStartDate, "DD-MMM-YYYY").toString();
    const end_date = moment(selectedEndDate, "DD-MMM-YYYY").toString();
    navigation.navigate("preview_banner", {
      title,
      duration,
      rpc,
      advert_id,
      start_date,
      end_date,
      code,
      discount,
      restaurant,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTwo title={title} navigation={navigation} />
      <ScrollView>
        <View>
          <Text style={[styles.bigText, { color: "#fff", padding: 8 }]}>
            Campaign details
          </Text>
          <Text
            style={[
              styles.smallText,
              { color: "#fff", paddingHorizontal: 8, paddingVertical: 2 },
            ]}
          >
            <Icon name="checkmark" size={16} color="#FFF" /> Appears for most
            relevant customers
          </Text>
          <Text
            style={[
              styles.smallText,
              { color: "#fff", paddingHorizontal: 8, paddingVertical: 2 },
            ]}
          >
            <Icon name="checkmark" size={16} color="#FFF" /> Pay only when
            customers click on the ad
          </Text>
          <Text
            style={[
              styles.smallText,
              { color: "#fff", paddingHorizontal: 8, paddingVertical: 2 },
            ]}
          >
            <Icon name="checkmark" size={16} color="#FFF" /> Get upto 2.5X ROI
          </Text>
          <Text
            style={[
              styles.smallText,
              { color: "#fff", paddingHorizontal: 8, paddingVertical: 2 },
            ]}
          >
            <Icon name="checkmark" size={16} color="#FFF" /> Witness 50% growth
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
            <Text style={styles.bigText}>
              <Icon name="pricetag" size={14} color={SecondaryDarkColor} />$
              {rpc}
              /click
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={[styles.bigText, { fontSize: 16 }]}>
            Pick a start date
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
            selectedDayColor="#ccc"
            selectedDayTextColor="#FFFFFF"
            previousComponent={
              <Icon name="chevron-back" size={18} color="#000" />
            }
            nextComponent={
              <Icon name="chevron-forward" size={18} color="#000" />
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
              style={styles.input}
              placeholder="PROMO CODE"
              onChangeText={setCode}
            />
          </View>
        </View>
        <View style={styles.card}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.bigText}>Add discount</Text>
            <View>
              <IconButton icon="chevron-down" size={24} color="#666" />
              {discTypes.map((data) => (
                <Text >{data}</Text>
              ))}
            </View>
          </View>
          <View style={styles.cardBody}>
            <TextInput
              style={styles.input}
              placeholder="$5"
              onChangeText={setDiscount}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomButtonGroup}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { width: "100%", backgroundColor: "#226ccf" },
          ]}
          onPress={submitBanner}
        >
          <Text style={[styles.btnText, { color: "#FFF" }]}>
            REVIEW CPC AD CAMPAIGN
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
