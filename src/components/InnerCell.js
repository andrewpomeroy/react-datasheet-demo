import React, { useRef, useState, useEffect } from "react";
import CellValueDisplay from "./CellValueDisplay";
import HeaderCellValueDisplay from "./HeaderCellValueDisplay";
import styled from "@emotion/styled";
import validators from "../grid-model/validators";
import { useAppContext, useAppState } from "../context/AppContext";

const InputContainer = styled.div`
  height: 100%;
  width: 100%;
  input {
    /* height: calc(100% - 6px); */
    height: 100%;
    /* width: ${(props) => props.width - 8}px; */
    width: ${(props) => props.width}px;
    text-align: ${(props) => props.align};
  }
`;

const InnerCell = ({ row, col, cell, children, editing }) => {
  const ref = useRef();
  const [width, setWidth] = useState({});
  const appState = useAppState();
  useEffect(() => {
    if (!editing && ref.current) {
      setWidth(ref.current.getBoundingClientRect().width);
    }
    // eslint-disable-next-line
  }, [editing]);

  let _validators = [];
  const columnDef = appState.columnDefs[col];
  const isHeader = row === 0;
  if (validators[columnDef.inputType])
    _validators.push(validators[columnDef.inputType]);
  if (columnDef.isRequired) _validators.push(validators.required);
  // if (columnDef.inputType === "number") {
  //   _validators.forEach((x) => console.log(x(cell.value)));
  // }
  const isValid = _validators.every((x) => x(cell.value));
  const align = isHeader
    ? "center"
    : columnDef.inputType === "number"
    ? "right"
    : "left";

  const DisplayComponent = isHeader ? HeaderCellValueDisplay : CellValueDisplay;
  return editing ? (
    <InputContainer width={width} align={align}>
      {children}
    </InputContainer>
  ) : (
    <DisplayComponent isValid={isValid} align={align} ref={ref}>
      {children}
    </DisplayComponent>
  );
};

export default InnerCell;
