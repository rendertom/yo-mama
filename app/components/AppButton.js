import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import AppText from "./AppText";

import colors from "../config/colors";

const AppButton = ({ color = "primary", onPress, style, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: color === "primary" ? colors.yellow : colors.red },
        style,
      ]}
    >
      <AppText style={styles.buttonText}>{title}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    color: colors.dark,
  },
});

export default AppButton;
