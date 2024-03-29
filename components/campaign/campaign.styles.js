import { StyleSheet } from "react-native";
import {
  DARKGRAY,
  PrimaryDark,
  WHITE,
} from "../../Colors";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginHorizontal: 4,
    borderColor: PrimaryDark,
    elevation: 2,
    borderRadius: 2,
    backgroundColor: WHITE,
    padding: 8,
    marginVertical: 8,
  },
  cardBody: {
    marginTop: 8,
    paddingTop: 8,
  },
  cardRow: {
    borderColor: "#777",
    borderTopWidth: 1,
    padding: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
    paddingHorizontal:8
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 2,
  },
  smallText: {
    fontWeight: "bold",
    color: "#000",
    lineHeight: 20,
    fontSize: 14,
    marginVertical: 2,
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionsLabels: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },

  calenderView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(30,30,30,0.5)",
  },
  calendarBody: {
    backgroundColor: "white",
    borderRadius: 4,
  },
  buttonClose: {
    borderRadius: 10,
    elevation: 2,
    height: 20,
    width: 20,
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#fff",
  },
  optionrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  optionCard: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 2,
    elevation: 2,
    borderRadius: 4,
  },
  input: {
    borderBottomColor: DARKGRAY,
    borderBottomWidth: 0.5,
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomButtonGroup: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    padding: 2,
  },
  actionButton: {
    borderWidth: 1,
    width: "48%",
    alignItems: "center",
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    textTransform: "uppercase",
    padding: 6,
    fontWeight: "bold",
    letterSpacing: 1.1,
  },
  text: {
    color: "#ddd",
    lineHeight: 20,
    fontSize: 14,
    marginHorizontal: 18,
    textAlign: "justify",
  },
  heading: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 18,
    marginBottom: "2%",
  },
  textContainer: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginLeft: 20,
    alignItems: "baseline",
    borderLeftColor: "#ff6600",
    minHeight:64,
    borderLeftWidth: 1,
  },
  checkContainer: {
    flexDirection: "row",
    marginHorizontal: 12,
    alignItems: "center",
  },
  trackOutlet: {
    padding: 8,
  },
  trackHead: {
    padding: 8,
    height: 90,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  packContainer: {
    backgroundColor: "#777",
    margin: 2,
    borderRadius: 2,
    padding: 2,
  },
  packText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  progressCounter: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressDonught: {
    zIndex:1000,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#FFF",
    borderWidth: 5,
    borderColor: "#ff6600",
    elevation:2,
    alignItems: "center",
    justifyContent: "center",
  },
  listing: {
    marginHorizontal: 4,
    marginVertical: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  bannerCard: {
    marginHorizontal: 4,
    borderWidth: 0.5,
    borderColor: DARKGRAY,
    borderRadius: 2,
    justifyContent: "space-between",
    marginBottom: "20%",
  },
  bannerHeadTexts: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  bannerRow: {
    padding: 4,
    marginTop: "2%",
    alignItems: "center",
    marginVertical: "4%",
    borderBottomColor: "#999",
    borderBottomWidth: 0.2,
    flexDirection: "row",
    marginHorizontal: 12,
    marginLeft: 20,
  },
});
