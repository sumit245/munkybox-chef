import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { width } from "../../Dimens";
import { DARKGRAY } from "../../Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { IconButton, Provider } from "react-native-paper";
import { useSelector } from "react-redux";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient"
import * as MailComposer from "expo-mail-composer"


export default function Contacts({ navigation }) {
  const [info, setInfo] = useState({
    receipient: "support@feasti.com",
    subject: "",
    restaurant_name: "",
    restaurant_id: "",
    email: "",
    phone: "",
    body: "",
  });
  const restaurant = useSelector((state) => state.restaurant);

  useEffect(() => {
    setInfo({ ...info, ...restaurant });
  }, []);

  const sendEmail = async () => {
    const mail = {
      sender: info.email,
      receipient: info.receipient,
      subject: info.subject,
      body: info.body,
      id: info.restaurant_id,
      restaurant_name: info.restaurant_name,
      sender_name: info.owner_name,
      phone: info.phone,
      label: "restaurant",
    };
    MailComposer.composeAsync({
      subject: info.subject,
      recipients: ["support@feasti.com","sumitranjan245@gmail.com"],
      body: info.body
    })

    const response = await axios.post(
      "http://54.146.133.108:5000/api/contacts/",
      mail
    );
    const { status } = await response.data;
    if (status === 200) {
      Alert.alert(
        "Delivered!!!",
        "Your message has been sent to the admin. They will contact you soon!!",
        [
          { text: "OK", onPress: () => navigation.goBack() }
        ])
    }
  };

  const deleteMsg = () => {
    Alert.alert(
      "Are you Sure?",
      "Your message will be discarded",
      [{
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => navigation.goBack() }
      ])
  };



  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
            elevation: 1,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
            <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
              height: 28,
              width: 28,
              marginHorizontal: 4,
              borderRadius: 14,
            }}>
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
                onPress={() => navigation.goBack()}
              >
                <Icon name="chevron-back" size={24} color="#ffffff" />
              </TouchableOpacity>
            </LinearGradient>
            <Text style={{ fontWeight: 'bold' }}>Compose</Text>
          </View>



          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: 4,
            }}
          >
            <IconButton icon="send" color="#126e72" onPress={sendEmail} />
            <IconButton icon="delete" color="#ef2145" onPress={deleteMsg} />
          </View>
          {/* buttons */}
        </View>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <View style={{ marginVertical: 4 }}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>From:</Text>
                <Text
                  style={[styles.inputContainer, { flex: 1, color: "#777" }]}
                >
                  {info.email}
                </Text>
              </View>
            </View>
            {/* From */}

            <View style={{ marginVertical: 4 }}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>To:</Text>
                <Text
                  style={[
                    styles.inputContainer,
                    { flex: 1, marginLeft: "10%", color: "#777" },
                  ]}
                >
                  {info.receipient}
                </Text>
              </View>
            </View>
            {/* To */}

            <View style={{ marginVertical: 4 }}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Subject</Text>
              </View>
              <TextInput
                value={info.subject}
                selectionColor="#ff6600"
                style={styles.inputContainer}
                onChangeText={(text) => setInfo({ ...info, subject: text })}
              />
            </View>
            {/* Subject */}

            <View style={{ marginVertical: 4 }}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Desciption</Text>
              </View>
              <TextInput
                value={info.body}
                placeholder="Write a description in maximum 250 characters"
                placeholderTextColor="#777"
                selectionColor="#ff6600"
                multiline

                textAlignVertical="top"
                style={[
                  styles.inputContainer,
                  {
                    textAlignVertical: "bottom",
                    borderColor: "#777",
                    borderWidth: 0.5,
                    borderRadius: 2,
                    height: 350,
                    padding: 4,
                  },
                ]}
                numberOfLines={10}
                onChangeText={(text) => setInfo({ ...info, body: text })}
              />
            </View>
            {/* Body */}
          </View>
        </ScrollView>
      </SafeAreaView>

    </Provider>
  );
}
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 4,
    borderColor: "#777",
    borderWidth: 0.2,
    marginVertical: 2,
    padding: 4,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  row: {
    width: "98%",
    marginHorizontal: "1%",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    backgroundColor: "#FFF",
    padding: 2,
    justifyContent: "space-between",
  },
  restaurant: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  detailsContainer: {
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 4,
  },
  headerImage: {
    width: width - 0.01 * width,
    height: 0.5 * width,
    margin: "0.5%",
  },
  avatarImage: {
    width: 0.3 * width,
    height: 0.3 * width,
    borderRadius: 0.15 * width,
    borderWidth: 2,
    borderColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: -0.14 * width,
  },
  navLink: {
    fontSize: 18,
    padding: 4,
    color: "#444",
    marginVertical: 5,
    paddingLeft: 10,
  },
  collapsibleButton: {
    justifyContent: "center",
    marginVertical: 2,
    borderLeftWidth: 1,
    borderLeftColor: "#777",
    height: 20,
    alignSelf: "center",
  },
  container: {
    backgroundColor: "#FFF",
    padding: 2,
    flex: 1,
    justifyContent: "space-between",
  },
  inputContainer: {
    borderBottomWidth: 0.2,
    borderBottomColor: DARKGRAY,
    fontSize: 16,
    marginHorizontal: "4%",
  },
  planContainer: {
    flexDirection: "row",
    marginHorizontal: "4%",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "4%",
    marginTop: 8,
    marginVertical: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
