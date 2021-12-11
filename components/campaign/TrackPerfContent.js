import moment from "moment";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { DARKGRAY, SecondaryLightColor } from "../../Colors";
import { styles } from "./campaign.styles";
import TrackBannerCard from "./TrackBannerCard";
import TrackPerfHead from "./TrackPerfHead";

function TrackPerfContent({ restaurant, address, banners, status }) {
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
        <Text style={styles.heading}>
          <Icon name="restaurant" size={16} color={SecondaryLightColor} />{" "}
          {restaurant}
        </Text>
        <Text style={[styles.smallText, { color: "#FFF" }]}>{address}</Text>
        {banners && (
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
        )}
      </View>
      {banners && (
        <View style={{ flex: 1 }}>
          <Text style={[styles.listing]}>Listing Ads</Text>
          <TrackBannerCard banner={banners} status={status} />
        </View>
      )}
      {/* </ScrollView> */}
      <View
        style={{
          justifyContent: "flex-end",
          backgroundColor: "#666",
          padding: 4,
        }}
      >
        <Text
          style={[styles.text, { fontWeight: "bold", textAlign: "center" }]}
        >
          Last Updated{timesnow}
        </Text>
      </View>
    </View>
  );
}
export default React.memo(TrackPerfContent);
