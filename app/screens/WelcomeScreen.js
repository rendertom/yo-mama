import React from "react";
import { Image, StyleSheet, View } from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

const WelcomeScreen = ({ navigation }) => {
  const handleSignIn = () => {
    navigation.navigate("signin");
  };

  const handleBrowse = () => {
    navigation.navigate("app", {
      screen: "explore",
    });
  };

  return (
    <Screen>
      <View style={styles.containerLogo}>
        <Image
          style={styles.logo}
          source={require("../assets/logo-large.png")}
          resizeMode="contain"
        />
        <AppText>a collection of jokes</AppText>
      </View>
      <View style={styles.containerButtons}>
        <AppButton
          onPress={handleSignIn}
          style={styles.button}
          title="sign in"
        />
        <AppButton
          color="secondary"
          onPress={handleBrowse}
          title="or whatever"
          style={styles.button}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    width: "80%",
  },
  containerButtons: {
    alignItems: "center",
    bottom: 100,
    position: "absolute",
    width: "100%",
  },
  containerLogo: {
    alignItems: "center",
    paddingTop: "30%",
  },
  logo: {
    height: 40,
    margin: 20,
  },
});

export default WelcomeScreen;
