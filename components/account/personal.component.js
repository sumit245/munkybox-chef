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

export default function PersonalDetails({
  id,
  owner_name,
  phone,
  email,
  about,
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [editable, setEditable] = useState(false);
  return (
    <>
      <View style={styles.row}>
        <View style={{ flexDirection: "row", paddingVertical: 6 }}>
          <Icon
            name="person-sharp"
            color="#444"
            size={24}
            style={{ margin: 5 }}
          />
          <Text style={{ fontSize: 18, color: "#444", margin: 5 }}>
            Personal Details
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
          <View style={{ justifyContent: "flex-end", alignItems: "flex-end",padding:4 }}>
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
              <Text style={styles.label}>Name</Text>
            </View>
            <TextInput
              value={owner_name}
              style={styles.inputContainer}
              // editable={twoEditable}
              // onChangeText={this.onChangeText("base_2price")}

              // onEndEditing={this.onEndEditing}
            />
          </View>

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="call-outline" size={18} color="#777" />
              <Text style={styles.label}>Contact Number</Text>
            </View>
            <TextInput
              value={phone}
              style={styles.inputContainer}
              // editable={twoEditable}
              // onChangeText={this.onChangeText("base_2price")}
              keyboardType="numeric"
              // onEndEditing={this.onEndEditing}
            />
          </View>

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="mail-outline" size={18} color="#777" />
              <Text style={styles.label}>Email ID</Text>
            </View>
            <TextInput
              value={email}
              style={styles.inputContainer}
              // editable={fifteenEditable}
              // onChangeText={this.onChangeText("base_15price")}
            />
          </View>

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="document-text-outline" size={18} color="#777" />
              <Text style={styles.label}>About</Text>
            </View>
            <TextInput
              defaultValue={about}
              placeholder="Write a description in maximum 250 characters"
              placeholderTextColor="#777"
              multiline
              style={styles.inputContainer}
              numberOfLines={4}
              // onChangeText={this.onChangeText("base_30price")}
              // keyboardType="numeric"
              // editable={thirtyEditable}
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
    paddingHorizontal: 4,
    fontSize: 16,
    borderColor: "#777",
    borderWidth: 0.4,
    textAlignVertical: "top",
    borderRadius: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 4,
  },
});
