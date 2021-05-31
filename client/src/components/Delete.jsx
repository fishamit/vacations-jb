import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { context } from "../providers/MainProvider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { deleteVacation, attemptFetch } from "../utils/fetch";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Delete({ deleteModal, setDeleteModal, vid }) {
  const { state, dispatch } = useContext(context);

  const handleClose = () => {
    setDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      await attemptFetch(
        deleteVacation,
        { vid, accessToken: state.accessToken, dispatch },
        dispatch
      );
      dispatch({ type: "UPDATE_VACATIONS" });
      setDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={deleteModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          This will remove the vacation from the database.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Back
        </Button>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
