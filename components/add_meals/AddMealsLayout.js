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

  const handleToggle = (data) => {
    setSlot(data);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return addState ? (
          <AddEditMeals slot={slot} day={route.title} index={index} />
        ) : editState ? (
          <AddEditMeals slot={slot} day={route.title} meal={meals[index]} />
        ) : (
          <ViewMeals
            meal={meals[index]}
            day={route.title}
            slot={slot}
            setEditState={setEditState}
          />
        );
      case "second":
        return addState ? (
          <AddEditMeals slot={slot} day={route.title} index={index} />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            meal={meals[index]}
            setEditState={setEditState}
          />
        ) : (
          <ViewMeals meal={meals[index]} day={route.title} slot={slot} />
        );
      case "third":
        return addState ? (
          <AddEditMeals slot={slot} day={route.title} index={index} />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            meal={meals[index]}
            setEditState={setEditState}
          />
        ) : (
          <ViewMeals meal={meals[index]} day={route.title} slot={slot} />
        );
      case "fourth":
        return addState ? (
          <AddEditMeals slot={slot} day={route.title} index={index} />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            meal={meals[index]}
            setEditState={setEditState}
          />
        ) : (
          <ViewMeals meal={meals[index]} day={route.title} slot={slot} />
        );
      case "fifth":
        return addState ? (
          <AddEditMeals slot={slot} day={route.title} index={index} />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            meal={meals[index]}
            setEditState={setEditState}
          />
        ) : (
          <ViewMeals meal={meals[index]} day={route.title} slot={slot} />
        );
      case "sixth":
        return addState ? (
          <AddEditMeals slot={slot} day={route.title} index={index} />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            meal={meals[index]}
            setEditState={setEditState}
          />
        ) : (
          <ViewMeals meal={meals[index]} day={route.title} slot={slot} />
        );
      case "seventh":
        return addState ? (
          <AddEditMeals slot={slot} day={route.title} index={index} />
        ) : editState ? (
          <AddEditMeals
            slot={slot}
            day={route.title}
            meal={meals[index]}
            setEditState={setEditState}
          />
        ) : (
          <ViewMeals meal={meals[index]} day={route.title} slot={slot} />
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
