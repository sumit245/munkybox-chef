import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PrimaryDark } from '../Colors';
import { screenHeight, screenWidth } from '../Dimens';

export default class MyDatePicker extends Component {
  render() {
    return (
      <View style={styles.calenderTab}>
        <View style={styles.leftTab}>
          <TouchableOpacity>
            <Text style={styles.dateHeader}>Yesterday</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerTab}>
          <TouchableOpacity>
            <Text style={styles.dateHeader}>Today</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightTab}>
          <TouchableOpacity>
            <Text style={styles.dateHeader}>Tomorrow</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  calenderTab: {
    display: 'flex',
    top: screenHeight / 14,
    marginTop: screenHeight / 150,
    width: screenWidth,
    height: screenHeight / 15,
    backgroundColor: PrimaryDark,
    opacity: 0.8,
    flexDirection: 'row',
  },
  leftTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '33%',
    borderRightColor: '#dfdfdf',
    borderRightWidth: 1,
    marginVertical: 8,
  },
  centerTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '33%',
    borderRightColor: '#dfdfdf',
    borderRightWidth: 1,
    marginVertical: 8,
  },
  rightTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '33%',
  },
  dateHeader: {
    fontSize: 18,
    color: '#dfdfdf',
  },
});
