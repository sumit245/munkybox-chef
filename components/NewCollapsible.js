import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Animated,
  TouchableOpacity
} from 'react-native';


export default class NewCollapsible extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //Step 3
      title: props.title,
      expanded: true,
    };
  }

  toggle() {}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.state.title}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.toggle.bind(this)}
            underlayColor="#f1f1f1">
            {/* <Image style={styles.buttonImage} source={icon}></Image> */}
          </TouchableOpacity>
        </View>

        <View style={styles.body}>{this.props.children}</View>
      </View>
    );
  }
}
const styles=StyleSheet.create({
    container   : {
        backgroundColor: '#fff',
        margin:10,
        overflow:'hidden'
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold'
    },
    button      : {

    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        padding     : 10,
        paddingTop  : 0
    }
})