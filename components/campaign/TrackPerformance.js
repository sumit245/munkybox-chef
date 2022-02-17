import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import Icon from "react-native-vector-icons/Ionicons";
import { PrimaryDark, SecondaryColor } from "../../Colors";
import { useSelector } from "react-redux";
import HeaderTwo from "../header/HeaderTwo";
import { styles } from "./campaign.styles";
import axios from "axios";
import ListExpired from "./ListExpired";
import { Provider } from "react-native-paper";
import ListExpiredCoupons from "./ListExpiredCoupons";
import { set } from "react-native-reanimated";

export default function TrackPerformance({ route, navigation }) {
  const restaurant = useSelector((state) => state.restaurant);
  const [coupon, setCoupon] = useState({});
  const [inactive, setInactive] = useState([]);
  const [pos, setPos] = useState(0);
  const [totalOrders, setPromotedOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [loaded, setloaded] = useState(false);
  const [unique, setUnique] = useState(0);
  const { restaurant_name, city, locality, state, restaurant_id } = restaurant;
  const { notcoupon, title } = route.params;
  let address = locality + ", " + city + ", " + state;

  const fetchMyCoupon = async (restaurant, pos) => {
    if (pos == 0) {
      const response = await axios.get(
        "http://munkybox-admin.herokuapp.com/api/coupon/getcouponforchef/" +
          restaurant +
          "/Active"
      );
      const { data } = response;
      const { coupons, promotedOrders, revenue, discount, unique } = data;
      setPromotedOrders(promotedOrders.length);
      setCoupon(coupons);
      setRevenue(revenue);
      setDiscount(discount);
      setUnique(unique);
      setloaded(true);
    } else {
      // const response = await axios.get(
      //   "http://munkybox-admin.herokuapp.com/api/coupon/getcouponforchef/" +
      //     restaurant +
      //     "/Inactive"
      //        );
      // const { data } = response;
      const dashboardResponse = await axios.get(
        "http://munkybox-admin.herokuapp.com/api/chefdashboard/" + restaurant
      );
      const dashres = await dashboardResponse.data;
      const { coupons } = dashres.dashboard;
      setCoupon(coupons[0]);
      console.log(coupons[0]);
      // const { coupons, promotedOrders, revenue, discount, unique } = data;
      // setCoupon(coupons);
      // const myCoupons=await dashres.coupons
      // console.log(myCoupons);
      //setPromotedOrders(promotedOrders.length);
      // setRevenue(revenue);
      // setDiscount(discount);
      // setUnique(unique);
      // setloaded(true);
    }
  };
  useEffect(() => {
    fetchMyCoupon(restaurant_id, pos);
  }, [pos]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Active" },
    { key: "second", title: "Inactive" },
  ]);

  const fetchData = () => {
    if (index == 0) {
      setIndex(1);
      setPos(1);
    } else {
      setIndex(0);
      setPos(0);
    }
  };

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

  const renderScene = ({ route, index }) => {
    switch (route.key) {
      case "first":
        return (
          <ListExpired
            restaurant={restaurant_name}
            address={address}
            active={true}
            loaded={loaded}
            banners={coupon}
            promotedOrders={totalOrders}
            status={route.title}
            title={title}
            revenue={revenue}
            discount={discount}
            unique={unique}
          />
        );

      case "second":
        return (
          <ListExpiredCoupons
            restaurant={restaurant_name}
            address={address}
            banners={coupon}
            active={false}
            loaded={loaded}
            status={route.title}
            title={title}
          />
        );

      default:
        break;
    }
  };
  if (loaded) {
    return (
      <Provider>
        <SafeAreaView style={styles.container}>
          <HeaderTwo title="History" navigation={navigation}></HeaderTwo>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={fetchData}
            renderTabBar={renderTabBar}
          />
        </SafeAreaView>
      </Provider>
    );
  } else {
    return null;
  }
}
