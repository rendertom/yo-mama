import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

const ListItemDeleteAction = ({ onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.container}>
      <MaterialCommunityIcons
        color={colors.white}
        name="heart-remove"
        size={35}
      />
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.red,
    justifyContent: "center",
    width: 70,
  },
});

export default ListItemDeleteAction;
