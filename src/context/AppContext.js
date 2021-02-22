import React from "react";
import faker from "faker";
import {
  changeColumnDefProp,
  makeBlankRow,
  makeBlankCell,
} from "../gridOperations";

const INIT_ROW_COUNT = 500;

export const AppStateContext = React.createContext({});
export const AppDispatchContext = React.createContext({});

const appReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COL_PROP": {
      return {
        ...state,
        columnDefs: changeColumnDefProp(state.columnDefs, action.payload),
      };
    }
    case "ADD_COL": {
      return {
        ...state,
        rows: state.rows.map((row) => [...row, makeBlankCell()]),
        columnDefs: [...state.columnDefs, NewColumnTemplate()],
      };
    }
    case "SET_ROWS": {
      return {
        ...state,
        rows: action.payload,
      };
    }
    case "ADD_ROW": {
      return {
        ...state,
        rows: [...state.rows, makeBlankRow(state.columnDefs.length)],
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
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
].map((x) => ({
  ...x,
  key: x.id,
}));

function makeMockDataRow() {
  return columnDefs
    .map((col) => {
      if (col.makeMockEntry) return col.makeMockEntry();
      else return null;
    })
    .map((val) => ({ value: val }));
}

const initialState = {
  columnDefs,
  rows: [...Array(INIT_ROW_COUNT).keys()].map(makeMockDataRow),
};

const NewColumnTemplate = () => {
  const word = faker.random.word();
  const col = {
    name: [word.slice(0, 1).toUpperCase(), word.slice(1)].join(""),
    id: word.trim().toLowerCase(),
    inputType: "string",
  };
  col.key = col.id;
  return col;
};

export const AppContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {props.children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error(
      "AppStateContext must be used within an AppContextProvider"
    );
  }
  return context;
};

export const useAppDispatch = () => {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error(
      "AppDispatchContext must be used within an AppContextProvider"
    );
  }
  return context;
};

export const useAppContext = () => [useAppState(), useAppDispatch()];
