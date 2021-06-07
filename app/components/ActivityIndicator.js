import React from "react";
import { ActivityIndicator as AI, View, StyleSheet } from "react-native";

import colors from "../config/colors";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <AI size="large" color={colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    backgroundColor: colors.dark,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    opacity: 0.9,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
});

export default ActivityIndicator;
