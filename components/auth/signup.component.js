import React, { useRef, useState,useEffect } from "react";
const { width, height } = Dimensions.get("window");
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import { PARTNER_REQUEST } from "../../EndPoints";
import axios from "axios";
import { screenWidth } from "../../Dimens";
import CustomDialog from "../../helpers/CustomDialog";
import Loader from "../../helpers/Loader";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendPushNotification } from "../../helpers/NotificationServices";

export default function Signup({ navigation }) {

  const [checked, setChecked] = useState(false);
  const [logged, setLogged] = useState(false);
  const [msg, setMsg] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [restaurant_name, setRestaurantName] = useState("");
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const postalInput = useRef(null);
  const phoneInput = useRef(null);
  const emailInput = useRef(null);
  const restaurantInput = useRef(null);
  const [token, setToken] = useState("")

  const submitRequest = async () => {
    setLoaded(true);
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!first_name) {
      alert("First Name is required");
      setLoaded(false);
      firstNameInput.current.focus();
      return;
    }
    if (!last_name) {
      alert("Last Name is required");
      setLoaded(false);
      lastNameInput.current.focus();
      return;
    }
    if (!postal_code) {
      alert("Postal Code is required");
      postalInput.current.focus();
      setLoaded(false);
      return;
    }
    if (!phone) {
      alert("Phone is required");
      phoneInput.current.focus();
      setLoaded(false);
      return;
    }
    if (phone.length < 10) {
      alert("Phone number cannot be less than ten digits");
      phoneInput.current.focus();
      setLoaded(false);
      return;
    }
    if (!email.match(mailformat)) {
      alert("Invalid Email Format");
      emailInput.current.focus();
      setLoaded(false);
      return;
    }

    if (!email) {
      alert("Email is required");
      emailInput.current.focus();
      setLoaded(false);
      return;
    }
    if (!restaurant_name) {
      alert("Restaurant Name is required");
      restaurantInput.current.focus();
      setLoaded(false);
      return;
    }
    let restaurant = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      postal_code: postal_code,
      phone: phone,
      restaurant_name: restaurant_name,
    };
    const response = await axios.post(PARTNER_REQUEST, restaurant);
    const data = await response.data;
    if (response !== null) {
      setLogged(true);
      setLoaded(false);
      setMsg(data.msg);
      await sendPushNotification(token, "Welcome to Feasti 🍜", "Get your documents ready. Our admin will contact you soon for verification")
    }
  };
  const fetchNotificationToken = async () => {
    const token = await AsyncStorage.getItem('notificationToken')
    console.log(token);
    setToken(token)
  }
  useEffect(() => {
    fetchNotificationToken()
  }, [])


  if (!loaded) {
    return (
      <ImageBackground
        source={require("../../assets/chef-background.jpg")}
        style={{ width: screenWidth, flex: 1, alignItems: "center" }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.image}>
            <Text style={{ color: "#fff", fontSize: 34, fontWeight: "bold" }}>
              Feasti
            </Text>
          </View>
          <ScrollView
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 20,
              paddingVertical: 20,
              paddingHorizontal: 4,
            }}
            contentContainerStyle={{ justifyContent: "space-between", flex: 1 }}
            contentInsetAdjustmentBehavior="automatic"
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  style={[styles.TextInput, { width: "49%" }]}
                  label="First Name"
                  mode="outlined"
                  selectionColor="#ff6600"
                  activeOutlineColor="#ff6600"
                  placeholderTextColor="#003f5c"
                  onChangeText={(data) => setFirstName(data)}
                  ref={firstNameInput}
                  theme={{
                    colors: { text: "black", primary: "rgb(33, 151, 186)" },
                  }}
                />

                <TextInput
                  style={[styles.TextInput, { width: "49%" }]}
                  label="Last Name"
                  mode="outlined"
                  selectionColor="#ff6600"
                  activeOutlineColor="#ff6600"
                  onChangeText={(data) => setLastName(data)}
                  ref={lastNameInput}
                  theme={{
                    colors: { text: "black", primary: "rgb(33, 151, 186)" },
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  style={[styles.TextInput, { width: "49%" }]}
                  label="Postal Code"
                  type="number"
                  mode="outlined"
                  selectionColor="#ff6600"
                  activeOutlineColor="#ff6600"
                  placeholder="110011"
                  ref={postalInput}
                  onChangeText={(data) => setPostalCode(data)}
                  theme={{
                    colors: {
                      text: "black",
                      primary: "rgb(33, 151, 186)",
                      accent: "#f1c40f",
                    },
                  }}
                />
                <TextInput
                  style={[styles.TextInput, { width: "49%" }]}
                  label="Phone"
                  type="number"
                  selectionColor="#ff6600"
                  activeOutlineColor="#ff6600"
                  keyboardType="phone-pad"
                  mode="outlined"
                  returnKeyType="done"
                  returnKeyLabel="Done"
                  maxLength={14}
                  ref={phoneInput}
                  onChangeText={(data) => setPhone(data)}
                  theme={{
                    colors: { text: "black", primary: "rgb(33, 151, 186)" },
                  }}
                />
              </View>

              <TextInput
                style={styles.TextInput}
                label="Email"
                placeholder="username@domain.com"
                keyboardType="email-address"
                type="email"
                mode="outlined"
                selectionColor="#ff6600"
                activeOutlineColor="#ff6600"
                ref={emailInput}
                theme={{
                  colors: { text: "black", primary: "rgb(33, 151, 186)" },
                }}
                onChangeText={(data) => setEmail(data)}
              />
              <TextInput
                style={styles.TextInput}
                label="Restaurant Name"
                placeholder="Kristen Delicates"
                type="text"
                mode="outlined"
                selectionColor="#ff6600"
                activeOutlineColor="#ff6600"
                ref={restaurantInput}
                theme={{
                  colors: { text: "black", primary: "rgb(33, 151, 186)" },
                }}
                onChangeText={(data) => setRestaurantName(data)}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 4,
                  alignItems: "center",
                }}
              >
                <Checkbox.Android
                  color="#ff6600"
                  status={checked ? "checked" : "unchecked"}
                  uncheckedColor="#000"
                  onPress={() => setChecked(!checked)}
                />
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 14,
                  }}
                >
                  I agree to the{" "}
                  <Text
                    style={{
                      color: "#226ccf",
                      textAlign: "left",
                      fontSize: 14,
                      textDecorationLine: "underline",
                    }}
                  >
                    Terms of service
                  </Text>{" "}
                  and{" "}
                  <Text
                    style={{
                      color: "#226ccf",
                      textAlign: "left",
                      fontSize: 14,
                      textDecorationLine: "underline",
                    }}
                  >
                    privacy policy.
                  </Text>
                </Text>
              </View>

              <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
                backgroundColor: "rgb(33, 151, 186)",
                borderRadius: 12,
                width: "50%",
                marginVertical: 20,
                paddingHorizontal: 10,
                paddingVertical: 8,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <TouchableOpacity

                  disabled={!checked}
                  onPress={submitRequest}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontSize: 18,
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </LinearGradient>

            </View>
            <View>
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  textAlign: "center",
                }}
                onPress={() => navigation.navigate("Login")}
              >
                Already registered? Login
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
        {logged && (
          <CustomDialog
            navigation={navigation}
            page="Login"
            title={"Thank You"}
            text={msg}
          />
        )}
      </ImageBackground>
    );
  } else {
    return <Loader />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(25,25,25,0.45)",
    width: width,
  },
  image: {
    marginTop: 60,
    marginBottom: 120,
    flexDirection: "row",
    justifyContent: "center",
  },
  TextInput: {
    textAlign: "left",
    height: 48,
    marginBottom: 4,
    color: "white",
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 5,
  },
});
