import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";
import { loginMethod } from "../../actions/actions";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../../firebase";
import PhoneInput from "react-native-phone-number-input";
import { styles } from "./auth.style";
import Logo from "../Logo";

const attemptInvisibleVerification = true;
const firebaseConfig = firebase.apps.length
  ? firebase.app().options
  : undefined;
export default function Login({ navigation }) {
  const [phone, setPhone] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const dispatch = useDispatch();
  const reCaptchaVerifier = useRef(null);

  const sendVerification = async () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const verificationId = await phoneProvider.verifyPhoneNumber(
      phone,
      reCaptchaVerifier.current
    );
    Promise.resolve(setVerificationId(verificationId))
      .then((res) => {
        navigation.push("OTP", {
          phoneNumber: phone,
          verificationId: verificationId,
          confirmCode: confirmCode,
        });
      })
      .catch((err) => console.log(err));
  };

  const confirmCode = async (code, verificationId) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    await firebase.auth().signInWithCredential(credential);
    Promise.resolve(dispatch(loginMethod(phone)))
      .then((res) => {
        navigation.navigate("Pin", {
          entry: true,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <ImageBackground
      source={require("../../assets/chef-background.jpg")}
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <FirebaseRecaptchaVerifierModal
          ref={reCaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification={attemptInvisibleVerification}
        />
        <View style={styles.image}>
          <Logo />
        </View>

        <PhoneInput
          defaultCode="CA"
          layout="first"
          textInputProps={{
            returnKeyType: "done",
            returnKeyLabel: "Done",
            keyboardType: "number-pad",
          }}
          textContainerStyle={{
            borderColor: "#fff",
            height: 48,
            textAlignVertical: "top",
            borderRadius: 5,
          }}
          codeTextStyle={{ textAlignVertical: "top" }}
          onChangeFormattedText={(text) => {
            setPhone(text);
          }}
          containerStyle={styles.phoneContainer}
          withShadow
          autoFocus
        />

        <TouchableOpacity onPress={sendVerification} style={styles.loginBtn}>
          <Text style={styles.btnText}>Send OTP</Text>
        </TouchableOpacity>

        <Text
          style={styles.forgot_button}
          onPress={() => navigation.navigate("Pin")}
        >
          Login With PIN
        </Text>
        <Text
          style={[
            styles.forgot_button,
            {
              bottom: -120,
            },
          ]}
          onPress={() => navigation.navigate("Signup")}
        >
          Become our Partner{" "}
        </Text>
      </SafeAreaView>
    </ImageBackground>
  );
}
