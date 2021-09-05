import React from "react";
const { width, height } = Dimensions.get("window");
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { PARTNER_REQUEST } from "../../EndPoints";
import axios from "axios";

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
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginBottom: 30 }}>
        <Text style={{ fontSize: 28, color: "white" }}>Munky</Text>
        <Text style={{ fontSize: 28, color: "white" }}>Box</Text>
      </View>
      {/* <View style={{ flexDirection: "row" }}> */}
      <TextInput
        style={styles.TextInput}
        placeholder="First Name"
        placeholderTextColor="#003f5c"
        onChangeText={(data) => setFirstName(data)}
      />

      <TextInput
        style={styles.TextInput}
        placeholder="Last Name"
        placeholderTextColor="#003f5c"
        onChangeText={(data) => setLastName(data)}
      />
      {/* </View> */}

      <TextInput
        style={styles.TextInput}
        placeholder="Postal Code"
        type="number"
        placeholderTextColor="#003f5c"
        onChangeText={(data) => setPostalCode(data)}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="Phone"
        type="number"
        placeholderTextColor="#003f5c"
        onChangeText={(data) => setPhone(data)}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="username@domain.com"
        type="email"
        placeholderTextColor="#003f5c"
        onChangeText={(data) => setEmail(data)}
      />
      <View
        style={{ flexDirection: "row", paddingHorizontal: 1, width: "100%" }}
      >
        <Checkbox
          color="#fff"
          status={checked ? "checked" : "unchecked"}
          uncheckedColor="#ff8499"
          onPress={() => setChecked(!checked)}
        />
        <Text
          style={{
            color: "#fff",
            textAlign: "justify",
            fontSize: width / 23,
          }}
        >
          Yes,I agree to the Terms of service and{"\n"} privacy policy{" "}
        </Text>
      </View>
      <View
        style={{
          alignSelf: "flex-start",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#ff8499",
            borderRadius: 14,
            paddingHorizontal: 10,
            paddingVertical: 6,
          }}
          disabled={!checked}
          onPress={submitRequest}
        >
          <Text
            style={{ color: "#FFF", fontSize: width / 16, fontWeight: "bold" }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ flexDirection: "row", alignSelf: "flex-start", padding: 10 }}
      >
        <Text style={{ color: "#fff", fontSize: width / 22 }}>
          Already registered?
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: "#fff",
              fontStyle: "italic",
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
              fontSize: width / 22,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            LogIn
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#560319",
  },
  TextInput: {
    textAlign: "left",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    width: "96%",
    height: 45,
    marginBottom: 4,
    backgroundColor: "#fff",
    elevation: 2,
  },
  name: {
    textAlign: "left",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    width: "47%",
    height: 45,
    margin: 4,
    elevation: 2,
    backgroundColor: "#fff",
  },
});
