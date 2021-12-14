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
    status: "",
  });
  
  const [loaded,setLoaded]=useState(false)
  let remaining = moment(banner.end_date).diff(moment(), "Days");
  useEffect(() => {
    let mount = true;
    setBanner(banners);
    
    setLoaded(true)
    return () => {
      mount = false;
    };
  }, [banners]);
if(loaded){
  return (
    <View style={[styles.container, { backgroundColor: "#fff" }]}>
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
      {/* Restaurant Details */}

      <View style={{ flex: 1, marginVertical: 4 }}>
        <Text style={[styles.listing]}>{title}</Text>
        <View style={styles.bannerCard}>
          <View style={styles.trackHead}>
            <View>
              <Text style={[styles.bannerHeadTexts, { fontSize: 16 }]}>
                {banner.promo_code} (
                {banner.discount_type === "$"
                  ? "$" + banner.discount
                  : banner.discount + "%"}{" "}
                OFF)
              </Text>
              <Text style={styles.bannerHeadTexts}>
                {banner.plan_name}({banner.category})
              </Text>
              <Text style={styles.bannerHeadTexts}>
                Duration:
                {banner.start_date + "-" + banner.end_date}
              </Text>
              <Text style={styles.bannerHeadTexts}>ID:{banner.promo_id}</Text>
            </View>

            <View style={styles.progressCounter}>
              <Text style={[styles.bannerHeadTexts, { marginTop:36,marginBottom:4}]}>
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
          {/* bannercard top area */}

          <View style={{ alignItems: "flex-start" }}>
            <Button
              mode="text"
              style={{ backgroundColor: "#fff" }}
              color="#f00"
            >
              CANCEL
            </Button>
          </View>

          <View style={styles.bannerRow}>
            <Icon name="cart-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}>{promotedOrders.length}</Text>
              <Text style={styles.smallText}> Total Orders</Text>
            </View>
          </View>

          <View style={styles.bannerRow}>
            <Icon name="cash-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}> ${revenue}</Text>
              <Text style={styles.smallText}> Total Base Income</Text>
            </View>
          </View>

          <View style={styles.bannerRow}>
            <Icon name="analytics-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}> ${discountfromcoup}</Text>
              <Text style={styles.smallText}> Total Discount Paid</Text>
            </View>
          </View>

          <View style={styles.bannerRow}>
            <Icon name="person-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}> {unique.length}</Text>
              <Text style={styles.smallText}> Total Users</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Card area */}

      {/* <View> */}
        <Text style={[styles.listing, { textAlign: "center" }]}>
          Last Updated: {timesnow}
        </Text>
      {/* </View> */}
      {/* Bottom Text */}
    </View>
  );
        }else{
          return null
        }
}
export default React.memo(TrackPerfContent);
