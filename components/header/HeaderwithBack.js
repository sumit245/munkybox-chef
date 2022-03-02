import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../styles/headerstyle";

export default function HeaderwithBack(props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}
