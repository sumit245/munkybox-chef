import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Checkbox, RadioButton, Modal, Button } from "react-native-paper";
import CalendarPicker from "react-native-calendar-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./campaign.styles";
import HeaderTwo from "../header/HeaderTwo";
import { onDateChange } from "../../helpers/commons";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { DARKGRAY } from "../../Colors";

export default function CreateCoupon({ route, navigation }) {
  const { type } = route.params;
  const [plan, setPlan] = useState(2);
  const [code, setCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [discount, setDiscount] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [lunch, setLunch] = useState(true);
  const [dinner, setDinner] = useState(false);
  const [duration, setDuration] = useState(7);

  let minDate = Date.now();

  const resetAll = () => {
    setPlan(2);
    setCode("");
    setDiscount("");
    setStartDate("");
    setEndDate("");
    setLunch(false);
    setDinner(false);
    setDuration(0);
  };

  const radioChanged = (newValue) => {
    setDuration(newValue);
    let today = moment(minDate);
    if (newValue !== 0) {
      const { start, end } = onDateChange(today, newValue - 1);
      setStartDate(start);
      setEndDate(end);
    } else {
      setStartDate("");
      setEndDate("");
    }
  };
  const onPreview = () => {
    navigation.navigate("preview_coupon", {
      type: type,
      plan: plan,
      code: code,
      lunch: lunch && "Lunch",
      dinner: dinner && "Dinner",
      duration: duration,
      start_date: start_date,
      end_date: end_date,
      discount: discount,
    });
  };
  const dateHandler = (date, duration) => {
    const { start, end } = onDateChange(date, duration - 1);
    setStartDate(start);
    setEndDate(end);
    setModalVisible(false);
  };
  const handleRangeDate = (date, type) => {
    if (type === "END_DATE") {
      setEndDate(moment(date).format("DD MMM, YYYY"));
    } else {
      setStartDate(moment(date).format("DD MMM, YYYY"));
      setEndDate(null);
    }
  };
  return (
    <SafeAreaView style={styles.container}>

      <HeaderTwo
        title={type === "net" ? "Net Discount" : "% Discount"}
        navigation={navigation}
      />
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "center" }}
        behavior="padding"
        enabled
      >
        <ScrollView>
          <View style={styles.card}>
            <Text style={styles.bigText}>Apply discount on</Text>
            <Text style={[styles.smallText, { color: DARKGRAY }]}>
              Choose the items valid for this discount{" "}
            </Text>
            <View style={styles.cardBody}>
              <RadioButton.Group
                onValueChange={(newValue) => setPlan(newValue)}
                value={plan}
              >
                <View style={styles.btnGroup}>
                  <RadioButton.Android value={2} color="#ff6600" />
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
                  <RadioButton.Android value={15} color="#ff6600" />
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
                  <RadioButton.Android value={30} color="#ff6600" />
                  <Text style={styles.bigText}>30 Meals</Text>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.bigText}>
              Select the {type === "net" ? "$" : "%"} value of discount
            </Text>
            <Text style={[styles.smallText, { color: DARKGRAY }]}>
              This {type === "net" ? "$" : "%"} discount will be offered on
              eligible orders{" "}
            </Text>
            <View style={styles.card}>
              <TextInput
                style={styles.input}
                selectionColor="#ff6600"
                placeholder={"Discount" + (type === "net" ? " $" : " %")}
                keyboardType="numeric"
                returnKeyLabel="Done"
                returnKeyType="done"
                value={discount}
                onChangeText={(text) => setDiscount(text)}
              />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.bigText}>Select Duration</Text>
            <Text style={[styles.smallText, { color: DARKGRAY }]}>
              Choose the duration you want this to run for
            </Text>
            <View style={styles.cardBody}>
              <RadioButton.Group
                onValueChange={(newValue) => radioChanged(newValue)}
                value={duration}
              >
                <View style={styles.btnGroup}>
                  <RadioButton.Android value={7} color="#ff6600" />
                  <View>
                    <Text style={styles.bigText}>7 Days</Text>
                    <Text style={[styles.smallText, { color: DARKGRAY }]}>
                      {" "}
                      Starts today till{" "}
                      {moment().add(6, "days").format("DD MMM")}
                    </Text>
                  </View>
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
                  <RadioButton.Android value={15} color="#ff6600" />
                  <View>
                    <Text style={styles.bigText}>15 Days</Text>
                    <Text style={[styles.smallText, { color: DARKGRAY }]}>
                      Starts today till{" "}
                      {moment().add(14, "days").format("DD MMM")}
                    </Text>
                  </View>
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
                  <RadioButton.Android value={0} color="#ff6600" />
                  <View>
                    <Text style={styles.bigText}>Custom duration</Text>
                    <Text style={[styles.smallText, { color: DARKGRAY }]}>
                      Select for custom offer duration
                    </Text>
                  </View>
                </View>
              </RadioButton.Group>
              {/* Radio for duration */}
              <View style={styles.optionCard}>
                <Text style={styles.optionsLabels}>Select plan duration</Text>
                <View style={styles.optionrow}>
                  <Text>
                    {start_date || "--"}
                    {" to "}
                    {end_date || "--"}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => {
                        setStartDate("");
                        setEndDate("");
                      }}

                      style={{ marginRight: 8 }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "#f00",
                        }}
                      >
                        Clear
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(true)} disabled={duration} >
                      <Icon
                        name="ios-calendar"
                        color="#ff6600"
                        size={22}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* Date Picker TODO:move to separate */}
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.bigText}>Select time slots</Text>
            <Text style={[styles.smallText, { color: DARKGRAY }]}>
              The mealtime(s) on which the offer will be available to the
              customers
            </Text>
            <View style={styles.cardBody}>
              <View style={styles.btnGroup}>
                <Checkbox.Android
                  status={lunch && !dinner ? "checked" : "unchecked"}
                  onPress={() => {
                    setLunch(true);
                    setDinner(false)
                  }}
                  color="#ff6600"
                />
                <Text>Lunch (11AM -2PM)</Text>
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
                <Checkbox.Android
                  status={dinner && !lunch ? "checked" : "unchecked"}
                  onPress={() => {
                    setDinner(true)
                    setLunch(false);
                  }}
                  color="#ff6600"
                />
                <Text>Dinner (5PM -8PM)</Text>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.bigText}>Type Promo Code</Text>
            <View style={styles.card}>
              <TextInput
                selectionColor="#ff6600"
                style={styles.input}
                placeholder="META2020"
                maxLength={8}
                onChangeText={(text) => setCode(text)}
                value={code}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomButtonGroup}>
        <LinearGradient colors={["#ffffff", "#fefefe",]} style={styles.actionButton} >
          <TouchableOpacity onPress={() => resetAll()}>
            <Text style={[styles.btnText, { color: "#000" }]}>RESET</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient colors={["#ff9900", "#ff6600"]} style={[styles.actionButton, { borderColor: "#ff6600" }]}>
          <TouchableOpacity onPress={onPreview}>
            <Text style={[styles.btnText, { color: "#fff" }]}>PREVIEW</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.calenderView}>
          <View style={styles.calendarBody}>
            {duration !== 0 ? (
              <CalendarPicker
                startFromMonday={true}
                minDate={minDate}
                todayBackgroundColor="#fff"
                selectedDayColor="#2300e6"
                selectedDayTextColor="#FFFFFF"
                scrollable
                onDateChange={(date) => dateHandler(date, duration)}
              />
            ) : (
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                minDate={minDate}
                todayBackgroundColor="#fff"
                selectedDayColor="#2300e6"
                selectedDayTextColor="#FFFFFF"
                scrollable
                onDateChange={handleRangeDate}
              />
            )}

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                mode="text"
                color="#F00"
                style={{ alignSelf: "flex-end" }}
                onPress={() => setModalVisible(false)}
              >
                cancel
              </Button>
              <Button
                mode="text"
                color="#F00"
                style={{ alignSelf: "flex-end" }}
                onPress={() => setModalVisible(false)}
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
