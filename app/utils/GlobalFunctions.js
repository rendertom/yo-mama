export default {
  addJokeToUserLikes(user, joke, add, setState) {
    const category = joke.category;
    const ids = user.likes[category] || [];

    setState({
      ...user,
      likes: {
        ...user.likes,
        [category]: add
          ? [...ids, joke.id]
          : ids.filter((id) => id !== joke.id),
      },
    });
  },

  updateJokeInJokes(joke, jokes, setState) {
    const category = joke.category;
    const items = jokes[category];
    const index = items.findIndex((item) => item.id === joke.id);

    if (index !== -1) {
      items[index] = joke;
      setState({
        ...jokes,
        [category]: items,
      });
    }
  },
};
