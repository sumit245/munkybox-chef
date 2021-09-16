import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import Icon from "react-native-vector-icons/Ionicons";
import { SECTIONS } from "../../models/SECTIONS";
import { screenHeight, screenWidth } from "../../Dimens";
import OrderItem from "../OrderItem";

const _renderHeader = (section) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{section.title}</Text>
    <View style={{ flexDirection: "row",alignItems:"center" }}>
      <Text style={styles.headerText}>Orders:{section.quantity}</Text>
      <Icon name="chevron-down-outline" color="#dfdfdf" size={24} />
    </View>
  </View>
);

const _renderContent = (section) => (
  <View>
    <OrderItem item={section}/>
  </View>
);
export default function CollapsibleList({ order }) {
  const [activeSections, setactiveSections] = useState([]);
  const _updateSections = (activeSections) => {
    setactiveSections(activeSections);
  };
  return (
    <View style={styles.slot}>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    width: screenWidth,
    height: screenHeight / 15,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f37121",
    paddingHorizontal: 10,
    height: screenHeight / 15,
  },
  headeritem: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  headerText: {
    fontWeight: "bold",
    paddingVertical: 10,
    fontSize: 20,
    color: "#dfdfdf",
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    elevation: 2,
    margin: 1,
    borderRadius: 3,
    margin: 2,
    left: "0.5%",
    width: "98%",
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
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#8fb1aa",
  },
});
