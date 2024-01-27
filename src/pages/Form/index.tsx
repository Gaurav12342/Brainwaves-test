import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProfileTab from "./ProfileTab";
import AddressTab from "./AddressTab";
import { useForm } from "react-hook-form";
import { Dayjs } from "dayjs";

const MasterForm = (props: any) => {
  const {
    handleModalClose,
    isMastarForm,
    selectedTableData,
    tableList1,
    selectedMaster,
    setTableList1,
  } = props;

  // manage the state for address tab and profile tab form data
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedBirthDate, setSelectedBirthDate] =
    React.useState<Dayjs | null>(null);
  const [comboBoxaValue,setComboBoxaValue] = useState(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
    getValues
  } = useForm<any>({
    defaultValues: {
      birthDate: "",
    },
  });

  useEffect(() => {
    if (selectedTableData) {
      setSelectedGender(selectedTableData?.gender);
      setComboBoxaValue(selectedTableData?.city);
      reset({
        companyName: selectedTableData.companyName,
        empCode: selectedTableData.empCode,
        fName: selectedTableData.fName,
        lName: selectedTableData.lName,
        gender: selectedTableData.gender,
        birthDate: selectedTableData.birthDate,
        address1: selectedTableData.address1,
        address2: selectedTableData.address2,
        address3: selectedTableData.address3,
        city: selectedTableData.city,
        state: selectedTableData.state,
        country: selectedTableData.country,
      });
    }
  }, [selectedTableData, reset]);

  const handleReset = () => {
    reset();
    setSelectedGender("");
    setSelectedBirthDate(null);
    setComboBoxaValue(null);
  };

  const onSubmit: any = (data: any) => {
    if (selectedTableData?.id) {
      const updatedList = tableList1?.masterList?.map((item: any) =>
        item.id === selectedTableData.id ? { ...item, ...data } : item
      );
      setTableList1({
        selectedTransaction: selectedMaster,
        masterList: updatedList,
      });
    } else {
      const obj = [...tableList1?.masterList];
      obj.push({ ...data, id: Date.now() });
      const result = {
        selectedTransaction: selectedMaster,
        masterList: obj,
      };
      setTableList1(result);
    }
    handleModalClose();
  };

  const handleNext = () => {
    setSelectedTab(1);
  };

  const handlePrev = () => {
    setSelectedTab(0);
  };

  const handleComboChange = (value:any) => {
    setValue("city",value?.city);
    setValue("state",value?.state);
    setValue("country",value?.country);
    setComboBoxaValue(value?.city);
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={handleModalClose}
        aria-labelledby="customized-dialog-title"
        open={isMastarForm}
        maxWidth={"xl"}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Comapany Master
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <>
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                aria-label="basic tabs example"
                style={{ marginBottom: "20px" }}
              >
                <Tab label="Profile" />
                <Tab label="Address" />
              </Tabs>

              <div>
                {selectedTab === 0 && (
                  <ProfileTab
                    register={register}
                    setValue={setValue}
                    selectedGender={selectedGender}
                    setSelectedGender={setSelectedGender}
                    selectedBirthDate={selectedBirthDate}
                    setSelectedBirthDate={setSelectedBirthDate}
                    control={control}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    selectedTab={selectedTab}
                  />
                )}
                {selectedTab === 1 && (
                  <AddressTab
                    register={register}
                    setValue={setValue}
                    control={control}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    selectedTab={selectedTab}
                    handleComboChange={handleComboChange}
                    comboBoxaValue={comboBoxaValue}
                  />
                )}
              </div>
            </>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                handleModalClose();
                reset();
              }}
            >
              Cancel
            </Button>

            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>

            <Button type="submit" variant="contained">
              {selectedTableData?.id ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default MasterForm;
