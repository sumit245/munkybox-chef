import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../styles/headerstyle";
import { showcurrendate } from "../../helpers/commons";
import { LinearGradient } from "expo-linear-gradient";

export default function Header(props) {
  return (
    <LinearGradient colors={["#ff9900", "#ff8800"]} style={styles.header}>

      <Text style={[styles.title, { color: "#fff" }]}>{props.title}</Text>
      <Text style={[styles.subtitle, { color: "#fff" }]}>{showcurrendate()}</Text>
      {props.children}

    </LinearGradient>
  );
}
