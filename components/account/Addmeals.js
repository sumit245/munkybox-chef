import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Addmeals() {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          paddingVertical: 4,
          alignItems: "center",
        }}
        onPress={() => setModalVisible(true)}
      >
        <Icon
          name="fast-food-outline"
          color="#444"
          size={24}
          style={{ margin: 5 }}
        />
        <View style={{ paddingHorizontal: 2 }}>
          <Text style={{ fontSize: 18, color: "#444" }}>Add Meals</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "98%",
    marginHorizontal: "1%",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    backgroundColor: "#FFF",
    padding: 2,
    justifyContent: "space-between",
  },
});
