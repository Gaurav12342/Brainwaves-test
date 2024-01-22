import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import React from "react";

const AddressTab = (props: any) => {
  const { register, handleNext, handlePrev, selectedTab } = props;
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
            <InputLabel htmlFor="component-simple">Address 1</InputLabel>
            <FormControl style={{ width: "90%" }} variant="standard">
              <TextField id="fullWidth" {...register("address1")} />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-simple">Address 2</InputLabel>
            <FormControl style={{ width: "90%" }} variant="standard">
              <TextField id="fullWidth" {...register("address2")} />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-simple">Address 3</InputLabel>
            <FormControl style={{ width: "90%" }} variant="standard">
              <TextField id="fullWidth" {...register("address3")} />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container xs={12}>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-simple">City</InputLabel>
            <FormControl style={{ width: "90%" }} variant="standard">
              <TextField id="fullWidth" {...register("city")} />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-simple">State</InputLabel>
            <FormControl style={{ width: "90%" }} variant="standard">
              <TextField id="fullWidth" {...register("state")} />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-simple">Country</InputLabel>
            <FormControl style={{ width: "90%" }} variant="standard">
              <TextField id="fullWidth" {...register("country")} />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item>
            <Button
              variant="outlined"
              style={{ marginRight: 10 }}
              onClick={handlePrev}
              disabled={selectedTab === 0 && true}
            >
              Prev
            </Button>
            <Button variant="outlined" onClick={handleNext} disabled={selectedTab === 1 && true}>
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AddressTab;
