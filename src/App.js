import React from "react";
import "react-datasheet/lib/react-datasheet.css";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";
import Spreadsheet from "./reactDataSheet/ReactDatasheetExample";
import TableDefinitionControls from "./reactDataSheet/TableDefinitionControls";
import { AppContextProvider } from "./context/AppContext";
import { CommonFeatures } from "./reactDataGrid/CommonFeatures";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <div className="App">
          <div className="Navbar">
            {/* <h1 className="Heading"></h1> */}
            <div className="Navbar-item">
              <NavLink to="/react-datasheet" activeClassName="active">
                react-datasheet
              </NavLink>
            </div>
            <div className="Navbar-item">
              <NavLink to="/react-data-grid" activeClassName="active">
                react-data-grid
              </NavLink>
            </div>
          </div>
          <div className="Columns GridContainer">
            <div className="Column" style={{ maxWidth: 360 }}>
              <TableDefinitionControls />
            </div>
            <div className="Column Column--grid">
              <Switch>
                <Route path="/react-datasheet">
                  <Spreadsheet />
                </Route>
                <Route path="/react-data-grid">
                  <CommonFeatures />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </AppContextProvider>
  );
}

export default App;
