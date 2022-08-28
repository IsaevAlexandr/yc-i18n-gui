import React from "react";
import { TextField, TextFieldProps, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useField } from "react-final-form";

export type TextInputFieldProps = TextFieldProps & {
  name: string;
  withCopyButton?: boolean;
};

export const TextInputField: React.FC<TextInputFieldProps> = ({
  name,
  withCopyButton,
  ...props
}) => {
  const { input } = useField(name);
  const handleCopyButtonClick = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(async (e) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(input.value);
  }, []);

  return (
    <TextField
      {...input}
      {...props}
      InputProps={{
        endAdornment: withCopyButton ? (
          <IconButton onClick={handleCopyButtonClick}>
            <ContentCopyIcon sx={{ opacity: 0.5 }} />
          </IconButton>
        ) : null,
      }}
    />
  );
};
