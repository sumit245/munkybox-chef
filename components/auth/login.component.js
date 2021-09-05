import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { loginMethod } from "../../store/actions/actions";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../../firebase";
import PhoneInput from "react-native-phone-number-input";

const { width, height } = Dimensions.get("window");
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
        console.log(res);
        navigation.navigate("Pin", {
          entry: true,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FirebaseRecaptchaVerifierModal
        ref={reCaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <View style={styles.image}>
        <Text style={{ color: "#91D18B", fontSize: 34, fontWeight: "bold" }}>
          Munky
        </Text>
        <Text style={{ color: "#440047", fontSize: 34, fontWeight: "bold" }}>
          Box
        </Text>
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
        onChangeFormattedText={(text) => {
          setPhone(text);
        }}
        containerStyle={styles.btnOTP}
        withShadow
        autoFocus
      />

      <TouchableOpacity
        onPress={sendVerification}
        style={[styles.btnOTP, { backgroundColor: "#000" }]}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#FFF",
            textTransform: "uppercase",
          }}
        >
          Send OTP
        </Text>
      </TouchableOpacity>

      <Text
        style={[styles.forgot_button, { textDecorationLine: "underline" }]}
        onPress={() => navigation.navigate("Pin")}
      >
        Login With PIN
      </Text>
      <Text
        style={[styles.forgot_button, { bottom: 0 }]}
        onPress={() => navigation.navigate("Signup")}
      >
        Become our Partner{" "}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E11D74",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
    height: "auto",
    width: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  TextInput: {
    textAlign: "left",
    borderBottomWidth: 1,
    width: "90%",
    height: 45,
    marginBottom: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "#FFF",
    marginTop: 25,
  },
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
  loginBtn: {
    width: "90%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "rgb(0,175,239)",
  },
  loginText: {
    color: "#ffffff",
  },
  errormsg: {
    color: "#cf6c22",
  },
});
