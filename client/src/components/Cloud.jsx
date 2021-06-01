import React, { useState, useEffect } from "react";

import cloud from "../img/cloud.png";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
  cCloud: {
    position: "fixed",
    width: props => `${props.width}px`,
    top: props => `${props.top}%`,
    left: props => `${props.left}%`,
    // Math.floor(Math.random() * (max - min + 1)) + min;

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
  const [width, setWidth] = useState(0);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth((props.size / 100) * window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    setTop(Math.random() * 70 + 10);
    setLeft(Math.random() * 70);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const classes = useStyles({
    // width: Math.random() * 500 + 100,
    // width: Math.random() * (window.innerWidth / 5),
    left,
    width,
    top,
  });

  return (
    <Fade in timeout={2000}>
      <img className={classes.cCloud} src={cloud}></img>
    </Fade>
  );
}

export default Cloud;
