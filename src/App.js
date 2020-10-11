import React from "react";
import "react-datasheet/lib/react-datasheet.css";
import "./App.css";
import Spreadsheet from "./components/Spreadsheet";

function App() {
  return (
    <div className="App">
      <div className="GridContainer">
        <div className="Columns">
          <div className="Column">
            <Spreadsheet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
