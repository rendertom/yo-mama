import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import firebaseClient from "../api/firebaseClient";
import ActivityIndicator from "../components/ActivityIndicator";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ButtonLike from "../components/ButtonLike";
import Screen from "../components/Screen";
import Tabs from "../components/Tabs";

import colors from "../config/colors";
import text from "../config/text";

import JokesContext from "../context/JokesContext";
import UserContext from "../context/UserContext";

import GlobalFunctions from "../utils/GlobalFunctions";
import rnd from "../utils/rnd";

const ExploreScreen = () => {
  const { jokes, setJokes } = useContext(JokesContext);
  const { user, setUser } = useContext(UserContext);

  const [category, setCategory] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [joke, setJoke] = useState();
  const [jokeIsLiked, setJokeIsLiked] = useState(false);

  useEffect(() => {
    setJokeRandom();
  }, []);

  useEffect(() => {
    if (user) {
      const jokeIsLiked = chechIfUserLikedJoke(user, joke);
      setJokeIsLiked(jokeIsLiked);
    }
  }, [joke, user]);

  useEffect(() => {
    if (joke) {
      const item = jokes[joke.category].find((item) => item.id === joke.id);
      item && setJoke(item);
    }
  }, [jokes]);

  const chechIfUserLikedJoke = (user, joke) =>
    Object.keys(user.likes || []).some((category) =>
      user.likes[category].includes(joke.id)
    );

  const getJokeFromCategory = (category) => rnd.getFromArray(jokes[category]);
  const getCategoryActive = () =>
    category && jokes.hasOwnProperty(category) ? category : getCategoryRandom();

  const getCategoryRandom = () => rnd.getFromArray(Object.keys(jokes));
  const setJokeRandom = () => setJoke(getJokeFromCategory(getCategoryActive()));

  const handleLike = () => {
    setIsLoading(true);

    const method = jokeIsLiked ? "userRemoveLikedJoke" : "userAddLikedJoke";
    const value = jokeIsLiked ? -1 : 1;

    firebaseClient
      .incrementLikeValue(joke, value)
      .then((numberOfLikes) => {
        firebaseClient[method](user.uid, joke).then(() => {
          const updatedJoke = { ...joke, likes: numberOfLikes };

          setJoke(updatedJoke);
          GlobalFunctions.updateJokeInJokes(updatedJoke, jokes, setJokes);
          GlobalFunctions.addJokeToUserLikes(user, joke, !jokeIsLiked, setUser);
          setJokeIsLiked(!jokeIsLiked);

          setIsLoading(false);
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <Screen>
      <ActivityIndicator visible={isLoading} />
      <Tabs onPress={setCategory} />

      {joke && (
        <View style={styles.jokeContainer}>
          <AppText style={styles.joke}>{joke.joke}</AppText>
          {"likes" in joke && joke.likes > 0 && (
            <AppText style={styles.likes}>{joke.likes + " Likes"}</AppText>
          )}
        </View>
      )}
      <View style={styles.buttonContainer}>
        {user && (
          <ButtonLike
            value={jokeIsLiked}
            onPress={handleLike}
            style={styles.buttonLike}
          />
        )}
        <AppButton
          onPress={setJokeRandom}
          style={styles.button}
          title="another"
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "50%",
  },
  buttonLike: {
    marginRight: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  joke: {
    ...text.joke,
    color: colors.white,
    textAlign: "center",
  },
  jokeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  likes: {
    ...text.subtitle,
    color: colors.white,
    paddingTop: "10%",
  },
});

export default ExploreScreen;
