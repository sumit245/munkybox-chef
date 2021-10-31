import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  DataTable,
  FAB,
  Avatar,
  List,
  Card,
  Button,
  Title,
  Paragraph,
} from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="food" />;
export default function AddMealForm({ meal }) {
  if (meal) {
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <Card.Title
            title={meal.meal_name}
            subtitle={meal.description}
            left={LeftContent}
          />
          <Card.Cover
            source={{
              uri: meal.image,
            }}
          />
          <Card.Content>
            <Title>{meal.slot}</Title>
            <Paragraph>{meal.type}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>Edit</Button>
            <Button>Done</Button>
          </Card.Actions>
        </Card>
        {/* {meals.map((meal, key) => (
          <List.AccordionGroup key={key}>
            <List.Accordion title={meal.day} id="1">
              
            </List.Accordion>
          </List.AccordionGroup>
        ))} */}
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => console.log("Pressed")}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
