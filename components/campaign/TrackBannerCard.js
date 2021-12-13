import React from "react";
import { Text, View } from "react-native";
import TrackPerfHead from "./TrackPerfHead";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./campaign.styles";
import { DARKGRAY } from "../../Colors";
import { Button } from "react-native-paper";
export default function TrackBannerCard({
  banner,
  flag_banner,
  promotedOrders,
  revenue,
  discount,
}) {
  const {
    promo_code,
    category,
    plan_name,
    discount_type,
    discount,
    promo_id,
    duration,
    absolute_value,
    start_date,
    end_date,
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
        marginBottom: "20%",
      }}
    >
      <TrackPerfHead
        advert_id={promo_id}
        category={category}
        plan_name={promo_code}
        plan={plan_name}
        discount={discount}
        discount_type={discount_type}
        start_date={start_date}
        end_date={end_date}
        day={duration}
        status={status}
        flag_banner={flag_banner}
      />
      {status === "Active" ? (
        <>
          <View style={{ marginVertical: 12, backgroundColor: "#ddd" }}>
          <Button mode="text">CANCEL</Button>
          </View>

          <View
            style={[
              styles.textContainer,
              {
                padding: 4,
                marginTop: "2%",
                alignItems: "center",
                marginVertical: 2,
                borderBottomColor: "#999",
                borderBottomWidth: 0.2,
              },
            ]}
          >
            <Icon name="cart-outline" size={24} color={DARKGRAY} />

            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}>{promotedOrders.length}</Text>
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
              <Text style={styles.smallText}> Total Income</Text>
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
              <Text style={styles.bigText}> ${revenue - discount}</Text>
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
              },
            ]}
          >
            <Icon name="person-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}> {1}</Text>
              <Text style={styles.smallText}> Total Users</Text>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
}
