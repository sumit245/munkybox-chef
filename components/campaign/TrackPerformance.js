import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { View, useWindowDimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import Icon from "react-native-vector-icons/Ionicons";
import { PrimaryDark, SecondaryColor } from "../../Colors";
import { useSelector } from "react-redux";
import HeaderTwo from "../header/HeaderTwo";
import { styles } from "./campaign.styles";
import TrackPerfContent from "./TrackPerfContent";
import axios from "axios";

export default function TrackPerformance({ route, navigation }) {
  const layout = useWindowDimensions();
  const restaurant = useSelector((state) => state.restaurant);
  const [coupon, setCoupon] = useState({});
  const [banner, setBanner] = useState({});
  const [inactive, setInactive] = useState([]);
  const [proms, setPromotedOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [loaded, setloaded] = useState(false);
  const [unique, setUnique] = useState(0);
  const { restaurant_name, city, locality, state, restaurant_id } = restaurant;
  const { notcoupon, title } = route.params;
  let address = locality + ", " + city + ", " + state;

  const fetchMyCoupon = async (restaurant) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/coupon/getcouponforchef/" +
        restaurant
    );
    const { data } = response;
    const { coupons, promotedOrders, revenue, discount, unique } = data;
    const active =
      Array.isArray(coupons) &&
      coupons.filter((item) => item.status === "Active");
    const inactive =
      Array.isArray(coupons) &&
      coupons.filter((item) => item.status === "Active");
    setCoupon(active);
    setInactive(inactive);
    setPromotedOrders(promotedOrders);
    setRevenue(revenue);
    setDiscount(discount);
    setUnique(unique);
    setloaded(true);
  };
  useEffect(() => {
    fetchMyCoupon(restaurant_id);
  }, [restaurant_id]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "active" },
    { key: "second", title: "inactive" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        backgroundColor: PrimaryDark,
        marginHorizontal: 2,
        marginBottom: 8,
      }}
      indicatorStyle={{ backgroundColor: SecondaryColor }}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <TrackPerfContent
            restaurant={restaurant_name}
            address={address}
            loaded={loaded}
            banners={coupon[0]}
            promotedOrders={proms}
            status={route.title}
            title={title}
            revenue={revenue}
            discount={discount}
            unique={unique}
          />
        );

      case "second":
        return (
          <TrackPerfContent
            restaurant={restaurant_name}
            address={address}
            loaded={loaded}
            banners={inactive[0]}
            promotedOrders={proms}
            status={route.title}
            title={title}
            revenue={revenue}
            discount={discount}
            unique={unique}
          />
        );

      default:
        break;
    }
  };
  if (loaded) {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderTwo title="History" navigation={navigation}>
          <Icon
            name="options-outline"
            size={20}
            color={SecondaryColor}
            style={{ paddingRight: 6 }}
          />
        </HeaderTwo>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{ width: layout.width }}
        />
      </SafeAreaView>
    );
  } else {
    return null;
  }
}
