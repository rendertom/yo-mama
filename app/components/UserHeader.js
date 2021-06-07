import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import colors from "../config/colors";
import text from "../config/text";

import UserContext from "../context/UserContext";

import AppText from "./AppText";
import IconButton from "./IconButton";

const UserHeader = ({ onSignOut }) => {
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <AppText>{user.firstName + " " + user.lastName}</AppText>
        <AppText style={text.subtitle}>{user.email}</AppText>
      </View>
      <IconButton name="logout-variant" onPress={onSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.red,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textContainer: {
    flex: 1,
  },
});

export default UserHeader;
