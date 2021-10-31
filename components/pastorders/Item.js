import React, { useEffect } from "react";
import { View, Text } from "react-native";

import { styles } from "../../styles/itemstyle";
import { truncate_string } from "../../helpers/truncate_string";

const Item = ({ item, index, navigation }) => {
  const { start_date, end_date } = item;
  useEffect(() => {
    let componentMounted = true;
    let x = "";
    let y = "";
    if (componentMounted) {
      if (typeof start_date === "string" && typeof end_date === "string") {
        x = start_date;
        y = end_date;
        x = x.slice(0, -5); 
        y = y.slice(0, -5);
        console.log(x, y);
      }
    }
    return () => {
      componentMounted = false;
    };
  },[]);
  return (
    <View style={styles.card} key={index}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          Order Id{" " + truncate_string("ORD", item._id, 5)}
        </Text>
        <Text
          style={[
            item.status === "delivered"
              ? {
                  backgroundColor: "#5ca85c",
                  color: "#ffffff",
                  padding: 2,
                  borderRadius: 4,
                  marginLeft: -86,
                  fontWeight: "bold",
                  textAlign: "center",
                  textAlignVertical: "center",
                }
              : item.status === "pending"
              ? {
                  backgroundColor: "#ffc300",
                  color: "#ffffff",
                  marginLeft: -86,
                  fontWeight: "bold",
                  textAlign: "center",
                  textAlignVertical: "center",
                  padding: 2,
                  borderRadius: 4,
                }
              : {
                  backgroundColor: "#d9534f",
                  color: "#fff",
                  padding: 2,
                  borderRadius: 4,
                  marginLeft: -86,
                  fontWeight: "bold",
                  textAlign: "center",
                  textAlignVertical: "center",
                },
          ]}
        >
          {item.status}
        </Text>

        <Text
          style={styles.titleTextRight}
          onPress={() =>
            navigation.navigate("orderDetails", {
              order: item,
            })
          }
        >
          View
        </Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardRow}>
          <Text style={styles.cardText}>
            {"User Id: " + truncate_string("USER", item.user_id, 5)}
          </Text>
          <Text style={styles.cardText}>{"Contact: " + item.phone}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardText}>
            {"Plan "}
            {item.plan === "twoPlan"
              ? "2 Days"
              : item.plan === "fifteenPlan"
              ? "15 Days"
              : "30 Days"}
          </Text>
          <Text style={styles.cardText}>
            {"Total: "}
            {"$" + item.total}
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardText}>
            {"Start Date: "}
            {item.start_date}
          </Text>
          <Text style={styles.cardText}>
            {"End Date: "}
            {item.end_date}
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardText}>
            {"Ordered at: "}
            {item.order_time}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Item;
