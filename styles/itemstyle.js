import { StyleSheet } from "react-native";
import { PrimaryColor } from "../Colors";
import { width } from "../Dimens";
export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9ffff",
    borderRadius: 8,
    padding: 8,
    margin: 4,
  },
  title: {
    borderBottomWidth: 0.4,
    borderBottomColor: "#777",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    padding: 4,
    justifyContent:'space-between'
  },
  titleText: {
    fontSize: 14,
    paddingHorizontal: 5,
    color: "#6a6a6a",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  statusText: {
    fontSize: 14,
    paddingHorizontal: 5,
    textTransform: "uppercase",
  },
  titleTextRight: {
    textAlign:"right",
    fontSize: 14,
    paddingHorizontal: 5,
    color: "#6a6a6a",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  cardBody: {
    padding: 4,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
  },
  cardText: {
    fontSize: 12,
    fontFamily: "serif",
    color: "#444",
    padding: 1,
    textTransform: "uppercase",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  formHeader: {
    padding: 8,
    backgroundColor: "#FFF",
    marginHorizontal: 4,
    borderBottomWidth: 0.4,
    borderBottomColor: "#777",
  },
  table: {
    marginTop: 4,
    padding: 1,
    backgroundColor: "#FFF",
    marginHorizontal: 4,
    borderWidth: 0.4,
    borderColor: "#777",
  },
  tableHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#777",
    borderWidth: 0.4,
    padding: 4,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#777",
    borderWidth: 0.4,
    padding: 2,
  },
  row: {
    marginVertical: 2,
  },
  headerRows: {
    paddingVertical: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#777",
  },
  formBody: {
    padding: 8,
    backgroundColor: "#FFF",
    marginHorizontal: 4,
    borderBottomWidth: 0.4,
    borderBottomColor: "#777",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    padding: 8,
    width: width - 8,
    backgroundColor: "#FFF",
    marginHorizontal: 4,
    borderTopWidth: 0.4,
    borderTopColor: "#777",
  },
});
