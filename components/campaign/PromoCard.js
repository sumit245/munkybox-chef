import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import {
  DARKGRAY,
  PrimaryColor,
  PrimaryDark,
  SecondaryColor,
  WHITE,
} from "../../Colors";
import Icon from "react-native-vector-icons/Ionicons";
import Percentage from "react-native-vector-icons/Fontisto";

export default function PromoCard({
  index,
  title,
  icon,
  head,
  subhead,
  content,
  cancel,
  ok,
  okHandler,
  cancelHandler,
}) {
  console.log(head);
  return (
    <View style={styles.promocontainer}>
      <Text style={styles.promotitle}>{title}</Text>
      <View style={styles.promocard}>
        <View
          style={{ flexDirection: "row", padding: 16, alignItems: "center" }}
        >
          {icon === "shopping-sale" ? (
            <Percentage name="shopping-sale" size={30} color={SecondaryColor} />
          ) : (
            <Icon name={icon} size={30} color={SecondaryColor} />
          )}
          <View style={{ marginLeft: 8, flexShrink: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16, padding: 2 }}>
              {head}
            </Text>
            <Text style={{ fontWeight: "bold", color: DARKGRAY, fontSize: 12 }}>
              {subhead}
            </Text>
            {content && (
              <Text style={{ fontWeight: "bold", color: DARKGRAY }}>
                $ {content} only per click
              </Text>
            )}
          </View>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {cancel ? (
            <TouchableOpacity
              style={{
                borderRightWidth: 0.5,
                borderRightColor: "#777",
                paddingHorizontal: 10,
                marginVertical: 4,
                height: 24,
              }}
            >
              <Text
                style={[styles.promoaction, { color: "#000" }]}
                onPress={cancelHandler}
              >
                {cancel}
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          <Text style={styles.promoaction} onPress={okHandler}>
            {ok}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  promocontainer: {
    marginTop: 24,
  },
  promotitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "left",
    marginHorizontal: 4,
    marginVertical: 10,
  },
  promocard: {
    backgroundColor: WHITE,
    borderRadius: 4,
    elevation: 1,
    padding: 8,
    marginHorizontal: 4,
  },
  promoaction: {
    textAlign: "right",
    color: SecondaryColor,
    fontWeight: "bold",
    padding: 4,
  },
});
