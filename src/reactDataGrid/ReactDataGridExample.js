import React, { useEffect } from "react";
import ReactDataGrid from "react-data-grid";
import { SelectEditor } from "./SelectEditor";
import { useAppContext } from "../context/AppContext";
import { ColumnSizer } from "react-virtualized";

const defaultColumnProperties = {
  sortable: true,
  width: 120,
};

export function ReactDataGridExample({ height }) {
  const [appContext, appDispatch] = useAppContext();

  const columns = appContext?.columnDefs
    ? appContext.columnDefs.map((column) => ({
        ...defaultColumnProperties,
        ...column,
      }))
    : [];

  return (
    appContext.columnDefs && (
      <ReactDataGrid
        columns={columns}
        rowGetter={(i) => appContext.objectRows[i]}
        rowsCount={appContext.objectRows.length}
        minHeight={height}
        cellRangeSelection={{
          onStart: (args) => console.log(args),
          onUpdate: (args) => console.log(args),
          onComplete: (args) => console.log(args),
        }}
      />
    )
  );
}

export default ReactDataGridExample;
