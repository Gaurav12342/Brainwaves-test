import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const SaveTemplateModal = ({
  onSave,
  onClose,
  onApply,
  isSaveModalOpen,
  manageTemplate,
  handleApplyDefaultTemplate
}: any) => {

  // manage the template data
  const [templateName, setTemplateName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleSave = () => {
    onSave(templateName);
    onClose();
  };

  const handleApply = () => {
    onApply(selectedTemplate);
    onClose();
  };

  return (
    <div>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isSaveModalOpen}
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Templates
              </Typography>
            </Box>
            <Box>
              <Button variant="contained" onClick={handleApplyDefaultTemplate}>
                Default
              </Button>
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
                      value={templateName}
                      placeholder="Template Name"
                      onChange={(e) => setTemplateName(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <Button variant="contained" onClick={handleSave}>
                    {" "}
                    Save Template{" "}
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={12} display={"flex"}>
                <Grid item xs={6}>
                  <FormControl style={{ width: "90%" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                    >
                      {manageTemplate?.map((template: any) => {
                        return (
                          <MenuItem
                            key={template?.templateName}
                            value={template?.templateName}
                          >
                            {" "}
                            {template?.templateName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <Button variant="contained" onClick={handleApply}>
                    Apply Template
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SaveTemplateModal;
