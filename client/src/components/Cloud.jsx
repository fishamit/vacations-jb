import React from "react";

import cloud from "../img/cloud.png";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
  cCloud: {
    position: "fixed",
    width: props => props.width,
    top: props => props.top,
    left: props => Math.random() * window.innerWidth - props.width / 2,
    zIndex: -1,
    animationDuration: props => Math.random() * 8 + 2 + "s",
    animationDelay: props => Math.random() * 1 + "s",
    animation: `$myEffect infinite ease-in-out`,
    animationDirection: "alternate",
    animationFillMode: "none",
  },
  "@keyframes myEffect": {
    "100%": {
      transform: `translateX(${Math.random() * 70 + 30}px)`,
    },
  },
}));

function Cloud(props) {
  const classes = useStyles({
    width: Math.random() * 500 + 100,
    top: Math.random() * window.innerHeight,
    time: 2,
  });

  return (
    <Fade in timeout={2000}>
      <img className={classes.cCloud} src={cloud}></img>
    </Fade>
  );
}

export default Cloud;
