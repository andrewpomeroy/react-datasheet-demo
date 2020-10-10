import React, { useState } from "react";
import ReactDataSheet from "react-datasheet";
import faker from "faker";
import "react-datasheet/lib/react-datasheet.css";
import "./App.css";
import CellValueDisplay from "./components/CellValueDisplay";
import HeaderCellValueDisplay from "./components/HeaderCellValueDisplay";

const validators = {
  number: (value) =>
    value &&
    parseInt(value.trim ? value.trim() : value) ===
      (value.trim ? value.trim() : value),
  string: (value) => true,
  required: (value) => value && (value.trim ? value.trim() : value).length,
};

const columnDefs = [
  {
    name: "Name",
    id: "name",
    inputType: "string",
    isRequired: true,
    makeMockEntry: faker.name.findName,
  },
  {
    name: "Number",
    id: "number",
    inputType: "number",
    makeMockEntry: faker.random.number,
  },
  {
    name: "Company",
    id: "company",
    inputType: "string",
    makeMockEntry: faker.company.companyName,
  },
  {
    name: "Department",
    id: "department",
    inputType: "string",
    makeMockEntry: faker.commerce.department,
  },
];

const cellRenderer = ({
  children,
  row,
  col,
  cell,
  className,
  style,
  selected,
  editing,
  updated,
  attributesRenderer,
  onMouseDown,
  onMouseOver,
  onDoubleClick,
  onContextMenu,
}) => {
  let _validators = [];
  const columnDef = columnDefs[col];
  if (validators[columnDef.inputType])
    _validators.push(validators[columnDef.inputType]);
  if (columnDef.isRequired) _validators.push(validators.required);
  const isValid = _validators.every((x) => x(cell.value));
  const DisplayComponent =
    row === 0 ? HeaderCellValueDisplay : CellValueDisplay;
  const align =
    row === 0 ? "center" : columnDef.inputType === "number" ? "right" : "left";
  return (
    <td
      className={className}
      style={style}
      selected={selected}
      editing={editing}
      updated={updated}
      attributesRenderer={attributesRenderer}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
    >
      {editing ? (
        <>{children}</>
      ) : (
        <DisplayComponent isValid={isValid} align={align}>
          {children}
          {/* {cell.value ? children : <span>&nbsp;</span>} */}
        </DisplayComponent>
      )}
    </td>
  );
};

function App() {
  const makeRow = (values) => values.map((x) => ({ value: x }));

  const makeMockDataRow = () =>
    makeRow(columnDefs.map((col) => col.makeMockEntry()));

  const range = (int) => [...Array(int).keys()];

  const initialValues = range(100).map(makeMockDataRow);

  const gridInitialState = [
    [
      ...columnDefs.map((x) => ({
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
    <div className="App">
      <div className="GridContainer">
        <div className="Columns">
          <div className="Column">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
