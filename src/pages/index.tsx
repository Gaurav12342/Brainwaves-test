import React, { useEffect, useState } from "react";
import MasterTable from "./Table";
import Header from "./Header";
import MasterForm from "./Form";
import { Chip, SelectChangeEvent } from "@mui/material";
import NotFound from "./NotFound";
import MaterDropdownModal from "../Components/MaterDropdownModal";

const Root = () => {
  const [isMastarForm, setIsMasterForm] = useState(false);
  const [masterDropDownList, setMasterDropDownList] = useState<string[]>([]);
  const [selectedMasterList, setSelectedMasterList] = useState<any>([]);
  const [selectedMaster, setSelectedMaster] = useState<any>({});
  const [selectedTableData, setSelectedTableData] = useState<any>({});
  const [tableList1, setTableList1] = useState<any>({});
  const [isMasterDropDownList, setIsMasterDropDownList] = useState(false);
  const [masterDropDownValue, setMasterDropDownValue] = useState("");
  
  useEffect(() => {
    const names: any = [
      { label: "Company Master", value: "company_master" },
      { label: "Holiday", value: "holiday" },
      { label: "Employee Master", value: "employee_master" },
    ];

    setMasterDropDownList(names);
  }, []);

  const handleChangeMaterList = (
    event: any
  ) => {
    const value = event.target.value;
    const newSelection = {
      id: Math.random(),
      value: value,
    };
    setSelectedMasterList([...selectedMasterList, newSelection]);
  };

  const handleModalOpen = () => {
    setIsMasterForm(true);
    setSelectedTableData({});
  };

  const handleModalClose = () => {
    setIsMasterForm(false);
    setSelectedTableData({});
  };

  const handleSaveMasterDropDownValue = ()=>{
    const newArray:any = [...masterDropDownList];
    newArray.push({
      label: masterDropDownValue, value: masterDropDownValue?.replace(/\s/g, '_').toLowerCase()
    });
    setMasterDropDownList(newArray);
    setIsMasterDropDownList(false);
  }

  return (
    <div>
      <div>
        <Header
          handleChangeMaterList={handleChangeMaterList}
          masterDropDownList={masterDropDownList}
          selectedMasterList={selectedMasterList}
          setIsMasterDropDownList={setIsMasterDropDownList}
          isMasterDropDownList={isMasterDropDownList}
        />
      </div>
      <div style={{ margin: "20px 0 0 20px" }}>
        {selectedMasterList?.map((data: any) => {
          return (
            <Chip
              key={data?.id}
              label={data?.value?.replace("_", " ")}
              sx={{ mr: 2 }}
              color={selectedMaster?.id === data?.id ? "success" : "primary"}
              onClick={() => {
                const newObj = {
                  selectedTransaction: data,
                  masterList: [],
                };
                setTableList1(newObj);
                setSelectedMaster(data);
              }}
              onDelete={() => {
                const result = selectedMasterList?.filter(
                  (dd: any) => dd?.id !== data?.id
                );
                setSelectedMasterList(result);
              }}
            />
          );
        })}
      </div>
      <div style={{ height: 400, width: "100%" }}>
        {!selectedMasterList?.length ? (
          <NotFound
            title={"Please select masters from above masters dropdown"}
          />
        ) : Object.keys(selectedMaster).length > 0 ? (
          <MasterTable
            setIsMasterForm={setIsMasterForm}
            handleModalOpen={handleModalOpen}
            isMastarForm={isMastarForm}
            selectedTableData={selectedTableData}
            setSelectedTableData={setSelectedTableData}
            handleModalClose={handleModalClose}
            setTableList1={setTableList1}
            tableList1={tableList1}
            selectedMaster={selectedMaster}
          />
        ) : (
          <div>
            <NotFound title={"Please select any master chip"} />
          </div>
        )}
      </div>

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

      {isMasterDropDownList && <MaterDropdownModal masterDropDownValue={masterDropDownValue} setMasterDropDownValue={setMasterDropDownValue} setIsMasterDropDownList={setIsMasterDropDownList}
          isMasterDropDownList={isMasterDropDownList} handleSaveMasterDropDownValue={handleSaveMasterDropDownValue}/>}
    </div>
  );
};

export default Root;
