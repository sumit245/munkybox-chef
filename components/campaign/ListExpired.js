import React from "react";
import { View, Text, FlatList } from "react-native";
import TrackPerfContent from "./TrackPerfContent";
import Shop from "react-native-vector-icons/Entypo";
import { DARKGRAY, SecondaryLightColor } from "../../Colors";
import { styles } from "./campaign.styles";
import moment from "moment";
export default function ListExpired({
  banners,
  restaurant,
  address,
  active,
  loaded,
  promotedOrders,
  status,
  title,
  revenue,
  discount,
  unique,
}) {
  const timesnow = moment().format("DD/MM/YYYY HH:MM:SS");
  const renderItem = ({ item }) => (
    <TrackPerfContent
      active={active}
      loaded={loaded}
      banners={item}
      promotedOrders={promotedOrders}
      status={status}
      title={title}
      revenue={revenue}
      discount={discount}
      unique={unique}
    />
  );
  const ListHeaderComponent = ({ restaurant, address }) => {
    return (
      <>
        <View style={styles.trackOutlet}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Shop name="shop" size={24} color={SecondaryLightColor} />
            <View>
              <Text
                style={[
                  styles.heading,
                  { marginBottom: 0, marginHorizontal: 12 },
                ]}
              >
                {restaurant}
              </Text>
              <Text
                style={[
                  styles.smallText,
                  { color: "#FFF", marginHorizontal: 12, marginTop: 0 },
                ]}
              >
                {address}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ padding: 4, backgroundColor: "#fff" }}>
          <Text style={[styles.listing]}>{title}</Text>
        </View>
      </>
    );
  };
  return (
    <View style={[styles.container, { backgroundColor: "#fff" }]}>
      <FlatList
        data={banners}
        ListHeaderComponent={() => (
          <ListHeaderComponent restaurant={restaurant} address={address} />
        )}
        ListEmptyComponent={() => (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.text}>
              Sorry you dont have any coupons. Create a new to generate more
              revenue
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.index}
      />
      <Text style={[styles.listing, { textAlign: "center" }]}>
        Last Updated: {timesnow}
      </Text>

      {/* Bottom Text */}
    </View>
  );
}
