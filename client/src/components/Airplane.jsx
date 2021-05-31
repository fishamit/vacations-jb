import React from "react";
import airplane from "../img/airplane.png";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
  cAirplane: {
    position: "fixed",
    width: 200,
    top: window.innerHeight - 200,
    left: -200,
    zIndex: -2,
    animationDuration: "20s",
    transform: "rotate(-35deg)",

    animation: `$myEffect linear`,
    animationIterationCount: 1,
    animationFillMode: "none",
  },
  "@keyframes myEffect": {
    "100%": {
      left: window.innerWidth + 200,
      top: -200,
    },
  },
}));

function Airplane() {
  const classes = useStyles({
    top: Math.random() * window.innerHeight,
  });

  return (
    <Fade in timeout={2000}>
      <img className={classes.cAirplane} src={airplane}></img>
    </Fade>
  );
}

export default Airplane;
