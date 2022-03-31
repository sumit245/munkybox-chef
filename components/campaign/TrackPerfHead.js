import moment from "moment";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "./campaign.styles";

export default function TrackPerfHead({
  promo_id,
  category,
  promo_code,
  plan_name,
  discount,
  discount_type,
  start_date,
  end_date,
  duration,
}) {
  let remaining = moment(end_date).diff(moment(), "Days");
  return (
    <View style={styles.trackHead}>
      <View>
        <Text
          style={[
            styles.heading,
            { fontSize: 14, marginLeft: 0, lineHeight: 16, marginVertical: 0 },
          ]}
        >
          {promo_code} ({" "}
          {discount_type === "$" ? "$" + discount : discount + "%"} OFF )
        </Text>
        <Text
          style={[
            styles.heading,
            { fontSize: 14, marginLeft: 0, lineHeight: 16, marginVertical: 0 },
          ]}
        >
          {plan_name}({category})
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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

        <Text style={[styles.smallText, { color: "#fff", marginVertical: 0 }]}>
          <Text style={{ fontWeight: "bold" }}>ID:</Text> {promo_id}{" "}
        </Text>
      </View>

      <View style={styles.progressCounter}>
        <View style={{ marginVertical: 20 }} />
        <Text style={[styles.smallText, { color: "#fff", lineHeight: 16 }]}>
          {duration}
        </Text>
        <View style={styles.progressDonught}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>{remaining>0?parseInt(remaining)+1:0}</Text>
        </View>
        <Text style={styles.smallText}>Days Left</Text>
      </View>
    </View>
  );
}
