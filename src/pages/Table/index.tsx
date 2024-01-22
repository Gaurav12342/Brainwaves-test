import { DataGridPro, GridToolbar, GridOverlay,GridInitialState } from "@mui/x-data-grid-pro";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Button, Stack, Typography } from "@mui/material";
import { getHeaders, loadTemplatesFromLocalStorage, saveTemplateToLocalStorage } from "../../Utils/common";
import { useEffect, useState } from "react";
import SaveTemplateModal from "../Components/TemplateModal";

const initialTemplate:any = {
  pinnedColumns: { left: ['empCode'], right:['action'] },
  // hiddenColumns: ['id'],
  // columnOrder: ['companyName', 'id', 'empCode', 'fName', 'lName','gender','birthDate','address1','address2','address3','city','state','country'],
};

const MasterTable = (props: any) => {
  const { setIsMasterForm, handleModalOpen, tableList, setTableList } = props;

  const [gridTemplate, setGridTemplate] = useState<any>(initialTemplate);
  console.log("🚀 ~ MasterTable ~ gridTemplate:", gridTemplate)
  const [storedPinnedColumn,setStorePinnedColumn] = useState({});

  const [manageTemplate,setManageTemplate] = useState<any>([]);
  // console.log("🚀 ~ MasterTable ~ manageTemplate:", manageTemplate)
  // console.log("🚀 ~ MasterTable ~ gridTemplate----------:", gridTemplate)

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  // const [existingTemplates, setExistingTemplates] = useState([]);

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

  // const handleColumnModelChange = (newModel:any) => {
  //   setGridTemplate(newModel);
  // };

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
    // saveTemplateToLocalStorage(gridTemplate, templateName);
  };

//  useEffect(() => {
//     // const loadedTemplates = loadTemplatesFromLocalStorage();
//     // setExistingTemplates(loadedTemplates);
//     // ... other useEffect content
//     setGridTemplate(initialTemplate);

//   }, []);

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
    setColumnOrder(newModel.map((col:any) => col.field));
  };

  const handlePinnedColumnChange = (newData:any)=>{
    setStorePinnedColumn(newData);
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
          columns={getHeaders(handleDelete)}
          rows={tableList}
          style={{ height: 700 }}
          components={{
            Toolbar: GridToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          hideFooter={tableList.length === 0}
          initialState={{
            pinnedColumns: gridTemplate?.pinnedColumns,
          }}
          onPinnedColumnsChange={handlePinnedColumnChange}
          onColumnOrderChange={handleColumnModelChange}
          
        />
      </div>

      {isSaveModalOpen && (
        <SaveTemplateModal
          onSave={handleSaveTemplate}
          onApply={handleApplyTemplate}
          onClose={closeSaveModal}
          // existingTemplates={existingTemplates}
          isSaveModalOpen={isSaveModalOpen}
          manageTemplate={manageTemplate}
        />
      )}
    </div>
  );
};

export default MasterTable;
