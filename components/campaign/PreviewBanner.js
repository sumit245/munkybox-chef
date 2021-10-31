import moment from "moment";
import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import HeaderTwo from "../header/HeaderTwo";
import { styles } from "./campaign.styles";
import Icon from "react-native-vector-icons/Ionicons";
import { SecondaryDarkColor, SecondaryLightColor } from "../../Colors";
import { Checkbox } from "react-native-paper";
export default function PreviewBanner({ route, navigation }) {
  const {
    title,
    duration,
    rpc,
    advert_id,
    start_date,
    end_date,
    code,
    discount,
  } = route.params;
  const [checked, setChecked] = React.useState(false);
  let start = moment(start_date).format("DD MMM, YYYY");
  let end = moment(end_date).format("DD MMM, YYYY");
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTwo title="Review your campaign" navigation={navigation} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={styles.textContainer}>
          <Icon name="checkmark-circle-outline" size={20} color="#FFF" />
          <View>
            <Text style={[styles.heading, { textTransform: "uppercase" }]}>
              Growth Style
            </Text>
            <Text style={styles.text}>Ads</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Icon name="checkmark-circle-outline" size={20} color="#FFF" />
          <View>
            <Text style={[styles.heading, { textTransform: "uppercase" }]}>
              Restaurant
            </Text>
            <Text style={styles.text}>
              World Best Foods{"\n"}
              Mussallah pur hatt, Patna -80006
            </Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Icon name="checkmark-circle-outline" size={20} color="#FFF" />
          <View>
            <Text style={[styles.heading, { textTransform: "uppercase" }]}>
              CPC AD CAMPAIGN SELECTED
            </Text>
            <Text style={styles.text}>
              ${rpc}/click ( {title} )
            </Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Icon name="checkmark-circle-outline" size={20} color="#FFF" />
          <View>
            <Text style={[styles.heading, { textTransform: "uppercase" }]}>
              Duration
            </Text>
            <Text style={styles.text}>{duration}</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Icon name="checkmark-circle-outline" size={20} color="#FFF" />
          <View>
            <Text style={[styles.heading, { textTransform: "uppercase" }]}>
              Starts On
            </Text>
            <Text style={styles.text}>
              {start}
              {"\n"}
              Ends by {end}
            </Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Icon name="checkmark-circle-outline" size={20} color="#FFF" />
          <View>
            <Text style={[styles.heading, { textTransform: "uppercase" }]}>
              Promo Code
            </Text>
            <Text style={styles.text}>{code}</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Icon name="checkmark-circle-outline" size={20} color="#FFF" />
          <View>
            <Text style={[styles.heading, { textTransform: "uppercase" }]}>
              Discount
            </Text>
            <Text style={styles.text}>${discount}</Text>
          </View>
        </View>

        <View style={[styles.textContainer, { alignItems: "center" }]}>
          <Checkbox
            color="#FFF"
            uncheckedColor="#22c6cf"
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={styles.text}>
            I agree with the{" "}
            <Text
              style={{
                color: "#26c6cf",
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
              onPress={() => {
                navigation.navigate("terms", { type: "banner" });
              }}
            >
              terms and conditions
            </Text>{" "}
            related to
            {"\n"}CPC AD Campaign
          </Text>
        </View>
      </View>
      <View style={styles.bottomButtonGroup}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              width: "100%",
              backgroundColor: SecondaryDarkColor,
              borderColor: SecondaryDarkColor,
            },
          ]}
          // onPress={}
          disabled={!checked}
        >
          <Text style={[styles.btnText, { color: "#FFF" }]}>
            Activate this campaign
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
