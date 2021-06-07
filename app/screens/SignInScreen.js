import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import firebaseClient from "../api/firebaseClient";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

import ErrorMessage from "../components/forms/ErrorMessage";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitButton from "../components/forms/SubmitButton";

import text from "../config/text";
import ActivityIndicator from "../components/ActivityIndicator";
import UserContext from "../context/UserContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const SignUpScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState();

  const handleSingIn = async ({ email, password }) => {
    setIsLoading(true);
    await firebaseClient
      .signIn(email, password)
      .then(async (userCredential) => {
        return firebaseClient
          .getUser(userCredential.user.uid)
          .then((querySnapshot) => {
            if (querySnapshot) {
              return querySnapshot.data();
            }
          });
      })
      .then((user) => {
        setUser(user);
        navigation.replace("dashboard");
        // navigation.replace("app", {
        // screen: "usernavigator",
        // });
      })
      .catch((error) => {
        setLoginFailed(true);
        console.log("handleSingIn() error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignUp = () => navigation.replace("signup");

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={isLoading} />
      <AppText style={text.joke}>Sing in</AppText>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSingIn}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
        />
        <View style={styles.containerInputFields}>
          <FormField
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
        </View>
        <SubmitButton title="Sign In" style={styles.button} />
      </Form>
      <View style={styles.containerLower}>
        <AppText style={[text.subtitle, { paddingBottom: 10 }]}>
          Don't have an account?
        </AppText>
        <AppButton
          color="secondary"
          onPress={handleSignUp}
          style={styles.button}
          title="Sign Up"
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "50%",
  },
  container: {
    justifyContent: "center",
  },
  containerLower: {
    alignItems: "center",
    paddingTop: 50,
    width: "100%",
  },
  containerInputFields: {
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
    width: "100%",
  },
});

export default SignUpScreen;
