import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Badge } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { getOrder } from "../../actions/actions";
import { SecondaryLightColor, WHITE } from "../../Colors";
import { useSelector, useDispatch } from "react-redux";

export default function Notification({ navigation }) {
  const [count, setcount] = useState(1);
  const [order, setOrder] = useState([]);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      dispatch(getOrder("Meta Foods"));
      setOrder(order);
    }
    return () => {
      componentMounted = false;
    };
  }, [orders]);
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center" }}
      onPress={() => navigation.navigate("newOrders", { order: orders })}
    >
      <Icon
        name="ios-notifications-outline"
        color={SecondaryLightColor}
        size={22}
      />
      <View>
        <Badge
          minimumFontScale={2}
          size={14}
          style={{
            marginTop: -10,
            marginLeft: -10,
            backgroundColor: SecondaryLightColor,
            color: WHITE,
            fontWeight: "bold",
            fontSize: 12,
          }}
        >
          {orders && orders.length}
        </Badge>
      </View>
    </TouchableOpacity>
  );
}
