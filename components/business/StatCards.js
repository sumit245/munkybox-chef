import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { width } from "../../Dimens";

export default function StatCards() {
  return (
    <ScrollView horizontal>
      <View>
        <View style={styles.stat_card}>
          <Text style={styles.stat_head}>Sales</Text>
          <Text style={styles.stat_value}>$80</Text>
          <Text style={styles.stat_label}>1 Order</Text>
        </View>
        {/* Sales */}

        <View style={styles.stat_card}>
          <Text style={styles.stat_head}>Adds Campaign</Text>
          <Text style={styles.stat_value}>Due: $0.75 </Text>
          <Text style={styles.stat_label}>Paid: $0</Text>
        </View>
        {/* Ads Campaign */}

      </View>
      <View>
        <View style={styles.stat_card}>
          <Text style={styles.stat_head}>Commission Paid</Text>
          <Text style={styles.stat_value}>$8</Text>
        </View>
        {/* Commission */}

        <View style={styles.stat_card}>
          <Text style={styles.stat_head}>Orders</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.stat_label, { color: "#f5a617" }]}>
              In Progress
            </Text>
            <Text style={[styles.stat_value, { color: "#f5a617" }]}>1</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.stat_label, { color: "#22cf6c" }]}>
              Completed
            </Text>
            <Text style={[styles.stat_value, { color: "#22cf6c" }]}>0</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.stat_label, { color: "red" }]}>Cancelled</Text>
            <Text style={[styles.stat_value, { color: "red" }]}>0</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.stat_label, { color: "red" }]}>Rejected</Text>
            <Text style={[styles.stat_value, { color: "red" }]}>0</Text>
          </View>
        </View>
        {/* Orders */}

      </View>
      <View>
        <View style={[styles.stat_card, { width: width - 12 }]}>
          <Text style={styles.stat_head}>Menu visits to orders conversion</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={styles.stat_label}>Menu Visits</Text>
              <Text style={styles.stat_value}>1</Text>
            </View>
            <View>
              <Text style={styles.stat_label}>Visits to Cart</Text>
              <Text style={styles.stat_value}>1</Text>
            </View>
            <View>
              <Text style={styles.stat_label}>Cart to Orders</Text>
              <Text style={styles.stat_value}>1</Text>
            </View>
          </View>
        </View>
        {/* Cart statistics  */}

        <View style={{ flexDirection: "row" }}>
          <View style={styles.stat_card}>
            <Text style={styles.stat_head}>New Users</Text>
            <Text style={styles.stat_value}>1</Text>
          </View>
          {/* New users */}

          <View style={styles.stat_card}>
            <Text style={styles.stat_head}>Repeat Users</Text>
            <Text style={styles.stat_value}>0</Text>
          </View>
          {/* Repeat Users */}
          
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  stat_card: {
    backgroundColor: "white",
    width: width / 2.1,
    // height: 120,
    flexGrow: 1,
    minHeight: 120,
    borderRadius: 8,
    marginHorizontal: 2,
    marginVertical: 2,
    padding: 8,
  },
  stat_head: {
    fontWeight: "bold",
    fontSize: 14,
    paddingVertical: 4,
    textAlign: "justify",
  },
  stat_label: {
    fontWeight: "bold",
    fontSize: 12,
    paddingHorizontal: 2,
    paddingVertical: 0,
    textAlign: "justify",
  },
  stat_value: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "justify",
  },
});
