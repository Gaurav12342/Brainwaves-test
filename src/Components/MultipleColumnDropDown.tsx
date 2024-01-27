import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box, Grid } from "@mui/material";
import { ListOfAddress } from "../Utils/common";

const MultipleColumnDropDown: any = (props: any) => {
  const { onChange, label, value } = props;
  
  const handleChange = (event:any, value:any) => {
    if (value && !value.isLabel) {
      onChange(value);
    } else {
      onChange(null);
    }
  };

  return (
    <div>
      <Autocomplete
        options={ListOfAddress}
        getOptionLabel={(option: any) =>
          option.isLabel
            ? ""
            : `${option[label]}`
        }
        value={value ? ListOfAddress.find(option => option.city === value) : null}
        renderInput={(params) => (
          <TextField {...params} />
        )}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <Grid container xs={12} spacing={0.5}>
              <Grid xs={4}>{option?.city}</Grid>
              <Grid xs={4}>{option?.state}</Grid>
              <Grid xs={4}>{option?.country}</Grid>
            </Grid>
          </Box>
        )}
        onChange={handleChange}
        getOptionDisabled={(option: any) => option.isLabel}
      />
    </div>
  );
};

export default MultipleColumnDropDown;
