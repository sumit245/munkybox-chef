import {
  View,
  Text,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { styles } from "../campaign/campaign.styles";

export default function CurrentPayout({
  current_cycle,
  payout_date,
  revenue,
  orders,
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
      <View style={{ marginTop: 16 }}>
        <Text style={styles.bigText}>Week So Far</Text>
        <Text style={[styles.bigText, { color: "#008000", fontSize: 18 }]}>
          ${revenue}
        </Text>
        <Text style={styles.smallText}>{orders} orders</Text>
      </View>
      <TouchableOpacity
        style={{
          borderRadius: 6,
          borderWidth: 0.2,
          marginHorizontal: 2,
          padding: 6,
          height: 44,
          backgroundColor: "#2962ff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={[styles.btnText, { textAlign: "center" }]}>
          View Payout
        </Text>
      </TouchableOpacity>
    </View>
  );
}