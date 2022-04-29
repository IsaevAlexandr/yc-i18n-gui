import React from "react";
import { Select, SelectProps } from "@mui/material";
import { useField } from "react-final-form";

export const SelectField: React.FC<SelectProps & { name: string }> = ({
  name,
  type,
  ...props
}) => {
  const {
    input: { onChange, ...input },
  } = useField(name);
  return <Select onChange={onChange} {...input} {...props} type={type} />;
};
