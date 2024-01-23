import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import ReplySharpIcon from '@mui/icons-material/ReplySharp';

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
  const {handleChangeMaterList,masterDropDownList, selectedMasterList, setIsMasterDropDownList} = props;

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
              {masterDropDownList.map((data:any,index:any) => (
                <MenuItem key={index} value={data?.value}>
                  {data?.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button color="inherit" onClick={()=>{setIsMasterDropDownList(true)}}><ReplySharpIcon/> &nbsp; Add Master</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
