import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import Icon from "react-native-vector-icons/Ionicons";
import { PrimaryDark, SecondaryColor } from "../../Colors";
import { useSelector } from "react-redux";
import HeaderTwo from "../header/HeaderTwo";
import { styles } from "./campaign.styles";
import axios from "axios";

import Loader from "../../helpers/Loader";
import ListExpireBanners from "./ListExpireBanners";

export default function TrackCampaign({ route, navigation }) {
  const restaurant = useSelector((state) => state.restaurant);
  const [banner, setBanner] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [pos, setPos] = useState(0);
  const { restaurant_name, city, locality, state, restaurant_id } = restaurant;

  const { title } = route.params;
  let address = locality + ", " + city + ", " + state;

  const fetchMyBanner = async (restaurant) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/promo/" + restaurant
    );
    const { data } = response;
    let banners = data.filter((item) => item.status === "active");
    const res = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/chefdashboard/getchefbyidandrevenue/" +
        restaurant
    );

    // const { clicks, discount, due, orders, revenue, users } = res.data;
    // let myBanner = [...banners];
    // (myBanner[0].clicks = clicks), (myBanner[0].totalDiscount = discount);
    // myBanner[0].revenue = revenue;
    // myBanner[0].due = due;
    // myBanner[0].users = users;
    // myBanner[0].orders = orders;
    setBanner(banners);
    setLoaded(true);
  };

  const fetchMyExpiredBanner = async (restaurant_id) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/chefdashboard/" + restaurant_id
    );
    const { data } = response;
    const { banners } = data.dashboard;
    setBanner(banners);
  };

  useEffect(() => {
    fetchMyBanner(restaurant_id);
  }, [restaurant_id]);
  const fetchData = () => {
    if (index == 0) {
      setIndex(1);
      setPos(1);
      fetchMyExpiredBanner(restaurant_id);
    } else {
      setIndex(0);
      setPos(0);
      fetchMyBanner(restaurant_id);
    }
  };
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
          <ListExpireBanners
            loaded={loaded}
            restaurant={restaurant_name}
            address={address}
            banners={banner}
            title={title}
            discount={discount}
          />
        );

      case "second":
        return (
          <ListExpireBanners
            loaded={loaded}
            restaurant={restaurant_name}
            address={address}
            banners={banner}
            title={title}
            discount={discount}
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
          onIndexChange={fetchData}
          renderTabBar={renderTabBar}
        />
      </SafeAreaView>
    );
  } else {
    return <Loader />;
  }
}
