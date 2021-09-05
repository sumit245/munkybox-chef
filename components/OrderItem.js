import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Divider, Switch } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { PrimaryDark, SecondaryDarkColor } from "../Colors";
import { truncate_string } from "../helpers/truncate_string";

export default function OrderItem({ item, index, meal }) {
  const { address } = item;
  const { add_on } = meal;
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={styles.orderCard} key={index}>
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text style={styles.title}>{"DELIVER BY: " + item.time}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ fontWeight: "bold", color: isSwitchOn ? "green" : "red" }}
          >
            Delivered
          </Text>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            disabled={isSwitchOn}
            color={isSwitchOn ? "green" : "red"}
          />
        </View>
      </View>
      <View style={styles.cardBody}>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "#000",
            }}
          >
            #{truncate_string("ORD", item._id, 5)}
          </Text>
          <Text style={{ color: "#252525", fontSize: 14 }}>
            {item.user_name}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <Icon
              name="ios-stop-circle-outline"
              size={18}
              color={meal.type === "Veg" ? "green" : "red"}
            />
            <Text
              style={{
                color: "#252525",
                fontSize: 14,
                textTransform: "uppercase",
              }}
            >
              {meal.meal_name}
            </Text>
          </View>

          {add_on.map((data, key) => (
            <View key={key} style={{ flexDirection: "row" }}>
              <Icon
                name="ios-stop-circle-outline"
                size={18}
                color={meal.type === "Veg" ? "green" : "red"}
              />
              <Text style={{ textTransform: "uppercase" }}>{data.add_on}</Text>
            </View>
          ))}
        </View>
        <Image
          source={{
            uri: "https://icons.iconarchive.com/icons/icons-land/vista-people/48/Office-Customer-Male-Light-icon.png",
          }}
          style={{
            width: 48,
            height: 48,
          }}
        />
      </View>

      <Divider style={{ height: 0.8 }} />
      <View style={{ padding: 6 }}>
        <Text style={{ fontWeight: "bold" }}>
          {address &&
            address.flat_num + ", " + address.city + ", " + address.postal_code}
          <Icon name="location-outline" size={20} color="#0275d8" />
        </Text>
        <Text style={{ textDecorationLine: "underline", fontWeight: "bold" }}>
          {"Notes: " + item.notes}
        </Text>
      </View>
      <Divider style={{ height: 0.8 }} />

      <TouchableOpacity
        style={{
          paddingVertical: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
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
        <Icon
          name="call-outline"
          size={18}
          style={{ color: "#0275d8", paddingHorizontal: 2 }}
        />
        <Text style={{ color: "#0275d8", paddingHorizontal: 2 }}>
          Call Customer
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: "#f9ffff",
    padding: 4,
    margin: 4,
    borderRadius: 6,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badge: {
    backgroundColor: SecondaryDarkColor,
    padding: 2,
    left: -6,
    width: 220,
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    paddingRight: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    padding: 2,
  },
});
