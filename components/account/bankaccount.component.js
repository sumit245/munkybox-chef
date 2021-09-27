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
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./account.styles";

export default function BankAccount() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [editable, setEditable] = useState(false);
  const profile = useSelector((state) => state.restaurant);
  const { bank_info } = profile;
  const [account_name, setAccountName] = useState("");
  const [account_number, setAccountNumber] = useState("");
  const [confirm_account_number, setConfirmAccount] = useState("");
  const [bank_name, setBankName] = useState("");
  const [branch_number, setBranchNumber] = useState("");
  const [institution_number, setInstitutionNumber] = useState("");

  useEffect(() => {
    console.log(profile);
  }, []);
  const onChangeText = (e) => {
    console.log(e);
  };
  return (
    <>
      <View style={styles.row}>
        <Text style={{ fontSize: 18, color: "#444", margin: 8 }}>
          <Icon name="card-sharp" color="#444" size={22} /> Bank Information
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
          <Button
            onPress={() => setEditable(!editable)}
            mode={editable ? "outlined" : "contained"}
            style={{
              alignSelf: "flex-end",
            }}
          >
            {editable ? "Save" : "Edit"}
          </Button>

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="person-outline" size={18} color="#777" />
              <Text style={styles.label}>Account Name</Text>
            </View>
            <TextInput
              defaultValue={account_name}
              style={styles.inputContainer}
              onChangeText={setAccountName}
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
              onChangeText={setAccountNumber}
            />
          </View>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="business-outline" size={18} color="#777" />
              <Text style={styles.label}>Confirm Account Number</Text>
            </View>
            <TextInput
              defaultValue={confirm_account_number}
              style={styles.inputContainer}
              keyboardType="numeric"
              onChangeText={setConfirmAccount}
            />
          </View>

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="business-outline" size={18} color="#777" />
              <Text style={styles.label}>Bank Name</Text>
            </View>
            <TextInput
              defaultValue={bank_name}
              placeholder="Bank Name"
              style={styles.inputContainer}
              onChangeText={setBankName}
            />
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
              onChangeText={setBranchNumber}
            />
          </View>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="business-outline" size={18} color="#777" />
              <Text style={styles.label}>Institution Number</Text>
            </View>
            <TextInput
              placeholder="Institution #"
              defaultValue={institution_number}
              placeholderTextColor="#777"
              style={styles.inputContainer}
              onChangeText={setInstitutionNumber}
            />
          </View>
        </KeyboardAvoidingView>
      </Collapsible>
    </>
  );
}
