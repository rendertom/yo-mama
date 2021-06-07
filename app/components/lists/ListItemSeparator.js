import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../../config/colors";

const ListItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    backgroundColor: colors.yellow,
    height: 1,
    width: "100%",
  },
});

export default ListItemSeparator;
