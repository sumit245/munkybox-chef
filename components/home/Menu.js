import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { DARKGRAY, SecondaryColor } from "../../Colors";

import Icon from "react-native-vector-icons/Ionicons";
export default function Menu({ meal }) {
  if (typeof meal !== "undefined") {
    const { meal_name, image, add_on, description, type } = meal;
    return (
      <View>
        <Card style={styles.menu}>
          <Card.Title
            title="Main Dishes"
            style={{ backgroundColor: SecondaryColor }}
          />
          <Card.Cover source={{ uri: image }} />
          <Card.Content>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.mealTitle}>{meal_name}</Text>
                  <Icon
                    name="stop-circle"
                    color={type === "Veg" ? "green" : "red"}
                    style={{ paddingVertical: 4, marginTop: 2 }}
                    size={16}
                  />
                </View>
                <Text style={styles.mealDescription}>{description}</Text>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>X 0</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.menu}>
          <Card.Title
            title="Add Ons"
            style={{ backgroundColor: SecondaryColor }}
          />
          <Card.Content>
            {add_on &&
              add_on.map((data, key) => (
                <View
                  key={key}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.mealTitle}>{data.add_on}</Text>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>X 0</Text>
                </View>
              ))}
          </Card.Content>
        </Card>
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
    fontSize: 16,
    fontWeight: "bold",
    padding: 4,
  },
  mealDescription: {
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 4,
    color: DARKGRAY,
  },
});
