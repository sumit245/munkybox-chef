import React, { useState, useEffect } from "react";
import { Image, Text, View, Switch, ImageBackground } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PersonalDetails from "./personal.component";
import { styles } from "./account.styles";
import { width } from "../../Dimens";
import { changeStatus } from "../../actions/actions";
import { Divider } from "react-native-paper";

export default function Profile() {
  const profile = useSelector((state) => state.restaurant);
  const [enabled, setIsEnabled] = useState(false);
  const {
    _id,
    owner_name,
    restaurant_id,
    restaurant_name,
    phone,
    email,
    about,
    locality,
    city,
    state,
    postal_code,
    cuisine_type,
    documents,
    status,
  } = profile;
  const dispatch = useDispatch();

  useEffect(() => {
    status === "Active" ? setIsEnabled(true) : setIsEnabled(false);
  }, [status]);

  const setEnabled = (e) => {
    setIsEnabled(e);
    dispatch(changeStatus(_id, { status: e ? "Active" : "Inactive" }));
  };
  const banner_image = documents && documents[1].banner_image;
  return (
    <>
      <ImageBackground
        source={{ uri:banner_image }}
        style={styles.headerImage}
        resizeMode="cover"
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurant}>
            {restaurant_name}
            {" | "}
            {cuisine_type || "N/A"}
          </Text>
          <Text style={{ color: "#fff" }}>
            {"UID: "}
            {restaurant_id}
          </Text>
          <Text style={{ color: "#fff" }}>
            {locality}
            {", "}
            {city}
          </Text>
          <Text style={{ color: "#fff" }}>
            {state}
            {" - "}
            {postal_code}
          </Text>
        </View>
      </ImageBackground>
      <Image
        source={{ uri: documents[0].restaurant_image }}
        style={styles.avatarImage}
        height={0.3 * width}
        width={0.3 * width}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 4,
        }}
      >
        <Text style={styles.navLink}>Accepting Orders</Text>
        <Switch
          thumbColor={status === "Active" ? "#34ff64" : "#ff4d4b"}
          onValueChange={(e) => setEnabled(e)}
          value={enabled}
        />
      </View>
      <Divider />
      <PersonalDetails
        id={_id}
        owner_name={owner_name}
        phone={phone}
        email={email}
        about={about}
      />
    </>
  );
}
