import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryColor, PrimaryDark } from "../Colors";
import { screenHeight } from "../Dimens";

export default class Header extends Component {
  ShowCurrentDate = () => {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var date = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    var day = new Date().getDay();
    return date + " " + months[month] + " " + year + ", " + days[day];
  };
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerChefName}>
          {this.props.chefName} , {this.props.chefAddress}
        </Text>
        <Text style={styles.headerChefAddress}>{this.ShowCurrentDate()}</Text>
        {this.props.children}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: screenHeight / 10,
    paddingBottom: 6,
    backgroundColor: PrimaryColor,
    justifyContent: "flex-start",
  },
  headerChefName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 2,
    margin: 2,
  },
  headerChefAddress: {
    color: "white",
    paddingHorizontal: 5,
  },
});
