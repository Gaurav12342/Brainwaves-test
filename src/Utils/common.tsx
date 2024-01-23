import { GridColDef } from "@mui/x-data-grid-premium";
import { IGENDERS } from "../Interface/common";
import { Box, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const GENDERS: IGENDERS[] = [
  { value: "male", label: "MALE" },
  { value: "female", label: "FEMALE" },
  { value: "other", label: "OTHER" },
];

export const getHeaders: any = (handleDelete:any,handleEditMasterForm:any) => ([
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "companyName",
    headerName: "Company Name",
    width: 150,
    editable: false,
    sortable: true,
  },
  {
    field: "empCode",
    headerName: "Employee Code",
    width: 150,
    editable: false,
    sortable: true,
  },
  {
    field: "fName",
    headerName: "First Name",
    width: 150,
    editable: false,
    sortable: true,
  },
  {
    field: "lName",
    headerName: "Last Name",
    sortable: true,
    width: 150,
    editable: false,
  },
  {
    field: "gender",
    headerName: "Gender",
    sortable: true,
    width: 100,
    editable: false,
  },
  {
    field: "birthDate",
    headerName: "Date of Birth",
    sortable: true,
    width: 150,
    editable: false,
  },
  {
    field: "address1",
    headerName: "Address 1",
    sortable: true,
    width: 150,
    editable: false,
  },
  {
    field: "address2",
    headerName: "Address 2",
    sortable: true,
    width: 150,
    editable: false,
  },
  {
    field: "address3",
    headerName: "Address 3",
    sortable: true,
    width: 150,
    editable: false,
  },
  {
    field: "city",
    headerName: "City",
    sortable: true,
    width: 150,
    editable: false,
    
  },

  {
    field: "state",
    headerName: "State",
    sortable: true,
    width: 150,
    editable: false,
  },
  {
    field: "country",
    headerName: "Country",
    sortable: true,
    width: 150,
    editable: false,
  },
  {
    field: 'action',
    headerName: 'Actions',
    width: 150,
    renderCell: ({row}:any) => {
      return (
        <Box>
          <Button onClick={()=>handleDelete(row)} sx={{mr:1}} size="small" variant="outlined"><DeleteIcon/></Button>
          <Button onClick={()=>handleEditMasterForm(row)} size="small" variant="outlined"><EditIcon/></Button>
        </Box>
      );
    },
    
  },
    
]);

export const saveTemplateToLocalStorage = (template:any, templateName:any) => {
  const existingTemplates = JSON.parse(localStorage.getItem('savedTemplates') as any) || [];
  existingTemplates.push({ name: templateName, template });
  localStorage.setItem('savedTemplates', JSON.stringify(existingTemplates));
};

export const loadTemplatesFromLocalStorage = () => {
  try {
    const existingTemplates = JSON.parse(localStorage.getItem('savedTemplates') as any);
    return existingTemplates || [];
  } catch (error) {
    console.error('Error loading templates from localStorage', error);
    return [];
  }
};