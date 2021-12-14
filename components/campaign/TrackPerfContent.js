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
  notcoupons,
  loaded,
  restaurant,
  address,
  banners,
  status,
  title,
  flag_banner,
  promotedOrders,
  discount,
  revenue,
  unique,
}) {
  const timesnow = moment().format("DD/MM/YYYY HH:MM:SS");
  if (loaded) {
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
          {/* {notcoupons && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 2,
              }}
            >
              <View style={styles.packContainer}>
                <Text style={styles.packText}> 1 Live Pack </Text>
              </View>
              <View style={[styles.packContainer, { marginLeft: 4 }]}>
                <Text style={styles.packText}> 0 upcoming Pack </Text>
              </View>
            </View>
          )} */}
        </View>
        {loaded && (
          <View style={{ flex: 1, marginVertical: 4 }}>
            <Text style={[styles.listing]}>{title}</Text>
            <TrackBannerCard
              banner={banners}
              status={status}
              flag_banner={flag_banner}
              promotedOrders={promotedOrders}
              revenue={revenue}
              discountfromcoup={discount}
              unique={unique}
            />
          </View>
        )}
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
  } else {
    return null;
  }
}
export default React.memo(TrackPerfContent);
