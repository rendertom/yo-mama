import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

function SubmitButton({ style, title }) {
  const { handleSubmit } = useFormikContext();

  return <AppButton onPress={handleSubmit} style={style} title={title} />;
}

export default SubmitButton;
