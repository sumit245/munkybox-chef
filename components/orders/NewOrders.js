import axios from "axios";
import React, { useState, useEffect } from "react";
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
import { ORDERS } from "../../EndPoints";
import Loader from "../../helpers/Loader";
import Header from "../header/Header";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons"
const Item = ({ item }) => {
  const { address } = item;
  const [loader, setLoader] = useState(false);
  const { address_type, flat_num, city, locality, postal_code } = address;
  const accept = async (id) => {
    setLoader(true);
    const res = await axios.put(ORDERS + id, { status: "accepted" });
    setLoader(false);
  };
  const reject = async (id) => {
    setLoader(true);
    const res = await axios.put(ORDERS + id, { status: "rejected" });
    setLoader(false);
  };

  if (!loader) {
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
            onFinish={() => {
              reject(item._id);
            }}
            digitStyle={{
              backgroundColor: "#FFF",
              margin: 0,
              padding: -4,
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
            separatorStyle={{
              color: "#1CC625",
              marginTop: -8,
              marginHorizontal: -4,
            }}
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
            {"$" + (item.base_price - ( item.promo_id!=="PROMOADMIN"?item.discount:0))}
          </Text>
        </View>
        <Text
          style={{
            textAlign: "left",
            color: "#000",
            fontSize: 16,
            fontWeight: "bold",
            marginVertical: 4,
          }}
        >
          Subscription:{" "}
          <Text style={{ fontSize: 14, fontWeight: "normal" }}>
            {item.plan === "twoPlan"
              ? "2"
              : item.plan === "fifteenPlan"
                ? "15"
                : "30"}{" "}
            Meals
          </Text>
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: 4,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Start Date:{" "}
            <Text
              style={{
                textTransform: "capitalize",
                fontSize: 14,
                fontWeight: "normal",
              }}
            >
              {item.start_date}
            </Text>{" "}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {" "}
            Ends on:{" "}
            <Text
              style={{
                textTransform: "capitalize",
                fontSize: 14,
                fontWeight: "normal",
              }}
            >
              {item.end_date}
            </Text>{" "}
          </Text>
        </View>
        <Text
          style={{
            padding: 2,
            fontWeight: "bold",
            fontSize: 16,
            marginVertical: 4,
          }}
        >
          Delivery To:{" "}
          <Text
            style={{
              textTransform: "capitalize",
              fontSize: 14,
              fontWeight: "normal",
            }}
          >
            {((address_type +
              ", ") || "") +
              ((flat_num +
                ",") || "") +
              ((locality || "")) +
              ((city +
                ", ") || "") +
              (postal_code || "")}
          </Text>{" "}
        </Text>

        <Text style={{ padding: 2, marginVertical: 4 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Ordered at: </Text>
          {moment(item.order_time).format("DD-MMM-YYYY HH:mm a")}{" "}
        </Text>
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
            onPress={() => reject(item._id)}
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
          <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
            width: "48%",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 0.2,
            borderColor: "#ff6600",
            borderRadius: 2,
          }}>
            <TouchableOpacity onPress={() => accept(item._id)}>
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
          </LinearGradient>

        </View>
      </View>
    );
  } else {
    return <Loader />;
  }
};
const ListEmptyComponent = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ textAlign: "center", color: "#ff6600", fontWeight: 'bold' }}>Oops!!! No New Orders</Text>
  </View>
)
export default function NewOrders({ route, navigation }) {
  const [orders, setOrders] = useState([])
  const renderItem = ({ item }) => <Item item={item} />;
  const { order } = route.params;
  useEffect(() => {
    setOrders(order)
  }, [order])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", width: "100%", paddingHorizontal: 4, alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
            height: 28,
            width: 28,
            marginHorizontal: 4,
            borderRadius: 14,
          }}>
            <TouchableOpacity
              style={{ alignItems: "center", justifyContent: "center" }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-back" size={24} color="#ffffff" />
            </TouchableOpacity>
          </LinearGradient>
          <Header
            title="Meals"
          />
        </View>
      </View>

      <FlatList
        data={orders}
        ListEmptyComponent={ListEmptyComponent}
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
