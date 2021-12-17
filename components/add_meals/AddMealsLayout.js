import React, { useState } from "react";
import ViewMeals from "./ViewMeals";
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
import AddEditMeals from "./AddEditMeals";

export default function AddMealsLayout({ navigation }) {
  const restaurant = useSelector((state) => state.restaurant);
  const [index, setIndex] = useState(0);
  const [addState, setAddState] = useState(false);
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
        return addState ? <AddEditMeals /> : <ViewMeals meal={meals[index]} />;
      case "second":
        return addState ? <AddEditMeals /> : <ViewMeals meal={meals[index]} />;
      case "third":
        return addState ? <AddEditMeals /> : <ViewMeals meal={meals[index]} />;
      case "fourth":
        return addState ? <AddEditMeals /> : <ViewMeals meal={meals[index]} />;
      case "fifth":
        return addState ? <AddEditMeals /> : <ViewMeals meal={meals[index]} />;
      case "sixth":
        return addState ? <AddEditMeals /> : <ViewMeals meal={meals[index]} />;
      case "seventh":
        return addState ? <AddEditMeals /> : <ViewMeals meal={meals[index]} />;
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
        onPress={() => setAddState(!addState)}
      />
    </SafeAreaView>
  );
}
