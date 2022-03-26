import {
  View,
  Text,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../campaign/campaign.styles";
import { LinearGradient } from "expo-linear-gradient";

export default function CurrentPayout({
  current_cycle,
  payout_date,
  revenue,
  orders,
  discount,
  numOrders,
  totalAddOns,
  commission,
  totalOrderRevenue,
  totalAddOnReveneue,
  netCommission,
  due,
  navigation,
}) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={[styles.smallText, { textTransform: "uppercase" }]}>
            Current Payout Cycle
          </Text>
          <Text style={styles.bigText}>{current_cycle}</Text>
        </View>
        <View>
          <Text style={[styles.smallText, { textTransform: "uppercase" }]}>
            Payout Date
          </Text>
          <Text style={styles.bigText}>{payout_date}</Text>
        </View>
      </View>
      <View style={{ marginVertical: 16 }}>
        <Text style={[styles.smallText, { textTransform: "uppercase" }]}>
          Week So Far
        </Text>
        <Text
          style={[
            styles.bigText,
            {
              color: revenue > 0 ? "#008000" : "#f90000",
              fontSize: 22,
              marginBottom: 8,
            },
          ]}
        >
          ${revenue}
        </Text>
        <Text style={styles.smallText}>{numOrders} Orders</Text>
        <Text style={styles.smallText}>{totalAddOns} Add-ons</Text>
      </View>
      <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
        width: 160,
        alignSelf: "center",
        borderRadius: 6,
        borderWidth: 0.2,
        paddingVertical: 4,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("commission_tracking", {
              revenue: revenue,
              orders: orders,
              numOrders: numOrders,
              totalAddOns: totalAddOns,
              totalOrderRevenue: totalOrderRevenue,
              totalAddOnReveneue: totalAddOnReveneue,
              totalDiscount: discount,
              commission: commission,
              netCommission: netCommission,
              due: due,
              navigation: navigation,
            })
          }
        >
          <Text style={[styles.btnText, { color: "#fff", textAlign: "center" }]}>
            View
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
