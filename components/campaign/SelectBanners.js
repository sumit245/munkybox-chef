import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import HeaderTwo from "../header/HeaderTwo";
import { styles } from "./campaign.styles";
import PromoCard from "./PromoCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { PrimaryLight } from "../../Colors";
import Shop from "react-native-vector-icons/Entypo";

export default function SelectBanners({ navigation }) {
  const [data, setData] = useState([]);
  const restaurant = useSelector((state) => state.restaurant);
  const fetchPlans = async () => {
    const response = await axios.get("https://munkybox-admin.herokuapp.com/api/banner");
    const bannerplans = await response.data.data;
    setData(bannerplans.reverse());
  };
  useEffect(() => {
    fetchPlans();
  }, []);
  const okHandler = (item,restaurant) => {
    navigation.navigate("create_banner", {
      title: item.pack_name,
      duration: item.duration,
      advert_id: item.advert_id,
      rpc: item.rpc,
      restaurant:restaurant
    });
  };
  const ListHeader = () => (
    <View
      style={{
        marginHorizontal: 2,
        marginTop: 16,
        padding: 8,
        backgroundColor: PrimaryLight,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        <Shop name="shop" size={18} color="#fff" /> {restaurant.restaurant_name}
      </Text>
      <Text style={{ color: "#fff" }}>
        {restaurant.restaurant_id}{" | "}
        {restaurant.locality +
          ", " +
          restaurant.city +
          " -" +
          restaurant.postal_code}
      </Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTwo title="Pack List" navigation={navigation} />
      <Text
        style={{
          color: "#FFF",
          fontWeight: "bold",
          fontSize: 16,
          marginHorizontal: 8,
        }}
      >
        Ads
      </Text>
      <Text
        style={{
          color: "#ddd",
          fontWeight: "bold",
          fontSize: 12,
          marginHorizontal: 8,
        }}
      >
        High visibility driven business growth
      </Text>

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
            ok="SET UP NOW"
            okHandler={() => okHandler(item,restaurant)}
          />
        )}
      />
    </SafeAreaView>
  );
}
