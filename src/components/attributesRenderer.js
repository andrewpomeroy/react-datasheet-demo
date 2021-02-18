const getRole = (cell, row, col) => {
  if (row === 0) return "columnheader";
  return "gridcell";
};

const getAriaLabel = (cell, row, col) => {
  // TODO: insert corresponding column header value
  // i.e. "[cell value] column header [column header value]"
  return `${cell.value}`;
};

const attributesRenderer = (cell, row, col, selected) => {
  const attrs = {
    // --- Global properties ---
    tabindex: -1,
    "aria-readonly": cell.readOnly,
    "aria-selected": selected,
    "aria-label": getAriaLabel(cell, row, col),
    role: getRole(cell, row, col),

    // --- Column headers ---
    "aria-sort": row === 0 ? "none" : undefined,
    // Only for headers? not sure why.
    "aria-rowspan": row === 0 ? 1 : undefined,

    // TODO: colindex will need to associate with the *total* columns, not just the ones rendered. (supporting conditionally hidden columms)
    "aria-colindex": col,
  };
  return attrs;
};

export default attributesRenderer;
