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
import {
  PrimaryColor,
  PrimaryLight,
  SecondaryColor,
  SecondaryDarkColor,
} from "../Colors";
import { avatarify } from "../helpers/truncate_string";

const CollapsedContent = ({ item }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [pulled, setPulled] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const { address_type, locality, city, flat_num, postal_code } = item.address;

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
  const theme = {
    ...DefaultTheme,
    fonts: "thin",
  };

  const makeCall = async (number) => {
    let phoneNumber = "";
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${number}`;
    } else {
      phoneNumber = `tel:${number}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.orderCard}>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 60,
              backgroundColor: "purple",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 8,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "#FFF" }}>
              {avatarify(item.user_name)}
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.title,
                { color: "#000", fontSize: 18, marginVertical: 4 },
              ]}
            >
              {item.order_id}
            </Text>
            <Text style={[styles.title, { fontWeight: "bold" }]}>
              {item.user_name}
            </Text>
          </View>
        </View>

        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          // disabled={isSwitchOn}
          color={isSwitchOn ? "green" : "red"}
        />
      </View>

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
          paddingTop: 8,
          borderTopColor: "#ccc",
          borderTopWidth: 0.2,
        }}
      >
        <TouchableOpacity
          style={[styles.link, { marginLeft: "20%" }]}
          onPress={() => openInMap(item.address)}
        >
          <Icon name="location-outline" size={24} color={PrimaryLight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => makeCall(item.phone)}
        >
          <Icon name="call-sharp" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPulled(!pulled)}>
          <Icon
            name={pulled ? "chevron-up-sharp" : "chevron-down-sharp"}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {pulled && (
        <View style={{ marginVertical: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 2,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Notes: </Text>
            <Text style={{ fontSize: 14 }}>{item.notes || "N/A"}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 2,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Deliver to:{" "}
            </Text>
            <Text style={{ fontSize: 14 }}>
              {flat_num + "," + locality + " " + city + "-" + postal_code ||
                "N/A"}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 2,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Add ons: </Text>
            {Array.isArray(item.add_on) && item.add_on.length > 0 ? (
              <View style={{ flexDirection: "column" }}>
                <View style={styles.row}>
                  <View style={styles.th}>
                    <Text
                      style={{
                        textAlign: "center",
                        padding: 4,
                        fontWeight: "bold",
                      }}
                    >
                      Item
                    </Text>
                  </View>
                  <View style={styles.th}>
                    <Text
                      style={{
                        textAlign: "center",
                        padding: 4,
                        fontWeight: "bold",
                      }}
                    >
                      Qty
                    </Text>
                  </View>
                </View>
                {item.add_on.map((data, key) => (
                  <View style={styles.row}>
                    <View style={styles.th}>
                      <Text
                        style={{
                          textAlign: "center",
                          padding: 4,
                        }}
                      >
                        {data.item}
                      </Text>
                    </View>
                    <View style={styles.th}>
                      <Text
                        style={{
                          textAlign: "center",
                          padding: 4,
                        }}
                      >
                        {data.qty}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={{ fontSize: 14 }}>{"N/A"}</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default function OrderItem({ item, index, meal }) {
  return <CollapsedContent item={item} />;
}
const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: "#f9ffff",
    padding: 12,
    margin: 1,
    marginVertical: 4,
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
    paddingRight: 8,
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
  row: {
    flexDirection: "row",
    borderColor: "#000",
    borderWidth: 0.2,
    borderStyle: "solid",
    alignItems: "center",
  },
  th: {
    borderColor: "#000",
    borderWidth: 0.2,
    borderStyle: "solid",
    width: 120,
    textAlign: "center",
  },
});
