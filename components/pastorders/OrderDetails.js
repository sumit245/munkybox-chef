import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../header/Header";
import { styles } from "../../styles/itemstyle";
import { useSelector } from "react-redux";
import moment from "moment";
import Download from "../header/Download";
import Icon from "react-native-vector-icons/Ionicons";
export default function OrderDetails({ route, navigation }) {
  const { order } = route.params;
  const { address_type, city, flat_num, locality, postal_code } = order.address;
  const restaurant = useSelector((state) => state.restaurant);
  const { restaurant_name, restaurant_id } = restaurant;
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={restaurant.restaurant_name + ", " + restaurant.restaurant_id}
      >
        <View style={styles.switch}>
          <Download />
        </View>
      </Header>
      <TouchableOpacity
        style={{
          alignSelf: "flex-start",
          marginHorizontal: 8,
          marginVertical: 4,
        }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={24} color="#2277fc" />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ justifyContent: "flex-start", flex: 1 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.formHeader}>
          <View style={styles.row}>
            <View style={styles.headerRows}>
              <Text style={styles.text}>Order id</Text>
              <Text style={styles.text}>Ordered on</Text>
              <Text style={styles.text}>Status</Text>
            </View>
            <View style={styles.headerRows}>
              <Text>{order.order_id}</Text>
              <Text>
                {moment(order.order_time).format("DD-MMM-YYYY HH:mm a")}
              </Text>
              <Text style={{ textTransform: "uppercase" }}>{order.status}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.headerRows}>
              <Text style={styles.text}>User id</Text>
              <Text style={styles.text}>Phone</Text>
            </View>
            <View style={styles.headerRows}>
              <Text>{order.user_id}</Text>
              <Text>{order.phone}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.headerRows}>
              <Text style={styles.text}>Email</Text>
              <Text>{order.email_id}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.headerRows}>
              <Text style={styles.text}>Deliver to</Text>
              <Text style={{ textTransform: "uppercase", textAlign: "right" }}>
                {(address_type || "") +
                  ", " +
                  (flat_num || "") +
                  ", " +
                  (city || "") +
                  "\n " +
                  (locality || "") +
                  ", " +
                  (postal_code || "")}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.headerRows}>
              <Text style={styles.text}>plan</Text>
              <Text style={styles.text}>Start Date</Text>
              <Text style={styles.text}>End Date</Text>
            </View>
            <View style={styles.headerRows}>
              <Text>
                {order.plan === "twoPlan"
                  ? "2 Days"
                  : order.plan === "fifteenPlan"
                  ? "15 Days"
                  : "30 Days"}
              </Text>
              <Text>{order.start_date}</Text>
              <Text>{order.end_date}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.headerRows}>
              <Text style={styles.text}>Price</Text>
              <Text style={styles.text}>Discount</Text>
              <Text style={styles.text}>Total</Text>
            </View>
            <View style={styles.headerRows}>
              <Text>{"$" + order.base_price}</Text>
              <Text>{"$" + order.discount}</Text>
              <Text>
                {"$" +
                  (parseFloat(order.base_price) - parseFloat(order.discount))}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <Text
            style={{
              fontStyle: "italic",
              fontWeight: "bold",
              color: "#777",
              marginLeft: 4,
            }}
          >
            Notes: {order.notes}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHead}>
            <Text style={styles.text}>Add on</Text>
            <Text style={styles.text}>Ordered on</Text>
            <Text style={styles.text}>PRICE</Text>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
