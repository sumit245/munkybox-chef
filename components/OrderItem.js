import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import Accordion from "react-native-collapsible/Accordion";
import { IconButton, Switch } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { PrimaryColor, SecondaryDarkColor } from "../Colors";
import { avatarify, truncate_string } from "../helpers/truncate_string";

const CollapsedContent = ({ item }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={styles.orderCard}>
      <View>
        <View
          style={{
            height: 60,
            width: 60,
            borderRadius: 60,
            backgroundColor: "purple",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#FFF" }}>
            {avatarify(item.user_name)}
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 6, padding: 4 }}>
        <Text style={[styles.title, { fontWeight: "bold" }]}>
          {item.user_name}
        </Text>
        <Text style={styles.title}>{truncate_string("ORD", item._id, 5)}</Text>
        <Text style={styles.link}>
          <Icon name="location-outline" size={20} color={PrimaryColor} />
          View in Map
        </Text>
      </View>
      <View style={{ position: "absolute", right: 0 }}>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          // disabled={isSwitchOn}
          color={isSwitchOn ? "green" : "red"}
        />
        <View style={{ alignSelf: "flex-end" }}>
          <IconButton icon="dots-vertical" size={24} color="#777" />
        </View>
      </View>
    </View>
  );
};

export default function OrderItem({ item, index, meal }) {
  return (
    // <Collapsible isCollapsed={false}>
      <CollapsedContent item={item} />
    // {/* </Collapsible> */}
  );
}
const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: "#f9ffff",
    padding: 8,
    margin: 1,
    flexDirection: "row",
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
    color: "#666",
    paddingHorizontal: 0.5,
    paddingVertical: 0.2,
  },
  link: {
    color: PrimaryColor,
    fontSize: 16,
    fontWeight: "bold",
  },
});
