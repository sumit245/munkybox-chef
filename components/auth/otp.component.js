import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  SafeAreaView,
} from "react-native";
import OTPTextView from "react-native-otp-textinput";
import CountDown from "react-native-countdown-component";
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");
export default function OtpComponent({ route, navigation }) {
  const { phoneNumber, confirmCode, verificationId } = route.params;
  const [message, setMessage] = useState(
    "A Verification code has been sent to your mobile"
  );
  const [verificationCode, setVerificationCode] = useState("");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E11D74" }}>
      <TouchableOpacity
        style={{ alignSelf: "flex-start", paddingTop: 20 }}
        onPress={() => navigation.pop()}
      >
        <Icon name="chevron-back" size={34} color="#FFF" />
      </TouchableOpacity>
      <View style={styles.mobin}>
        <Text style={[styles.instructions, { marginTop: 5 }]}>
          {message || ""} {phoneNumber || ""}
        </Text>
        <View>
          <OTPTextView
            handleTextChange={(text) => setVerificationCode(text)}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            inputCount={6}
            textInputProps={{
              returnKeyType: "done",
              returnKeyLabel: "Done",
              keyboardType: "number-pad",
            }}
            returnKeyType="done"
            inputCellLength={1}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.instructions}>OTP valid for</Text>
          <View>
            <CountDown
              size={14}
              until={60}
              digitStyle={{
                marginLeft: -4,
                marginTop: -8,
              }}
              digitTxtStyle={{ color: "#fff" }}
              timeLabelStyle={{ color: "red", fontWeight: "bold" }}
              timeLabels={{ s: null }}
              onFinish={() => {
                alert("Try again after some time!!!");
              }}
              timeLabelStyle={{ color: "#fff" }}
              timeToShow={["S"]}
            />
          </View>
          <Text
            style={{
              color: "#fff",
              marginLeft: -6,
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            seconds
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[
              styles.btnOTP,
              { width: width / 2.5, height: 40, marginHorizontal: 10 },
            ]}
          >
            <Text>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnOTP,
              { width: width / 2.5, height: 40, marginHorizontal: 10 },
            ]}
            onPress={() => confirmCode(verificationCode,verificationId)}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnOTP: {
    height: 50,
    width: width - 40,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  mobin: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  instructions: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  textInputContainer: {
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
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  termsCondition: {
    textAlign: "center",
    marginBottom: 40,
    color: "#FFF",
    fontWeight: "bold",
    justifyContent: "flex-end",
  },
  orLine: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    width: width / 2.6,
    justifyContent: "center",
    alignSelf: "center",
  },
  orText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  social: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
    padding: 5,
    top: -40,
  },
  skip: {
    position: "absolute",
    top: "4%",
    right: "5%",
    backgroundColor: "#FFF",
    width: 60,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});
