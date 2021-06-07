import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableHighlight, View } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";
import JokesContext from "../context/JokesContext";

const ALL_TITLES = "all";

const Tabs = ({ onPress }) => {
  const { jokes, setJokes } = useContext(JokesContext);

  const [selected, setSelected] = useState();
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    onPress(selected === ALL_TITLES ? null : selected);
    setSelected(ALL_TITLES);
    setTitles([ALL_TITLES, ...Object.keys(jokes)]);
  }, []);

  const renderTab = (title) => (
    <TouchableHighlight
      key={title}
      onPress={() => {
        onPress(title === ALL_TITLES ? null : title);
        setSelected(title);
      }}
      style={[
        styles.itemContainer,
        title === selected && { backgroundColor: colors.red },
      ]}
    >
      <AppText>{title}</AppText>
    </TouchableHighlight>
  );

  const renderTabs = (titles) => titles.map((name) => renderTab(name));

  return (
    <View style={styles.rowContainer}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {renderTabs(titles)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  rowContainer: {
    flexDirection: "row",
  },
});

export default Tabs;
