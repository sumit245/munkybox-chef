import moment from "moment";
import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { SecondaryLightColor } from "../../Colors";
import { styles } from "./campaign.styles";
import TrackCampaignCard from "./TrackCampaignCard";

function TrackCampaignContent({
  restaurant,
  address,
  banners,
  status,
  title,
  stat,
  loaded,
}) {
  const timesnow = moment().format("DD/MM/YYYY HH:MM:SS");
  console.log(banners);

  if (loaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.trackOutlet}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="shop" size={24} color={SecondaryLightColor} />
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
        <View style={{ flex: 1, marginVertical: 4 }}>
          <Text style={[styles.listing]}>{title}</Text>
          <TrackCampaignCard
            banner={banners}
            status={status}
            stat={stat}
            loaded={loaded}
          />
        </View>

        {/* </ScrollView> */}
        <View
          style={{
            justifyContent: "flex-end",
            padding: 4,
          }}
        >
          <Text
            style={[
              styles.text,
              { fontWeight: "bold", textAlign: "center", color: "#444" },
            ]}
          >
            Last Updated: {timesnow}
          </Text>
        </View>
      </View>
    );
  } else {
    return null;
  }
}
export default React.memo(TrackCampaignContent);
