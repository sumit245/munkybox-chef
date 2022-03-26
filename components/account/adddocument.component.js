import React from "react";
import { View, Text,TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"
import { styles } from "./account.styles";

const AddDocument = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate("documents")}
      >
        <View>
          <Text style={{ fontSize: 18, color: "#444", margin: 8,paddingVertical:2 }}>
            <Icon name="document-text-outline" color="#444" size={24} />  Documents
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddDocument;
