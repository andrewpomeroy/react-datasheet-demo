import React, { useState, useEffect, useCallback } from "react";
import ReactDataSheet from "react-datasheet";
import cellRenderer from "../renderers/cellRenderer";
import { useAppContext } from "../context/AppContext";
import WideButton from "./WideButton";
import { makeBlankRows, makeMockDataRows } from "../gridOperations";
import attributesRenderer from "./attributesRenderer";
import PricingSheet from "./TestVirtualized";
import { AutoSizer, Grid } from "react-virtualized";
import DataCell from "react-datasheet/lib/DataCell";
import VirtualizedSheet from "./VirtualizedSheet";
import { useMount } from "react-use";

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

  function handleCellsChanged(changes, additions) {
    const grid = gridState.map((row) => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      grid[row][col] = { ...grid[row][col], value };
    });

    // paste extended beyond end, so add a new row
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

  const handleSelect = (start, end) => {
    // console.log(start, end);
  };

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
      <WideButton
        onClick={() => appDispatch({ type: "ADD_ROW" })}
        style={{ width: "auto", marginTop: "1rem" }}
      >
        Add Row
      </WideButton>
      <WideButton
        onClick={() =>
          appDispatch({ type: "ADD_MOCK_ROWS", payload: { count: 1 } })
        }
        style={{ width: "auto", marginTop: "1rem" }}
      >
        Add Mock Row
      </WideButton>
      {/* <PricingSheet /> */}
    </>
  );
};

export default Spreadsheet;
