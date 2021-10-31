import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { WHITE } from "../../Colors";

const dinnerColor = "#b07420";
const lunchColor = "#65acdc";
export default class ToggleLunchDinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: "Lunch",
      clr: lunchColor,
      indicator: "row",
    };
  }
  handleToggle = () => {
    const { meal } = this.state;
    if (meal === "DINNER") {
      this.setState({ meal: "Lunch", clr: lunchColor, indicator: "row" });
      this.props.handleToggle("Lunch");
    } else {
      this.setState({
        meal: "DINNER",
        clr: dinnerColor,
        indicator: "row-reverse",
      });
      this.props.handleToggle("Dinner");
    }
  };
  render() {
    return (
      <View
        style={[
          styles.switchContainer,
          {
            backgroundColor: this.state.clr,
            flexDirection: this.state.indicator,
          },
        ]}
      >
        <View style={styles.toggleIndicator} />
        <TouchableOpacity onPress={this.handleToggle}>
          <Icon
            name={
              this.state.meal === "Lunch"
                ? "white-balance-sunny"
                : "moon-waning-crescent"
            }
            style={styles.toggleText}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  switchContainer: {
    borderRadius: 10,
    height: 16,
    marginHorizontal:4
  },
  toggleIndicator: {
    width: 16,
    height: 16,
    backgroundColor: WHITE,
    borderRadius: 8,
  },
  toggleText: {
    padding: 2,
  },
});
