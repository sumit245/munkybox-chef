import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
const { width, height } = Dimensions.get("window");
import { useSelector, useDispatch } from "react-redux";

export default function BankAccount() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [editable, setEditable] = useState(false);
  const profile = useSelector((state) => state.restaurant);
  const { bank_info } = profile;
  const { account_name, account_number, bank_name, branch_number } = bank_info;
  return (
    <>
      <View style={styles.row}>
        <View style={{ flexDirection: "row", paddingVertical: 4 }}>
          <Icon
            name="card-sharp"
            color="#444"
            size={24}
            style={{ margin: 5 }}
          />
          <Text style={{ fontSize: 18, color: "#444", margin: 5 }}>
            Bank Information
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsCollapsed(!isCollapsed)}
          style={{
            justifyContent: "center",
            marginVertical: 2,
            borderLeftWidth: 1,
            borderLeftColor: "#777",
            height: 20,
            alignSelf: "center",
          }}
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
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: 4,
            }}
          >
            <Button
              onPress={() => setEditable(!editable)}
              mode={editable ? "outlined" : "contained"}
            >
              {editable ? "Save" : "Edit"}
            </Button>
          </View>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="person-outline" size={18} color="#777" />
              <Text style={styles.label}>Account Name</Text>
            </View>
            <TextInput
              defaultValue={account_name}
              style={styles.inputContainer}
            />
          </View>

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="business-outline" size={18} color="#777" />
              <Text style={styles.label}>Account Number</Text>
            </View>
            <TextInput
              defaultValue={account_number}
              style={styles.inputContainer}
              keyboardType="numeric"
            />
          </View>

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="business-outline" size={18} color="#777" />
              <Text style={styles.label}>Bank Name</Text>
            </View>
            <TextInput defaultValue={bank_name} style={styles.inputContainer} />
          </View>

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="business-outline" size={18} color="#777" />
              <Text style={styles.label}>Branch Number</Text>
            </View>
            <TextInput
              defaultValue={branch_number}
              placeholder="Branch #"
              placeholderTextColor="#777"
              style={styles.inputContainer}
            />
          </View>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="business-outline" size={18} color="#777" />
              <Text style={styles.label}>Institution Number</Text>
            </View>
            <TextInput
              placeholder="Institution #"
              placeholderTextColor="#777"
              style={styles.inputContainer}
            />
          </View>
        </KeyboardAvoidingView>
      </Collapsible>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 2,
    marginHorizontal: "1%",
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
  inputContainer: {
    width: 350,
    height: 40,
    padding: 4,
    fontSize: 16,
    borderColor: "#777",
    borderWidth: 0.4,
    textAlignVertical: "top",
    borderRadius: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 8,
  },
});
