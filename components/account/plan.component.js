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
import { editBankInfo } from "../../actions/actions";

export default function Plans() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [twoPlan, setTwoPlan] = useState(0)
  const [fifteenPlan, setFifteenPlan] = useState(0)
  const [thirtyPlan, setThirtyPlan] = useState(0)
  const profile = useSelector((state) => state.restaurant);
  const { _id } = profile;
  const dispatch = useDispatch()


  const [editable, setEditable] = useState(false);
  const editHandler = () => {
    setEditable(!editable);
    if (editable) {
      let restaurant = {
        base_2price: twoPlan,
        base_15price: fifteenPlan,
        base_30price: thirtyPlan
      }
      dispatch(editBankInfo(_id, restaurant))

    }
  };
  useEffect(() => {
    setTwoPlan(profile.base_2price)
    setFifteenPlan(profile.base_15price)
    setThirtyPlan(profile.base_30price)

  }, [])

  return (
    <>
      <View style={styles.row}>
        <Text style={{ fontSize: 18, color: "#444", margin: 8, paddingVertical: 2 }}>
          <Icon name="calendar-sharp" color="#444" size={24} />  Subscription
          Plan
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
            onPress={editHandler}
          >
            <FontAwesome name={editable ? "save" : "pencil"} size={20} color={editable ? "#ff6600" : "#000"} />
          </TouchableOpacity>
          <View style={{ marginVertical: 4 }}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>2 Days</Text>
            </View>
            <View style={styles.planContainer}>
              <Icon name="ios-logo-usd" size={16} color="#000" />
              <TextInput
                value={twoPlan}
                editable={editable}
                selectionColor="#ff6600"
                style={[styles.inputContainer, { marginHorizontal: 0, marginVertical: 0, flex: 1 }]}
                onChangeText={(e) => setTwoPlan(e)}
                keyboardType="numeric"
              />
            </View>

          </View>
          <View style={{ marginVertical: 4 }}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>15 Days</Text>
            </View>
            <View style={styles.planContainer}>
              <Icon name="ios-logo-usd" size={14} color="#000" />
              <TextInput
                value={fifteenPlan}
                editable={editable}
                selectionColor="#ff6600"
                style={[styles.inputContainer, { marginHorizontal: 0, marginVertical: 0, flex: 1 }]}
                onChangeText={(text) => setFifteenPlan(text)}
                keyboardType="numeric"
              />
            </View>

          </View>
          <View style={{ marginVertical: 4 }}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>30 Days</Text>
            </View>
            <View style={styles.planContainer}>
              <Icon name="ios-logo-usd" size={14} color="#000" />
              <TextInput
                value={thirtyPlan}
                selectionColor="#ff6600"
                style={[styles.inputContainer, { marginHorizontal: 0, marginVertical: 0, flex: 1 }]}
                onChangeText={(text) => setThirtyPlan(text)}
                keyboardType="numeric"
                editable={editable}
              />
            </View>

          </View>
        </KeyboardAvoidingView>
      </Collapsible>
    </>
  );
}
