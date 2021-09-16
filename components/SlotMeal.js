import React, { Component } from 'react';
import {
  Platform,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { screenHeight, screenWidth } from '../Dimens';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/Ionicons';
import { SECTIONS } from '../models/SECTIONS';

export default class SlotMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      data: props.data,
      expanded: false,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  state = {
    activeSections: [],
  };

  _renderHeader = (section) => {
    return (
      <View
        style={[
          styles.header,
          {
            flexDirection: 'row',
            borderBottomColor: '#cfcfcf',
            borderBottomWidth: 1,
          },
          section.title === 'Lunch'
            ? { backgroundColor: '#0e918c' }
            : { backgroundColor: '#f37121' },
        ]}>
        <Text style={[styles.headerText, { position: 'absolute', left: 10 }]}>
          {section.title}
        </Text>
        <Text style={[styles.headerText, { position: 'absolute', right: 40 }]}>
          {section.quantity}
        </Text>

        <Icon
          style={{ position: 'absolute', right: 10, paddingVertical: 10 }}
          name="chevron-down-outline"
          color="#dfdfdf"
          size={24}
        />
      </View>
    );
  };

  _renderContent = (section) => {
    Item = ({ subtitle }) => {
      return (
        <View style={styles.item}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={[styles.title, { alignSelf: 'flex-start' }]}
              numberOfLines={2}>
              {subtitle.mealname}
            </Text>
            <View style={{ alignSelf: 'flex-end', marginLeft: 50 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                X {subtitle.quantity}
              </Text>
              <Text style={styles.title}>{subtitle.date}</Text>
            </View>
          </View>
          <Icon
            name="ellipsis-vertical-outline"
            size={22}
            style={{ position: 'absolute', right: 10, top: 20 }}
          />
        </View>
      );
    };
    return (
      <SafeAreaView style={styles.content}>
        <SectionList
          sections={section.meal}
          keyExtractor={(item, index) => item + index}
          renderItem={this._renderContent}
          renderSectionHeader={({ section: { subtitle } }) => (
            <Text style={styles.sectionHeader}>{subtitle}</Text>
          )}
        />
      </SafeAreaView>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };
  render() {

    return (
      <View style={styles.slot}>
        <Accordion
          sections={SECTIONS}
          activeSections={this.state.activeSections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slot: {
    top: screenWidth / 7,
    width: screenWidth,
    height: screenHeight / 15,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 10,
    height: screenHeight / 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headeritem: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  headerText: {
    fontWeight: 'bold',
    paddingVertical: 10,
    fontSize: 20,
    color: '#dfdfdf',
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    elevation: 2,
    margin: 1,
    borderRadius: 3,
    margin: 2,
    left: '0.5%',
    width: '98%',
  },
  title: {
    fontSize: 14,
    width: 200,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#8fb1aa',
  },
});
