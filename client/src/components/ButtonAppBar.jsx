import React, { useContext } from "react";
import { context } from "../providers/MainProvider";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink, useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { invalidate } from "../utils/fetch";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },

  selected: {
    textDecoration: "underline",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuButtonLeft: {
    marginLeft: theme.spacing(2),
  },
  leftSide: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "'Playball', cursive;",
    color: theme.palette.common.white,
  },
}));

export default function ButtonAppBar() {
  const { state, dispatch } = useContext(context);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Box className={classes.leftSide}>
            <Typography variant="h1" className={classes.title}>
              Vacation!
            </Typography>
          </Box>
          {state.user?.admin ? (
            <>
              <Button color="inherit">
                <NavLink
                  exact
                  to="/"
                  className={classes.link}
                  activeClassName={classes.selected}
                >
                  vacations
                </NavLink>
              </Button>
              <Button color="inherit">
                <NavLink
                  exact
                  to="/reports"
                  className={classes.link}
                  activeClassName={classes.selected}
                >
                  reports
                </NavLink>
              </Button>
            </>
          ) : null}

          {state.user ? (
            <Button
              color="inherit"
              className={classes.link}
              onClick={async () => {
                await invalidate(localStorage.getItem("refreshToken"));
                localStorage.removeItem("refreshToken");
                dispatch({ type: "LOG_OUT" });
              }}
            >
              log out
            </Button>
          ) : (
            <>
              <Button color="inherit">
                <NavLink
                  to="/login"
                  className={classes.link}
                  activeClassName={classes.selected}
                >
                  log in
                </NavLink>
              </Button>
              <Button color="inherit">
                <NavLink
                  to="/register"
                  className={classes.link}
                  activeClassName={classes.selected}
                >
                  register
                </NavLink>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar>
        <Typography variant="h1" className={classes.title}>
          V
        </Typography>
      </Toolbar>
    </div>
  );
}
