export function changeColumnDefProp(defs, changes) {
  const record = defs.find((def) => def.id === changes.colId);
  record[changes.propName] = changes.value;
  return defs;
}

export function makeBlankCell() {
  return { value: "" };
}

export function makeBlankRows(rowCount, colCount) {
  return [...Array(rowCount).keys()].map((x) => {
    return [...Array(colCount).keys()].map(makeBlankCell);
  });
}

export function makeMockDataRows(rowCount, columnDefs) {
  return [...Array(rowCount).keys()].map((x) => {
    return columnDefs
      .map((col) => {
        if (col.makeMockEntry) return col.makeMockEntry();
        else return null;
      })
      .map((val) => ({ value: val }));
  });
}
