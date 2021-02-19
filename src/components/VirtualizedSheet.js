import styled from "@emotion/styled";
import React from "react";
import ReactDataSheet from "react-datasheet";
import DataCell from "react-datasheet/lib/DataCell";
import { AutoSizer, Grid } from "react-virtualized";

const StyledGrid = styled(Grid)`
  outline: none;
`;

class VirtualizedSheet extends ReactDataSheet {
  _setState(state) {
    super._setState(state);
    /* MultiGrid for some reason, only re-render the top-left <Grid> when DataSheet state changes
       Might be similar: https://github.com/bvaughn/react-virtualized/issues/1108 */
    // this.grid.forceUpdateGrids();
  }
  render() {
    const {
      attributesRenderer,
      cellRenderer,
      valueRenderer,
      dataRenderer,
      valueViewer,
      dataEditor,
      overflow,
      className,
      data,
    } = this.props;
    return (
      <div
        style={{ flex: 1, width: "100%" }}
        ref={(r) => {
          this.dgDom = r;
        }}
        tabIndex="0"
        className="data-grid-container data-grid-container--virtualized"
        onKeyDown={this.handleKey.bind(this)}
      >
        <AutoSizer>
          {({ width: sheetWidth, height: sheetHeight }) => (
            <div
              className={["data-grid", className, overflow]
                .filter((a) => a)
                .join(" ")}
            >
              <StyledGrid
                ref={(ref) => {
                  this.grid = ref;
                }}
                tabIndex={-1}
                cellRenderer={({ key, rowIndex, columnIndex, style }) => {
                  return (
                    <div key={key} style={style}>
                      <DataCell
                        row={rowIndex}
                        col={columnIndex}
                        cell={data[rowIndex][columnIndex]}
                        overflow={overflow}
                        onMouseDown={this.onMouseDown}
                        onMouseOver={this.onMouseOver}
                        onDoubleClick={this.onDoubleClick}
                        onContextMenu={this.onContextMenu}
                        onChange={this.onChange}
                        onRevert={this.onRevert}
                        onNavigate={this.handleKeyboardCellMovement}
                        onKey={this.handleKey}
                        selected={this.isSelected(rowIndex, columnIndex)}
                        editing={this.isEditing(rowIndex, columnIndex)}
                        clearing={this.isClearing(rowIndex, columnIndex)}
                        dataRenderer={dataRenderer}
                        valueViewer={valueViewer}
                        dataEditor={dataEditor}
                        valueRenderer={valueRenderer}
                        cellRenderer={cellRenderer}
                        attributesRenderer={attributesRenderer}
                        // onCellsChanged={handleCellsChanged}
                        // onSelect={handleSelect}
                      />
                    </div>
                  );
                }}
                columnWidth={120}
                columnCount={data[0].length}
                height={sheetHeight}
                rowHeight={30}
                rowCount={data.length}
                width={sheetWidth}
              />
            </div>
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default VirtualizedSheet;
