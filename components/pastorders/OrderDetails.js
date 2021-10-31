import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../header/Header";
import Export from "../header/Export";
import { truncate_string } from "../../helpers/truncate_string";
import { styles } from "../../styles/itemstyle";
import { useSelector } from "react-redux";
export default function OrderDetails({ route, navigation }) {
  const { order } = route.params;
  const { address_type, city, flat_num, locality, postal_code } = order.address;
  const restaurant = useSelector((state) => state.restaurant);
  useEffect(() => {
    console.log(restaurant);
  }, []);
  return (
    <View style={styles.container}>
      <Header chefName="World Best Foods" chefAddress="Delhi">
        <Export />
      </Header>
      <View style={styles.formHeader}>
        <View style={styles.row}>
          <View style={styles.headerRows}>
            <Text style={styles.text}>Order id</Text>
            <Text style={styles.text}>Ordered on</Text>
            <Text style={styles.text}>Status</Text>
          </View>
          <View style={styles.headerRows}>
            <Text>{truncate_string("ORD", order._id, 5)}</Text>
            <Text>{order.order_time}</Text>
            <Text style={{ textTransform: "uppercase" }}>{order.status}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.headerRows}>
            <Text style={styles.text}>User id</Text>
            <Text style={styles.text}>Phone</Text>
          </View>
          <View style={styles.headerRows}>
            <Text>{truncate_string("USER", order.user_id, 5)}</Text>
            <Text>{order.phone}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.headerRows}>
            <Text style={styles.text}>Email</Text>
            <Text>{order.email_id}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.headerRows}>
            <Text style={styles.text}>Deliver to</Text>
            <Text style={{ textTransform: "uppercase" }}>
              {address_type +
                ", " +
                flat_num +
                ", " +
                city +
                ", " +
                locality +
                ", " +
                postal_code}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.headerRows}>
            <Text style={styles.text}>Start Date</Text>
            <Text style={styles.text}>End Date</Text>
          </View>
          <View style={styles.headerRows}>
            <Text>{order.start_date}</Text>
            <Text>{order.end_date}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.headerRows}>
            <Text style={styles.text}>plan</Text>
            <Text style={styles.text}>Price</Text>
            <Text style={styles.text}>Discount</Text>
          </View>
          <View style={styles.headerRows}>
            <Text>
              {order.plan === "twoPlan"
                ? "2 Days"
                : order.plan === "fifteenPlan"
                ? "15 Days"
                : "30 Days"}
            </Text>
            <Text style={{ textAlign: "left", marginLeft: -60 }}>
              {"$" + order.price}
            </Text>
            <Text>{"$" + order.discount}</Text>
          </View>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHead}>
          <Text style={styles.text}>Add on</Text>
          <Text style={styles.text}>Ordered on</Text>
          <Text style={styles.text}>PRICE</Text>
        </View>
        {order.add_on.map((data, key) => (
          <View style={styles.tableRow} key={key}>
            <Text style={{ maxWidth: 100, padding: 2 }} numberOfLines={4}>
              {data.items.item}
            </Text>
            <Text style={{ marginLeft: -40, padding: 2 }}>
              {data.items.order_date}
            </Text>
            <Text style={{ padding: 2 }}>{data.items.price}</Text>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <Text
          style={{ fontStyle: "italic", fontWeight: "bold", color: "#777" }}
        >
          Notes: {order.notes}
        </Text>
      </View>
    </View>
  );
}
