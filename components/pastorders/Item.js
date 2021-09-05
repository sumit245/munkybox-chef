import React from "react";
import { View, Text, Linking, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../../styles/itemstyle";
import { truncate_string } from "../../helpers/truncate_string";
import { PrimaryColor, SecondaryColor } from "../../Colors";

const Item = ({ item, index, navigation }) => (
  <View style={styles.card} key={index}>
    <View style={styles.title}>
      <View style={styles.headerRows}>
        <Text>Order Id</Text>
      </View>
      <Text style={styles.titleText}>
        Order Id{" " + truncate_string("ORD", item._id, 5)}
      </Text>
      <Text
        style={
          (styles.titleText,
          [
            item.status === "delivered"
              ? { color: "#5ca85c" }
              : item.status === "pending"
              ? { color: "#ffc300" }
              : { color: "#d9534f" },
          ])
        }
      >
        {item.status}
      </Text>
    </View>
    <View style={styles.cardBody}>
      <View style={styles.cardRow}>
        <Text style={styles.cardText}>
          {"User Id: " + truncate_string("USER", item.user_id, 5)}
        </Text>
        <Text style={styles.cardText}>{"Contact: " + item.phone}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardText}>
          {"Plan "}
          {item.plan === "twoPlan"
            ? "2 Days"
            : item.plan === "fifteenPlan"
            ? "15 Days"
            : "30 Days"}
        </Text>
        <Text style={styles.cardText}>
          {"Total: "}
          {"$" + item.total}
        </Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardText}>
          {"Start Date: "}
          {item.start_date}
        </Text>
        <Text style={styles.cardText}>
          {"End Date: "}
          {item.end_date}
        </Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardText}>
          {"Ordered at: "}
          {item.order_time}
        </Text>
      </View>
    </View>
    <View style={styles.cardAction}>
      <View style={{ flexDirection: "row" }}>
        <Icon name="call-outline" size={24} color={PrimaryColor} />
        <Text
          style={styles.actionButton}
          onPress={() => {
            let phoneNumber = item.phone;
            if (Platform.OS === "android") {
              phoneNumber = `tel:${item.phone}`;
            } else {
              phoneNumber = `telprompt:${item.phone}`;
            }
            Linking.canOpenURL(phoneNumber)
              .then((supported) => {
                if (!supported) {
                  alert("Phone number is not available");
                } else {
                  return Linking.openURL(phoneNumber);
                }
              })
              .catch((err) => console.log(err));
          }}
        >
          Call Customer
        </Text>
      </View>

      <Text
        style={styles.actionButton}
        onPress={() =>
          navigation.navigate("orderDetails", {
            order: item,
          })
        }
      >
        View Details
      </Text>
    </View>
  </View>
);
export default Item;
