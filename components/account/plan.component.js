import React, { useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";

export default function Plans() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [twoEditable, setTwoEditable] = useState(false);
  const [fifteenEditable, setFifteenEditable] = useState(false);
  const [thirtyEditable, setThirtyEditable] = useState(false);
  const profile = useSelector((state) => state.restaurant.restaurant);
  const { plan } = profile;
  const { twoPlan, fifteenPlan, thirtyPlan } = plan;
  return (
    <>
      <View style={styles.row}>
        <View style={{ flexDirection: "row", paddingVertical: 4 }}>
          <Icon
            name="calendar-sharp"
            color="#444"
            size={24}
            style={{ margin: 5 }}
          />
          <Text style={{ fontSize: 18, color: "#444", margin: 5 }}>
            Subscription Plan
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            marginVertical: 2,
            borderLeftWidth: 1,
            borderLeftColor: "#777",
            height: 20,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
            <Icon
              name={isCollapsed ? "chevron-down-sharp" : "chevron-up-sharp"}
              color="#777"
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Collapsible collapsed={isCollapsed}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>2 Days</Text>
              <TextInput
                value={"$" + twoPlan.base_2price}
                editable={twoEditable}
                style={styles.inputContainer}
                // onChangeText={this.onChangeText("base_2price")}
                keyboardType="numeric"
                // onEndEditing={this.onEndEditing}
              />
            </View>
            <View>
              <Button
              //   onPress={editHandler("twoPlan")}
              >
                {twoEditable ? "SAVE" : "EDIT"}
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>15 Days</Text>
              <TextInput
                value={"$" + fifteenPlan.base_15price}
                editable={fifteenEditable}
                style={styles.inputContainer}
                // onChangeText={this.onChangeText("base_15price")}
                keyboardType="numeric"
              />
            </View>
            <View>
              <Button
              //    onPress={this.editHandler("fifteenPlan")}
              >
                {fifteenEditable ? "SAVE" : "EDIT"}
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>30 Days</Text>
              <TextInput
                value={"$" + thirtyPlan.base_30price}
                style={styles.inputContainer}
                // onChangeText={this.onChangeText("base_30price")}
                keyboardType="numeric"
                editable={thirtyEditable}
              />
            </View>
            <View>
              <Button
              //   onPress={this.editHandler("thirtyPlan")}
              >
                {thirtyEditable ? "SAVE" : "EDIT"}
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Collapsible>
    </>
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
  inputContainer: {
    height: 40,
    padding: 4,
    fontSize: 16,
    textAlignVertical: "top",
    borderRadius: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 4,
  },
});
