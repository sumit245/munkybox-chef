import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Badge } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { getOrder } from "../../actions/actions";
import { SecondaryLightColor, WHITE } from "../../Colors";
import { useSelector, useDispatch } from "react-redux";

export default function Notification({ navigation }) {
  const [order, setOrder] = useState([]);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const restaurant=useSelector((state)=>state.restaurant)
  const {restaurant_name}=restaurant
  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      dispatch(getOrder(restaurant_name));
      setOrder(orders);  
    }
    return () => {
      componentMounted = false;
    };
  }, [orders, dispatch]);
  
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center" }}
      onPress={() => navigation.navigate("newOrders", { order: order })}
    >
      <Icon
        name="ios-notifications"
        color={"#F96122"}
        size={22}
      />
      <View>
        <Badge
          minimumFontScale={2}
          size={14}
          style={{
            marginTop: -10,
            marginLeft: -10,
            backgroundColor: "#F96122",
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
