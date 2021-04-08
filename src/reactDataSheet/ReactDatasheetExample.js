import React, { useState, useEffect, useCallback } from "react";
import cellRenderer from "./cellRenderer";
import { useAppContext } from "../context/AppContext";
import WideButton from "../components/WideButton";
import { makeBlankRow } from "../gridOperations";
import attributesRenderer from "./attributesRenderer";
import VirtualizedSheet from "./VirtualizedSheet";

const ReactDatasheetExample = () => {
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
    ...appContext.arrayRows,
  ];
  const [gridState, setGridState] = useState(gridInitialState);

  useEffect(() => {
    setGridState([
      makeHeaderCells(appContext.columnDefs),
      ...appContext.arrayRows,
    ]);
    // eslint-disable-next-line
  }, [appContext, makeHeaderCells]);

  function handleCellsChanged(changes, additions) {
    const grid = gridState.map((row) => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      grid[row][col] = { ...grid[row][col], value };
    });

    // paste extended beyond end, so add a new row
    additions &&
      additions.forEach(({ cell, row, col, value }) => {
        if (!grid[row]) {
          grid[row] = makeBlankRow(appContext.columnDefs.length);
        }
        if (grid[row][col]) {
          grid[row][col] = { ...grid[row][col], value };
        }
      });

    appDispatch({ type: "SET_ROWS", payload: grid.slice(1) });
  }

  const handleSelect = (start, end) => {
    // console.log(start, end);
  };

  console.log(gridState);

  return (
    <>
      {/* <ReactDataSheet
        data={gridState}
        valueRenderer={(cell) => cell.value || "\u00a0"}
        cellRenderer={cellRenderer}
        attributesRenderer={attributesRenderer}
        onCellsChanged={handleCellsChanged}
        onSelect={handleSelect}
      /> */}
      <VirtualizedSheet
        data={gridState}
        valueRenderer={(cell) => cell.value || "\u00a0"}
        cellRenderer={cellRenderer}
        attributesRenderer={attributesRenderer}
        onCellsChanged={handleCellsChanged}
        onSelect={handleSelect}
        overflow="clip"
      />
    </>
  );
};

export default ReactDatasheetExample;
