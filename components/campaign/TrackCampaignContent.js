import moment from "moment";
import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SecondaryLightColor, DARKGRAY } from "../../Colors";
import { styles } from "./campaign.styles";

function TrackCampaignContent({ banners, stat, loaded }) {
  if (loaded && typeof banners !== "undefined") {
    let remaining = moment(banners.end_date).diff(
      moment(banners.start_date),
      "Days"
    );
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            marginHorizontal: 4,
            borderWidth: 0.5,
            borderColor: DARKGRAY,
            borderRadius: 2,
          }}
        >
          <View style={[styles.trackHead, { height: 100 }]}>
            <View>
              <Text
                style={[
                  styles.heading,
                  { fontSize: 14, marginLeft: 0, lineHeight: 14 },
                ]}
              >
                {banners.plan_name} (
                {banners.discount_type === "$"
                  ? "$" + banners.discount
                  : banners.discount + "%"}
                OFF )
              </Text>

              <Text
                style={[
                  styles.heading,
                  {
                    fontSize: 14,
                    marginLeft: 0,
                    lineHeight: 16,
                  },
                ]}
              >
                {banners.meal_plan}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[
                    styles.smallText,
                    { color: "#fff", lineHeight: 14, marginVertical: 0 },
                  ]}
                >
                  <Text style={{ fontWeight: "bold" }}>Duration:</Text>{" "}
                  {moment(banners.start_date).format("DD MMM,YYYY")}-
                  {moment(banners.end_date).format("DD MMM,YYYY")}
                </Text>
              </View>

              <Text
                style={[styles.smallText, { color: "#fff", marginVertical: 0 }]}
              >
                <Text style={{ fontWeight: "bold" }}>ID:</Text>{" "}
                {banners.promo_id}{" "}
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
                  ${banners.rpc}/click
                </Text>
              </View>
              <Text
                style={[styles.smallText, { color: "#fff", lineHeight: 16 }]}
              >
                {banners.duration} Days
              </Text>
              <View style={styles.progressDonught}>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  {remaining + 1}
                </Text>
              </View>
              <Text style={styles.smallText}>Days Left</Text>
            </View>
          </View>

          <View style={{ marginVertical: 16, marginHorizontal: 22 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, color: "#22ccff" }}
            >
              Due: ${banners.due}
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
              <Text style={styles.bigText}>{0}</Text>
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
                marginVertical: "4%",
              },
            ]}
          >
            <Icon name="cash-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}>${banners.revenue}</Text>
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
                marginVertical: "4%",
              },
            ]}
          >
            <Icon name="analytics-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}>${banners.totalDiscount}</Text>
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
              <Text style={styles.bigText}>{banners.clicks}</Text>
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
              <Text style={styles.bigText}>{banners.users}</Text>
              <Text style={styles.smallText}> Total Users</Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return null;
  }
}
export default React.memo(TrackCampaignContent);
