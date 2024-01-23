import React, { useEffect, useState } from "react";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import { useDemoData } from "@mui/x-data-grid-generator";
import MasterTable from "./Table";
import Header from "./Header";
import MasterForm from "./Form";
import { Chip, SelectChangeEvent } from "@mui/material";

const Root = () => {
  const [isMastarForm, setIsMasterForm] = useState(false);
  const [masterList, setMasterList] = useState<string[]>([]);
  const [selectedMasterList, setSelectedMasterList] = useState<string[]>(
    []
  );
  const [masterChips,setMasterChips] = useState<any>([]);
  const [tableList,setTableList] = useState<any>([]);
  const [selectedTableData,setSelectedTableData] = useState<any>({});
  console.log("🚀 ~ Root ~ selectedMasterList:", selectedMasterList)
  
  useEffect(() => {
    const names: any = [
      { label: "Company Master", value: "company_master" },
      { label: "Holiday", value: "holiday" },
      { label: "Employee Master", value: "employee_master" },
    ];

    setMasterList(names);
  }, []);

  useEffect(()=>{
    if(selectedMasterList?.length){
      setMasterChips(selectedMasterList);
    }
  },[selectedMasterList]);
  
  const handleChangeMaterList = (
    event: SelectChangeEvent<typeof selectedMasterList>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedMasterList(typeof value === "string" ? value.split(",") : value);
  };

 const handleModalOpen = () => {
    setIsMasterForm(true);
    setSelectedTableData({});
  };

  const handleModalClose = () => {
    setIsMasterForm(false);
    setSelectedTableData({});
  };
  return (
    <div>
      <div>
        <Header
          handleChangeMaterList={handleChangeMaterList}
          masterList={masterList}
          selectedMasterList={selectedMasterList}
        />
      </div>
      <div style={{ margin: "20px 0 0 20px" }}>
        {masterChips?.map((data: any) => {
          const displayName = data?.replace("_", " ");
          return (
            <Chip
              label={displayName}
              sx={{ mr: 2 }}
              variant="outlined"
              color="primary"
              onClick={() => {
                console.log("DDDDDD", data);
              }}
              onDelete={() => {
                alert("zzzzzzz");
              }}
            />
          );
        })}
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <div>
          <MasterTable
            setIsMasterForm={setIsMasterForm}
            handleModalOpen={handleModalOpen}
            tableList={tableList}
            setTableList={setTableList}
            isMastarForm={isMastarForm}
            selectedTableData={selectedTableData}
            setSelectedTableData={setSelectedTableData}
            handleModalClose={handleModalClose}
          />
        </div>
      </div>

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

export default Root;