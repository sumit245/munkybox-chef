import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import HeaderTwo from "../header/HeaderTwo";
import { styles } from "./campaign.styles";
import { useSelector } from "react-redux";
import axios from "axios";
import { Divider } from "react-native-paper";
import { SecondaryColor, SecondaryLightColor } from "../../Colors";
export default function PreviewCoupon({ navigation, route }) {
  const {
    type,
    plan,
    code,
    duration,
    discount,
    lunch,
    dinner,
    start_date,
    end_date,
  } = route.params;
  const restaurant = useSelector((state) => state.restaurant);

  const submit = async () => {
    const { _id, restaurant_id, base_2price, base_15price, base_30price } =
      await restaurant;
    const price =
      plan === 2 ? base_2price : plan === 15 ? base_15price : base_30price;
    let discountType = type === "net" ? "$" : "%";
    let absoluteValue = type === "net" ? discount : (price * discount) / 100;
    let promo = {
      restaurant_id: restaurant_id,
      category: [lunch, dinner],
      plan_name: plan + " Meals",
      promo_code: code,
      discount_type: discountType,
      absolute_value: absoluteValue,
      start_date: start_date,
      end_date: end_date,
      price: price,
      discount: discount,
      duration: duration + "Days",
    };
    const response = await axios.post(
      "https://munkybox-admin.herokuapp.com/api/coupon/",
      promo
    );
    const coupon = await response.data;
    promo.status = coupon.data.status;
    promo.promo_id = coupon.data.promo_id;
    const pushTorestaurant = await axios.put(
      "https://munkybox-admin.herokuapp.com/api/newrest/" + _id,
      { promo }
    );
    const rest = await pushTorestaurant.data;
    navigation.navigate("submit_coupon", {
      promo,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTwo title="Preview" navigation={navigation}>
        <TouchableOpacity style={{ paddingHorizontal: 4 }}>
          <Text style={{ color: SecondaryColor, fontWeight: "bold" }}>
            Discard
          </Text>
        </TouchableOpacity>
      </HeaderTwo>
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={[styles.bigText, { fontSize: 18 }]}>
              {discount}
              {type === "net" ? "$ " : "% "}OFF
            </Text>
          </View>

          <View style={styles.cardBody}>
            <Text
              style={[
                styles.bigText,
                { color: "#000", fontSize: 14, marginVertical: 10 },
              ]}
            >
              Applicable on: <Text style={styles.smallText}>{plan} Meals</Text>
            </Text>
            <Divider />
            <Text
              style={[
                styles.bigText,
                { color: "#000", fontSize: 14, marginVertical: 10 },
              ]}
            >
              Applicable on:{" "}
              <Text style={styles.smallText}>
                {lunch} {dinner}
              </Text>
            </Text>
            <Divider />
          </View>
          <View style={styles.cardBody}>
            <Text
              style={[
                styles.bigText,
                { color: "#000", fontSize: 14, marginVertical: 10 },
              ]}
            >
              Valid from:
              <Text style={styles.smallText}>
                {" "}
                {start_date} to {end_date}
              </Text>
            </Text>
            <Divider />
            <Text
              style={[
                styles.bigText,
                { color: "#000", fontSize: 14, marginVertical: 10 },
              ]}
            >
              Valid for:
              <Text style={styles.smallText}> {duration} Days</Text>
            </Text>
            <Divider />
          </View>
          <View style={styles.cardBody}>
            <Text style={[styles.bigText, { color: "#000", fontSize: 14 }]}>
              PROMO CODE:{" "}
              <Text style={[styles.bigText, { color: "#000", fontSize: 16 }]}>
                {code}
              </Text>
            </Text>
            {/* <Divider /> */}
          </View>

          <View style={styles.cardBody}>
            <Text>
              By clicking "CONFIRM".I undertake that I have read and understood
              the{" "}
              <Text
                style={{ color: "#226ccf", textDecorationLine: "underline" }}
              >
                terms and conditions
              </Text>{" "}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomButtonGroup}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#FFF" }]}
        >
          <Text style={[styles.btnText, { color: "#226ccf" }]}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#226ccf" }]}
          onPress={() => submit()}
        >
          <Text style={[styles.btnText, { color: "#FFF" }]}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
