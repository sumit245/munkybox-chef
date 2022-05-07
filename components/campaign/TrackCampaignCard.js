import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./campaign.styles";
import { DARKGRAY } from "../../Colors";
import TrackCampaignHead from "./TrackCampaignHead";

export default function TrackCampaignCard({ banner, status, stat, loaded }) {
  const [totalOrders, setTotalOrders] = useState(0);
  const [due, setDue] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [users, setUsers] = useState(0);
  useEffect(() => {
    const { totalOrders, due, clicks, discount, revenue, users } = stat;
    setTotalOrders(totalOrders);
    setDue(due);
    setClicks(clicks);
    setDiscount(discount);
    setRevenue(revenue);
    setUsers(users);
  }, [stat]);
  if (loaded && typeof banner !== "undefined") {
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
        <View style={{ marginVertical: 16, marginHorizontal: 22 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#22ccff" }}>
            Due: ${due}
          </Text>
        </View>

        <View
          style={[
            styles.textContainer,
            {
              marginTop: 16,
              alignItems: "center",
              borderBottomColor: "#999",
              borderBottomWidth: 0.2,
            },
          ]}
        >
          <Icon name="cart-outline" size={24} color={DARKGRAY} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.bigText}>{totalOrders}</Text>
            <Text style={[styles.smallText,{color:DARKGRAY}]}> Total Orders</Text>
          </View>
        </View>

        <View
          style={[
            styles.textContainer,
            {
              alignItems: "center",
              borderBottomColor: "#999",
              borderBottomWidth: 0.2,
              marginVertical: "4%",
            },
          ]}
        >
          <Icon name="cash-outline" size={24} color={DARKGRAY} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.bigText}>${revenue}</Text>
            <Text style={[styles.smallText,{color:DARKGRAY}]}> Total Base Income</Text>
          </View>
        </View>

        <View
          style={[
            styles.textContainer,
            {
              alignItems: "center",
              borderBottomColor: "#999",
              borderBottomWidth: 0.2,
              marginVertical: "4%",
            },
          ]}
        >
          <Icon name="analytics-outline" size={24} color={DARKGRAY} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.bigText}>${discount}</Text>
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
              marginVertical: "4%",
            },
          ]}
        >
          <Icon name="analytics-outline" size={24} color={DARKGRAY} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.bigText}>{clicks}</Text>
            <Text style={styles.smallText}> Total Clicks</Text>
          </View>
        </View>

        <View
          style={[
            styles.textContainer,
            {
              alignItems: "center",
              marginVertical: "4%",
            },
          ]}
        >
          <Icon name="person-outline" size={24} color={DARKGRAY} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.bigText}>{users}</Text>
            <Text style={styles.smallText}> Total Users</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return null;
  }
}
