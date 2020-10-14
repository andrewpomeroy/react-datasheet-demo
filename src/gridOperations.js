export function changeColumnDefProp(defs, changes) {
  const record = defs.find((def) => def.id === changes.colId);
  record[changes.propName] = changes.value;
  return defs;
}

export function makeBlankCell() {
  return { value: "" };
}

export function makeBlankRow(colCount) {
  return [...Array(colCount).keys()].map(makeBlankCell);
}
