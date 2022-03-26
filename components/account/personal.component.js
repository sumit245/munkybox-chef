import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { editBankInfo } from "../../actions/actions";
import { styles } from "./account.styles";

export default function PersonalDetails() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [editable, setEditable] = useState(false);
  const [info, setInfo] = useState({
    ownerName: "",
    phoneNumber: "",
    emailId: "",
    aboutInfo: "",
  });
  const restaurant = useSelector((state) => state.restaurant);
  const { owner_name, _id, phone, email, about } = restaurant;
  useEffect(() => {
    setInfo({
      ownerName: owner_name,
      phoneNumber: phone,
      emailId: email,
      aboutInfo: about,
    });
  }, [owner_name, phone, email, about]);
  const dispatch = useDispatch();
  const onSubmit = () => {
    setEditable(!editable);
    const restaurant = {
      owner_name: info.ownerName,
      phone: info.phoneNumber,
      email: info.emailId,
      about: info.aboutInfo,
    };
    if (editable) {
      dispatch(editBankInfo(_id, restaurant));
    }
  };
  return (
    <>
      <View style={styles.row}>
        <Text style={{ fontSize: 18, color: "#444", margin: 8,paddingVertical:2 }}>
          <Icon name="person-sharp" color="#444" size={24} />  Personal Details
        </Text>

        <TouchableOpacity
          onPress={() => setIsCollapsed(!isCollapsed)}
          style={styles.collapsibleButton}
        >
          <Icon
            name={isCollapsed ? "chevron-down-sharp" : "chevron-up-sharp"}
            color="#ff6600"
            size={30}
          />
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={isCollapsed}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => onSubmit()}
          >
            <FontAwesome name={editable ? "save" : "pencil"} size={20} color={editable?"#ff6600":"#000"} />
          </TouchableOpacity>
          <View style={{ marginVertical: 4 }}>
            <View style={styles.labelContainer}>
              <Icon name="person-outline" size={18} color="#777" />
              <Text style={styles.label}> Name</Text>
            </View>
            <TextInput
              value={info.ownerName}
              selectionColor="#ff6600"
              style={styles.inputContainer}
              onChangeText={(text) => setInfo({ ...info, ownerName: text })}
              editable={editable}
            />
          </View>

          <View style={{ marginVertical: 4 }}>
            <View style={styles.labelContainer}>
              <Icon name="call-outline" size={18} color="#777" />
              <Text style={styles.label}> Contact Number</Text>
            </View>
            <TextInput
              value={info.phoneNumber}
              selectionColor="#ff6600"
              style={styles.inputContainer}
              keyboardType="phone-pad"
              onChangeText={(text) => setInfo({ ...info, phoneNumber: text })}
              editable={false}
            />
          </View>

          <View style={{ marginVertical: 4 }}>
            <View style={styles.labelContainer}>
              <Icon name="mail-outline" size={18} color="#777" />
              <Text style={styles.label}> Email ID</Text>
            </View>
            <TextInput
              value={info.emailId}
              selectionColor="#ff6600"
              style={styles.inputContainer}
              onChangeText={(text) => setInfo({ ...info, emailId: text })}
              editable={false}
            />
          </View>

          <View style={{ marginVertical: 4 }}>
            <View style={styles.labelContainer}>
              <Icon name="document-text-outline" size={18} color="#777" />
              <Text style={styles.label}> About</Text>
            </View>
            <TextInput
              value={info.aboutInfo}
              placeholder="Write a description in maximum 250 characters"
              placeholderTextColor="#777"
              multiline
              style={[styles.inputContainer, { textAlignVertical: "bottom" }]}
              numberOfLines={3}
              selectionColor="#ff6600"
              onChangeText={(text) => setInfo({ ...info, aboutInfo: text })}
              editable={editable}
            />
          </View>
        </KeyboardAvoidingView>
      </Collapsible>
    </>
  );
}
