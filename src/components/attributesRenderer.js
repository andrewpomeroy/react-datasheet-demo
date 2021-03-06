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
    tabIndex: -1,
    "aria-readonly": cell.readOnly,
    "aria-selected": selected,
    "aria-label": getAriaLabel(cell, row, col),
    role: getRole(cell, row, col),

    // --- Column headers ---
    "aria-sort": row === 0 ? "none" : undefined,
    // Only for headers? not sure why. This is how the SyncFusion example assigns it (shrug)
    "aria-rowspan": row === 0 ? 1 : undefined,

    // TODO: colindex will probably need to associate with the index relative *total* columns--not just the ones rendered--to support conditionally hidden columms.
    "aria-colindex": col,
  };
  return attrs;
};

export default attributesRenderer;
