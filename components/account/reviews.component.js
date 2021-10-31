import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Review from "./reviewdetails";
import { styles } from "./account.styles";

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
            <Review setModalVisible={setModalVisible} />
            {/* <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{ fontSize: 18, color: "#444", margin: 8 }}>
          <Icon name="star-sharp" color="#444" size={20} /> Reviews
        </Text>
      </TouchableOpacity>
    </View>
  );
}
