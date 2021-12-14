import moment from "moment";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Shop from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/Ionicons";
import { DARKGRAY, SecondaryLightColor } from "../../Colors";
import { Button } from "react-native-paper";
import { styles } from "./campaign.styles";

function TrackPerfContent({
  restaurant,
  address,
  banners,
  status,
  title,
  promotedOrders,
  discountfromcoup,
  revenue,
  unique,
}) {
  const timesnow = moment().format("DD/MM/YYYY HH:MM:SS");
  const [banner, setBanner] = useState({
    promo_code: "",
    promo_id: "",
    plan_name: "",
    discount_type: "",
    discount: "",
    duration: "",
    start_date: "",
    end_date: "",
    category: "",
    status:""
  });
  let remaining = moment(banners.end_date).diff(moment(), "Days");
  useEffect(() => {
    let mount = true;
    console.log(banners.status);
    setBanner(banners);
    return () => {
      mount = false;
    };
  }, [banners]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
      }}
    >
      <View style={styles.trackOutlet}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Shop name="shop" size={24} color={SecondaryLightColor} />
          <View>
            <Text
              style={[
                styles.heading,
                { marginBottom: 0, marginHorizontal: 12 },
              ]}
            >
              {restaurant}
            </Text>
            <Text
              style={[
                styles.smallText,
                { color: "#FFF", marginHorizontal: 12, marginTop: 0 },
              ]}
            >
              {address}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, marginVertical: 4 }}>
        <Text style={[styles.listing]}>{title}</Text>
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
          <View style={styles.trackHead}>
            <View>
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
                {banner.promo_code} ({" "}
                {banner.discount_type === "$"
                  ? "$" + banner.discount
                  : banner.discount + "%"}{" "}
                OFF )
              </Text>
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
                {banner.plan_name}({banner.category})
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
                    { color: "#fff", lineHeight: 16, marginVertical: 0 },
                  ]}
                >
                  <Text style={{ fontWeight: "bold" }}>Duration:</Text>{" "}
                  {banner.start_date + "-" + banner.end_date}
                </Text>
              </View>

              <Text
                style={[styles.smallText, { color: "#fff", marginVertical: 0 }]}
              >
                <Text style={{ fontWeight: "bold" }}>ID:</Text>{" "}
                {banner.promo_id}{" "}
              </Text>
            </View>

            <View style={styles.progressCounter}>
              <View style={{ marginVertical: 20 }} />
              <Text
                style={[styles.smallText, { color: "#fff", lineHeight: 16 }]}
              >
                {banner.duration}
              </Text>
              <View style={styles.progressDonught}>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  {remaining}
                </Text>
              </View>
              <Text style={styles.smallText}>Days Left</Text>
            </View>
          </View>

          <View style={{ marginVertical: -16, alignItems: "flex-start" }}>
            <Button
              mode="text"
              style={{ backgroundColor: "#fff" }}
              color="#f00"
            >
              CANCEL
            </Button>
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
              <Text style={styles.smallText}> Total Base Income</Text>
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
              <Text style={styles.bigText}> ${discountfromcoup}</Text>
              <Text style={styles.smallText}> Total Discount Paid</Text>
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
              <Text style={styles.bigText}> {unique.length}</Text>
              <Text style={styles.smallText}> Total Users</Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          justifyContent: "flex-end",
          padding: 4,
        }}
      >
        <Text
          style={[
            styles.text,
            { fontWeight: "bold", textAlign: "center", color: "#444" },
          ]}
        >
          Last Updated: {timesnow}
        </Text>
      </View>
    </View>
  );
}
export default React.memo(TrackPerfContent);
