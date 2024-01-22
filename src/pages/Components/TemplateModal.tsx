import {
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
} from "@mui/material";
import React, { useEffect, useState } from "react";

const SaveTemplateModal = ({
  onSave,
  onClose,
  onApply,
  isSaveModalOpen,
  manageTemplate
}: any) => {
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
          Templates
        </DialogTitle>

        <DialogContent dividers>
          <div>
            <Grid container xs={12}>
              <Grid item xs={12} sx={{ display: "flex", mb:5 }}>
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

              <Grid item xs={12} display={'flex'}>
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
                          <MenuItem key={template?.templateName} value={template?.templateName}>
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
