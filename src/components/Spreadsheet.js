import React, { useState, useEffect, useCallback } from "react";
import cellRenderer from "../renderers/cellRenderer";
import { useAppContext } from "../context/AppContext";
import WideButton from "./WideButton";
import { makeBlankRows } from "../gridOperations";
import attributesRenderer from "./attributesRenderer";
import VirtualizedSheet from "./VirtualizedSheet";

const Spreadsheet = () => {
  const [appContext, appDispatch] = useAppContext();

  const [selected, setSelected] = useState({
    start: { i: 0, j: 0 },
    end: { i: 0, j: 0 },
  });

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

  function handleCellsChanged(changes, additions) {
    const grid = gridState.map((row) => [...row]);
    // Here, we could run validation on each value, and reject values that, say, don't align with lookup values, for example.
    changes.forEach(({ cell, row, col, value }) => {
      grid[row][col] = { ...grid[row][col], value };
    });

    // If a paste operation goes beyond the bounds of the existing rows, add however many rows are necessary to accommodate
    additions &&
      additions.forEach(({ cell, row, col, value }) => {
        if (!grid[row]) {
          grid[row] = makeBlankRows(1, appContext.columnDefs.length)[0];
        }
        if (grid[row][col]) {
          grid[row][col] = { ...grid[row][col], value };
        }
      });

    appDispatch({ type: "SET_ROWS", payload: grid.slice(1) });
  }

  // Keeping controlled-selection enabled for now, even though it lowers performance a bit, since we'll have to use it at some point.
  // (we need to keep performance expectations realistic as we move forward)
  const handleSelect = ({ start, end }) => {
    // TODO: add focus management to make sure that the most recently selected *single* cell receives browser focus.
    // Natively, the "selected" cell loses focus after confirming a cell edit.
    setSelected({ start, end });
  };

  return (
    <>
      <VirtualizedSheet
        data={gridState}
        // \u00a0 is the non-breaking-space unicode character, we use it here to ensure that a text node is still generated in an empty cell (so it doesn't collapse in on itself)
        valueRenderer={(cell) => cell.value || "\u00a0"}
        // dataEditor={DataEditor}
        cellRenderer={cellRenderer}
        attributesRenderer={attributesRenderer}
        onCellsChanged={handleCellsChanged}
        onSelect={handleSelect}
        overflow="clip"
      />
      <div style={{ display: "flex", marginTop: ".5rem" }}>
        <WideButton
          onClick={() => appDispatch({ type: "ADD_ROW" })}
          style={{ width: "auto", marginRight: ".5rem" }}
        >
          Add Blank Row
        </WideButton>
        <WideButton
          onClick={() =>
            appDispatch({ type: "ADD_MOCK_ROWS", payload: { count: 1 } })
          }
          style={{ width: "auto" }}
        >
          Add Row w/ Fake Data
        </WideButton>
      </div>
    </>
  );
};

export default Spreadsheet;
