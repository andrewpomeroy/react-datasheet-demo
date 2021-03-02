import styled from "@emotion/styled";
import React from "react";
import ReactDataSheet from "react-datasheet";
import DataCell from "react-datasheet/lib/DataCell";
import { AutoSizer, Grid } from "react-virtualized";
import cellEditor from "../renderers/cellEditor";

const StyledGrid = styled(Grid)`
  outline: none;
`;

const DataCellWrapper = styled.div`
  background-color: white;
`;

// I've taken most of this from a virtualized-grid POC: https://gist.github.com/hoan006/e982c5fda491c29c25bb69020f328a1f
// I reduced it quite a bit, removing MultiGrid for Grid, but we'll need to go back to using MultiGrid and possibly `react-scrollsync` to achieve sticky-headers
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
                    <DataCellWrapper key={key} style={style}>
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
                        dataEditor={cellEditor}
                        valueRenderer={valueRenderer}
                        cellRenderer={cellRenderer}
                        attributesRenderer={attributesRenderer}
                        // onCellsChanged={handleCellsChanged}
                        // onSelect={handleSelect}
                      />
                    </DataCellWrapper>
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
