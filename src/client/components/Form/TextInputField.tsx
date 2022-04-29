import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "react-final-form";

export const TextInputField: React.FC<TextFieldProps & { name: string }> = ({
  name,
  ...props
}) => {
  const { input } = useField(name);
  return <TextField {...input} {...props} />;
};
