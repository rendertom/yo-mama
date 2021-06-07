import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ExploreScreen from "../screens/ExploreScreen";
import UserNavigator from "./UserNavigator";

import colors from "../config/colors";
import text from "../config/text";

const Tabs = createBottomTabNavigator();
const tabBarOptions = {
  activeTintColor: colors.white,
  inactiveTintColor: colors.dark,
  labelStyle: {
    ...text.tabBarTitle,
  },
  style: {
    backgroundColor: colors.red,
  },
};
const AppNavigator = () => {
  return (
    <Tabs.Navigator initialRouteName="explore" tabBarOptions={tabBarOptions}>
      <Tabs.Screen
        component={ExploreScreen}
        name="explore"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              color={color}
              name="globe-model"
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        component={UserNavigator}
        name="usernavigator"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              color={color}
              name="account-circle-outline"
              size={size}
            />
          ),
          title: "user",
        }}
      />
    </Tabs.Navigator>
  );
};

export default AppNavigator;
