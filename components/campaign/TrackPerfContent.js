import moment from "moment";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { useSelector } from "react-redux";
import { DARKGRAY, SecondaryLightColor } from "../../Colors";
import { styles } from "./campaign.styles";
import TrackBannerCard from "./TrackBannerCard";
import TrackPerfHead from "./TrackPerfHead";

function TrackPerfContent({
  restaurant,
  address,
  banners,
  status,
  title,
  promotedOrders,
  discount,
  revenue,
  unique,
}) {
  const timesnow = moment().format("DD/MM/YYYY HH:MM:SS");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
      }}
    >
      <View style={styles.trackOutlet}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="shop" size={24} color={SecondaryLightColor} />
          <View>
            <Text
              style={[
                styles.heading,
                { marginBottom: 0, marginHorizontal: 12 },
              ]}
            >
              {restaurant}
            </Text>
            <Text
              style={[
                styles.smallText,
                { color: "#FFF", marginHorizontal: 12, marginTop: 0 },
              ]}
            >
              {address}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, marginVertical: 4 }}>
        <Text style={[styles.listing]}>{title}</Text>
        <TrackBannerCard
          banner={banners}
          status={status}
          promotedOrders={promotedOrders}
          revenue={revenue}
          discountfromcoup={discount}
          unique={unique}
        />
      </View>

      {/* </ScrollView> */}
      <View
        style={{
          justifyContent: "flex-end",
          padding: 4,
        }}
      >
        <Text
          style={[
            styles.text,
            { fontWeight: "bold", textAlign: "center", color: "#444" },
          ]}
        >
          Last Updated: {timesnow}
        </Text>
      </View>
    </View>
  );
}
export default React.memo(TrackPerfContent);
