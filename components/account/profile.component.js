import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import PersonalDetails from "./personal.component";
const { width, height } = Dimensions.get("window");

export default function Profile() {
  const profile = useSelector((state) => state.restaurant);
  const [isEnabled, setisEnabled] = useState(false);
  const {
    _id,
    owner_name,
    restaurant_name,
    phone,
    email,
    about,
    locality,
    city,
    country,
    postal_code,
    cuisine_type,
    documents,
  } = profile;
  const restaurant_image = documents.filter(function (e) {
    return e.image_name === "restaurant_image";
  });
  const banner = documents.filter(function (e) {
    return e.image_name === "Banner";
  });
  return (
    <View>
      <View style={styles.header}>
        <Image source={{ uri: banner[0].image }} style={styles.headerImage} />
        <Image
          source={{ uri: restaurant_image[0].image }}
          style={styles.avatarImage}
          height={0.3 * width}
          width={0.3 * width}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurant}>
            {restaurant_name}
            <Text style={{ fontSize: 16, fontWeight: "normal" }}>
              {" ("}
              {cuisine_type}
              {")"}
            </Text>
          </Text>
          <Text
            style={{
              color: "#ffffff",
              marginRight: 4,
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            {"UID: "}
            {_id}
          </Text>
          <View style={styles.addressColumn}>
            <Text style={{ color: "#fff", marginRight: 4 }}>{locality}</Text>
            <Text style={{ color: "#fff" }}>{city}</Text>
          </View>
          <View style={styles.addressColumn}>
            <Text style={{ color: "#fff", marginRight: 4 }}>{country}</Text>
            <Text style={{ color: "#fff" }}>{postal_code}</Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.row}> */}
      <View
        style={[
          styles.row,
          { justifyContent: "space-between", paddingVertical: 4 },
        ]}
      >
        <Text
          style={{
            fontSize: 18,
            padding: 4,
            color: "#444",
            marginVertical: 5,
            paddingLeft: 10,
          }}
        >
          Accepting Orders
        </Text>
        <Switch
          thumbColor={isEnabled ? "#34ff64" : "#ff4d4b"}
          onValueChange={() => setisEnabled(!isEnabled)}
          value={isEnabled}
        />
      </View>
      <PersonalDetails
        id={_id}
        owner_name={owner_name}
        phone={phone}
        email={email}
        about={about}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    elevation: 1,
    position: "relative",
  },
  addressColumn: {
    flexDirection: "row",
    width: 190,
  },
  row: {
    width: "98%",
    marginHorizontal: "1%",
    borderBottomWidth: 1,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    backgroundColor: "#FFF",
    padding: 2,
  },
  restaurant: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "justify",
    color: "#fff",
  },
  detailsContainer: {
    width: width - 0.3 * width,
    position: "absolute",
    left: 4,
    top: 4,
    borderRadius: 5,
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 4,
  },
  headerImage: {
    width: width - 0.01 * width,
    height: 0.5 * width,
    resizeMode: "cover",
    margin: "0.5%",
  },
  avatarImage: {
    width: 0.3 * width,
    height: 0.3 * width,
    borderRadius: 0.15 * width,
    borderWidth: 4,
    borderColor: "#fcfcfc",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: -0.14 * width,
  },
});
