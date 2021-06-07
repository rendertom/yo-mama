import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createStackNavigator();
const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName="welcome"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen component={SignInScreen} name="signin" />
    <Stack.Screen component={SignUpScreen} name="signup" />
    <Stack.Screen
      component={WelcomeScreen}
      name="welcome"
      options={{ headerShown: false, title: "Welcome" }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
