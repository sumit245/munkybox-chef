import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Badge } from "react-native-paper";
import { width } from "../../Dimens";

export default function StatCards({ active, cancel, complete }) {
  return (
    <ScrollView horizontal>
      <View>
        <View style={[styles.stat_card, { width: width - 6 }]}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.stat_head}>Sales</Text>
            </View>
            <View>
              <Badge>2 orders</Badge>
            </View>
          </View>
          <View>
            <Text style={styles.stat_value}>$200</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 30,
              
            }}
          >
            <Text style={styles.stat_label}>Plan</Text>
            <Text style={styles.stat_label} >Revenue</Text>
            <Text style={styles.stat_label}>Discount</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 20,
              borderRadius:1,
              margin:1,
              borderWidth:0.2,
            }}
          >
            <Text style={styles.stat_label}>2</Text>
            <Text style={styles.stat_label}>$150</Text>
            <Text style={styles.stat_label}>$12</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 20,
              margin:1,
              borderRadius:1,
              borderWidth:0.2,
            }}
          >
            <Text style={styles.stat_label}>15</Text>
            <Text style={styles.stat_label}>-</Text>
            <Text style={styles.stat_label}>-</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 20,
              margin:1,
              borderRadius:1,
              borderWidth:0.2,
            }}
          >
            <Text style={styles.stat_label}>30 </Text>
            <Text style={styles.stat_label}>-</Text>
            <Text style={styles.stat_label}>-</Text>
          </View>
        </View>
        {/* Sales */}
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.stat_card, { width: width / 3.1 }]}>
            <Text style={styles.stat_head}>Ads Campaign</Text>
            <Text style={styles.stat_value}>Due: $0.75 </Text>
            <Text style={styles.stat_label}>Paid: $0</Text>
          </View>
          {/* Ads Campaign */}
          <View style={[styles.stat_card, { width: width / 3.1 }]}>
            <Text style={styles.stat_head}>Commission</Text>
            <Text style={styles.stat_value}>$8</Text>
          </View>
          {/* Commission */}

          <View style={[styles.stat_card, { width: width / 3.1 }]}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.stat_head}>Orders</Text>
              <View>
                <Badge>2</Badge>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.stat_label}>In Progress</Text>
              <Text style={[styles.stat_value, { color: "#f5a617" }]}>
                {active}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.stat_label}>Completed</Text>
              <Text style={[styles.stat_value, { color: "#22cf6c" }]}>
                {complete}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.stat_label}>Cancelled</Text>
              <Text style={[styles.stat_value, { color: "red" }]}>
                {cancel}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.stat_label}>Rejected</Text>
              <Text style={[styles.stat_value, { color: "#777" }]}>0</Text>
            </View>
          </View>
          {/* Orders */}
        </View>
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
    color: "#000",
  },
  stat_value: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "justify",
  },
});
