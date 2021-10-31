import React from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CountDown from "react-native-countdown-component";
import { DARKGRAY, SecondaryColor, WHITE } from "../../Colors";
import { width } from "../../Dimens";
import Header from "../header/Header";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    order_id: "ORD001",
    base_price: "150",
    user_name: "Sumit Ranjan",
    plan: "30 Days",
    start_date: "14th October",
    end_date: "13th November",
    slot: "Lunch",
    order_time: "October 12th, 05:40PM",
    address: "A967/D, Mayur Vihar,Delhi",
    city: "Delhi",
    postal_code: "110011",
  },
];
const Item = ({ item }) => {
  const { address } = item;
  const { address_type, flat_num, city, locality, postal_code } = address;
  return (
    <View style={styles.ordercard}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.orderId}>{"#" + item.order_id}</Text>
        <CountDown
          until={60 * 5}
          size={12}
          onFinish={() => alert("Finished")}
          digitStyle={{
            backgroundColor: "#FFF",
            margin: 0,
          }}
          digitTxtStyle={{
            color: "#1CC625",
            fontSize: 14,
            fontWeight: "bold",
          }}
          timeLabelStyle={{
            fontWeight: "bold",
            color: "#1CC625",
            fontSize: 10,
            marginTop: -10,
          }}
          timeToShow={["M", "S"]}
          separatorStyle={{ color: "#1CC625", marginTop: -8 }}
          timeLabels={{ m: "Min", s: "Sec" }}
          showSeparator
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Text style={{ color: DARKGRAY, fontWeight: "bold" }}>
          {item.user_name}
        </Text>
        <Text style={{ color: DARKGRAY, fontWeight: "bold" }}>
          {"$" + item.price}
        </Text>
      </View>
      <Text style={{ textAlign: "center", color: "#000" }}>
        You have a new{" "}
        {item.plan === "twoPlan"
          ? "2"
          : item.plan === "fifteenPlan"
          ? "15"
          : "30"}{" "}
        meals subscription starting from {item.start_date} upto {item.end_date}
      </Text>
      <Text style={{ padding: 2 }}>
        Delivery To:{" "}
        <Text style={{ textTransform: "capitalize" }}>
          {address_type + ", " + flat_num}
        </Text>{" "}
      </Text>
      <Text style={{ padding: 2, marginLeft: 76 }}>
        {locality + ", " + city + ", " + postal_code}
      </Text>
      <Text style={{ padding: 2 }}>{item.order_time} </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 4,
        }}
      >
        <TouchableOpacity
          style={{
            width: "48%",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 0.2,
            borderColor: "#777",
            borderRadius: 2,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#000",
              padding: 4,
            }}
          >
            REJECT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "48%",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 0.2,
            borderColor: "#777",
            borderRadius: 2,
            backgroundColor: SecondaryColor,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: WHITE,
              padding: 4,
            }}
          >
            ACCEPT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default function NewOrders({ route, navigation }) {
  const { order } = route.params;
  console.log(order);
  const renderItem = ({ item }) => <Item item={item} />;
  return (
    <SafeAreaView style={styles.container}>
      <Header title={"NEW ORDER"} />
      <FlatList
        data={order}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ordercard: {
    padding: 20,
    backgroundColor: WHITE,
    marginVertical: 8,
    marginHorizontal: 2,
    borderColor: DARKGRAY,
    borderRadius: 4,
    borderWidth: 0.5,
  },
  orderId: {
    fontSize: 14,
    color: SecondaryColor,
    fontWeight: "bold",
  },
});
