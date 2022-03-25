import React, { useState } from "react";
import moment from "moment";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./campaign.styles";
import { DARKGRAY } from "../../Colors";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
export default function TrackBannerCard({
  banner,
  promotedOrders,
  revenue,
  discountfromcoup,
  unique,
}) {
  const {
    promo_code,
    category,
    plan_name,
    discount_type,
    discount,
    promo_id,
    duration,
    absolute_value,
    start_date,
    end_date,
    status,
  } = banner;
  let remaining = moment(end_date).diff(moment(), "Days");

  return (
    <View
      style={{
        marginHorizontal: 4,
        borderWidth: 0.5,
        borderColor: DARKGRAY,
        borderRadius: 2,
        justifyContent: "space-between",
        flex: 1,
        marginBottom: "20%",
      }}
    >
      <LinearGradient colors={["#ff9900","#ff6600"]} style={styles.trackHead}>
        <View>
          <Text
            style={[
              styles.heading,
              {
                fontSize: 14,
                marginLeft: 0,
                lineHeight: 16,
                marginVertical: 0,
              },
            ]}
          >
            {promo_code} ({" "}
            {discount_type === "$" ? "$" + discount : discount + "%"} OFF )
          </Text>
          <Text
            style={[
              styles.heading,
              {
                fontSize: 14,
                marginLeft: 0,
                lineHeight: 16,
                marginVertical: 0,
              },
            ]}
          >
            {plan_name}({category})
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={[
                styles.smallText,
                { color: "#fff", lineHeight: 16, marginVertical: 0 },
              ]}
            >
              <Text style={{ fontWeight: "bold" }}>Duration:</Text>{" "}
              {start_date + "-" + end_date}
            </Text>
          </View>

          <Text
            style={[styles.smallText, { color: "#fff", marginVertical: 0 }]}
          >
            <Text style={{ fontWeight: "bold" }}>ID:</Text> {promo_id}{" "}
          </Text>
        </View>

        <View style={styles.progressCounter}>
          <View style={{ marginVertical: 20 }} />
          <Text style={[styles.smallText, { color: "#fff", lineHeight: 16 }]}>
            {duration}
          </Text>
          <View style={styles.progressDonught}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {remaining}
            </Text>
          </View>
          <Text style={styles.smallText}>Days Left</Text>
        </View>
      </LinearGradient>

      {status === "Active" ? (
        <>
          <View style={{ marginVertical: -16, alignItems: "flex-start" }}>
            <Button
              mode="text"
              style={{ backgroundColor: "#fff" }}
              color="#f00"
            >
              CANCEL
            </Button>
          </View>

          <View
            style={[
              styles.textContainer,
              {
                padding: 4,
                marginTop: "2%",
                alignItems: "center",
                marginVertical: 2,
                borderBottomColor: "#999",
                borderBottomWidth: 0.2,
              },
            ]}
          >
            <Icon name="cart-outline" size={24} color={DARKGRAY} />

            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}>12</Text>
              <Text style={styles.smallText}> Total Orders</Text>
            </View>
          </View>

          <View
            style={[
              styles.textContainer,
              {
                padding: 4,
                alignItems: "center",
                marginVertical: 2,
                borderBottomColor: "#999",
                borderBottomWidth: 0.2,
              },
            ]}
          >
            <Icon name="cash-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}> ${revenue}</Text>
              <Text style={styles.smallText}> Total Base Income</Text>
            </View>
          </View>

          <View
            style={[
              styles.textContainer,
              {
                padding: 4,
                alignItems: "center",
                marginVertical: 2,
                borderBottomColor: "#999",
                borderBottomWidth: 0.2,
              },
            ]}
          >
            <Icon name="analytics-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}> ${discountfromcoup}</Text>
              <Text style={styles.smallText}> Total Discount Paid</Text>
            </View>
          </View>

          <View
            style={[
              styles.textContainer,
              {
                padding: 4,
                alignItems: "center",
                marginVertical: 2,
              },
            ]}
          >
            <Icon name="person-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}> {unique.length}</Text>
              <Text style={styles.smallText}> Total Users</Text>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
}
