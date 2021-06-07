import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import firebaseClient from "../api/firebaseClient";

import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

import ErrorMessage from "../components/forms/ErrorMessage";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitButton from "../components/forms/SubmitButton";

import text from "../config/text";
import UserContext from "../context/UserContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  firstName: Yup.string().required().label("First name"),
  lastName: Yup.string().required().label("Last name"),
  password: Yup.string().required().min(6).label("Password"),
});

const SignUpScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSingIn = () => navigation.replace("signin");

  const handleSignUp = ({ email, firstName, lastName, password }) => {
    setIsLoading(true);
    firebaseClient
      .createUser(email, firstName, lastName, password)
      .then((user) => {
        setUser(user);
        navigation.replace("dashboard");
      })
      .catch((error) => {
        console.log(error);
        setError(error.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Screen style={styles.container}>
      <AppText style={text.joke}>Sing Up</AppText>
      <ActivityIndicator visible={isLoading} />
      <Form
        initialValues={{ email: "", firstName: "", lastName: "", password: "" }}
        onSubmit={handleSignUp}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />
        <View style={styles.containerInputFields}>
          <FormField name="firstName" placeholder="First name" />
          <FormField name="lastName" placeholder="Last name" />
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
        <SubmitButton title="Register" style={styles.button} />
      </Form>
      <View style={styles.containerLower}>
        <AppText style={[text.subtitle, { paddingBottom: 10 }]}>
          Already have an account?
        </AppText>
        <AppButton
          color="secondary"
          onPress={handleSingIn}
          style={styles.button}
          title="Sign In"
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
