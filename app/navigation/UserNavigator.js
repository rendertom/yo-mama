import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DashboardScreen from "../screens/DashboardScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import UserContext from "../context/UserContext";

const Stack = createStackNavigator();
const UserNavigator = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={user ? "dashboard" : "signin"}
    >
      <Stack.Screen component={DashboardScreen} name="dashboard" />
      <Stack.Screen component={SignInScreen} name="signin" />
      <Stack.Screen component={SignUpScreen} name="signup" />
    </Stack.Navigator>
  );
};

export default UserNavigator;
