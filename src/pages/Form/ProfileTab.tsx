import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { GENDERS } from "../../Utils/common";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
const ProfileTab = (props: any) => {
  const {
    register,
    selectedGender,
    setSelectedGender,
    setValue,
    selectedBirthDate,
    setSelectedBirthDate,
    control,
    handleNext,
    handlePrev,
    selectedTab,
  } = props;

  const handleGenderChange = (event: any) => {
    const value: any = event.target.value;
    setSelectedGender(value);
    setValue("gender", value);
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
      >
        <Grid container xs={12}>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-simple">Company Name</InputLabel>
            <FormControl style={{ width: "90%" }} variant="standard">
              <TextField id="fullWidth" {...register("companyName")} />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-simple">Employee Code</InputLabel>
            <FormControl style={{ width: "90%" }} variant="standard">
              <TextField id="fullWidth" {...register("empCode")} />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-simple">First Name</InputLabel>
            <FormControl style={{ width: "90%" }} variant="standard">
              <TextField id="fullWidth" {...register("fName")} />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container xs={12}>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-simple">Last Name</InputLabel>
            <FormControl style={{ width: "90%" }} variant="standard">
              <TextField id="fullWidth" {...register("lName")} />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-simple">Gender</InputLabel>
            <FormControl style={{ width: "90%" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...register("gender")}
                value={selectedGender}
                onChange={handleGenderChange}
              >
                {GENDERS?.map((data: any) => {
                  return <MenuItem value={data?.value}>{data?.label}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-simple">Birth Date</InputLabel>
            <FormControl style={{ width: "90%" }}>
              <LocalizationProvider
                {...register("birthDate")}
                dateAdapter={AdapterDayjs}
              >
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      value={selectedBirthDate || value}
                      onChange={(newValue) => {
                        setSelectedBirthDate(newValue);
                        onChange(newValue);
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item>
            <Button
              variant="outlined"
              style={{ marginRight: 10 }}
              disabled={selectedTab === 0 && true}
              onClick={handlePrev}
            >
              Prev
            </Button>
            <Button
              variant="outlined"
              onClick={handleNext}
              disabled={selectedTab === 1 && true}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProfileTab;
