import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { WHITE } from "../../Colors";
import Icon from "react-native-vector-icons/Ionicons";

export default function DropDown({ text, handlerFcn, styles }) {
  const [state, setstate] = useState(false);
  const call = () => {
    setstate(!state);
    handlerFcn(!state);
  };
  return (
    <View style={styles.headerMenu}>
      <Text style={styles.headerText}>{text}</Text>
      <TouchableOpacity onPress={() => call()}>
        <Icon
          name={state ? "chevron-up-sharp" : "chevron-down-sharp"}
          size={22}
          color={WHITE}
        />
      </TouchableOpacity>
    </View>
  );
}
