import React, { useEffect, useState } from "react";
import MasterTable from "./Table";
import Header from "./Header";
import MasterForm from "./Form";
import { Chip, SelectChangeEvent } from "@mui/material";
import NotFound from "./NotFound";

const Root = () => {
  const [isMastarForm, setIsMasterForm] = useState(false);
  const [masterList, setMasterList] = useState<string[]>([]);
  const [selectedMasterList, setSelectedMasterList] = useState<string[]>([]);
  const [selectedMaster, setSelectedMaster] = useState<any>({});
  const [selectedTableData, setSelectedTableData] = useState<any>({});
  const [tableList1, setTableList1] = useState<any>({});

  useEffect(() => {
    const names: any = [
      { label: "Company Master", value: "company_master" },
      { label: "Holiday", value: "holiday" },
      { label: "Employee Master", value: "employee_master" },
    ];

    setMasterList(names);
  }, []);

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
        {selectedMasterList?.map((data: any) => {
          const displayName = data?.replace("_", " ");
          return (
            <Chip
              label={displayName}
              sx={{ mr: 2 }}
              color={selectedMaster === data ? "success" : "primary"}
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
                  (dd: any) => dd !== data
                );
                setSelectedMasterList(result);
                setSelectedMaster({});
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
    </div>
  );
};

export default Root;
