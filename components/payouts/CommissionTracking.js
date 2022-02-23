import {
  View,
  Text,
  TouchableOpacityBase,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { styles } from "../campaign/campaign.styles";
import Header from "../header/Header";
import Icon from "react-native-vector-icons/Fontisto";

export default function CommissionTracking({ route, navigation }) {
  const {
    revenue,
    orders,
    numOrders,
    totalAddOns,
    totalAddOnReveneue,
    totalDiscount,
    commission,
    netCommission,
  } = route.params;

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
            ${revenue}
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
          <Text style={styles.smallText}>Total Order Amount ($)</Text>
          <Text style={[styles.smallText, { marginRight: 18, color: "#000" }]}>
            ${revenue}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Add-ons Amount ($)</Text>
          <Text style={[styles.smallText, { marginRight: 18, color: "#000" }]}>
            ${totalAddOnReveneue}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Discount ($)</Text>
          <Text style={[styles.smallText, { marginRight: 18, color: "#f00" }]}>
            -${totalDiscount}
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.smallText}>Total Campaign due ($)</Text>
          <Text style={[styles.smallText, { marginRight: 18, color: "#f00" }]}>
            -$0
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
            <Text style={[styles.smallText, { marginRight: 4, color: "#f00" }]}>
              -${netCommission}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("commission_history", {
                  orders: orders,
                  netCommission:netCommission
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
