import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Review from "./reviewdetails"

export default function Reviews({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.row}>
         <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Review  />
            {/* <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{ flexDirection: "row", paddingVertical: 4,alignItems:'center' }}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="star-sharp" color="#444" size={24} style={{ margin: 5 }} />
        <View style={{ paddingHorizontal: 2 }}>
          <Text style={{ fontSize: 18, color: "#444" }}>Reviews</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    width: "98%",
    marginHorizontal: "1%",
    borderBottomWidth: 1,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    backgroundColor: "#FFF",
    padding: 2,
    justifyContent: "space-between",
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
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    padding: 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});
