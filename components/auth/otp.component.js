import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import OTPTextView from "react-native-otp-textinput";
import CountDown from "react-native-countdown-component";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./auth.style";
import { useNavigationState } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function OtpComponent({ route, navigation }) {
  const { phoneNumber, confirmCode, verificationId } = route.params;
  const [message, setMessage] = useState(
    "A Verification code has been sent to your mobile"
  );
  const [verificationCode, setVerificationCode] = useState("");
  const routes = useNavigationState((state) => state.routes);
  const currentRoute = routes[routes.length - 1].name;
  const otpInput = useRef(null)
  return (
    <ImageBackground
      source={require("../../assets/chef-background.jpg")}
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ alignSelf: "flex-start", paddingTop: 20 }}
          onPress={() => navigation.pop()}
        >
          <Icon name="chevron-back" size={34} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.mobin}>
          <Text style={styles.instructions}>
            {message || ""} {phoneNumber || ""}
          </Text>
          <OTPTextView
            handleTextChange={(text) => setVerificationCode(text)}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            inputCount={6}
            tintColor="#ff6600"
            selectionColor="#ff6600"
            textInputProps={{
              returnKeyType: "done",
              returnKeyLabel: "Done",
              selectionColor: "#ff6600",
              keyboardType: "number-pad",
            }}
            returnKeyType="done"
            inputCellLength={1}
            ref={otpInput}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.instructions}>OTP valid for</Text>
            <CountDown
              until={59}
              digitStyle={{
                marginLeft: -2,
                marginTop: 6,
                marginRight: -4,
              }}
              digitTxtStyle={{ color: "#fff", fontSize: 16 }}
              timeLabels={{ s: null }}
              onFinish={() => {
                if (currentRoute === "OTP") {
                  alert("Try again after some time!!!");
                }
              }}
              timeToShow={["S"]}
            />
            <Text style={styles.instructions}>seconds</Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={[styles.loginBtn, { width: "46%", marginRight: "1%" }]}
              onPress={() => otpInput.current.clear()}
            >
              <Text style={[styles.btnText, { color: "#f00" }]}>Clear</Text>
            </TouchableOpacity>
            <LinearGradient colors={["#ff9900", "#ff6600"]} style={[styles.loginBtn, { width: "46%", marginLeft: "1%" }]}>
              <TouchableOpacity

                onPress={() => confirmCode(verificationCode, verificationId)}
              >
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
