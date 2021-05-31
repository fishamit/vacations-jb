import React from "react";

import Cloud from "./Cloud";
import Airplane from "./Airplane";

function Background() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8].map(cloud => (
        <Cloud key={cloud} width={Math.random() * 700 + 100} />
      ))}
      <Airplane />
    </>
  );
}

export default Background;
