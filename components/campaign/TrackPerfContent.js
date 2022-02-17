import moment from "moment";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { DARKGRAY, SecondaryLightColor } from "../../Colors";
import { Button } from "react-native-paper";
import { styles } from "./campaign.styles";
import axios from "axios";
import CustomAlert from "../../helpers/CustomAlert.js";
import { useSelector } from "react-redux";

function TrackPerfContent({
  banners,
  promotedOrders,
  discount,
  revenue,
  unique,
  active,
}) {
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

  const restaurant = useSelector((state) => state.restaurant);
  const { _id, restaurant_name, promo,restaurant_id } = restaurant;

  const [loaded, setLoaded] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [pulled, setPulled] = useState(false);
  let remaining = moment(banner.end_date).diff(moment(), "Days");

  const updateCoupon = () => {
    setCancel(true);
  };
  const setInactive = async (id) => {
    let myCoupon = {
      promo_id: banners.promo_id,
      category: banners.category,
      plan_name: banners.plan_name,
      discount_type: banners.discount_type,
      absolute_value: banners.absolute_value,
      start_date: banners.start_date,
      end_date: banners.end_date,
      promo_code: banners.promo_code,
      price: banners.price,
      discount: banners.discount,
      duration: banners.duration,
      status: "Inactive",
      totalOrders: promotedOrders,
      totalBaseIncome: revenue,
      totalDiscountPaid: discount,
      totalUsed: unique.length,
    };
    const couponresponse = await axios.put(
      "http://munkybox-admin.herokuapp.com/api/coupon/" + id,
      { status: "Inactive" }
    );
    const restaurantUpdate = await axios.put(
      "http://munkybox-admin.herokuapp.com/api/newrest/" + _id,
      { promo: [] }
    );
  
  


    const dashboardResponse = await axios.get(
        "http://munkybox-admin.herokuapp.com/api/chefdashboard/"+restaurant_id
    );
    const { dashboard } = await dashboardResponse.data;
    
    let prevCoupons = [];
      prevCoupons.push(myCoupon);
      const updateDashboard = await axios.put(
        "http://munkybox-admin.herokuapp.com/api/chefdashboard/" +
          restaurant_name +
          "/" +
          dashboard._id,
        { coupons: prevCoupons }
      );
    
    const { status } = updateDashboard;
    if (status === 200) {
      setCancel(false);
    }
  };

  const cancelHandler = () => {
    setCancel(false);
  };

  useEffect(() => {
    let mount = true;
    setBanner(banners);
    setLoaded(true);
    return () => {
      mount = false;
    };
  }, [banners]);

  const pullToView = (id) => {
    setPulled(true);
  };


    return (
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
            <Text
              style={[
                styles.bannerHeadTexts,
                { marginTop: 36, marginBottom: 4 },
              ]}
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
        {/* bannercard top area */}

        {!active && (
          <View style={{ alignItems: "flex-start", marginVertical: 16 }}>
            <Button
              mode="text"
              style={{ backgroundColor: "#fff" }}
              color="#22ccff"
              onPress={() => pullToView(banner._id)}
            >
              View
            </Button>
          </View>
        )}

        {active || pulled ? (
          <View>
            <View style={{ alignItems: "flex-start", marginTop: 16 }}>
              {!pulled ? (
                <Button
                  mode="text"
                  style={{ backgroundColor: "#fff" }}
                  color="#f00"
                  onPress={() => updateCoupon()}
                >
                  CANCEL
                </Button>
              ) : (
                <Button
                  mode="text"
                  style={{ backgroundColor: "#fff" }}
                  color="#f00"
                  onPress={() => setPulled(false)}
                >
                  Close
                </Button>
              )}
            </View>

            <View style={styles.bannerRow}>
              <Icon name="cart-outline" size={24} color={DARKGRAY} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.bigText}>{promotedOrders}</Text>
                <Text style={styles.smallText}> Total Orders</Text>
              </View>
            </View>

            <View style={styles.bannerRow}>
              <Icon name="cash-outline" size={24} color={DARKGRAY} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.bigText}> ${parseFloat(revenue)-parseFloat(discount)}</Text>
                <Text style={styles.smallText}> Total Net Income</Text>
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
                <Text style={styles.bigText}> ${discount}</Text>
                <Text style={styles.smallText}> Total Discount Paid</Text>
              </View>
            </View>

            <View style={[styles.bannerRow, { borderBottomWidth: 0 }]}>
              <Icon name="person-outline" size={24} color={DARKGRAY} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.bigText}>
                  {Array.isArray(unique) ? unique.length : unique}
                </Text>
                <Text style={styles.smallText}> Total Users</Text>
              </View>
            </View>
          </View>
        ) : null}
        {cancel &&(
          <CustomAlert
          title="Are you sure?"
          text="Your active coupon will be set to inactive. Inactive coupons are not visible by users"
          okHandler={() => setInactive(banner._id)}
          cancelHandler={cancelHandler}
          visible={cancel}
        />
        )}
      </View>
    );
  
}
export default React.memo(TrackPerfContent);
