import { View, Text, TouchableOpacityBase, TouchableOpacity } from "react-native";
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
          <Text style={[styles.smallText,{textTransform:"uppercase",fontSize:14}]}>Current Payout Cycle</Text>
          <Text style={styles.bigText}>{current_cycle}</Text>
        </View>
        <View>
          <Text style={[styles.bigText,{textTransform:"uppercase",fontSize:14}]}>Payout Date</Text>
          <Text style={styles.smallText}>{payout_date}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.bigText}>Week So Far</Text>
        <Text style={styles.bigText}>${revenue}</Text>
        <Text style={styles.smallText}>{orders} orders</Text>
          </View>
          <TouchableOpacity style={{justifyContent:"center"}}>
              <Text style={[styles.btnText,{textAlign:"center"}]}>View Payout</Text>
        </TouchableOpacity>
    </View>
  );
}
