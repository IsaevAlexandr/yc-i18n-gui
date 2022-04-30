import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const Theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiTextField: {
        defaultProps: {
          size: "small",
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            whiteSpace: "nowrap",
          },
        },
        defaultProps: {
          size: "small",
          variant: "text",
        },
      },
    },
    typography: {
      fontFamily:
        "-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji",
    },
  })
);
