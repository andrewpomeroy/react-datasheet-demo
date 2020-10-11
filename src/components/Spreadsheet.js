import React, { useState, useEffect, useCallback } from "react";
import ReactDataSheet from "react-datasheet";
import cellRenderer from "./cellRenderer";
import { useAppContext } from "../context/AppContext";

const range = (int) => [...Array(int).keys()];

const Spreadsheet = (props) => {
  const [appContext, appDispatch] = useAppContext();
  const initialRows = range(15).map(makeMockDataRow);

  const makeHeaderCells = useCallback((columnDefs) => {
    return [
      ...columnDefs.map((x) => ({
        // isHeaderCell: true,
        readOnly: true,
        className: "header-cell",
        value: x.name,
      })),
    ];
  }, []);

  const gridInitialState = [
    makeHeaderCells(appContext.columnDefs),
    ...initialRows,
  ];
  const [gridState, setGridState] = useState(gridInitialState);

  useEffect(() => {
    setGridState([
      makeHeaderCells(appContext.columnDefs),
      ...gridState.slice(1),
    ]);
    // eslint-disable-next-line
  }, [appContext, makeHeaderCells]);

  function makeRow(values) {
    return values.map((x) => ({ value: x }));
  }

  function makeMockDataRow() {
    return makeRow(
      appContext.columnDefs.map((col) => {
        if (col.makeMockEntry) return col.makeMockEntry();
        else return null;
      })
    );
  }

  return (
    <ReactDataSheet
      data={gridState}
      valueRenderer={(cell) => cell.value}
      cellRenderer={cellRenderer}
      onCellsChanged={(changes) => {
        const grid = gridState.map((row) => [...row]);
        changes.forEach(({ cell, row, col, value }) => {
          grid[row][col] = { ...grid[row][col], value };
        });
        setGridState(grid);
      }}
    />
  );
};

export default Spreadsheet;
