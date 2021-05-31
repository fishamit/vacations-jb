import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Fade from "@material-ui/core/Fade";
import Delete from "./Delete";
import { context } from "../providers/MainProvider";
import { attemptFetch, followVacation } from "../utils/fetch";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useHistory } from "react-router";
import { createCardDateString } from "../utils/createDateString";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0 auto",
    backgroundColor: "#ffffff66",
    backdropFilter: "blur(20px)",
    // maxWidth: 600,
    minWidth: 375,
  },
  media: {
    height: "100px",
    maxHeight: "300px",
  },
  img: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  description: {
    height: 75,
  },
}));

export default function VacationCard({ vacation }) {
  const classes = useStyles();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { state, dispatch } = useContext(context);
  const handleFollow = async vid => {
    try {
      await attemptFetch(
        followVacation,
        {
          vid,
          accessToken: state.accessToken,
          isFollowed: vacation.user_id,
        },
        dispatch
      );
      dispatch({ type: "UPDATE_VACATIONS" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = vid => {
    history.push(`/edit/${vid}`);
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Fade in={visible} timeout={1000}>
      <Card className={classes.root} elevation={5}>
        <CardHeader
          title={vacation.destination}
          subheader={`From ${createCardDateString(
            vacation.date_start
          )} until ${createCardDateString(vacation.date_end)}`}
          action={
            state.user.admin ? (
              <>
                <IconButton
                  aria-label="delete"
                  onClick={() => setDeleteModal(true)}
                >
                  <DeleteIcon />
                </IconButton>
                <Delete
                  deleteModal={deleteModal}
                  setDeleteModal={setDeleteModal}
                  vid={vacation.vacation_id}
                />
                <IconButton
                  aria-label="edit"
                  onClick={e => handleEdit(vacation.vacation_id)}
                >
                  <EditIcon />
                </IconButton>
              </>
            ) : (
              <IconButton
                aria-label="add to favorites"
                onClick={() => handleFollow(vacation.vacation_id)}
              >
                <FavoriteIcon
                  color={vacation.user_id ? "primary" : "inherit"}
                />
              </IconButton>
            )
          }
        />

        <img className={classes.img} src={vacation.image} />

        <CardContent>
          <Box className={classes.description}>
            <Typography variant="body2" color="textPrimary" component="p">
              {vacation.description}
            </Typography>
          </Box>

          <Typography variant="h5" align="right">
            ${vacation.price.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  );
}
