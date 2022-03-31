import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import Header from "../header/Header";
import HeaderTwo from "../header/HeaderTwo";

const { width, height } = Dimensions.get("window");
export const VerificationDocs = ({ navigation }) => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const profile = useSelector((state) => state.restaurant);
  const { _id } = profile;

  const fetchPapers = async (id) => {
    const response = await axios.get(
      "http://54.146.133.108:5000/api/newrest/" + id
    );
    const restaurant = await response.data;
    const paper = restaurant.papers;
    setPapers(paper);
    setLoading(false);
  };
  useEffect(() => {
    fetchPapers(_id);
  }, [_id]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00f" animating />
      </View>
    );
  } else {
    return (
      <SafeAreaView
        style={{ flex: 1 }}
      >

        <HeaderTwo title="Documents" navigation={navigation} />
        {/* <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", width: "100%", paddingHorizontal: 4, alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            <Header
              title="Documents"
            />
          </View>
        </View>
         */}
        <FlatList
          contentContainerStyle={{ marginHorizontal: 4 }}
          ItemSeparatorComponent={() => <View style={{ width: 0.1 * width }} />}
          data={papers}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", marginHorizontal: 8 }}>
                This Restaurant does not have any specific document
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                margin: 1,
              }}
            >
              <Image
                style={styles.imageThumbnail}
                source={{ uri: item.image }}
                resizeMode="contain"
              />
              <Text
                style={{
                  textAlign: "center",
                  position: "absolute",
                  bottom: 20,
                  left: "40%",
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#000",
                }}
              >
                {item.image_name}
              </Text>
            </View>
          )}
          horizontal
          keyExtractor={(item, index) => index}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: "98%",
    width: 0.98 * width,
  },
});
