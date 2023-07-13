import React from 'react';
import DashApp from '../global/DashApp';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { mockDataContacts } from '../../../data/mockData';
import Header from '../../Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const Contact = () => {
  // theme config
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, },
    { field: "registrarId", headerName: "RID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "ZipCode",
      flex: 1,
    },
  ];

  return (
    <DashApp>
      <Box
        m='20px'
      >
        <Header title={"Contact"} subtitle={'Manage Your Contacts'} />
        {/* to render team data */}
        <Box
          height={'65vh'}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              // backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            // this shit is awesome
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
          m='40px 0 0 0'
        >
          <DataGrid
            rows={mockDataContacts}
            columns={columns}
            slots={{
              toolbar: GridToolbar
            }}
          />
        </Box>
      </Box>
    </DashApp >
  );
};

export default Contact;