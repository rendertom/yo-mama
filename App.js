import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

import firebase from "firebase";
import firebaseClient from "./app/api/firebaseClient";
import firebaseConfig from "./app/config/firebaseConfig";

import JokesContext from "./app/context/JokesContext";
import UserContext from "./app/context/UserContext";

import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";

SplashScreen.preventAutoHideAsync();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [isLoadingJokes, setLoadingJokes] = useState(true);
  const [jokes, setJokes] = useState([]);
  const [user, setUser] = useState(null);

  const [fontsLoaded] = useFonts({
    "MontserratAlternates-Black": require("./app/assets/fonts/Montserrat_Alternates/MontserratAlternates-Black.ttf"),
    "MontserratAlternates-Bold": require("./app/assets/fonts/Montserrat_Alternates/MontserratAlternates-Bold.ttf"),
    "MontserratAlternates-ExtraBold": require("./app/assets/fonts/Montserrat_Alternates/MontserratAlternates-ExtraBold.ttf"),
    "MontserratAlternates-ExtraLight": require("./app/assets/fonts/Montserrat_Alternates/MontserratAlternates-ExtraLight.ttf"),
    "MontserratAlternates-Light": require("./app/assets/fonts/Montserrat_Alternates/MontserratAlternates-Light.ttf"),
    "MontserratAlternates-Medium": require("./app/assets/fonts/Montserrat_Alternates/MontserratAlternates-Medium.ttf"),
    "MontserratAlternates-Regular": require("./app/assets/fonts/Montserrat_Alternates/MontserratAlternates-Regular.ttf"),
    "MontserratAlternates-SemiBold": require("./app/assets/fonts/Montserrat_Alternates/MontserratAlternates-SemiBold.ttf"),
    "MontserratAlternates-Thin": require("./app/assets/fonts/Montserrat_Alternates/MontserratAlternates-Thin.ttf"),
  });

  useEffect(() => {
    firebaseClient
      .getJokes()
      .then((querySnapshot) => {
        if (querySnapshot) {
          const jokes = parseJokes(querySnapshot);
          setJokes(jokes);
          setLoadingJokes(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const injectCategoryName = (items, category) =>
    items.forEach((item) => (item.category = category));

  const parseJokes = (querySnapshot) => {
    const jokes = {};

    querySnapshot.forEach((doc) => {
      const category = doc.id;
      const items = doc.data()[category];

      injectCategoryName(items, category);
      jokes[category] = items;
    });

    return jokes;
  };

  if (fontsLoaded && !isLoadingJokes) {
    SplashScreen.hideAsync();
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <JokesContext.Provider value={{ jokes, setJokes }}>
          <NavigationContainer theme={navigationTheme}>
            {/* <RootStackScreen /> */}
            <AppNavigator />
          </NavigationContainer>
        </JokesContext.Provider>
      </UserContext.Provider>
    );
  }
}
