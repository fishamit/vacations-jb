import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    type: "light",
    background: {
      default: "#64b5f6",
      paper: "#bbdefb",
    },
    common: {
      white: "white",
    },
    primary: {
      // main: "#01579b",
      // main: "#6d4c41",
      main: "#ff8a65",
    },
    secondary: {
      main: "#0d47a1",
    },
    warning: {
      main: "#fdd835",
    },
  },
});
