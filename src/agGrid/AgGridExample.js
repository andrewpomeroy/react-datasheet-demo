import React, { useEffect, useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { useAppContext } from "../context/AppContext";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const AgGridExample = () => {
  const [isGridReady, setIsGridReady] = useState(null);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [appContext, appDispatch] = useAppContext();

  const updateData = (data) => {
    setRowData(data);
  };

  console.log(appContext.columnDefs);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    setIsGridReady(true);
  };

  useEffect(() => {
    if (isGridReady) {
      setRowData(appContext.objectRows);
    }
  }, [appContext.objectRows, isGridReady]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        id="myGrid"
        style={{
          height: "100%",
          width: "100%",
        }}
        className="ag-theme-balham"
      >
        <AgGridReact
          defaultColDef={{
            flex: 1,
            minWidth: 200,
            editable: true,
            suppressMovable: true,
            lockPinned: true,
            resizable: true,
          }}
          enableRangeSelection={true}
          suppressMultiRangeSelection={true}
          onGridReady={onGridReady}
          rowData={rowData}
        >
          <>
            {appContext.columnDefs.map((x) => (
              <AgGridColumn field={x.id} />
            ))}
          </>
        </AgGridReact>
      </div>
    </div>
  );
};

export default AgGridExample;
