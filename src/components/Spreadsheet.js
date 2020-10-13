import React, { useState, useEffect, useCallback } from "react";
import ReactDataSheet from "react-datasheet";
import cellRenderer from "./cellRenderer";
import { useAppContext } from "../context/AppContext";
import WideButton from "./WideButton";

const Spreadsheet = () => {
  const [appContext, appDispatch] = useAppContext();

  const makeHeaderCells = useCallback((columnDefs) => {
    return [
      ...columnDefs.map((x) => ({
        readOnly: true,
        className: "header-cell",
        value: x.name,
      })),
    ];
  }, []);

  const gridInitialState = [
    makeHeaderCells(appContext.columnDefs),
    ...appContext.rows,
  ];
  const [gridState, setGridState] = useState(gridInitialState);

  useEffect(() => {
    setGridState([makeHeaderCells(appContext.columnDefs), ...appContext.rows]);
    // eslint-disable-next-line
  }, [appContext, makeHeaderCells]);

  function addRow() {
    appDispatch({ type: "ADD_ROW" });
  }

  return (
    <>
      <ReactDataSheet
        data={gridState}
        valueRenderer={(cell) => cell.value || "\u00a0"}
        cellRenderer={cellRenderer}
        onCellsChanged={(changes) => {
          const grid = gridState.map((row) => [...row]);
          changes.forEach(({ cell, row, col, value }) => {
            grid[row][col] = { ...grid[row][col], value };
          });
          appDispatch({ type: "SET_ROWS", payload: grid.slice(1) });
        }}
      />
      <WideButton onClick={addRow} style={{ width: "auto", marginTop: "1rem" }}>
        Add Row
      </WideButton>
    </>
  );
};

export default Spreadsheet;
