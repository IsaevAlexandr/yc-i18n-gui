import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const Theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: 0,
          },
        },
        defaultProps: {
          size: "small",
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
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
