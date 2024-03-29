import { StyleSheet } from "react-native";
import {
  DARKGRAY,
} from "../Colors";
export const styles = StyleSheet.create({
  header: {
    height: 54,
    paddingBottom: 2,
    borderBottomColor: DARKGRAY,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  title: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 2,
    margin: 2,
  },
  subtitle: {
    color: "#000",
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
