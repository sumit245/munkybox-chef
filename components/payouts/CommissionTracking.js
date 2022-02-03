import {
  View,
  Text,
  TouchableOpacityBase,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { styles } from "../campaign/campaign.styles";
import Header from "../header/Header";
import Icon from "react-native-vector-icons/Fontisto";

export default function CommissionTracking({
  current_cycle,
  payout_date,
  revenue,
  orders,
  navigation,
}) {
  return (
    <SafeAreaView>
      <Header title="Commission Tracking" />
      <View style={styles.card}>
        <View style={{ padding: 6, marginVertical: 8 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#f00",
            }}
          >
            Total Received Amount
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#000",
            }}
          >
            $0.00
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Orders</Text>
          <Text style={[styles.smallText, { marginRight: 18, color: "#000" }]}>
             0
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Order Amount</Text>
          <Text style={[styles.smallText, { marginRight: 18, color: "#000" }]}>
             $0
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Discount</Text>
          <Text style={[styles.smallText, { marginRight: 18, color: "#000" }]}>
             $0
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Add Ons Amount</Text>
          <Text style={[styles.smallText, { marginRight: 18, color: "#000" }]}>
             $0
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Admin Commission (10%)</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.smallText, { marginRight: 4, color: "#000" }]}>
              $0
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("commission_history")}
            >
              <Icon name="history" size={14} color="#026020" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
