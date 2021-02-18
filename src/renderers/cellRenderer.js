import React from "react";
import InnerCell from "../components/InnerCell";

const cellRenderer = ({
  children,
  row,
  col,
  cell,
  className,
  style,
  selected,
  editing,
  updated,
  attributesRenderer,
  onMouseDown,
  onMouseOver,
  onDoubleClick,
  onContextMenu,
  overflow,
}) => {
  const attrs = attributesRenderer(cell, row, col, selected);
  // console.log(attrs);
  // const CellElement = row === 0 ? "th" : "td";
  const CellElement = "div";
  return (
    <CellElement
      className={className}
      style={style}
      selected={selected || null}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      {...attrs}
    >
      <InnerCell
        row={row}
        col={col}
        cell={cell}
        editing={editing}
        overflow={overflow}
      >
        {children}
      </InnerCell>
    </CellElement>
  );
};

export default cellRenderer;
