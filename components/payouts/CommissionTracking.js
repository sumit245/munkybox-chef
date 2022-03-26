import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { styles } from "../campaign/campaign.styles";
import Header from "../header/Header";
import Icon from "react-native-vector-icons/Fontisto";
import Ionicon from "react-native-vector-icons/Ionicons"
import { LinearGradient } from "expo-linear-gradient";

export default function CommissionTracking({ route, navigation }) {
  const {
    revenue,
    orders,
    numOrders,
    totalAddOns,
    totalOrderRevenue,
    totalAddOnReveneue,
    totalDiscount,
    commission,
    netCommission,
    due,
  } = route.params;

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", width: "100%", paddingHorizontal: 4, alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
            height: 28,
            width: 28,
            marginHorizontal: 4,
            borderRadius: 14,
          }}>
            <TouchableOpacity
              style={{ alignItems: "center", justifyContent: "center" }}
              onPress={() => navigation.goBack()}
            >
              <Ionicon name="chevron-back" size={24} color="#ffffff" />
            </TouchableOpacity>
          </LinearGradient>
          <Header
            title="Payouts & Finance"
          />
        </View>
      </View>
      <View style={styles.card}>
        <View style={{ padding: 6, marginVertical: 8 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#ff6600",
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
            ${parseFloat(revenue).toFixed(2)}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.smallText}># of Orders</Text>
          <Text style={[styles.smallText, { marginRight: 22, color: "#000" }]}>
            {numOrders}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.smallText}># of Add-ons</Text>
          <Text style={[styles.smallText, { marginRight: 22, color: "#000" }]}>
            {totalAddOns}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Base Order Amt ($)</Text>
          <Text style={[styles.smallText, { marginRight: 18, color: "#000" }]}>
            ${parseFloat(totalOrderRevenue).toFixed(2)}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.smallText}>
            Total Base Order Commission ({commission}%)
          </Text>
          <Text style={[styles.smallText, { marginRight: 18, color: "#f00" }]}>
            -$
            {parseFloat(
              (parseFloat(totalOrderRevenue) * parseFloat(commission)) / 100
            ).toFixed(2)}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Add-ons Amount ($)</Text>
          <Text style={[styles.smallText, { marginRight: 18, color: "#000" }]}>
            ${parseFloat(totalAddOnReveneue).toFixed(2)}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.smallText}>
            Total Add-ons Commission ({commission}%)
          </Text>
          <Text style={[styles.smallText, { marginRight: 18, color: "#f00" }]}>
            -$
            {parseFloat(
              (parseFloat(totalAddOnReveneue) * parseFloat(commission)) / 100
            ).toFixed(2)}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Discount ($)</Text>
          <Text style={[styles.smallText, { marginRight: 18, color: "#f00" }]}>
            -${parseFloat(totalDiscount).toFixed(2)}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Campaign due ($)</Text>
          <Text style={[styles.smallText, { marginRight: 18, color: "#f00" }]}>
            -${parseFloat(due).toFixed(2)}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.smallText}>
            Total Admin Commission ({commission}%)
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.smallText, { marginRight: 4, color: "#777" }]}>
              -$
              {parseFloat(
                ((parseFloat(totalOrderRevenue) +
                  parseFloat(totalAddOnReveneue)) *
                  parseFloat(commission)) /
                  100
              )}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("commission_history", {
                  orders: orders,
                  netCommission: netCommission,
                  commission: commission,
                })
              }
            >
              <Icon name="history" size={14} color="#026020" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
