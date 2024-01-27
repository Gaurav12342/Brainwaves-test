import {
  DataGridPro,
  GridOverlay,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid-pro";
import { Button, Typography } from "@mui/material";
import { getHeaders } from "../../Utils/common";
import { useEffect, useMemo, useState } from "react";
import SaveTemplateModal from "../../Components/TemplateModal";
import MasterForm from "../Form";

const initialTemplate: any = {
  pinnedColumns: { left: ["id"], right: ["action"] },
  visibilityColumn: {
    id: true,
    companyName: true,
    empCode: true,
    fName: true,
    lName: true,
    gender: true,
    birthDate: true,
    address1: true,
    address2: true,
    address3: true,
    city: true,
    state: true,
    country: true,
  },
};

const MasterTable = (props: any) => {
  const {
    setIsMasterForm,
    handleModalOpen,
    selectedTableData,
    setSelectedTableData,
    isMastarForm,
    handleModalClose,
    tableList1,
    setTableList1,
    selectedMaster,
  } = props;
  const [gridTemplate, setGridTemplate] = useState<any>(initialTemplate);
  const [storedPinnedColumn, setStorePinnedColumn] = useState({});
  
  const [manageTemplate, setManageTemplate] = useState<any>([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [columnOrder, setColumnOrder] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<any>({});
  

  useEffect(() => {
    // set initial value of column order
    const getColumn = getHeaders(handleDelete, handleEditMasterForm);
    setColumnOrder(getColumn?.map((col: any) => col.field));

    // set initial value of column visibility
    setColumnVisibilityModel(initialTemplate?.visibilityColumn);
  }, []);
 

  const CustomNoRowsOverlay: any = () => {
    return (
      <GridOverlay>
        <Typography variant="subtitle1" style={{ textAlign: "center" }}>
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

  const handleSaveTemplate = (templateName: any) => {
    const newArray: any = [...manageTemplate];
    const obj = {
      templateName,
      storedPinnedColumn,
      columnOrder,
      columnVisibilityModel
    };
    newArray.push(obj);
    setManageTemplate(newArray);
  };

  const handleApplyTemplate = (templateName: any) => {
    manageTemplate?.map((data: any) => {
      if (data?.templateName === templateName) {
        setGridTemplate({ pinnedColumns: data?.storedPinnedColumn });
        setColumnOrder(data?.columnOrder);
        setColumnVisibilityModel(data?.columnVisibilityModel);
      }
    });
  };

  const handleDelete = (rows: any) => {
    const updatedTableList = tableList1.map((tableItem:any) => {
      if (tableItem.selectedTransaction.id === selectedMaster.id) {
        const updatedMasterList = tableItem.masterList.filter(
          (row:any) => row.id !== rows.id
        );
        return { ...tableItem, masterList: updatedMasterList };
      }
      return tableItem;
    });
  
    setTableList1(updatedTableList);
  };

  const handlePinnedColumnChange = (newData: any) => {
    setGridTemplate({ pinnedColumns: newData });
    setStorePinnedColumn(newData);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
      </GridToolbarContainer>
    );
  }

  const handleEditMasterForm = (row: any) => {
    setIsMasterForm(true);
    setSelectedTableData(row);
  };

  const handleApplyDefaultTemplate = () => {
    setGridTemplate(initialTemplate);
    const getColumn = getHeaders(handleDelete, handleEditMasterForm);
    setColumnOrder(getColumn?.map((col:any) => col.field));

    setColumnVisibilityModel(initialTemplate?.visibilityColumn);
    closeSaveModal();
  };

  const existingMasterIndex = tableList1.findIndex(
    (entry:any) => entry.selectedTransaction.id === selectedMaster.id
  );

  const handleColumnOrderChange = ({ column, oldIndex, targetIndex }:any) => {
    let newOrder = [...columnOrder];
    const movedColumn = newOrder.splice(oldIndex, 1)[0];
    newOrder.splice(targetIndex, 0, movedColumn);
    setColumnOrder(newOrder);
  };

  const orderedColumns = useMemo(() => {
    const unorderedColumns = getHeaders(handleDelete, handleEditMasterForm);
    return columnOrder.map((field:any) => unorderedColumns.find((col:any) => col.field === field)).filter(Boolean);
  }, [columnOrder, handleDelete, handleEditMasterForm]);

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
          columns={orderedColumns}
          rows={tableList1[existingMasterIndex]?.masterList ?? []}
          style={{ height: 700 }}
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          hideFooter={tableList1?.length === 0}
          initialState={{
            pinnedColumns: gridTemplate?.pinnedColumns,
          }}
          columnOrder={columnOrder} 
          onColumnOrderChange={handleColumnOrderChange}
          onPinnedColumnsChange={handlePinnedColumnChange}

          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
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
          selectedTableData={selectedTableData}
          setTableList1={setTableList1}
          tableList1={tableList1}
          selectedMaster={selectedMaster}
        />
      )}
    </div>
  );
};

export default MasterTable;
