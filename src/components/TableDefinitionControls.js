import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "@emotion/styled";
import { useAppState, useAppDispatch } from "../context/AppContext";

const Container = styled.div`
  /* background-color: #464646; */
  background-color: hsla(0, 0%, 94%);
  padding: 0.75rem 1.5rem;
  /* color: white; */
`;

const CtrlGroup = styled.div`
  padding: 0.25rem 0.5rem;
  /* margin-top: -0.25rem; */
  /* margin-bottom: -0.25rem; */
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  /* background-color: rgba(255, 255, 255, 0.1); */
  background-color: rgba(0, 0, 0, 0.1);
`;
const Ctrl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  label {
    font-size: 0.66em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    opacity: 0.8;
    margin-right: 0.5em;
  }
`;

const TableDefinitionControls = (props) => {
  const appContext = useAppState();
  const appDispatch = useAppDispatch();

  const columnDefs = appContext.columnDefs;

  const changeColumnProp = (colId, propName, value) => {
    appDispatch({
      type: "CHANGE_COL_PROP",
      payload: { colId, propName, value },
    });
  };

  const handleNameChange = (event) => {
    changeColumnProp(event.target.dataset.colId, "name", event.target.value);
  };
  const handleTypeChange = (event) => {
    changeColumnProp(
      event.target.dataset.colId,
      "inputType",
      event.target.value
    );
  };
  const handleRequiredChange = (event) => {
    changeColumnProp(
      event.target.dataset.colId,
      "isRequired",
      event.target.checked
    );
  };

  return (
    <Container>
      <h2>Columns</h2>
      <div>
        {columnDefs.map((col) => (
          <CtrlGroup key={col.id}>
            <Ctrl>
              <label htmlFor={`${col.id}_name`}>Name</label>
              <input
                id={`${col.id}_name`}
                data-col-id={col.id}
                value={col.name}
                onChange={handleNameChange}
              />
            </Ctrl>
            <Ctrl>
              <label htmlFor={`${col.id}_type`}>Type</label>
              <select
                id={`${col.id}_type`}
                data-col-id={col.id}
                value={col.inputType}
                onChange={handleTypeChange}
              >
                <option value="string">String</option>
                <option value="number">Number</option>
              </select>
            </Ctrl>
            <Ctrl>
              <label htmlFor={`${col.id}_required`}>Required</label>
              <input
                type="checkbox"
                id={`${col.id}_required`}
                data-col-id={col.id}
                checked={col.isRequired}
                onChange={handleRequiredChange}
              />
            </Ctrl>
          </CtrlGroup>
        ))}
      </div>
      <div>
        {columnDefs.map((col) => (
          <p>
            <pre>{JSON.stringify(col, null, 2)}</pre>
          </p>
        ))}
      </div>
    </Container>
  );
};

export default TableDefinitionControls;
