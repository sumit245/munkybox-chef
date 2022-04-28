import CustomDialog from "../../helpers/CustomDialog";
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
import { useSelector, useDispatch } from "react-redux";
import { editBankInfo } from "../../actions/actions";
import { styles } from "./account.styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator } from "react-native-paper";
export default function BankAccount({ navigation }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [editable, setEditable] = useState(false);
  const profile = useSelector((state) => state.restaurant);
  const {
    account_name,
    account_number,
    bank_name,
    branch_number,
    institution_number,
  } = profile;
  const [info, setInfo] = useState({
    account_name: account_name,
    account_number: account_number,
    bank_name: bank_name,
    branch_number: branch_number,
    institution_number: institution_number,
    confirmNumber: "",
  });
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();

  const onSubmit = () => {
    setEditable(!editable);
    const bank_info = {
      account_name: info.account_name,
      account_number: info.account_number,
      bank_name: info.bank_name,
      branch_number: info.branch_number,
      institution_number: info.institution_number,
    };
    if (editable) {
      setLoading("confirm");
      if (info.account_number !== info.confirmNumber) {
        alert("Confirm account number does not match");
        return;
      } else {
        setLoading("onload");
        dispatch(editBankInfo(profile._id, bank_info));
        setLoading("done");
      }
    }
  };
  const onChangeText = (field, value) => {
    setInfo({ ...info, [field]: value });
  };
  return (
    <>
      <View style={styles.row}>
        <Text style={{ fontSize: 18, color: "#444", margin: 8, paddingVertical: 2 }}>
          <Icon name="card-sharp" color="#444" size={24} />  Bank Information
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
          {/* <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => onSubmit()}
          >
            <FontAwesome name={editable ? "save" : "pencil"} size={20} color={editable ? "#ff6600" : "#000"} />
          </TouchableOpacity> */}
          <>
            <View style={styles.labelContainer}>
              <Icon name="person-outline" size={18} color="#777" />
              <Text style={styles.label}> Account Name</Text>
            </View>
            <TextInput
              defaultValue={account_name}
              style={styles.inputContainer}
              selectionColor="#ff6600"
              onChangeText={(text) => onChangeText("account_name", text)}
              placeholder="Account Name"
              editable={editable}
            />
          </>

          <>
            <View style={styles.labelContainer}>
              <Icon name="business-outline" size={18} color="#777" />
              <Text style={styles.label}> Account Number</Text>
            </View>
            <TextInput
              defaultValue={account_number}
              style={styles.inputContainer}
              keyboardType="numeric"
              selectionColor="#ff6600"
              onChangeText={(text) => onChangeText("account_number", text)}
              placeholder="Account Number"
              editable={editable}
            />
          </>
          {editable && (
            <>
              <View style={styles.labelContainer}>
                <Icon name="business-outline" size={18} color="#777" />
                <Text style={styles.label}> Confirm Account Number</Text>
              </View>
              <TextInput
                style={styles.inputContainer}
                keyboardType="numeric"
                selectionColor="#ff6600"
                onChangeText={(text) => onChangeText("confirmNumber", text)}
                editable={editable}
              />
            </>
          )}

          <>
            <View style={styles.labelContainer}>
              <Icon name="business-outline" size={18} color="#777" />
              <Text style={styles.label}> Bank Name</Text>
            </View>
            <TextInput
              defaultValue={bank_name}
              placeholder="Bank Name"
              selectionColor="#ff6600"
              style={styles.inputContainer}
              onChangeText={(text) => onChangeText("bank_name", text)}
              editable={editable}
            />
          </>

          <>
            <View style={styles.labelContainer}>
              <Icon name="business-outline" size={18} color="#777" />
              <Text style={styles.label}> Branch#</Text>
            </View>
            <TextInput
              defaultValue={branch_number}
              placeholder="Branch #"
              selectionColor="#ff6600"
              placeholderTextColor="#777"
              style={styles.inputContainer}
              onChangeText={(text) => onChangeText("branch_number", text)}
              editable={editable}
            />
          </>
          <>
            <View style={styles.labelContainer}>
              <Icon name="business-outline" size={18} color="#777" />
              <Text style={styles.label}> Institution#</Text>
            </View>
            <TextInput
              placeholder="Institution #"
              defaultValue={institution_number}
              placeholderTextColor="#777"
              selectionColor="#ff6600"
              style={styles.inputContainer}
              onChangeText={(text) => onChangeText("institution_number", text)}
              editable={editable}
            />
          </>
        </KeyboardAvoidingView>
        {loading === "onload" ? (
          <ActivityIndicator size="large" />
        ) : loading === "done" ? (
          <CustomDialog
            title="Updated"
            text="You have successfully updated bank information"
            key="update"
            navigation={navigation}
            page="Setting"
          />
        ) : loading === "confirm" ? (
          <CustomDialog
            title="Are you sure?"
            text="By updating bank information your upcoming payouts will be made into new account details."
            key="confirm"
            navigation={navigation}
            page="Setting"
          />
        ) : null}
      </Collapsible>
    </>
  );
}
