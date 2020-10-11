import React from "react";
import faker from "faker";

export const AppStateContext = React.createContext({});
export const AppDispatchContext = React.createContext({});

const changeColumnDefProp = (defs, changes) => {
  const record = defs.find((def) => def.id === changes.colId);
  // console.log("changes", changes);
  // console.log(defs, record);
  record[changes.propName] = changes.value;
  // console.log(defs);
  return defs;
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COL_PROP": {
      return {
        ...state,
        columnDefs: changeColumnDefProp(state.columnDefs, action.payload),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const initialState = {
  columnDefs: [
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
  ],
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
    // throw new Error(
    //   "AppStateContext must be used within an AppContextProvider"
    // );
    console.log("wat, AppStateContext", context);
  }
  return context;
};

export const useAppDispatch = () => {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    // throw new Error(
    //   "AppDispatchContext must be used within an AppContextProvider"
    // );
    console.log("wat, AppDispatchContext", context);
  }
  return context;
};

export const useAppContext = () => [useAppState(), useAppDispatch()];
