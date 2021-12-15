import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { width } from "../../Dimens";
import ViewAddOn from "./ViewAddOn";

export default function AddMealForm({ meal }) {
  const [add_on, setAddOn] = useState([]);
  useEffect(() => {
    const { add_on } = meal;
    setAddOn(add_on);
  }, [meal]);
  try {
    return (
      <ScrollView>
        <View style={styles.card}>
          <Image
            source={{ uri: meal.image }}
            style={{ width: width - 8, height: width / 2 }}
          />
          <View
            style={{
              flexDirection: "row",
              padding: 4,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, marginRight: 4 }}
                >
                  {meal.meal_name}
                </Text>
                <Icon
                  name="square"
                  color={meal.type === "veg" ? "#f00" : "#0f0"}
                  size={16}
                />
              </View>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {meal.description}
              </Text>
            </View>
            <View>
              <IconButton icon="lead-pencil" size={20} />
            </View>
          </View>
          <ViewAddOn add_on={add_on} />
        </View>
      </ScrollView>
    );
  } catch (error) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Icon name="sad-outline" size={60} color="orange" />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            color: "#444",
            textAlign: "center",
          }}
        >
          Sorry! You don't provide a meal on this day. Please add meals to get
          more income
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 4,
    borderColor: "#777",
    borderWidth: 0.2,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
});
