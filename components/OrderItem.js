import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { DefaultTheme, IconButton, Switch } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { PrimaryColor, SecondaryColor, SecondaryDarkColor } from "../Colors";
import { avatarify } from "../helpers/truncate_string";

const CollapsedContent = ({ item }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const openInMap = async (address) => {
    let addres = address.flat_num + "," + address.locality;

    const destination = encodeURIComponent(
      `${addres} ${address.postal_code}, ${address.city}`
    );
    const provider = Platform.OS === "ios" ? "apple" : "google";
    const link = `http://maps.${provider}.com/?daddr=${destination}`;
    try {
      const supported = await Linking.canOpenURL(link);

      if (supported) Linking.openURL(link);
    } catch (error) {
      console.log(error);
    }
  };
  const theme={
    ...DefaultTheme,
    fonts:"thin"
  }

  const makeCall = async (number) => {
    try {
      const supported = await Linking.canOpenURL(`telprompt:${number}`);

      if (supported) Linking.openURL(`telprompt:${number}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.orderCard}>
      <View>
        <View
          style={{
            height: 60,
            width: 60,
            borderRadius: 60,
            backgroundColor: "purple",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#FFF" }}>
            {avatarify(item.user_name)}
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 6, padding: 4, flex: 1 }}>
        <Text style={[styles.title,{color:"#000",fontSize:18}]}>{item.order_id}</Text>
        <Text style={[styles.title, { fontWeight: "bold" }]}>
          {item.user_name}
        </Text>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={styles.link}
            onPress={() => openInMap(item.address)}
          >
            <Icon name="location-outline" size={24} color={PrimaryColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => makeCall(item.phone)}
          >
            <Icon name="call-sharp" size={24} color={SecondaryColor} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconButton icon="dots-vertical" size={24} color="#777" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ position: "absolute", right: 4,top:4 }}>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          disabled={isSwitchOn}
          theme={theme}
          style={{heigh:6}}
          
          color={isSwitchOn ? "green" : "red"}
        />
      </View>
    </View>
  );
};

export default function OrderItem({ item, index, meal }) {
  return (
    // <Collapsible isCollapsed={false}>
    <CollapsedContent item={item} />
    /* // </Collapsible> */
  );
}
const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: "#f9ffff",
    padding: 12,
    height:120,
    margin: 1,
    flexDirection: "row",
    borderRadius: 6,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badge: {
    backgroundColor: SecondaryDarkColor,
    padding: 2,
    left: -6,
    width: 220,
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    paddingRight: 6,
  },
  title: {
    fontSize: 14,
    color: "#666",
    paddingHorizontal: 0.5,
    paddingVertical: 0.2,
  },
  link: {
    color: PrimaryColor,
    fontSize: 16,
    fontWeight: "bold",
  },
});
