import React, { useState, useEffect } from "react";
import ReactDataSheet from "react-datasheet";
import cellRenderer from "./cellRenderer";
import { useAppContext } from "../context/AppContext";

const Spreadsheet = (props) => {
  const [appContext, appDispatch] = useAppContext();

  useEffect(() => {}, [appContext]);

  const makeRow = (values) => values.map((x) => ({ value: x }));

  const makeMockDataRow = () =>
    makeRow(appContext.columnDefs.map((col) => col.makeMockEntry()));

  const range = (int) => [...Array(int).keys()];

  const initialValues = range(100).map(makeMockDataRow);

  const gridInitialState = [
    [
      ...appContext.columnDefs.map((x) => ({
        // isHeaderCell: true,
        readOnly: true,
        className: "header-cell",
        value: x.name,
      })),
    ],
    ...initialValues,
  ];

  const [gridState, setGridState] = useState(gridInitialState);

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
