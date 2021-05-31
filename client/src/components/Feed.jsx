import React, { useContext } from "react";
import { context } from "../providers/MainProvider";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import VacationCard from "./VacationCard";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  addbtn: {
    marginBottom: "20px",
  },
  container: {
    marginTop: "20px",
  },
}));

function Feed({ vacations }) {
  const { state, dispatch } = useContext(context);
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      {state.user.admin ? (
        <Fade in timeout={800}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.addbtn}
            startIcon={<AddCircleIcon />}
            onClick={() => history.push("/add")}
          >
            Add vacation
          </Button>
        </Fade>
      ) : null}
      {vacations.length ? (
        <Grid container spacing={2}>
          {vacations.map(vacation => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={vacation.vacation_id}>
              <VacationCard vacation={vacation} />
            </Grid>
          ))}
        </Grid>
      ) : (
        state.fetched && (
          <Fade in timeout={2000}>
            <Typography variant="h5" align="center">
              No vacations to show.
            </Typography>
          </Fade>
        )
      )}
    </>
  );
}

export default Feed;
