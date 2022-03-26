import React from "react";
import { TouchableOpacity, Alert, View, Share } from "react-native";
import { SecondaryColor } from "../../Colors";
import Icon from "react-native-vector-icons/Entypo";

export default function Download({ navigation }) {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Hello world!!!",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          //share with activity
        } else {
          //shared
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <TouchableOpacity style={{ flexDirection: "row" }} onPress={onShare}>
      <Icon name="export" size={26} color="#ff6600" />
    </TouchableOpacity>
  );
}
