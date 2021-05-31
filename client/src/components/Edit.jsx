import React, { useState, useContext, useEffect } from "react";
import { context } from "../providers/MainProvider";
import { attemptFetch, editVacation } from "../utils/fetch";
import { useHistory, useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { createDateString } from "../utils/createDateString";

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
  btn: { margin: "0 5px" },
}));

function Edit() {
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [image, setImage] = useState("");
  const [dateStart, setdateStart] = useState("");
  const [dateEnd, setdateEnd] = useState("");
  const [price, setPrice] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [destinationError, setDestinationError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [dateStartError, setdateStartError] = useState(false);
  const [dateEndError, setdateEndError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [serverError, setServerError] = useState("");
  const { vid } = useParams();
  const { state, dispatch } = useContext(context);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const vacation = state.vacations.find(v => {
      return v.vacation_id === Number(vid);
    });

    setDescription(vacation.description);
    setDestination(vacation.destination);
    setImage(vacation.image);
    setdateStart(createDateString(vacation.date_start));
    setdateEnd(createDateString(vacation.date_end));

    setPrice(vacation.price);
    return () => {};
  }, []);

  const handleSave = async e => {
    e.preventDefault();
    setDescriptionError(false);
    setDestinationError(false);
    setImageError(false);
    setdateStartError(false);
    setdateEndError(false);
    setPriceError(false);
    setServerError("");
    if (
      !description ||
      !destination ||
      !image ||
      !dateStart ||
      !dateEnd ||
      !price ||
      !Number(price)
    ) {
      setDescriptionError(!description);
      setDestinationError(!destination);
      setImageError(!image);
      setdateStartError(!dateStart);
      setdateEndError(!dateEnd);
      setPriceError(!price || !Number(price));
      return;
    }
    try {
      const fetch = await attemptFetch(
        editVacation,
        {
          vid,
          accessToken: state.accessToken,
          vacation: {
            description,
            destination,
            image,
            dateStart,
            dateEnd,
            price,
          },
        },
        dispatch
      );

      dispatch({ type: "UPDATE_VACATIONS" });
      history.push("/");
    } catch (error) {
      setServerError(error.message);
    }
  };
  return (
    <Fade in timeout={1000}>
      <Paper className={classes.card} elevation={5}>
        <form className={classes.form}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                fullWidth
                label="Destination"
                value={destination}
                helperText="Required"
                error={destinationError}
                onChange={e => {
                  setDestination(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Description"
                value={description}
                multiline
                rows={3}
                helperText="Required"
                error={descriptionError}
                onChange={e => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Image URL"
                value={image}
                helperText="Required"
                error={imageError}
                onChange={e => {
                  setImage(e.target.value);
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="date"
                value={dateStart}
                label="Start date"
                helperText="Required"
                error={dateStartError}
                onChange={e => {
                  setdateStart(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="date"
                value={dateEnd}
                label="End date"
                helperText="Required"
                error={dateEndError}
                onChange={e => {
                  setdateEnd(e.target.value);
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Price ($)"
                value={price}
                helperText="Required"
                error={priceError}
                onChange={e => {
                  setPrice(e.target.value);
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
                {serverError}
              </Typography>
            </Box>

            <Grid item>
              <Box display="flex">
                <Button
                  className={classes.btn}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => history.push("/")}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className={classes.btn}
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={e => handleSave(e)}
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Fade>
  );
}

export default Edit;
