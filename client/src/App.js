import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MainProvider } from "./providers/MainProvider";
import theme from "./theme";
import Vacations from "./Vacations";
import Background from "./components/Background";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainProvider>
        <CssBaseline />
        <Vacations />
        <Background />
      </MainProvider>
    </ThemeProvider>
  );
}

export default App;
