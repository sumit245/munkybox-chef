import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  DARKGRAY,
  PrimaryDark,
  SecondaryLightColor,
  WHITE,
} from "../../Colors";
import { width } from "../../Dimens";

export default function HeaderTabSwitch({
  items,
  children,
  position,
  handler,
}) {
  const [active, setActive] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const onItemSelected = (item, index) => {
    setCurrentIndex(index);
    setActive(item);
    handler(item, index);
  };

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
              <Text
                style={[
                  styles.label,
                  active === item ? { fontWeight: "bold", color: WHITE } : null,
                ]}
              >
                {item}
              </Text>
              {children}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {position === "last" && (
        <Icon
          name="caret-up-sharp"
          size={20}
          color={SecondaryLightColor}
          style={{
            marginTop: -14,
            // marginLeft:
            //   active === item[index]
            //     ? "15%"
            //     : activeDay === "Tomorrow"
            //     ? "45%"
            //     : "80%",
          }}
        />
      )}
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
  },
});
