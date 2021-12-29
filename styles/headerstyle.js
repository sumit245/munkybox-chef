import { StyleSheet, Dimensions } from "react-native";
import {
  DARKGRAY,
  WHITE,
  PrimaryColor,
  PrimaryDark,
  PrimaryLight,
  SecondaryColor,
  SecondaryDarkColor,
  SecondaryLightColor,
} from "../Colors";
export const styles = StyleSheet.create({
  header: {
    height: 54,
    paddingBottom: 2,
    borderBottomColor: DARKGRAY,
    borderBottomWidth: 0.5,
    backgroundColor: PrimaryDark,
    justifyContent: "flex-start",
  },
  title: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 2,
    margin: 2,
  },
  subtitle: {
    color: WHITE,
    paddingHorizontal: 5,
  },
  switch: {
    position: "absolute",
    right: 4,
    bottom: 2,
    color: "#dfdfdf",
    flexDirection: "row",
    padding: 4,
    alignItems: "center",
  },

});
