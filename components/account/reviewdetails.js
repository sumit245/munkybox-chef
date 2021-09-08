import React from "react";
import { FlatList, Text, View, Dimensions } from "react-native";
import { Card, Avatar, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account-tie" />;

const RightContent = (props) => (
  <Button mode="contained" color="#000c">
    Reply
  </Button>
);

const Item = ({ username, review, star, order_date }) => (
  <Card style={{margin:1,padding:2}}>
    <Card.Title title={username} left={LeftContent} right={RightContent} />
    <Card.Content>
      <Icon name="star-sharp" size={16} color="#fc4" />
      <Text>{review}</Text>
      <Text style={{fontSize:16,fontWeight:"bold",color:"#777"}}>{"ORDERED AT: "}{order_date}</Text>
    </Card.Content>
  </Card>
);
const { width, height } = Dimensions.get("screen");
export default function Review() {
  const profile = useSelector((state) => state.restaurant);
  const { rating, reviews } = profile;
  let ratings=[]
  for (let index = 0; index < reviews.star; index++) {
      ratings.push(
        <Icon name="star-sharp" size={16} color="#fc4" />
      )
      
  }
  const renderItem = ({ item }) => (
    <Item
      username={item.user_name}
      review={item.reviews}
      star={ratings}
      order_date={item.order_date.toString().slice(0,10)}
    />
  );

  return (
    <FlatList
      data={reviews}
      contentContainerStyle={{ width: width - 40, marginHorizontal: 10 }}
      ListHeaderComponent={() => (
        <View
          style={{
            height: 40,
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Reviews</Text>
          <Icon name="close" size={30} color="#444" />
        </View>
      )}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
    />
  );
}
