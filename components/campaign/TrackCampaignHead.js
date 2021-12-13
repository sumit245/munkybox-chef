import moment from "moment";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SecondaryColor } from "../../Colors";
import { styles } from "./campaign.styles";

export default function TrackCampaignHead({
  advert_id,
  plan_name,
  plan,
  rpc,
  category,
  discount,
  discount_type,
  start_date,
  end_date,
  day,
  status,
  flag_banner,
}) {
  let remaining = moment(end_date).diff(moment(), "Days");

  return (
    <View style={[styles.trackHead, { height: 100 }]}>
      <View>
        <Text
          style={[
            styles.heading,
            {
              fontSize: 16,
              marginLeft: 0,
              lineHeight: 14,
            },
          ]}
        >
          {plan}
        </Text>
        <Text
          style={[
            styles.heading,
            {
              fontSize: 14,
              marginLeft: 0,
              lineHeight: 14,
            },
          ]}
        >
          {category}
        </Text>

        <Text
          style={[
            styles.heading,
            { fontSize: 14, marginLeft: 0, lineHeight: 14 },
          ]}
        >
          {plan_name} ({discount_type === "$" ? "$" + discount : discount + "%"}
          OFF )
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={[
              styles.smallText,
              { color: "#fff", lineHeight: 14, marginVertical: 0 },
            ]}
          >
            <Text style={{ fontWeight: "bold" }}>Duration:</Text>{" "}
            {moment(start_date).format("DD MMM,YYYY")}-
            {moment(end_date).format("DD MMM,YYYY")}
          </Text>
        </View>

        <Text style={[styles.smallText, { color: "#fff", marginVertical: 0 }]}>
          <Text style={{ fontWeight: "bold" }}>ID:</Text> {advert_id}{" "}
        </Text>
      </View>

      <View style={styles.progressCounter}>
        <View style={{ marginBottom: 16 }}>
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
            ${rpc}/click
          </Text>
        </View>
        <Text style={[styles.smallText, { color: "#fff", lineHeight: 16 }]}>
          {day} Days
        </Text>
        <View style={styles.progressDonught}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>{remaining}</Text>
        </View>
        <Text style={styles.smallText}>Days Left</Text>
      </View>
    </View>
  );
}
