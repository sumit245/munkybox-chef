import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./account.styles";

export default function Plans() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const profile = useSelector((state) => state.restaurant);
  const { base_2price, base_15price, base_30price } = profile;
  const [editable, setEditable] = useState(false);
  const editHandler = () => {
    setEditable(!editable);
  };
  const onChangeText = (e) => {
    console.log(e);
  };
  return (
    <>
      <View style={styles.row}>
        <Text style={{ fontSize: 18, color: "#444", margin: 8 }}>
          <Icon name="calendar-sharp" color="#444" size={20} /> Subscription
          Plan
        </Text>

        <TouchableOpacity
          onPress={() => setIsCollapsed(!isCollapsed)}
          style={styles.collapsibleButton}
        >
          <Icon
            name={isCollapsed ? "chevron-down-sharp" : "chevron-up-sharp"}
            color="#777"
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
            onPress={editHandler}
          >
            <FontAwesome name={editable ? "save" : "pencil"} size={20} />
          </TouchableOpacity>
          <>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>2 Days</Text>
            </View>
            <TextInput
              value={"$" + base_2price}
              editable={editable}
              name="base_2price"
              style={styles.inputContainer}
              onChangeText={(e) => onChangeText(e)}
              keyboardType="numeric"
            />
          </>
          <>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>15 Days</Text>
            </View>
            <TextInput
              value={"$" + base_15price}
              editable={editable}
              style={styles.inputContainer}
              // onChangeText={this.onChangeText("base_15price")}
              keyboardType="numeric"
            />
          </>
          <>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>30 Days</Text>
            </View>
            <TextInput
              value={"$" + base_30price}
              style={styles.inputContainer}
              // onChangeText={this.onChangeText("base_30price")}
              keyboardType="numeric"
              editable={editable}
            />
          </>
        </KeyboardAvoidingView>
      </Collapsible>
    </>
  );
}
