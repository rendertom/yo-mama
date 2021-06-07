import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

import colors from "../config/colors";

const Screen = ({ children, style }) => (
  <View style={[styles.container, style]}>
    <View style={styles.statusBar}>
      <StatusBar style="light" />
    </View>
    <View style={[styles.containerInner, style]}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    flex: 1,
  },
  containerInner: {
    alignItems: "center",
    flex: 1,
  },
  statusBar: {
    backgroundColor: colors.red,
    height: Constants.statusBarHeight,
    width: "100%",
  },
});

export default Screen;
