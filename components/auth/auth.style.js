import { StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../../Dimens";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(25,25,25,0.45)",
    width: screenWidth,
    alignItems: "center",
  },
  image: {
    marginTop: 60,
    marginBottom: 120,
    height: "auto",
    width: "auto",
    flexDirection: "row",
    justifyContent: "center",
  },
  TextInput: {
    textAlign: "left",
    borderBottomWidth: 1,
    width: "90%",
    height: 45,
    marginBottom: 20,
  },
  forgot_button: {
    color: "#FFF",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  phoneContainer: {
    height: 50,
    width: "96%",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 6,
  },
  loginBtn: {
    width: "96%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
    backgroundColor: "rgb(0,175,239)",
  },
  btnText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "uppercase",
  },
  errormsg: {
    color: "#cf6c22",
  },
  imageBackground: {
    width: screenWidth,
    flex: 1,
    alignItems: "center",
  },
  mobin: {
    marginTop: screenHeight / 2 - 200,
    alignItems: "center",
    flex: 1,
  },
  instructions: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginTop: 6,
  },
  textInputContainer: {
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  roundedTextInput: {
    height: 40,
    width: 40,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 0.1,
  },
  pinMsg: {
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  pinMsgView: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "rgba(100,100,100,0.5)",
    paddingHorizontal: 20,
    width: "82%",
    padding: 10,
  },
  pinInputAreaStyle: {
    marginBottom: 24,
    backgroundColor: "rgba(100,100,100,0.5)",
    paddingHorizontal: 60,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 10,
  },
});