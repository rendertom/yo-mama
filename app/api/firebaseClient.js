import firebase from "firebase";

const COLLECTION_JOKES = "jokes";
const COLLECTION_USERS = "users";

export default {
  async createUser(email, firstName, lastName, password) {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (userCredential) {
      const user = {
        email,
        firstName,
        lastName,
        likes: [],
        uid: userCredential.user.uid,
      };

      await firebase
        .firestore()
        .collection(COLLECTION_USERS)
        .doc(userCredential.user.uid)
        .set(user);

      return user;
    }
  },

  async getJokes() {
    const querySnapshot = await firebase
      .firestore()
      .collection(COLLECTION_JOKES)
      .get();

    return querySnapshot;
  },

  async getUser(uid) {
    const querySnapshot = await firebase
      .firestore()
      .collection(COLLECTION_USERS)
      .doc(uid)
      .get();

    return querySnapshot;
  },

  onAuthStateChanged(callback) {
    firebase.auth().onAuthStateChanged((user) => callback(user));
  },

  async signIn(email, password) {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    return userCredential;
  },

  async signOut() {
    await firebase.auth().signOut();
  },

  async userAddLikedJoke(uid, joke) {
    const key = "likes." + joke.category;

    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        [key]: firebase.firestore.FieldValue.arrayUnion(joke.id),
      });
  },

  async userRemoveLikedJoke(uid, joke) {
    const key = "likes." + joke.category;

    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        [key]: firebase.firestore.FieldValue.arrayRemove(joke.id),
      });
  },

  async getItemsInCategory(category) {
    return await firebase
      .firestore()
      .collection(COLLECTION_JOKES)
      .doc(category)
      .get();
  },

  async updateItemsInCategory(category, items) {
    return await firebase
      .firestore()
      .collection(COLLECTION_JOKES)
      .doc(category)
      .update({
        [category]: items,
      });
  },

  async incrementLikeValue(joke, value) {
    const category = joke.category;
    const jokeID = joke.id;
    const key = "likes";

    return await this.getItemsInCategory(category).then((doc) => {
      const items = doc.data()[category];
      const item = items.find((item) => item.id === jokeID);

      if (item) {
        const newValue = (item[key] || 0) + value;
        item[key] = newValue;

        return this.updateItemsInCategory(category, items).then(() => {
          return newValue;
        });
      }
    });
  },
};
