import { DataGridPro, GridToolbar, GridOverlay,GridInitialState,GridToolbarContainer, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarColumnsButton } from "@mui/x-data-grid-pro";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Button, Stack, Typography } from "@mui/material";
import { getHeaders, loadTemplatesFromLocalStorage, saveTemplateToLocalStorage } from "../../Utils/common";
import { useEffect, useState } from "react";
import SaveTemplateModal from "../../Components/TemplateModal";
import MasterForm from "../Form";

const initialTemplate:any = {
  pinnedColumns: { left: ['id'], right:['action'] },
  // hiddenColumns: ['id'],
  // columnOrder: ['companyName', 'id', 'empCode', 'fName', 'lName','gender','birthDate','address1','address2','address3','city','state','country'],
};

const MasterTable = (props: any) => {
  const { setIsMasterForm, handleModalOpen, tableList, setTableList,selectedTableData,setSelectedTableData,isMastarForm,handleModalClose } = props;
  const [gridTemplate, setGridTemplate] = useState<any>(initialTemplate);
  const [storedPinnedColumn,setStorePinnedColumn] = useState({});
  
  const [manageTemplate,setManageTemplate] = useState<any>([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [columnOrder, setColumnOrder] = useState([]);

  const CustomNoRowsOverlay:any = () => {
    return (
      <GridOverlay>
        <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
          Result not found
        </Typography>
      </GridOverlay>
    );
  };

 const openSaveModal = () => {
    setIsSaveModalOpen(true);
  };

  const closeSaveModal = () => {
    setIsSaveModalOpen(false);
  };

  const handleSaveTemplate = (templateName:any) => {
    const newArray:any = [...manageTemplate];
    const obj = {
      templateName,
      storedPinnedColumn
    };
    newArray.push(obj);
    setManageTemplate(newArray);
  };


  const handleApplyTemplate = (templateName: any) => {
    manageTemplate?.map((data: any) => {
      if (data?.templateName === templateName) {
        setGridTemplate({ pinnedColumns: data?.storedPinnedColumn });
      }
    });
  };

  const handleDelete = (rows: any) => {
    const result = tableList?.filter((data: any) => data?.id !== rows?.id);
    setTableList(result);
  };

  const handleColumnModelChange = (newModel:any) => {
    // setColumnOrder(newModel.map((col:any) => col.field));
  };

  const handlePinnedColumnChange = (newData:any) => {
    setGridTemplate({ pinnedColumns: newData });
    setStorePinnedColumn(newData);
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton/>
      </GridToolbarContainer>
    );
  }

  const handleEditMasterForm = (row:any) => {
    setIsMasterForm(true);
    setSelectedTableData(row);
  }

  const handleApplyDefaultTemplate = ()=>{
    setGridTemplate(initialTemplate);
  }

  return (
    <div style={{ marginTop: "0px" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "right",
          marginBottom: "10px",
        }}
      >
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          type="submit"
          onClick={openSaveModal}
        >
          Template
        </Button>

        <Button variant="contained" type="submit" onClick={handleModalOpen}>
          Add Company Master
        </Button>
      </div>
      <div>
        <DataGridPro
          columns={getHeaders(handleDelete,handleEditMasterForm)}
          rows={tableList}
          style={{ height: 700 }}
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          hideFooter={tableList.length === 0}
          initialState={{
            pinnedColumns: gridTemplate?.pinnedColumns,
          }}
          onPinnedColumnsChange={handlePinnedColumnChange}
          onColumnOrderChange={handleColumnModelChange}
          {...gridTemplate}
        />
      </div>

      {isSaveModalOpen && (
        <SaveTemplateModal
          onSave={handleSaveTemplate}
          onApply={handleApplyTemplate}
          onClose={closeSaveModal}
          isSaveModalOpen={isSaveModalOpen}
          manageTemplate={manageTemplate}
          handleApplyDefaultTemplate={handleApplyDefaultTemplate}
        />
      )}
      {isMastarForm && (
        <MasterForm
          isMastarForm={isMastarForm}
          setIsMasterForm={setIsMasterForm}
          handleModalClose={handleModalClose}
          setTableList={setTableList}
          tableList={tableList}
          selectedTableData={selectedTableData}
        />
      )}
    </div>
  );
};

export default MasterTable;
