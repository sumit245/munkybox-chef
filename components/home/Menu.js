import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Divider } from "react-native-paper";
import { DARKGRAY, SecondaryLightColor, WHITE } from "../../Colors";
import Icon from "react-native-vector-icons/Ionicons";
import Collapsible from "react-native-collapsible";

export default function Menu({ meal, slot }) {
  useEffect(() => {
    console.log(slot);
  });
  const [activeSections, setActiveSections] = useState([]);
  const [isCollapse, setCollapse] = useState(true);
  const SECTIONS = [
    {
      title: "Meals",
      content: meal,
    },
    {
      title: "Add ons",
      content: "Shake",
    },
  ];

  const RenderAddon = ({ add_on }) => {
    return (
      <View style={{ backgroundColor: WHITE, padding: 6 }}>
        {add_on &&
          add_on.map((add_on, key) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 6,
              }}
              key={key}
            >
              <Text style={styles.mealTitle}>{add_on.add_on}</Text>
              <Text style={styles.mealTitle}>X 0</Text>
            </View>
          ))}
      </View>
    );
  };

  const RenderHeader = ({ title }) => {
    return (
      <View
        style={{ flexDirection: "row", padding: 4, backgroundColor: WHITE }}
      >
        <Text style={styles.headerMenuTitle}>
          {title} <Text style={{ fontWeight: "normal" }}>All Slots</Text>{" "}
        </Text>
      </View>
    );
  };

  const RenderContent = ({ meal_name, type }) => {
    if (slot === "Lunch") {
      return (
        <View style={{ backgroundColor: WHITE, padding: 6 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 6,
              marginVertical: 4,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 4,
              }}
            >
              <Image
                source={require("../../assets/veg.png")}
                style={{ height: 16, width: 16, marginRight: 2 }}
              />
              <Text style={styles.mealTitle}>{meal_name}</Text>
            </View>
            <Text style={{ fontWeight: "bold" }}>X {0}</Text>
          </View>
          <Divider />
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ textAlign: "center" }}>
            Sorry! you don't provide meal in this slot!!!{"\n"}
            You can now also add meals on this day to get more income!!!
          </Text>
        </View>
      );
    }
  };

  if (typeof meal !== "undefined") {
    const { meal_name, image, add_on, description, type } = meal;
    return (
      <View>
        <View style={styles.headerMenu}>
          <View>
            <Text style={styles.headerText}>{slot}</Text>
            <Text
              style={[
                styles.headerText,
                { fontSize: 14, textTransform: "none" },
              ]}
            >
              {slot === "Lunch"
                ? "11:00 AM to 02:00 PM"
                : "08:00 PM to 11:00 PM"}
            </Text>
          </View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setCollapse(!isCollapse)}
          >
            <View>
              <Text style={styles.headerCount}>0 Meals</Text>
              <Text style={styles.headerCount}>0 Add ons</Text>
            </View>
            <Icon
              name={isCollapse ? "chevron-up-sharp" : "chevron-down-sharp"}
              size={22}
              color={WHITE}
            />
          </TouchableOpacity>
        </View>
        <Collapsible collapsed={isCollapse}>
          <RenderHeader title={"Meals"} />
          <RenderContent meal_name={meal_name} type={type} />
          <RenderHeader title={"Add ons"} />
          <RenderAddon add_on={add_on} />
        </Collapsible>
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Icon name="sad-outline" size={64} color={DARKGRAY} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: DARKGRAY,
          }}
        >
          Sorry you don't provide any meal on this day
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: DARKGRAY,
          }}
        >
          You can now also add meals on this day to get more income!!!
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  menu: {
    marginHorizontal: 2,
    marginVertical: 4,
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 4,
  },
  mealDescription: {
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 4,
    color: DARKGRAY,
  },
  headerMenu: {
    backgroundColor: SecondaryLightColor,
    padding: 6,
    marginTop: -8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: WHITE,
    textTransform: "uppercase",
  },
  headerCount: {
    fontSize: 14,
    color: WHITE,
    fontWeight: "bold",
  },
  headerMenuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 2,
  },
});
