import React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

const IconButton = ({ name, onPress, sizeInner = 35, style }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.button, style]}
      underlayColor="black"
    >
      <MaterialCommunityIcons
        color={colors.white}
        name={name}
        size={sizeInner}
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.red,
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
});

export default IconButton;
