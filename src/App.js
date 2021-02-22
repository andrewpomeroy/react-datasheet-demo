import React, { useState } from "react";
import "react-datasheet/lib/react-datasheet.css";
import Measure from "react-measure";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";
import Spreadsheet from "./reactDataSheet/ReactDatasheetExample";
import TableDefinitionControls from "./reactDataSheet/TableDefinitionControls";
import {
  AppDispatchConsumer,
  AppContextProvider,
  useAppContext,
} from "./context/AppContext";
import { CommonFeatures } from "./reactDataGrid/CommonFeatures";
import ReactDataGridExample from "./reactDataGrid/ReactDataGridExample";
import WideButton from "./components/WideButton";

function App() {
  const [usableHeight, setUsableHeight] = useState(0);
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
              <Measure
                bounds
                onResize={(contentRect) => {
                  setUsableHeight(contentRect.bounds.height);
                }}
              >
                {({ measureRef }) => (
                  <div
                    ref={measureRef}
                    style={{
                      flex: 1,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Switch>
                      <Route path="/react-datasheet">
                        <Spreadsheet />
                      </Route>
                      <Route path="/react-data-grid">
                        <ReactDataGridExample height={usableHeight} />
                      </Route>
                    </Switch>
                  </div>
                )}
              </Measure>
              <div>
                <AppDispatchConsumer>
                  {(dispatch) => {
                    console.log(dispatch);
                    return (
                      <WideButton
                        onClick={() => dispatch({ type: "ADD_ROW" })}
                        style={{ width: "auto", marginTop: "1rem" }}
                      >
                        Add Row
                      </WideButton>
                    );
                  }}
                </AppDispatchConsumer>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </AppContextProvider>
  );
}

export default App;
