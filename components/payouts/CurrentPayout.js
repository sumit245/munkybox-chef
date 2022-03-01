import {
  View,
  Text,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../campaign/campaign.styles";

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
            { color: "#008000", fontSize: 22, marginBottom: 8 },
          ]}
        >
          ${revenue}
        </Text>
        <Text style={styles.smallText}>{numOrders} Orders</Text>
        <Text style={styles.smallText}>{totalAddOns} Add-ons</Text>
      </View>
      <TouchableOpacity
        style={{
          width: 200,
          alignSelf: "center",
          borderRadius: 6,
          borderWidth: 0.2,
          paddingVertical: 4,
          height: 44,
          backgroundColor: "#2962ff",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("commission_tracking", {
            current_cycle: current_cycle,
            payout_date: payout_date,
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
          View Payout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
