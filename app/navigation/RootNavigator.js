import { createStackNavigator } from "@react-navigation/stack";

import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="auth" component={AuthNavigator} />
    <RootStack.Screen name="app" component={AppNavigator} />
  </RootStack.Navigator>
);

export default RootStackScreen;
