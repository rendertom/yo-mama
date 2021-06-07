import React from "react";
import { StyleSheet, Text } from "react-native";

import colors from "../config/colors";
import text from "../config/text";

const AppText = ({ children, style, ...otherProps }) => {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    ...text.default,
    color: colors.white,
  },
});

export default AppText;
