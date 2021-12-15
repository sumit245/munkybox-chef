import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { width } from "../../Dimens";
import { DARKGRAY } from "../../Colors";
import Icon from "react-native-vector-icons/Ionicons";

export default function AddEditMeals({ meal, day }) {
  const [image, setImage] = useState(null);
  const [editable, setEditable] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [info, setInfo] = useState({
    ownerName: "",
    phoneNumber: "",
    emailId: "",
    aboutInfo: "",
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderStyle: "dashed",
          borderWidth: 0.5,
          borderColor: "#444",
          borderRadius: 4,
          height: width / 2,
          width: width - 16,
        }}
        onPress={pickImage}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: width - 8, height: width / 2 }}
          />
        ) : (
          <Icon name="camera-outline" size={100} color="#777" />
        )}
      </TouchableOpacity>

      <View style={{ marginVertical: 4 }}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Meal Name</Text>
        </View>
        <TextInput
          value={info.ownerName}
          style={styles.inputContainer}
          onChangeText={(text) => setInfo({ ...info, mealName: text })}
          editable={editable}
        />
      </View>
      {/* Meal Name */}

      <View style={{ marginVertical: 4 }}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Description</Text>
        </View>
        <TextInput
          value={info.aboutInfo}
          placeholder="Write a description in maximum 250 characters"
          placeholderTextColor="#777"
          multiline
          style={[styles.inputContainer, { textAlignVertical: "bottom" }]}
          numberOfLines={3}
          onChangeText={(text) => setInfo({ ...info, aboutInfo: text })}
          editable={editable}
        />
      </View>
      <View style={{ marginVertical: 4 }}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Meal Type</Text>
        </View>
        <Picker
          style={{ marginHorizontal: 8 }}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="Veg" value="veg" />
          <Picker.Item label="Non Veg" value="non-veg" />
        </Picker>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 4,
    borderColor: "#777",
    borderWidth: 0.2,
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
    marginHorizontal: "1%",
  },
  inputContainer: {
    borderBottomWidth: 0.2,
    flex: 1,
    borderBottomColor: DARKGRAY,
    fontSize: 16,
    marginHorizontal: "4%",
  },
  planContainer: {
    flexDirection: "row",
    marginHorizontal: "4%",
    alignItems: "center",
    marginVertical: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "4%",
    marginTop: 12,
    marginVertical: 8,
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
