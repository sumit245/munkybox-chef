import React from "react";
import { Text, View } from "react-native";
import TrackPerfHead from "./TrackPerfHead";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./campaign.styles";
import { DARKGRAY } from "../../Colors";
import { Button } from "react-native-paper";
import TrackCampaignHead from "./TrackCampaignHead";
export default function TrackCampaignCard({ banner, status }) {
  return (
    <View
      style={{
        marginHorizontal: 4,
        borderWidth: 0.5,
        borderColor: DARKGRAY,
        borderRadius: 2,
      }}
    >
      <TrackCampaignHead
        advert_id={banner.promo_id}
        category={banner.meal_plan}
        plan_name={banner.promo_code}
        plan={banner.plan_name}
        rpc={banner.rpc}
        discount={banner.discount}
        discount_type={banner.discount_type}
        start_date={banner.start_date}
        end_date={banner.end_date}
        day={banner.duration}
        status={banner.status}
      />

      <View
        style={[
          styles.textContainer,
          {
            alignItems: "center",
            borderBottomColor: "#999",
            borderBottomWidth: 0.2,
          },
        ]}
      >
        <Icon name="cart-outline" size={24} color={DARKGRAY} />

        <View style={{ marginLeft: 8 }}>
          <Text style={styles.bigText}>1</Text>
          <Text style={styles.smallText}> Total Orders</Text>
        </View>
      </View>

      <View
        style={[
          styles.textContainer,
          {
            alignItems: "center",
            borderBottomColor: "#999",
            borderBottomWidth: 0.2,
          },
        ]}
      >
        <Icon name="cash-outline" size={24} color={DARKGRAY} />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.bigText}>1</Text>
          <Text style={styles.smallText}> Total Base Income</Text>
        </View>
      </View>

      <View
        style={[
          styles.textContainer,
          {
            alignItems: "center",
            borderBottomColor: "#999",
            borderBottomWidth: 0.2,
          },
        ]}
      >
        <Icon name="analytics-outline" size={24} color={DARKGRAY} />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.bigText}>1</Text>
          <Text style={styles.smallText}> Total Discount Paid</Text>
        </View>
      </View>
      <View
        style={[
          styles.textContainer,
          {
            alignItems: "center",
            borderBottomColor: "#999",
            borderBottomWidth: 0.2,
          },
        ]}
      >
        <Icon name="analytics-outline" size={24} color={DARKGRAY} />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.bigText}>1</Text>
          <Text style={styles.smallText}> Total Clicks</Text>
        </View>
      </View>

      <View
        style={[
          styles.textContainer,
          {
            alignItems: "center",
          },
        ]}
      >
        <Icon name="person-outline" size={24} color={DARKGRAY} />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.bigText}>1</Text>
          <Text style={styles.smallText}> Total Users</Text>
        </View>
      </View>
    </View>
  );
}
