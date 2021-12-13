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
import TrackCampaignContent from "./TrackCampaignContent";
import Loader from "../../helpers/Loader";

export default function TrackCampaign({ route, navigation }) {
  const layout = useWindowDimensions();
  const restaurant = useSelector((state) => state.restaurant);
  const [banner, setBanner] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [proms, setPromotedOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [unique, setUnique] = useState(0);
  const { restaurant_name, city, locality, state, restaurant_id } = restaurant;
  const { title } = route.params;
  let address = locality + ", " + city + ", " + state;

  const fetchMyBanner = async (restaurant) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/promo/" + restaurant
    );
    const { data } = response;
    setBanner(data);
    setLoaded(true);
  };

  useEffect(() => {
    fetchMyBanner(restaurant_id);
  }, [restaurant_id]);

  const inactivebanners = {
    advert_id: "ADVERT001",
    plan: "Gold",
    start: "22/10/2021",
    end: "20/11/2021",
    advert_id: "ADVERT001",
    order: 1,
    revenue: 80,
    clicks: 1,
    users: 1,
    day: 30,
    due: 0.75,
    status: "inactive",
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
          <TrackCampaignContent
            restaurant={restaurant_name}
            address={address}
            banners={banner[0]}
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
            banners={inactivebanners}
            status={route.title}
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
    return <Loader />;
  }
}
