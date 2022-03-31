import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { width } from "../../Dimens";
import { DARKGRAY } from "../../Colors";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import Loader from "../../helpers/Loader";
import AddEditAddOns from "./AddEditAddOns";

export default function AddEditMeals({
  meal,
  day,
  slot,
  index,
  addState,
  changeEditState,
}) {
  const [image, setImage] = useState(null);
  const restaurant = useSelector((state) => state.restaurant);
  const [meals, setMeals] = useState([]);
  const [meal_type, setMealType] = useState("");
  const [loading, setLoading] = useState(true);
  const [addOns, setAddOns] = useState([
    {
      add_on_name: "",
      add_on_price: "",
      add_on_image: "",
    },
  ]);
  const [info, setInfo] = useState({
    meal_name: "",
    type: "",
    day: "",
    slot: "",
    description: "",
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

  useEffect(() => {
    let meals = [];
    try {
      meals = restaurant.meals;
      setMeals(meals);
    } catch (error) {
      meals = [];
      setMeals(meals);
    }
  }, []);

  useEffect(() => {
    setInfo({ ...info, ...meal });
  }, [meal]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const submitMeal = async () => {
    setLoading(false);
    let base64 = "";
    try {
      base64 = await FileSystem.readAsStringAsync(image, {
        encoding: "base64",
      });
    } catch (error) {
      base64 = "";
    }

    const data = {
      day: day,
      slot: slot,
      type: meal_type,
      image: base64,
      add_on: addOns,
      meal_name: info.meal_name,
      description: info.description,
    };
    let dataToUpload = [...meals];
    addState
      ? dataToUpload.splice(index, 0, data)
      : dataToUpload.splice(index, 1, data);

   await setMeals(dataToUpload);
    const respone = await axios.put(
      "http://54.146.133.108:5000/api/newrest/" + restaurant._id,
      {
        meals: meals,
      }
    );

    if (respone !== null) {
      setLoading(true);
      changeEditState(false);
    }
  };
  const addInputFields = () => {
    setAddOns([
      ...addOns,
      { add_on_name: "", add_on_price: "", add_on_image: "" },
    ]);
  };
  
  const handleRemoveClicked = () => {
    const values = [...addOns];
    values.pop();
    setAddOns(values);
  };

  const saveHandler = () => {};

  if (loading) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: 4,
            }}
          >
            <TouchableOpacity onPress={() => changeEditState(false)}>
              <Text
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "#ff2222",
                  marginRight: 16,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={submitMeal}>
              <Text
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "#2222ff",
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>

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
          {/* Meal Image */}

          <View style={{ marginVertical: 4 }}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Meal Name</Text>
            </View>
            <TextInput
              value={info.meal_name}
              style={styles.inputContainer}
              onChangeText={(text) => setInfo({ ...info, meal_name: text })}
            />
          </View>
          {/* Meal Name */}

          <View style={{ marginVertical: 4 }}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Description</Text>
            </View>
            <TextInput
              value={info.description}
              placeholder="Write a description in maximum 250 characters"
              placeholderTextColor="#777"
              multiline
              style={[styles.inputContainer, { textAlignVertical: "bottom" }]}
              numberOfLines={3}
              onChangeText={(text) => setInfo({ ...info, description: text })}
            />
          </View>
          {/* Description */}

          <View style={{ marginVertical: 4 }}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Meal Type</Text>
            </View>
            <Picker
              style={{ marginHorizontal: 8 }}
              selectedValue={meal_type}
              onValueChange={(itemValue, itemIndex) => setMealType(itemValue)}
            >
              <Picker.Item label="Veg" value="veg" />
              <Picker.Item label="Non Veg" value="non-veg" />
            </Picker>
          </View>
          {/* Meal Type */}
        </View>
        <View style={styles.addOnContainer}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 2,
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Text
              style={{ fontWeight: "bold", padding: 4, marginHorizontal: 2 }}
            >
              Add More Add-ons
            </Text>
          </View>
          {addOns.map((data, index) => (
            <AddEditAddOns
              key={index}
              data={data}
              addHandler={addInputFields}
              removeHandler={handleRemoveClicked}
              saveHandler={saveHandler}
            />
          ))}
        </View>
      </ScrollView>
    );
  } else {
    return <Loader />;
  }
}
const styles = StyleSheet.create({
  addOnContainer: {
    marginVertical: 8,
  },
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
