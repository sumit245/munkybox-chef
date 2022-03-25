import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  DARKGRAY,
  PrimaryDark,
  SecondaryColor,
  SecondaryLightColor,
  WHITE,
} from "../Colors";

const days = ["Today", "Tomorrow", "Dayafter"];
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
      <View>
        <View style={styles.calenderTab}>
          {days.map((day, index) => (
            <TouchableOpacity
              style={[
                styles.dateTab,
                index !== days.length - 1 ? { borderRightWidth: 0.5 } : null,
              ]}
              onPress={() => this.onDayChanged(day)}
              key={index}
            >
              <Text
                style={[
                  styles.dateHeader,
                  activeDay === day
                    ? { fontWeight: "bold", color: "#ff6600" }
                    : { color: "#000" },
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Icon
          name="caret-up-sharp"
          size={20}
          color="#F96122"
          style={{
            marginTop: -14,
            marginLeft:
              activeDay === "Today"
                ? "15%"
                : activeDay === "Tomorrow"
                  ? "45%"
                  : "80%",
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  calenderTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    flexDirection: "row",
  },
  dateTab: {
    flex: 1,
    alignItems: "center",
    borderRightColor: "#dfdfdf",
  },
  dateHeader: {
    fontSize: 18,
    color: "#fdfdfd",
  },
});
