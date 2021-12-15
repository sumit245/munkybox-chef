import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { FAB, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { width } from "../../Dimens";

export default function AddMealForm({ meal }) {
  if (meal) {
    return (
      <View style={{ flex: 1 }}>
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
              justifyContent:"space-between"
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
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {meal.description}
              </Text>
            </View>
            <View>
              <IconButton icon="lead-pencil" size={20} />
            </View>
          </View>
        </View>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => console.log("Pressed")}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  card: {
    marginHorizontal: 4,
    borderColor: "#777",
    borderWidth: 0.2,
    borderRadius: 4,
  },
});
