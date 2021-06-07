import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";

import firebaseClient from "../api/firebaseClient";

import ActivityIndicator from "../components/ActivityIndicator";
import ListItem from "../components/lists/ListItem";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import Tabs from "../components/Tabs";
import UserHeader from "../components/UserHeader";

import JokesContext from "../context/JokesContext";
import UserContext from "../context/UserContext";

import GlobalFunctions from "../utils/GlobalFunctions";

const DashboardScreen = ({ navigation }) => {
  const { jokes, setJokes } = useContext(JokesContext);
  const { user, setUser } = useContext(UserContext);

  const [category, setCategory] = useState();
  const [filteredJokes, setFilteredJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [likedJokes, setLikedJokes] = useState([]);

  useEffect(() => {
    if (user) {
      const likedJokes = getLikedJokes(user, jokes);
      setLikedJokes(likedJokes);
    }
  }, [user]);

  useEffect(() => {
    setFilteredJokes(
      category
        ? likedJokes.filter((item) => item.category === category)
        : likedJokes
    );
  }, [category, likedJokes]);

  const getLikedJokes = (user, jokes) => {
    return Object.keys(user.likes || []).reduce((accum, key) => {
      user.likes[key].forEach((id) => {
        const item = jokes[key].find((item) => item.id === id);
        if (item) {
          accum.push(item);
        }
      });
      return accum;
    }, []);
  };

  const handleSignOut = () =>
    firebaseClient.signOut().then(() => {
      setUser(null);
      navigation.replace("signin");
    });

  const removeLikedJoke = (joke) => {
    setIsLoading(true);
    firebaseClient
      .incrementLikeValue(joke, -1)
      .then((numberOfLikes) =>
        firebaseClient.userRemoveLikedJoke(user.uid, joke).then(() => {
          setLikedJokes(likedJokes.filter((item) => item.id !== joke.id));
          GlobalFunctions.addJokeToUserLikes(user, joke, false, setUser);
          GlobalFunctions.updateJokeInJokes(
            { ...joke, likes: numberOfLikes },
            jokes,
            setJokes
          );
        })
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let openSwipeable;
  const swipeables = [];
  const closeSwipeable = (index) => {
    if (openSwipeable && openSwipeable !== swipeables[index]) {
      openSwipeable.close();
    }
    openSwipeable = swipeables[index];
  };

  const renderJokes = () => {
    return (
      <FlatList
        data={filteredJokes}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ListItem
            getChild={(ref) => {
              swipeables[index] = ref;
            }}
            onSwipeableWillOpen={() => closeSwipeable(index)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => removeLikedJoke(item)} />
            )}
            subtitle={"Category: " + item.category + ", Likes: " + item.likes}
            title={item.joke}
          />
        )}
        style={{ width: "100%" }}
      />
    );
  };

  return (
    <Screen>
      <ActivityIndicator visible={isLoading} />
      <UserHeader onSignOut={handleSignOut} />
      <Tabs onPress={setCategory} />
      {renderJokes()}
    </Screen>
  );
};

export default DashboardScreen;
