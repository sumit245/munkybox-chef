import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../styles/headerstyle";
import { showcurrendate } from "../../helpers/commons";

export default function Header(props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{showcurrendate()}</Text>
      {props.children}
    </View>
  );
}
