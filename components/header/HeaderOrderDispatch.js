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
  mealCount
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
    <View style={{ backgroundColor: PrimaryDark }}>
      <View style={styles.tabcontainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        >
          {items.map((item, index) => (
            <TouchableOpacity
              style={[
                styles.tablabel,
                index !== items.length - 1 ? { borderRightWidth: 0.5 } : null,
              ]}
              onPress={() => onItemSelected(item, index)}
              key={index}
            >
              <View>
                <Text
                  style={[
                    styles.label,
                    currentIndex === index
                      ? { fontWeight: "bold", color: WHITE }
                      : { color: WHITE },
                  ]}
                >
                  {item}
                </Text>
              </View>
              <Badge
                style={{
                  margin: 4,
                  fontSize: 12,
                  backgroundColor: "red",
                  color: WHITE,
                }}
                size={14}
              >
                {mealCount}
              </Badge>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  tabcontainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PrimaryDark,
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
