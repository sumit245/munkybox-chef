import React from "react";
import { SafeAreaView } from "react-native";
import { View, useWindowDimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import Icon from "react-native-vector-icons/Ionicons";
import { PrimaryDark, SecondaryColor } from "../../Colors";
import { useSelector } from "react-redux";
import HeaderTwo from "../header/HeaderTwo";
import { styles } from "./campaign.styles";
import TrackPerfContent from "./TrackPerfContent";

export default function TrackPerformance({ route, navigation }) {
  const layout = useWindowDimensions();
  const restaurant = useSelector((state) => state.restaurant);
  const { restaurant_name, city, locality, state } = restaurant;
  let address = locality + ", " + city + ", " + state;

  const banners = {
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
    status: "active",
  };
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
      style={{ backgroundColor: PrimaryDark }}
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
            banners={banners}
            status={route.title}
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
}
