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

export default function TrackPerformance({ route, navigation }) {
  const restaurant = useSelector((state) => state.restaurant);
  const [coupon, setCoupon] = useState({});
  const [inactive, setInactive] = useState([]);
  const [totalOrders, setPromotedOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [loaded, setloaded] = useState(false);
  const [unique, setUnique] = useState(0);
  const { restaurant_name, city, locality, state, restaurant_id } = restaurant;
  const { notcoupon, title } = route.params;
  let address = locality + ", " + city + ", " + state;

  const fetchMyCoupon = async (restaurant, status) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/coupon/getcouponforchef/" +
        restaurant +
        "/" +
        routes[index].title
    );
    const { data } = response;
    const { coupons, promotedOrders, revenue, discount, unique } = data;
    setPromotedOrders(promotedOrders.length);

    // const active =
    //   Array.isArray(coupons) &&
    //   coupons.filter((item) => item.status === "Active");
    // const inactive =
    //   Array.isArray(coupons) &&
    //   coupons.filter((item) => item.status === "Inactive");
    setCoupon(coupons);
    // setInactive(inactive);
    setRevenue(revenue);
    setDiscount(discount);
    setUnique(unique);
    setloaded(true);
  };
  useEffect(() => {
    fetchMyCoupon(restaurant_id, title);
  }, [totalOrders]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Active" },
    { key: "second", title: "Inactive" },
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
          <ListExpired
            restaurant={restaurant_name}
            address={address}
            active={false}
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

      default:
        break;
    }
  };
  if (loaded) {
    return (
      <Provider>
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
            // initialLayout={{ width: styles.width }}
          />
        </SafeAreaView>
      </Provider>
    );
  } else {
    return null;
  }
}
