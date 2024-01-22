import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Theme, useTheme } from "@emotion/react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Header = (props: any) => {
  const {handleChangeMaterList,masterList, selectedMasterList} = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <FormControl sx={{ m: 1, borderColor: "red", width: 600 }}>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              placeholder="Master1"
              value={selectedMasterList}
              onChange={handleChangeMaterList}
              MenuProps={MenuProps}
              sx={{ background: "#ffffff", color: "#000000" }}
            >
              {masterList.map((data:any,index:any) => (
                <MenuItem key={index} value={data?.value}>
                  {data?.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
