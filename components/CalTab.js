import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PrimaryColor, PrimaryDark, WHITE } from "../Colors";

export default class CalTab extends Component {
  constructor(props) {
    super(props);
    this.state = { activeDay: "Today" };
  }

  onDayChanged = (day) => {
    this.setState({ activeDay: day });
    this.props.onDayChanged(day);
  };
  render() {
    const { activeDay } = this.state;
    return (
      <View style={styles.calenderTab}>
        <TouchableOpacity
          style={[
            styles.dateTab,
            activeDay === "Yesterday"
              ? { backgroundColor: PrimaryColor }
              : null,
          ]}
          onPress={() => this.onDayChanged("Yesterday")}
        >
          <Text style={styles.dateHeader}>Yesterday</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.dateTab,
            activeDay === "Today" ? { backgroundColor: PrimaryColor } : null,
          ]}
          onPress={() => this.onDayChanged("Today")}
        >
          <Text style={styles.dateHeader}>Today</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.dateTab,
            activeDay === "Tomorrow" ? { backgroundColor: PrimaryColor } : null,
            { borderRightWidth: 0 },
          ]}
          onPress={() => this.onDayChanged("Tomorrow")}
        >
          <Text style={styles.dateHeader}>Tomorrow</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  calenderTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: PrimaryDark,
    flexDirection: "row",
  },
  dateTab: {
    flex: 1,
    alignItems: "center",
    borderRightColor: WHITE,
    borderRightWidth: 0.5,
  },
  dateHeader: {
    fontSize: 18,
    color: WHITE,
    textAlignVertical: "center",
    textAlign: "right",
    paddingHorizontal: 10,
  },
});
