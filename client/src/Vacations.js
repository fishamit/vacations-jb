import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { context } from "./providers/MainProvider";
import { refresh, attemptFetch, getVacations } from "./utils/fetch";
import ButtonAppBar from "./components/ButtonAppBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Reports from "./components/Reports";
import Feed from "./components/Feed";
import { makeStyles } from "@material-ui/core/styles";
import Edit from "./components/Edit";
import Add from "./components/Add";
import { Fade, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  addbtn: {
    marginBottom: "20px",
  },
  container: {
    marginTop: "20px",
  },
}));

function Vacations() {
  const { state, dispatch } = useContext(context);
  const classes = useStyles();

  useEffect(() => {
    //Attempt to refresh tokens at page load
    (async () => {
      if (localStorage.getItem("refreshToken")) {
        try {
          const payload = await refresh();
          dispatch({ type: "LOG_IN", payload });
        } catch (error) {
          dispatch({ type: "LOG_OUT" });
        }
      } else dispatch({ type: "LOG_OUT" });
    })();
  }, []);

  //Once a user is logged in, load vacations
  useEffect(() => {
    (async () => {
      if (state.vacationsUpdate) {
        loadVacations();
      }
    })();
  }, [state.vacationsUpdate]);

  const loadVacations = async () => {
    try {
      const payload = await attemptFetch(
        getVacations,
        { accessToken: state.accessToken },
        dispatch
      );
      dispatch({ type: "SET_VACATIONS", payload });
    } catch (error) {}
  };

  return (
    <>
      <Router>
        <ButtonAppBar />
        <Container maxWidth="xl" className={classes.container}>
          <Switch>
            <Route exact path="/">
              {state.loading ? (
                <h1 style={{ textAlign: "center" }}>Loading</h1> // Loading
              ) : state.user ? (
                <>
                  <Box marginBottom={2}>
                    <Fade in timeout={500}>
                      <Typography variant="h5" className={classes.hello}>
                        Hello, {state.user.fname}.
                      </Typography>
                    </Fade>
                  </Box>
                  <Feed vacations={state.vacations} />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/login">
              {!state.user ? <Login /> : <Redirect to="/" />}
            </Route>
            <Route path="/register">
              {!state.user ? <Register /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/edit/:vid">
              {state.user?.admin ? <Edit /> : <Redirect to="/" />}
            </Route>
            <Route path="/add">
              {state.user?.admin ? <Add /> : <Redirect to="/" />}
            </Route>
            <Route path="/reports">
              {state.user?.admin ? <Reports /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default Vacations;
