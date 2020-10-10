import React, { useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import faker from 'faker';
import './App.css';
import 'react-datasheet/lib/react-datasheet.css';
import CellValueDisplay from './components/CellValueDisplay';
import HeaderCellValueDisplay from './components/HeaderCellValueDisplay';

const cellRenderer = ({ children, row, className,
  style,
  selected,
  editing,
  updated,
  attributesRenderer,
  onMouseDown,
  onMouseOver,
  onDoubleClick,
  onContextMenu }) => {
  const DisplayComponent = row === 0 ? HeaderCellValueDisplay : CellValueDisplay;
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
      <DisplayComponent>{children}</DisplayComponent>
    </td>
  );
}


function App() {

  const columnDefs = [
    {
      name: "Name",
      id: "name",
      inputType: "string",
      makeMockEntry: faker.name.findName
    },
    {
      name: "Number",
      id: "number",
      inputType: "number",
      makeMockEntry: faker.random.number
    },
    {
      name: "Company",
      id: "company",
      inputType: "string",
      makeMockEntry: faker.company.companyName
    },
    {
      name: "Department",
      id: "department",
      inputType: "string",
      makeMockEntry: faker.commerce.department
    },
  ];
  const makeRow = (values) => values.map(x => ({value: x}));
  // const initialValues = [
  //   [{value: "Andrew"}, {value: 120}],
  //   [{value: "Alice"}, {value: 4000}],
  // ]

  const makeMockDataRow = () => makeRow(
    columnDefs.map(col => col.makeMockEntry())
  )

  const range = int => [...Array(int).keys()];

  const initialValues = range(100).map(makeMockDataRow);

  const gridInitialState = [
    [...columnDefs.map(x => ({
      // isHeaderCell: true,
      readOnly: true,
      className: 'header-cell',
      value: x.name,
    }))],
    ...initialValues
  ]


  const [gridState, setGridState] = useState(gridInitialState);

  return (
    <div className="App">
      <div className="GridContainer">
        <div className="Columns">
          <div className="Column">
            <ReactDataSheet
              data={gridState}
              valueRenderer={cell => cell.value}
              cellRenderer={cellRenderer}
              // valueRenderer={valueRenderer}
              onCellsChanged={changes => {
                const grid = gridState.map(row => [...row]);
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
