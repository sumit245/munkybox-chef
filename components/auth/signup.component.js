import React from "react";
const { width, height } = Dimensions.get("window");
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import { PARTNER_REQUEST } from "../../EndPoints";
import axios from "axios";
import { screenWidth } from "../../Dimens";

export default function Signup({ navigation }) {
  const [checked, setChecked] = React.useState(false);
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [postal_code, setPostalCode] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");

  const submitRequest = () => {
    let restaurant = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      postal_code: postal_code,
      phone: phone,
    };
    console.log(restaurant);
    axios
      .post(PARTNER_REQUEST, restaurant)
      .then((res) => {
        console.log(res.data);
        alert(
          "A Request has been sent to munkybox. Our customer care executive will contact you soon"
        ),
          navigation.navigate("Login");
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(restaurant);
  };
  return (
    <ImageBackground
      source={require("../../assets/chef-background.jpg")}
      style={{ width: screenWidth, flex: 1, alignItems: "center" }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.image}>
          <Text style={{ color: "#fff", fontSize: 34, fontWeight: "bold" }}>
            Munky
          </Text>
          <Text style={{ color: "#fff", fontSize: 34, fontWeight: "bold" }}>
            Box
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 20,
            paddingVertical: 20,
            paddingHorizontal: 4,
            marginTop: -16,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              style={[styles.TextInput, { width: "49%" }]}
              label="First Name"
              mode="outlined"
              placeholderTextColor="#003f5c"
              onChangeText={(data) => setFirstName(data)}
              theme={{
                colors: { text: "black", primary: "rgb(33, 151, 186)" },
              }}
            />

            <TextInput
              style={[styles.TextInput, { width: "49%" }]}
              label="Last Name"
              mode="outlined"
              onChangeText={(data) => setLastName(data)}
              theme={{
                colors: { text: "black", primary: "rgb(33, 151, 186)" },
              }}
            />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              style={[styles.TextInput, { width: "49%" }]}
              label="Postal Code"
              type="number"
              mode="outlined"
              placeholder="110011"
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
              keyboardType="phone-pad"
              mode="outlined"
              maxLength={14}
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
            theme={{ colors: { text: "black", primary: "rgb(33, 151, 186)" } }}
            onChangeText={(data) => setEmail(data)}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: 4,
            }}
          >
            <Checkbox
              color="rgb(80, 151, 226)"
              status={checked ? "checked" : "unchecked"}
              uncheckedColor="rgb(33, 151, 186)"
              onPress={() => setChecked(!checked)}
            />
            <Text
              style={{
                color: "rgb(33, 151, 186)",
                textAlign: "left",
                fontSize: width / 22,
              }}
            >
              Yes,I agree to the Terms of service and{"\n"} privacy policy{" "}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "rgb(33, 151, 186)",
              borderRadius: 12,
              width: "50%",
              marginVertical: 28,
              paddingHorizontal: 10,
              paddingVertical: 8,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
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

          <Text
            style={{
              color: "rgb(33, 151, 186)",
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
      </SafeAreaView>
    </ImageBackground>
  );
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
