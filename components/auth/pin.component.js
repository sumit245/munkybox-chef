import Icon from "react-native-vector-icons/Ionicons";
import React, { useEffect, useRef, useState } from "react";
import { ImageBackground, View, SafeAreaView, Text } from "react-native";
import ReactNativePinView from "react-native-pin-view";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setRestaurant } from "../../actions/actions";
import { styles } from "./auth.style";
import BackButton from "../BackButton";
import axios from "axios";
const PinPage = ({ route, navigation, entry }) => {
  const pinView = useRef(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [showCompletedButton, setShowCompletedButton] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [pin, setPin] = useState("");
  const restaurant = useSelector((state) => state.restaurant);

  const dispatch = useDispatch();

  const setLocalData = async () => {
    let rest = JSON.stringify(restaurant);
    await AsyncStorage.setItem("restaurant", rest);
  };

  const getApiData = async (enteredPin) => {
    try {
      const response = await AsyncStorage.getItem("credential");
      const { pin } = JSON.parse(response);

      if (pin === enteredPin) {
        const rest = await AsyncStorage.getItem("restaurant");
        const { _id } = JSON.parse(rest);
        const res = await axios.get(
          "http://54.146.133.108:5000/api/newrest/" + _id
        );
        const restra = res.data;
        let newrest = JSON.stringify(restra);
        await AsyncStorage.setItem("restaurant", newrest);
        dispatch(setRestaurant());
        navigation.navigate("Main");
      } else {
        alert("Wrong Pin");
      }
    } catch (error) {
      alert("Login for first time using otp");
    }
  };

  const unlock = () => {
    if (route.params.entry) {
      setConfirmation(true);
      if (confirmation) {
        if (pin === enteredPin) {
          const credential = {
            entry: false,
            pin: pin,
          };
          AsyncStorage.setItem("credential", JSON.stringify(credential)).then(
            () => {
              setLocalData();
              pinView.current.clearAll();
              navigation.navigate("Main");
            }
          );
        } else {
          alert("Confirmation and Entered PIN code does not match");
        }
      } else {
        setPin(enteredPin);
        pinView.current.clearAll();
      }
    } else {
      getApiData(enteredPin);
    }
  };

  const resetPin = () => {
    AsyncStorage.clear();
    navigation.pop();
  };

  useEffect(() => {
    enteredPin.length > 0
      ? setShowRemoveButton(true)
      : setShowRemoveButton(false);

    enteredPin.length === 4
      ? setShowCompletedButton(true)
      : setShowCompletedButton(false);
  }, [enteredPin]);

  return (
    <ImageBackground
      source={require("../../assets/chef-background.jpg")}
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.container}>
        {entry ? (
          <BackButton goBack={navigation.goBack} />
        ) : (
          <View style={{ marginBottom: 80 }} />
        )}

        <View style={styles.pinMsgView}>
          {confirmation ? (
            <>
              <Text style={styles.pinMsg}>Confirm PIN Code</Text>
            </>
          ) : (
            route.params.entry && (
              <>
                <Text style={styles.pinMsg}>
                  Create a PIN code for your account.
                </Text>
              </>
            )
          )}
          <Text style={styles.pinMsg}>Enter 4 Digits PIN</Text>
        </View>

        <ReactNativePinView
          inputSize={32}
          ref={pinView}
          pinLength={4}
          buttonSize={60}
          onValueChange={(value) => setEnteredPin(value)}
          buttonAreaStyle={{
            marginTop: 24,
          }}
          inputAreaStyle={styles.pinInputAreaStyle}
          inputViewEmptyStyle={{
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "#FBECEC",
          }}
          inputViewFilledStyle={{
            backgroundColor: "#FFFFFF",
          }}
          buttonViewStyle={{
            borderWidth: 2,
            borderColor: "#F5EFEF",
          }}
          buttonTextStyle={{
            color: "#F5EFEF",
            fontWeight: "bold",
          }}
          onButtonPress={(key) => {
            if (key === "custom_left") {
              pinView.current.clear();
            }
            if (key === "custom_right") {
              unlock();
            }
          }}
          customLeftButton={
            showRemoveButton ? (
              <Icon name={"ios-backspace"} size={36} color="#FBECEC" />
            ) : null
          }
          customRightButton={
            showCompletedButton ? (
              <Icon name={"ios-lock-open"} size={36} color="#FBECEC" />
            ) : null
          }
        />
        {/* </View> */}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.forgot_button} onPress={() => navigation.pop()}>
            Login with OTP
          </Text>
          <Text style={styles.forgot_button} onPress={resetPin}>
            Forgot Pin? Reset Here
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default PinPage;
