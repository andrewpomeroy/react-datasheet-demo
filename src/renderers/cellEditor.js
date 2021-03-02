import React from "react";
import DataEditor from "react-datasheet/lib/DataEditor";

const cellEditor = (props) => {
  console.log(
    "Here's where we'd deploy a control-type-switch to produce different editors depending on column input type"
  );
  return <DataEditor {...props} />;
};

export default cellEditor;
