import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { WHITE } from "../../Colors";

export default function CouponForm() {
  const [code, setCode] = useState("___");
  const [percentage, setPercentage] = useState("__");
  const [minimum, setMinimum] = useState("__");
  const [amt, setAmount] = useState("__");
  return (
    <View
      style={{
        backgroundColor: WHITE,
        padding: 2,
        borderColor: "#ccc",
        borderWidth: 0.5,
        marginHorizontal: 1,
      }}
    >
      <Text>Disc. %</Text>
      <TextInput placeholder="10%" onChangeText={(per) => setPercentage(per)} />
      <Text>Max. Disc. $</Text>
      <TextInput placeholder="$20" onChangeText={(amt) => setAmount(amt)} />
      <Text>Minimum Meals</Text>
      <TextInput placeholder="2" onChangeText={(meal) => setMinimum(meal)} />
      <Text>Code</Text>
      <TextInput
        placeholder="ABCDF002"
        onChangeText={(code) => setCode(code)}
      />

      <Text>Preview</Text>
      <View
        style={{
          borderStyle: "dashed",
          borderWidth: 1,
          borderRadius: 2,
          padding: 4,
        }}
      >
        <Text style={{ textAlign: "justify", padding: 4 }}>
          Get {percentage}% off upto ${amt} on orders for more than {minimum}{" "}
          meals. Use Code
          <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
            {" "}
            {code}
          </Text>
        </Text>
      </View>
    </View>
  );
}
