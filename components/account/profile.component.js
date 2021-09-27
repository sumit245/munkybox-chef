import React, { useState, useEffect } from "react";
import { Image, Text, View, Switch, ImageBackground } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PersonalDetails from "./personal.component";
import { styles } from "./account.styles";
import { width } from "../../Dimens";

export default function Profile() {
  const profile = useSelector((state) => state.restaurant);
  const [isEnabled, setIsEnabled] = useState(false);
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

  return (
    <>
      <ImageBackground
        source={{ uri: documents[1].banner_image }}
        style={styles.headerImage}
        resizeMode="cover"
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurant}>
            {restaurant_name}
            {" ("}
            {cuisine_type || " "}
            {")"}
          </Text>
          <Text style={{color:"#fff"}}>
            {"UID: "}
            {_id}
          </Text>
          <Text style={{color:"#fff"}}>
            {locality}
            {", "}
            {city}
          </Text>
          <Text style={{color:"#fff"}}>
            {country}
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
      <View style={styles.row}>
        <Text style={styles.navLink}>Accepting Orders</Text>
        <Switch
          thumbColor={isEnabled ? "#34ff64" : "#ff4d4b"}
          onValueChange={() => setIsEnabled(!isEnabled)}
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
    </>
  );
}
