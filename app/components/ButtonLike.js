import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

const ButtonLike = ({ onPress, style, value }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <MaterialCommunityIcons
        color={value ? colors.red : colors.white}
        name={value ? "heart-remove" : "heart-plus-outline"}
        size={50}
        style={style}
      />
    </TouchableWithoutFeedback>
  );
};

export default ButtonLike;
