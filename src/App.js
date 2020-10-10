import React, { useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import './App.css';
import 'react-datasheet/lib/react-datasheet.css';

function App() {

  const columnDefs = [
    {
      name: "Name",
      id: "name",
      inputType: "string"
    },
    {
      name: "Number",
      id: "number",
      inputType: "number"
    }
  ];
  const initialValues = [
    [{value: "Andrew"}, {value: 120}],
    [{value: "Alice"}, {value: 4000}],
  ]
  const gridInitialState = [
    [...columnDefs.map(x => ({
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
        <ReactDataSheet
          data={gridState}
          valueRenderer={cell => cell.value}
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
  );
}

export default App;
