import React from "react";
import { StyleSheet, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import AppText from "../AppText";

import colors from "../../config/colors";
import text from "../../config/text";

const ListItem = ({
  getChild,
  onSwipeableWillOpen,
  renderRightActions,
  subtitle,
  title,
}) => {
  return (
    <Swipeable
      onSwipeableWillOpen={onSwipeableWillOpen}
      ref={getChild}
      renderRightActions={renderRightActions}
    >
      <View style={styles.container}>
        <AppText style={text.jokeSmall}>{title}</AppText>
        <AppText style={[text.subtitle, { paddingTop: 10 }]}>
          {subtitle}
        </AppText>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default ListItem;
