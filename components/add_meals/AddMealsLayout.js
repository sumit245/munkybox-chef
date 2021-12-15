import React, { useState } from "react";
import AddMealForm from "./AddMealForm";
import Header from "../header/Header";
import { TabView, TabBar } from "react-native-tab-view";
import ToggleLunchDinner from "../header/ToggleLunchDinner";
import { Divider } from "react-native-paper";
import { PrimaryDark, SecondaryColor } from "../../Colors";
import { useSelector } from "react-redux";
import { SafeAreaView, View } from "react-native";
import { FAB } from "react-native-paper";
import { styles } from "../../styles/headerstyle";
import { width } from "../../Dimens";

export default function AddMealsLayout() {
  const restaurant = useSelector((state) => state.restaurant);
  const [index, setIndex] = useState(0);
  const { meals } = restaurant;

  const [routes] = React.useState([
    { key: "first", title: "Monday" },
    { key: "second", title: "Tuesday" },
    { key: "third", title: "Wednesday" },
    { key: "fourth", title: "Thursday" },
    { key: "fifth", title: "Friday" },
    { key: "sixth", title: "Saturday" },
    { key: "seventh", title: "Sunday" },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      tabStyle={{ width: width / 3 }}
      scrollEnabled
      style={{
        backgroundColor: PrimaryDark,
        marginHorizontal: 2,
        marginBottom: 8,
      }}
      indicatorStyle={{ backgroundColor: SecondaryColor }}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <AddMealForm meal={meals[index]} />;
      case "second":
        return <AddMealForm meal={meals[index]} />;
      case "third":
        return <AddMealForm meal={meals[index]} />;
      case "fourth":
        return <AddMealForm meal={meals[index]} />;
      case "fifth":
        return <AddMealForm meal={meals[index]} />;
      case "sixth":
        return <AddMealForm meal={meals[index]} />;
      case "seventh":
        return <AddMealForm meal={meals[index]} />;
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Add Meal"}>
        <View style={styles.switch}>
          <ToggleLunchDinner />
        </View>
      </Header>
      <Divider />
      <TabView
        lazy
        swipeEnabled
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: width }}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log("Pressed")}
      />
    </SafeAreaView>
  );
}
