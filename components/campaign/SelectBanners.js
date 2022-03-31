import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import HeaderTwo from "../header/HeaderTwo";
import { styles } from "./campaign.styles";
import PromoCard from "./PromoCard";
import { useSelector } from "react-redux";
import axios from "axios";
import Shop from "react-native-vector-icons/Entypo";

export default function SelectBanners({ navigation }) {
  const [data, setData] = useState([]);
  const restaurant = useSelector((state) => state.restaurant);
  const { restaurant_name, city, locality, state } = restaurant;
  let address = locality + ", " + city + ", " + state;

  const fetchPlans = async () => {
    const response = await axios.get("http://54.146.133.108:5000/api/banner");
    const bannerplans = await response.data.data;
    setData(bannerplans.reverse());
  };
  useEffect(() => {
    fetchPlans();
  }, []);
  const okHandler = (item, restaurant) => {
    navigation.navigate("create_banner", {
      title: item.pack_name,
      duration: item.duration,
      advert_id: item.advert_id,
      rpc: item.rpc,
      restaurant: restaurant
    });
  };
  const ListHeader = () => (
    <View style={[styles.trackOutlet, { backgroundColor: "#fff" }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Shop name="shop" size={24} color="#ff6600" />
        <View>
          <Text
            style={[
              styles.heading,
              { marginBottom: 0, marginHorizontal: 12, color: "#000" },
            ]}
          >
            {restaurant_name}
          </Text>
          <Text
            style={[
              styles.smallText,
              { color: "#000", marginHorizontal: 12, marginTop: 0, fontWeight: "normal" },
            ]}
          >
            {address}
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTwo title="Pack List" navigation={navigation} />
      <View style={{ height: 48, padding: 10, marginBottom: 4 }}>
        <Text
          style={{
            color: "#000",
            fontWeight: "bold",
            fontSize: 16,
            marginHorizontal: 8,
          }}
        >
          Ads
        </Text>
        <Text
          style={{
            color: "#444",
            fontWeight: "bold",
            fontSize: 12,
            marginHorizontal: 8,
          }}
        >
          High visibility driven business growth
        </Text>
      </View>
      <View style={{ marginHorizontal: 2 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={ListHeader}
          extraData={restaurant}
          renderItem={({ item }) => (
            <PromoCard
              index={item.advert_id}
              head={item.pack_name}
              content={item.rpc}
              subhead={item.duration}
              ok="SELECT"
              okHandler={() => okHandler(item, restaurant)}
            />
          )}
        />
      </View>

    </SafeAreaView>
  );
}
