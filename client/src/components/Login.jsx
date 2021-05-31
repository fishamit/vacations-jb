import React, { useState, useContext } from "react";
import { context } from "../providers/MainProvider";
import { login } from "../utils/fetch";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "300px",
    padding: "0 30px 20px 30px",
    margin: "100px auto 0 auto",
    backgroundColor: "#ffffff66",
    backdropFilter: "blur(20px)",
  },
  form: {},
  text: {
    marginBottom: "10px",
  },
  bottomText: {
    marginTop: "10px",
  },
  btn: {},
}));

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [ServerError, setServerError] = useState("");

  const { dispatch } = useContext(context);

  const classes = useStyles();

  const handleClick = async e => {
    e.preventDefault();
    setUsernameError(false);
    setPasswordError(false);
    setServerError(false);
    if (!username || !password) {
      setUsernameError(!username);
      setPasswordError(!password);
      return;
    }
    try {
      const payload = await login(username, password);

      dispatch({ type: "LOG_IN", payload });
    } catch (err) {
      setServerError(err);
    }
  };
  return (
    <Fade in timeout={1000}>
      <Paper className={classes.card} elevation={5}>
        <form className={classes.form}>
          <Grid container direction="column" spacing={2}>
            <Grid item></Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Username"
                value={username}
                error={usernameError}
                helperText="Required"
                onChange={e => {
                  setUsername(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Password"
                type="password"
                error={passwordError}
                helperText="Required"
                value={password}
                autoComplete="on"
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
            <Box
              height="30px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography align="center" variant="body2" color="error">
                {ServerError}
              </Typography>
            </Box>
            <Grid item>
              <Button
                className={classes.btn}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                onClick={e => handleClick(e)}
              >
                Login
              </Button>

              <Typography
                align="center"
                className={classes.bottomText}
                variant="body1"
              >
                Don't have an account? <Link to="/register">Register</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Fade>
  );
}

export default Login;
