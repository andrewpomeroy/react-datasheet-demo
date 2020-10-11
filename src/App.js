import React from "react";
import "react-datasheet/lib/react-datasheet.css";
import "./App.css";
import Spreadsheet from "./components/Spreadsheet";
import TableDefinitionControls from "./components/TableDefinitionControls";
import { AppContextProvider } from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <div className="GridContainer">
          <div className="Columns">
            <div className="Column">
              <TableDefinitionControls />
            </div>
            <div className="Column">
              <Spreadsheet />
            </div>
          </div>
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
