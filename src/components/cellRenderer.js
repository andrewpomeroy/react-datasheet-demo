import React from "react";
import InnerCell from "./InnerCell";

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
}) => {
  return row === 0 ? (
    <th
      className={className}
      style={style}
      selected={selected}
      editing={editing}
      updated={updated}
      attributesRenderer={attributesRenderer}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
    >
      <InnerCell row={row} col={col} cell={cell} editing={editing}>
        {children}
      </InnerCell>
    </th>
  ) : (
    <td
      className={className}
      style={style}
      selected={selected}
      editing={editing}
      updated={updated}
      attributesRenderer={attributesRenderer}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
    >
      <InnerCell row={row} col={col} cell={cell} editing={editing}>
        {children}
      </InnerCell>
    </td>
  );
};

export default cellRenderer;
