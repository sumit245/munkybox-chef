import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const dinnerColor = '#b07420'
const lunchColor = '#65acdc'
export default class ToggleLunchDinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: 'LUNCH',
      clr: lunchColor,
      indicator: 'row'
    };
  }
  handleToggle = () => {
    const { meal } = this.state;
    if (meal === 'DINNER') {
      this.setState({ meal: 'LUNCH', clr: lunchColor, indicator: 'row' });
    } else {
      this.setState({ meal: 'DINNER', clr: dinnerColor, indicator: 'row-reverse' });
    }
  };
  render() {
    return (
      <View style={[styles.switchContainer,{ backgroundColor: this.state.clr, flexDirection: this.state.indicator }]}>
        <View style={styles.toggleIndicator} />
        <TouchableOpacity onPress={this.handleToggle}>
          <Text style={styles.toggleText}>{this.state.meal}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  switchContainer: {
    borderRadius: 10,
  },
  toggleIndicator: {
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  toggleText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize:12,
    textAlignVertical:'center',
    textAlign: 'center',
    paddingHorizontal: 2,
  },
});
