import moment from "moment";
import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import HeaderTwo from "../header/HeaderTwo";
import { styles } from "./campaign.styles";
import Icon from "react-native-vector-icons/Ionicons";
import { SecondaryDarkColor } from "../../Colors";
import { Checkbox } from "react-native-paper";
import Loader from "../../helpers/Loader";
import axios from "axios";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
export default function PreviewBanner({ route, navigation }) {
  const {
    title,
    duration,
    rpc,
    start_date,
    end_date,
    code,
    discount_type,
    discount,
    restaurant,
    plan,
  } = route.params;
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [hasPromo, sethasPromo] = useState(false);

  let start = moment(start_date).format("DD MMM, YYYY");
  let end = moment(end_date).format("DD MMM, YYYY");

  const submit = async () => {
    const getMyBanner = await axios.get(
      "http://54.146.133.108:5000/api/promo/getbannerslength/" +
      restaurant.restaurant_id
    );
    const myBanner = await getMyBanner.data;
    if (myBanner.length !== 0) {
      alert(
        "You already have an active campaign. Wait for expiry to create a new one!!!"
      );
    } else {
      setLoading(true);
      const response = await axios.get(
        "http://54.146.133.108:5000/api/promo/"
      );
      const { data } = response.data;

      let prom = data.length;
      let banner = {
        promo_id: "ADVERT00" + prom,
        restaurant_id: restaurant.restaurant_id,
        plan_name: title,
        rpc: rpc,
        duration: duration,
        start_date: start_date,
        end_date: end_date,
        meal_plan: plan,
        promo_code: code,
        discount_type: discount_type,
        discount: discount,
        status: "active"
      };
      const res = await axios.post(
        "http://54.146.133.108:5000/api/promo/",
        banner
      );
      setLoading(false);
      navigation.navigate("submit_coupon", {
        promo: banner,
      });
    }
  };
  if (!loading) {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderTwo title="Review your campaign" navigation={navigation} />
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <View
              style={[styles.textContainer, { marginTop: 20, marginBottom: 0 }]}
            >
              <Icon
                name="checkmark-circle"
                size={22}
                color="#ff6600"
                style={{ marginLeft: -10, marginTop: -4 }}
              />
              <View>
                <Text
                  style={[
                    styles.heading,
                    { textTransform: "uppercase", marginTop: -22, color: "#000" },
                  ]}
                >
                  Growth Style
                </Text>
                <Text style={[styles.text, { color: "#000" }]}>Ads</Text>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Icon
                name="checkmark-circle"
                size={22}
                color="#FF6600"
                style={{ marginLeft: -10 }}
              />
              <View>
                <Text style={[styles.heading, { textTransform: "uppercase", color: "#000" }]}>
                  Restaurant
                </Text>
                <Text style={[styles.text, { color: "#000" }]}>
                  {restaurant.restaurant_name}
                  {"\n"}
                  {restaurant.city +
                    ", " +
                    restaurant.state +
                    " - " +
                    restaurant.postal_code}
                </Text>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Icon
                name="checkmark-circle"
                size={22}
                color="#FF6600"
                style={{ marginLeft: -10 }}
              />
              <View>
                <Text style={[styles.heading, { textTransform: "uppercase", color: "#000" }]}>
                  CPC AD CAMPAIGN SELECTED
                </Text>
                <Text style={[styles.text, { color: "#000" }]}>
                  ${rpc}/click ( {title} )
                </Text>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Icon
                name="checkmark-circle"
                size={22}
                color="#FF6600"
                style={{ marginLeft: -10 }}
              />
              <View>
                <Text style={[styles.heading, { textTransform: "uppercase", color: "#000" }]}>
                  Duration
                </Text>
                <Text style={[styles.text, { color: "#000" }]}>{duration} days </Text>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Icon
                name="checkmark-circle"
                size={22}
                color="#FF6600"
                style={{ marginLeft: -10 }}
              />
              <View>
                <Text style={[styles.heading, { textTransform: "uppercase", color: "#000" }]}>
                  Starts On
                </Text>
                <Text style={[styles.text, { color: "#000" }]}>
                  {start}
                  {"\n"}
                  Ends by {end}
                </Text>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Icon
                name="checkmark-circle"
                size={22}
                color="#FF6600"
                style={{ marginLeft: -10 }}
              />
              <View>
                <Text style={[styles.heading, { textTransform: "uppercase", color: "#000" }]}>
                  Promo Code
                </Text>
                <Text style={[styles.text, { color: "#000" }]}>{code}</Text>
              </View>
            </View>

            <View style={[styles.textContainer, { marginBottom: -4 }]}>
              <Icon
                name="checkmark-circle"
                size={22}
                color="#FF6600"
                style={{ marginLeft: -10, marginTop: 4 }}
              />
              <View>
                <Text style={[styles.heading, { textTransform: "uppercase", color: "#000" }]}>
                  Discount
                </Text>
                <Text style={[styles.text, { color: "#000" }]}>${discount}</Text>
              </View>
            </View>
            <View style={[styles.textContainer, { marginBottom: -4 }]}>
              <Icon
                name="checkmark-circle"
                size={22}
                color="#FF6600"
                style={{ marginLeft: -10, marginTop: 4 }}
              />
              <View>
                <Text style={[styles.heading, { textTransform: "uppercase", color: "#000" }]}>
                  Applicable on
                </Text>
                <Text style={[styles.text, { color: "#000" }]}>{plan}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.checkContainer,{bottom:8}]}>
            <Checkbox.Android
              color="#FF6600"
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={[styles.text, { color: '#000' }]}>
              I agree with the{" "}
              <Text
                style={{
                  color: "#226ccf",
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
                onPress={() => {
                  navigation.navigate("policies");
                }}
              >
                terms and conditions
              </Text>{" "}
              related to
              {"\n"}CPC AD Campaign
            </Text>
          </View>
        </View>
        <View style={styles.bottomButtonGroup}>
          <LinearGradient colors={["#ff9900", "#ff6600"]} style={[
            styles.actionButton,
            {
              width: "100%",
              backgroundColor: SecondaryDarkColor,
              borderColor: SecondaryDarkColor,
            },
          ]}>
            <TouchableOpacity

              onPress={submit}
              disabled={!checked}
            >
              <Text style={[styles.btnText, { color: "#FFF" }]}>
                Activate this campaign
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  } else {
    return <Loader />;
  }
}
