import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SecondaryColor, SecondaryLightColor } from "../../Colors";
import { styles } from "./campaign.styles";

export default function TrackPerfHead({
  plan_name,
  start_date,
  end_date,
  due,
  day,
  advert_id,
  status,
}) {
  return (
    <View style={styles.trackHead}>
      <View>
        <Text style={[styles.heading, { fontSize: 16, marginLeft: 0 }]}>
          {plan_name}
        </Text>
        <Text style={[styles.smallText, { color: "#fff" }]}>
          <Text style={{ fontWeight: "bold" }}>Duration:</Text> {start_date} -
          {end_date}{" "}
        </Text>
        <Text style={[styles.smallText, { color: "#fff" }]}>
          <Text style={{ fontWeight: "bold" }}>Advertise ID:</Text> {advert_id}{" "}
        </Text>
      </View>

      <View style={styles.progressCounter}>
        <Text style={styles.heading}> Bill</Text>
        <Text style={styles.text}>${due}</Text>
        <View style={{ marginVertical: 4 }} />
        {status === "active" ? (
          <>
            <View style={styles.progressDonught}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>{day}</Text>
            </View>
            <Text style={styles.smallText}>Days Left</Text>
          </>
        ) : (
          <TouchableOpacity style={{ height: 60, width: 60 }}>
            <Text style={{ color: SecondaryColor, fontWeight: "bold" }}>
              Pay Now
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
