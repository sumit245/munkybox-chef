import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Badge } from "react-native-paper";
import { DARKGRAY, PrimaryDark, WHITE } from "../../Colors";
import { width } from "../../Dimens";

export default function HeaderTabSwitch({
  items,
  selected,
  handler,
  setTabHandler,
  returnCurrentIndex,
  mealCount,
}) {
  const [active, setActive] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const onItemSelected = (item, index) => {
    setCurrentIndex(index);
    returnCurrentIndex(index);
    setActive(item);
    handler(item, index);
    if (index === currentIndex) {
      setTabHandler(true);
    }
  };

  useEffect(() => {
    setCurrentIndex(selected);
    returnCurrentIndex(currentIndex);
  }, [selected]);

  return (
    <View style={styles.tabcontainer}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        {items.map((item, index) => (
          <TouchableOpacity
            style={{
              borderRightWidth: index !== items.length - 1 ? 0.5 : null
            }}
            onPress={() => onItemSelected(item, index)}
            key={index}
          >
            <LinearGradient colors={["#ff9900", "#ff6600"]} style={styles.tablabel}>
              <Text
                style={[
                  styles.label,
                  currentIndex === index
                    ? { fontWeight: "bold", color: "#fff" }
                    : { color: "#fff" },
                ]}
              >
                {item}
              </Text>

              {currentIndex === index ? (
                <Badge
                  style={{
                    marginHorizontal: 4,
                    fontSize: 12,
                    backgroundColor: "#fff",
                    color: "#ff6600",
                  }}
                  size={14}
                >
                  {mealCount}
                </Badge>
              ) : null}
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>

  );
}
const styles = StyleSheet.create({
  tabcontainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: DARKGRAY
  },
  tablabel: {
    width: width / 3,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRightColor: DARKGRAY,
  },
  label: {
    fontSize: 18,
    color: DARKGRAY,
    marginVertical: 4,
  },
});
