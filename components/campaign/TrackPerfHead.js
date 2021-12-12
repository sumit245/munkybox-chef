import moment from "moment";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SecondaryColor, SecondaryLightColor } from "../../Colors";
import { styles } from "./campaign.styles";

export default function TrackPerfHead({
  advert_id,
  plan_name,
  plan,
  discount,
  discount_type,
  start_date,
  end_date,
  day,
  status,
}) {
  let remaining = moment(end_date).diff(start_date, "Days");
  return (
    <View style={styles.trackHead}>
      <View>
        <Text style={[styles.heading, { fontSize: 14, marginLeft: 0,lineHeight:16 ,marginVertical:0}]}>
          {plan_name} ({" "}
          {discount_type === "$" ? "$" + discount : discount + "%"} )
        </Text>
        <Text style={[styles.heading, { fontSize: 14, marginLeft: 0,lineHeight:16,marginVertical:0 }]}>
          {plan}
        </Text>
        <Text style={[styles.smallText, { color: "#fff",lineHeight:16,marginVertical:0 }]}>
          <Text style={{ fontWeight: "bold" }}>Duration:</Text> {start_date} -
          {end_date}{" "}
        </Text>
        <Text style={[styles.smallText, { color: "#fff",marginVertical:0 }]}>
          <Text style={{ fontWeight: "bold" }}>ID:</Text> {advert_id}{" "}
        </Text>
      </View>

      <View style={styles.progressCounter}>
        <Text style={styles.text}>{day}</Text>
        <View style={{ marginVertical: 16 }} />
        {status === "expired" ? (
          <TouchableOpacity style={{ height: 60, width: 60 }}>
            <Text style={{ color: SecondaryColor, fontWeight: "bold" }}>
              Pay Now
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <View style={styles.progressDonught}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {remaining}
              </Text>
            </View>
            <Text style={styles.smallText}>Days Left</Text>
          </>
        )}
      </View>
    </View>
  );
}
