import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "./campaign.styles";

export default function PromoSubmit({ route, navigation,promo_name }) {
  const { promo } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ alignItems: "center",marginTop:"20%" }}>
        <Image
          source={require("../../assets/thanku.svg")}
          style={{ resizeMode: "cover", height: 120, width: 120 }}
        />
        <Text>Thank you!!! Your {promo_name} is activated</Text>
        <Text>
          {promo.plan_name} during all day will start from {promo.start_date}
        </Text>
      </View>
      <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
        borderRadius: 6,
        borderWidth: 0.5,
        padding: 10,
        marginHorizontal: "2%",
        marginBottom:10
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Growth')}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18, textAlign: 'center' }}>DONE</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}
