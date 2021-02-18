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
        <div className="Columns GridContainer">
          <div className="Column" style={{ maxWidth: 360 }}>
            <TableDefinitionControls />
          </div>
          <div className="Column Column--grid">
            <Spreadsheet />
          </div>
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
