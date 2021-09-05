import React, { Component } from "react";
import { TouchableOpacity, Text, Alert, View } from "react-native";
import { SecondaryColor } from "../Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { Switch } from "react-native-paper";

export default class Export extends Component {
  constructor(props) {
    super(props);
  }
  export = () => {
    Alert.alert("A copy Sent to Mail");
    console.log("Exported");
  };
  render() {
    return (
      <View
        style={{
          position: "absolute",
          right: 30,
          top: 10,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={this.export}>
          <Icon
            name="download-outline"
            size={26}
            style={{ position: "absolute", right: -25, top: -8 }}
            color={SecondaryColor}
          />
        </TouchableOpacity>
        <Icon
          name="options-outline"
          size={26}
          color={SecondaryColor}
          style={{ position: "absolute", right: -25, top: 20 }}
        />
        <Switch style={{ position: "absolute", right: 0, top: 20 }} />
      </View>
    );
  }
}
