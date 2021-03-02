import React, { useRef, useState, useEffect } from "react";
import CellValueDisplay from "./CellValueDisplay";
import HeaderCellValueDisplay from "./HeaderCellValueDisplay";
import styled from "@emotion/styled";
import validators from "../grid-model/validators";
import { useAppState } from "../context/AppContext";
import theme from "../theme";

// This stuff may want to be moved to a component specific to text editing
// The idea being to keep InnerCell as generic as possible
const InputContainer = styled.div`
  height: 100%;
  width: 100%;
  input {
    height: 100%;
    width: ${(props) => (props.inputWidth ? props.inputWidth + "px" : "auto")};
    padding: ${theme.space.cellPaddingY} ${theme.space.cellPaddingX};
    border: 0;
    text-align: ${(props) => props.align};
    /* position: fixed;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 30px; */
    position: absolute;
    z-index: 1;
    outline: 1px solid black;
    outline-style: auto;
  }
`;

const InnerCell = ({ row, col, cell, children, editing }) => {
  const ref = useRef();
  const [inputWidth, setInputWidth] = useState();
  const appState = useAppState();
  useEffect(() => {
    if (!editing && ref.current) {
      const containerRect = ref.current.getBoundingClientRect();
      const textRect = ref.current
        .getElementsByClassName("value-viewer")[0]
        .getBoundingClientRect();
      const containerPaddingX = parseInt(
        window.getComputedStyle(ref.current).paddingRight,
        10
      );
      const newWidth =
        textRect.right > containerRect.right - containerPaddingX
          ? textRect.width + containerPaddingX * 2
          : containerRect.width;
      setInputWidth(newWidth);
    }
  }, [editing]);

  let _validators = [];
  const columnDef = appState.columnDefs[col];
  const isHeader = row === 0;
  if (validators[columnDef.inputType])
    _validators.push(validators[columnDef.inputType]);
  if (columnDef.isRequired) _validators.push(validators.required);
  const isValid = _validators.every((x) => x(cell.value));
  const align = isHeader
    ? "center"
    : columnDef.inputType === "number"
    ? "right"
    : "left";

  const DisplayComponent = isHeader ? HeaderCellValueDisplay : CellValueDisplay;
  return (
    <>
      {editing ? (
        <InputContainer inputWidth={inputWidth} align={align}>
          {children}
        </InputContainer>
      ) : (
        <DisplayComponent isValid={isValid} align={align} ref={ref}>
          {children}
        </DisplayComponent>
      )}
    </>
  );
};

export default InnerCell;
