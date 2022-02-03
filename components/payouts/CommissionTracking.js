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
            Total Order Amount
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
          <Text style={[styles.smallText, { marginRight: 18 }]}>: $0</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Order Amount</Text>
          <Text style={[styles.smallText, { marginRight: 18 }]}>: $0</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Add Ons Amount</Text>
          <Text style={[styles.smallText, { marginRight: 18 }]}>: $0</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Admin Commission</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.smallText, { marginRight: 4 }]}>: $0</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("commission_history")}
            >
              <Icon name="history" size={14} color="#026020" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Received Amount</Text>
          <Text style={[styles.smallText, { marginRight: 18 }]}>: $0</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Cancel Amount</Text>
          <Text style={[styles.smallText, { marginRight: 18 }]}>: $0</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Balance Amount</Text>
          <Text style={[styles.smallText, { marginRight: 18 }]}>: $0</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: "98%",
          alignSelf: "center",
          borderRadius: 20,
          marginVertical: 14,
          backgroundColor: "#023020",
          padding: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#fff",
            fontWeight: "bold",
            padding: 2,
          }}
        >
          Pay Request
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
