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
import { PrimaryLight, WHITE } from "../../Colors";
import { styles } from "./campaign.styles";
import HeaderTwo from "../header/HeaderTwo";
import { onDateChange } from "../../helpers/commons";
import moment from "moment";
export default function CreateCoupon({ route, navigation }) {
  const { type } = route.params;
  const [plan, setPlan] = useState(2);
  const [code, setCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [discount, setDiscount] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [duration, setDuration] = useState(7);
  const minDate = Date.now();
  const resetAll=()=>{
    setPlan(2)
    setCode("")
    setDiscount("")
    setStartDate("")
    setEndDate("")
    setLunch(false)
    setDinner(false)
    setDuration(0)
  }
  const radioChanged=(newValue)=>{
    setDuration(newValue)
    setStartDate("")
    setEndDate("")
  }
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
    const { start, end } = onDateChange(date, duration);
    setStartDate(start);
    setEndDate(end);
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTwo
        title={type === "net" ? "Net Discount" : "% Discount"}
        navigation={navigation}
      />
<KeyboardAvoidingView style={{flex:1,justifyContent:"center"}} behavior="padding" enabled >
      <ScrollView>
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
                <RadioButton.Android value={2} color="#226ccf" />
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
                <RadioButton.Android value={15} color="#226ccf" />
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
                <RadioButton.Android value={30} color="#226ccf" />
                <Text style={styles.bigText}>30 Meals</Text>
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.bigText}>
            Select the {type === "net" ? "$" : "%"} value of discount
          </Text>
          <Text style={styles.smallText}>
            This {type === "net" ? "$" : "%"} discount will be offered on
            eligible orders{" "}
          </Text>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
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
          <Text style={styles.smallText}>
            Choose the duration you want this to run for
          </Text>
          <View style={styles.cardBody}>
            <RadioButton.Group
              onValueChange={(newValue) => radioChanged(newValue)}
              value={duration}
            >
              <View style={styles.btnGroup}>
                <RadioButton.Android value={7} color="#226ccf" />
                <View>
                  <Text style={styles.bigText}>7 Days</Text>
                  <Text style={styles.smallText}>
                    {" "}
                    Starts today till {moment().add(7, "days").format("DD MMM")}
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
                <RadioButton.Android value={15} color="#226ccf" />
                <View>
                  <Text style={styles.bigText}>15 Days</Text>
                  <Text style={styles.smallText}>
                    Starts today till{" "}
                    {moment().add(15, "days").format("DD MMM")}
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
                <RadioButton.Android value={30} color="#226ccf" />
                <View>
                  <Text style={styles.bigText}>Custom duration</Text>
                  <Text style={styles.smallText}>
                    Select for custom offer duration
                  </Text>
                </View>
              </View>
            </RadioButton.Group>
            {/* Radio for duration */}
            <View style={styles.optionCard}>
              <Text style={styles.optionsLabels}>Select plan duration</Text>
              <View
                style={styles.optionrow}
                
              >
                <Text>
                  {start_date || "--"}
                  {" to "}
                  {end_date || "--"}
                </Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <TouchableOpacity onPress={()=>{
                  setStartDate("")
                  setEndDate("")
                }}
                style={{marginRight:8}}
                >
                <Text style={{fontSize:12,fontWeight:"bold",color:"#f00"}}>Clear</Text>
                  </TouchableOpacity>
                <TouchableOpacity onPress={()=>setModalVisible(true)}>
                <Icon name="ios-calendar-outline" color="#226ccf" size={22} />
                  </TouchableOpacity>
                </View>

              </View>
            </View>
            {/* Date Picker TODO:move to separate */}
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.bigText}>Select time slots</Text>
          <Text style={styles.smallText}>
            The mealtime(s) on which the offer will be available to the
            customers
          </Text>
          <View style={styles.cardBody}>
            <View style={styles.btnGroup}>
              <Checkbox.Android
                status={lunch ? "checked" : "unchecked"}
                onPress={() => {
                  setLunch(!lunch);
                }}
                color="#226ccf"
              />
              <Text>Lunch (10AM -2PM)</Text>
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
                status={dinner ? "checked" : "unchecked"}
                onPress={() => {
                  setDinner(!dinner);
                }}
                color="#226ccf"
              />
              <Text>Dinner (7pm -10pm)</Text>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.bigText}>Type Promo Code</Text>
          <View style={styles.card}>
            <TextInput
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
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: WHITE }]}
          onPress={()=>resetAll()}
        >
          <Text style={[styles.btnText, { color: PrimaryLight }]}>RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: PrimaryLight }]}
          onPress={onPreview}
        >
          <Text style={[styles.btnText, { color: WHITE }]}>PREVIEW</Text>
        </TouchableOpacity>
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
            <CalendarPicker
              startFromMonday={true}
              minDate={minDate}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor="#2300e6"
              selectedDayTextColor="#FFFFFF"
              scrollable
              onDateChange={(date) => dateHandler(date, duration)}
            />
            <Button
              mode="text"
              color="#F00"
              style={{ alignSelf: "flex-end" }}
              onPress={() => setModalVisible(false)}
            >
              cancel
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}