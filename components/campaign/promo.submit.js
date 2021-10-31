import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "./campaign.styles";

export default function PromoSubmit({ route, navigation }) {
  const { promo } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/thanku.svg")}
          style={{ resizeMode: "cover", height: 120, width: 120 }}
        />
        <Text>Thank you!!! Your ad campaign is activated</Text>
        <Text>
          {promo.plan_name} during all day will start from {promo.start_date}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          borderRadius: 2,
          borderWidth: 0.5,
          borderColor: "#226ccf",
          padding: 10,
        }}
        onPress={()=>navigation.navigate('Growth')}
      >
        <Text style={{color: "#226ccf",fontWeight:"bold",fontSize:18,textAlign:'center'}}>DONE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
