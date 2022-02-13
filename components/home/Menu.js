import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Card, Divider } from "react-native-paper";
import { DARKGRAY, SecondaryLightColor, WHITE } from "../../Colors";
import veg from "../../assets/veg.png";
import nonveg from "../../assets/non_veg.png";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import Collapsible from "react-native-collapsible";
import axios from "axios";

export default function Menu({ meal, slot, count, add_on_name, add_on_count,partAdds }) {
  const restaurant = useSelector((state) => state.restaurant);
  const [meal_time, setMealTime] = useState("");
  const [lunch, setlunch] = useState("");
  const [dinner, setDinner] = useState("");
  useEffect(() => {
    setMealTime(restaurant.category);
  });

  const fetchSlotTime = async () => {
    const slots = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/slots"
    );
    const { lunchSlots, dinnerSlots } = await slots.data[0];
    let first = lunchSlots[0];
    let startlunch = first.slot_time;
    startlunch = startlunch.split("-")[0];
    let last = lunchSlots[lunchSlots.length - 1];
    let endlunch = last.slot_time;
    endlunch = endlunch.split("-")[1];
    let completelunchSlot = startlunch + "-" + endlunch;
    setlunch(completelunchSlot);
    let firstdinner = dinnerSlots[0];
    let startdinner = firstdinner.slot_time;
    startdinner = startdinner.split("-")[0];
    let laslastdinnert = dinnerSlots[dinnerSlots.length - 1];
    let enddinner = laslastdinnert.slot_time;
    enddinner = enddinner.split("-")[1];
    let completedinnerSlot = startdinner + "-" + enddinner;
    setDinner(completedinnerSlot);
  };

  useEffect(() => {
    fetchSlotTime();
  }, []);
  
  const [isCollapse, setCollapse] = useState(true);

  const RenderAddon = ({ add_on, add_on_name, add_on_count,partAdds }) => {
    
    return (
      <View style={{ backgroundColor: WHITE, padding: 6 }}>
        {add_on &&
          add_on.map((add_on, key) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 6,
                marginVertical: 4,
                borderTopColor: "#777",
                borderTopWidth: 0.2,
              }}
              key={key}
            >
              <Text style={styles.mealTitle}>{add_on.add_on}</Text>
              <Text style={styles.mealTitle}>
                X {partAdds[key]!==""?partAdds[key]:0}
                
              </Text>
            </View>
          ))}
      </View>
    );
  };

  const RenderHeader = ({ title }) => {
    return (
      <View
        style={{ flexDirection: "row", padding: 4, backgroundColor: WHITE }}
      >
        <Text style={styles.headerMenuTitle}>
          {title} <Text style={{ fontWeight: "normal" }}>All Slots</Text>{" "}
        </Text>
      </View>
    );
  };

  const RenderContent = ({ meal_name, type }) => {
    if (slot === meal_time) {
      return (
        <View
          style={{
            backgroundColor: WHITE,
            padding: 6,
            marginBottom: 8,
            height: 80,
            borderBottomWidth: 0.5,
            borderBottomColor: "#777",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 6,
              marginVertical: 4,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 4,
              }}
            >
              <Image
                source={type === "veg" ? veg : nonveg}
                style={{ height: 16, width: 16, marginRight: 2 }}
              />
              <Text style={styles.mealTitle}>{meal_name}</Text>
            </View>
            <Text style={{ fontWeight: "bold" }}>
              X {slot === meal_time ? count : 0}
            </Text>
          </View>
          <Divider />
        </View>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: WHITE,
            padding: 6,
            marginBottom: 8,
            height: 80,
            borderBottomWidth: 0.5,
            borderBottomColor: "#777",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            Sorry! you don't provide meal in this slot!!!{"\n"}
            You can now also add meals on this day to get more income!!!
          </Text>
        </View>
      );
    }
  };

  if (typeof meal !== "undefined") {
    const { meal_name, image, add_on, description, type } = meal;
    return (
      <View>
        <View style={styles.headerMenu}>
          <View>
            <Text style={styles.headerText}>{slot}</Text>
            <Text
              style={[
                styles.headerText,
                { fontSize: 14, textTransform: "none" },
              ]}
            >
              {slot === "Lunch" ? lunch : dinner}
            </Text>
          </View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setCollapse(!isCollapse)}
          >
            <View>
              <Text style={styles.headerCount}>
                {slot === meal_time ? count : 0} Meals
              </Text>
              <Text style={styles.headerCount}>{add_on_count} Add ons</Text>
            </View>
            <Icon
              name={isCollapse ? "chevron-up-sharp" : "chevron-down-sharp"}
              size={22}
              color={WHITE}
            />
          </TouchableOpacity>
        </View>
        <Collapsible collapsed={isCollapse}>
          <RenderHeader title={"Meals"} />
          <RenderContent meal_name={meal_name} type={type} />

          <RenderHeader title={"Add ons"} />
          <RenderAddon
            add_on={add_on}
            add_on_count={add_on_count}
            add_on_name={add_on_name}
            partAdds={partAdds}
          />
        </Collapsible>
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Icon name="sad-outline" size={64} color={DARKGRAY} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: DARKGRAY,
          }}
        >
          Sorry you don't provide any meal on this day
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: DARKGRAY,
          }}
        >
          You can now also add meals on this day to get more income!!!
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  menu: {
    marginHorizontal: 2,
    marginVertical: 4,
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 4,
  },
  mealDescription: {
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 4,
    color: DARKGRAY,
  },
  headerMenu: {
    backgroundColor: SecondaryLightColor,
    padding: 6,
    marginTop: -8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: WHITE,
    textTransform: "uppercase",
  },
  headerCount: {
    fontSize: 14,
    color: WHITE,
    fontWeight: "bold",
  },
  headerMenuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 2,
  },
});
