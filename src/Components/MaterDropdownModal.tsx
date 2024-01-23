import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const MaterDropdownModal = (props: any) => {
  const { isMasterDropDownList, setIsMasterDropDownList,setMasterDropDownValue,handleSaveMasterDropDownValue } = props;
  const handleChange = (e:any)=>{
    const {value} = e.target;
    setMasterDropDownValue(value);
  }
  return (
    <div>
      <Dialog
        onClose={() => {
          setIsMasterDropDownList(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={isMasterDropDownList}
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Master
              </Typography>
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <div>
            <Grid container xs={12}>
              <Grid item xs={12} sx={{ display: "flex", mb: 5 }}>
                <Grid item xs={6}>
                  <FormControl style={{ width: "90%" }} variant="standard">
                    <TextField
                      id="fullWidth"
                      placeholder="Enter master"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setIsMasterDropDownList(false);
            }}
          >
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSaveMasterDropDownValue}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MaterDropdownModal;
