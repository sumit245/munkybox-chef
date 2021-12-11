import React from "react";
import { Text, View } from "react-native";
import TrackPerfHead from "./TrackPerfHead";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./campaign.styles";
import { DARKGRAY } from "../../Colors";
export default function TrackBannerCard({ banner }) {
  const {
    plan,
    start,
    end,
    due,
    day,
    order,
    revenue,
    clicks,
    users,
    advert_id,
    status,
  } = banner;
  return (
    <View
      style={{
        marginHorizontal: 4,
        borderWidth: 0.5,
        borderColor: DARKGRAY,
        borderRadius: 2,
        justifyContent: "space-between",
        flex: 1,
        marginBottom: "10%",
      }}
    >
      <TrackPerfHead
        advert_id={advert_id}
        plan_name={plan}
        start_date={start}
        end_date={end}
        due={due}
        day={day}
        status={status}
      />
      {status === "active" ? (
        <>
          <View style={{ marginVertical: 12, backgroundColor: "#ddd" }} />

          <View
            style={[
              styles.textContainer,
              {
                padding: 4,
                marginTop:"2%",
                alignItems: "center",
                marginVertical: 2,
                borderBottomColor: "#999",
                borderBottomWidth: 0.2,
              },
            ]}
          >
            <Icon name="cart-outline" size={24} color={DARKGRAY} />

            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}>{order}</Text>
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
              <Text style={styles.smallText}> Total Revenue</Text>
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
              <Text style={styles.bigText}> {clicks}</Text>
              <Text style={styles.smallText}> Total Clicks</Text>
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
              <Text style={styles.bigText}> {users}</Text>
              <Text style={styles.smallText}> New Users</Text>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
}
