import Icon from "react-native-vector-icons/Ionicons";
import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import ReactNativePinView from "react-native-pin-view";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setRestaurant } from "../../store/actions/actions";
const PinPage = ({ route, navigation, entry }) => {
  try {
    const { entry } = route.params;
  } catch {
    entry = entry;
  }
  const pinView = useRef(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [showCompletedButton, setShowCompletedButton] = useState(false);
  const [pin, setPin] = useState("");
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const dispatch = useDispatch();

  const setLocalData = () => {
    console.log(restaurant);
    let rest = JSON.stringify(restaurant);
    AsyncStorage.setItem("restaurant", rest)
      .then((res) => {})
      .catch((err) => alert(err));
  };
  const getApiData = () => {
    AsyncStorage.getItem("credential")
      .then((res) => {
        let data = JSON.parse(res);
        const { pin } = data;
        setPin(pin);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const unlock = () => {
    setLocalData();
    pinView.current.clearAll();
    if (entry) {
      const credential = {
        entry: false,
        pin: enteredPin,
      };

      AsyncStorage.setItem("credential", JSON.stringify(credential)).then(
        () => {
          navigation.navigate("Main");
        }
      );
    } else {
      if (pin === enteredPin) {
        dispatch(setRestaurant());
        navigation.navigate("Main");
      } else {
        alert("Wrong input");
      }
    }
  };
  useEffect(() => {
    AsyncStorage.clear()
    enteredPin.length > 0
      ? setShowRemoveButton(true)
      : setShowRemoveButton(false);

    enteredPin.length === 4
      ? setShowCompletedButton(true)
      : setShowCompletedButton(false);
    // return () => clearTimeout();
  }, [enteredPin]);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#E11D74",
        }}
      >
        {entry && (
          <>
            <TouchableOpacity
              style={{ alignSelf: "flex-start", padding: 10 }}
              onPress={() => navigation.pop()}
            >
              <Icon name="chevron-back" size={34} color="#FBECEC" />
            </TouchableOpacity>
            <Text>Hello</Text>
          </>
        )}

        <Text
          style={{
            padding: 20,
            color: "#FBECEC",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Enter 4 Digits PIN
        </Text>
        <ReactNativePinView
          inputSize={32}
          ref={pinView}
          pinLength={4}
          buttonSize={60}
          onValueChange={(value) => setEnteredPin(value)}
          buttonAreaStyle={{
            marginTop: 24,
          }}
          inputAreaStyle={{
            marginBottom: 24,
          }}
          inputViewEmptyStyle={{
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "#FBECEC",
          }}
          inputViewFilledStyle={{
            backgroundColor: "#F5EFEF",
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
            ) : undefined
          }
          customRightButton={
            showCompletedButton ? (
              <Icon name={"ios-lock-open"} size={36} color="#FBECEC" />
            ) : undefined
          }
        />
        <Text
          style={{
            paddingTop: 40,
            color: "#FBECEC",
            fontSize: 18,
            textDecorationLine: "underline",
            textAlign: "center",
            textAlignVertical: "bottom",
          }}
          onPress={() => navigation.pop()}
        >
          Forgot PIN?
        </Text>
      </SafeAreaView>
    </>
  );
};
export default PinPage;
