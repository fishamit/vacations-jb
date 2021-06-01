import React, { useEffect, useState } from "react";

import Cloud from "./Cloud";
import Airplane from "./Airplane";

function Background() {
  const [nClouds, setnClouds] = useState([]);

  useEffect(() => {
    const n = 8;
    // const n = (window.innerWidth * window.innerHeight) / 200000;
    const arr = [];
    for (let i = 0; i < n; i++) arr.push(i);
    setnClouds(arr);
  }, []);

  return (
    <>
      {nClouds.map(
        (
          cloud //give cloud a size between 1-5 and then make a formula inside setWidth.
        ) => (
          <Cloud key={cloud} size={Math.floor(Math.random() * 25 + 5)} />
        )
      )}
      <Airplane />
    </>
  );
}

export default Background;
