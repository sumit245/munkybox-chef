import React, { useState, useEffect } from "react";
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
  const [day, setDay] = useState([]);
  const [addState, setAddState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [slot, setSlot] = useState("Lunch");
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
  useEffect(() => {
    let day = meals.map((data, key) => data.day);
  }, [meals]);

  const handleToggle = (data) => {
    setSlot(data);
  };

  const changeEditState = (state) => {
    setEditState(state);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return addState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            index={index}
            addState={true}
            changeEditState={changeEditState}
          />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            addState={false}
            meal={meals.find((o) => o.day === route.title)}
            changeEditState={changeEditState}
          />
        ) : (
          <ViewMeals
            meal={meals.find((o) => o.day === route.title)}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
          />
        );
      case "second":
        return addState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            index={index}
            addState={true}
            changeEditState={changeEditState}
          />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            addState={false}
            meal={meals.find((o) => o.day === route.title)}
            changeEditState={changeEditState}
          />
        ) : (
          <ViewMeals
            meal={meals.find((o) => o.day === route.title)}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
          />
        );
      case "third":
        return addState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            index={index}
            addState={true}
            changeEditState={changeEditState}
          />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            addState={false}
            meal={meals.find((o) => o.day === route.title)}
            changeEditState={changeEditState}
          />
        ) : (
          <ViewMeals
            meal={meals.find((o) => o.day === route.title)}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
          />
        );
      case "fourth":
        return addState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            index={index}
            addState={true}
            changeEditState={changeEditState}
          />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            addState={false}
            meal={meals.find((o) => o.day === route.title)}
          />
        ) : (
          <ViewMeals
            meal={meals.find((o) => o.day === route.title)}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
          />
        );
      case "fifth":
        return addState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            index={index}
            addState={true}
            changeEditState={changeEditState}
          />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            addState={false}
            meal={meals.find((o) => o.day === route.title)}
            changeEditState={changeEditState}
          />
        ) : (
          <ViewMeals
            meal={meals.find((o) => o.day === route.title)}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
          />
        );
      case "sixth":
        return addState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            index={index}
            addState={true}
            changeEditState={changeEditState}
          />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            addState={false}
            meal={meals.find((o) => o.day === route.title)}
            changeEditState={changeEditState}
          />
        ) : (
          <ViewMeals
            meal={meals.find((o) => o.day === route.title)}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
          />
        );
      case "seventh":
        return addState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            index={index}
            addState={true}
            changeEditState={changeEditState}
          />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            addState={false}
            meal={meals.find((o) => o.day === route.title)}
            changeEditState={changeEditState}
          />
        ) : (
          <ViewMeals
            meal={meals.find((o) => o.day === route.title)}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
          />
        );
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Add Meal"}>
        <View style={styles.switch}>
          <ToggleLunchDinner handleToggle={handleToggle} />
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
        icon={addState ? "close" : "plus"}
        onPress={() => setAddState(!addState)}
      />
    </SafeAreaView>
  );
}
