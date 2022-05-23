import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles/itemstyle";
import moment from "moment";

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
      }
    }
    return () => {
      componentMounted = false;
    };
  }, []);

  return (
    <View style={styles.card} key={index}>
      
      <View style={styles.title}>
        <Text style={styles.titleText}>#{item.order_id}</Text>
        <Text
          style={[
            item.status === "accepted"
              ? {
                  color: "#5ca85c",
                  padding: 2,
                  borderRadius: 4,
                  marginLeft: -70,
                  fontWeight: "bold",
                  textAlign: "center",
                  textAlignVertical: "center",
                  textTransform: "capitalize",
                }
              : item.status === "started"
              ? {
                  color: "#ffc300",
                  marginLeft: -70,
                  fontWeight: "bold",
                  textAlign: "center",
                  textAlignVertical: "center",
                  padding: 2,
                  borderRadius: 4,
                  textTransform: "capitalize",
                }
              : {
                  color: "#ff4300",
                  padding: 2,
                  borderRadius: 4,
                  marginLeft: -70,
                  fontWeight: "bold",
                  textAlign: "center",
                  textAlignVertical: "center",
                  textTransform: "capitalize",
                },
          ]}
        >
         {" "} {item.status}
        </Text>
        <Text style={styles.cardText}>{item.category}</Text>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.cardRow}>
          <Text style={styles.cardText}>
            User Id: <Text style={styles.field}> {item.user_id}</Text>
          </Text>

          <Text style={styles.cardText}>
            Plan:
            <Text style={styles.field}>
              {item.plan === "twoPlan"
                ? "2 Days"
                : item.plan === "fifteenPlan"
                ? "15 Days"
                : "30 Days"}
            </Text>
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.cardText}>
            Start Date:
            <Text style={styles.field}> {item.start_date}</Text>
          </Text>
          <Text style={styles.cardText}>
            End Date:
            <Text style={styles.field}> {item.end_date}</Text>
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.cardText}>
            Ordered at:
            <Text style={styles.field}>
              {moment(item.order_time).format("DD-MMM-YYYY HH:mm a")}
            </Text>
          </Text>

          <Text style={styles.cardText}>
            Total:
            <Text style={styles.field}>
              {" $" +
                (parseFloat(item.base_price) - (item.promo_id!=="PROMOADMIN"?parseFloat(item.discount): 0))}
            </Text>
          </Text>
        </View>
        <View
          style={[
            styles.cardRow,
            {
              padding: 4,
              justifyContent: "center",
              borderTopColor: "#777",
              borderTopWidth: 0.5,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.titleTextRight}
            onPress={() =>
              navigation.navigate("orderDetails", {
                order: item,
              })
            }
          >
            <Text
              style={{
                color: "#227cfc",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              View
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Item;
