import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector, useDispatch } from 'react-redux';
import Header from "../../components/Header";
import { getUsers, getNextData } from '../../redux/userslice';
import { useEffect } from "react";
const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { loading, error, data, previousUrl, nextUrl, totalRecords } = useSelector((state) => state.users);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  useEffect(() => {
    document.title = "Users | Admin Panel";
    dispatch(getUsers());

  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) => {
        return params
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "isActive",
      headerName: "Active Status",
      type: "boolean",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "wallet",
      headerName: "wallet",
      flex: 1,
      valueGetter: (params) => {
        return params?.$numberDecimal ? parseFloat(params.$numberDecimal) : 0;
      },
    },

    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: (params) => {
        const { isAdmin, isTeacher } = params.row;

        return (
          <Box
            width="70%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              isAdmin
                ? colors.greenAccent[600]
                : isTeacher
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {isAdmin === true && <SecurityOutlinedIcon />}
            {isTeacher === true && <AdminPanelSettingsIcon />}
            {!isAdmin && !isTeacher && <PersonIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {isAdmin && isTeacher ? "Admin & Teacher" : isAdmin ? "Admin" : isTeacher ? "Teacher" : "User"}            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Users" subtitle="Managing the Users Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >

        <DataGrid
          checkboxSelection
          rows={data || []}
          columns={columns}
          pageSize={data.length}
          rowCount={totalRecords}
          getRowId={(row) => row._id}
          paginationMode="server"
          loading={loading}
          pagination
          pageSizeOptions={[5, 10, 25]}
          paginationModel={paginationModel}
          onPaginationModelChange={() => { nextUrl && dispatch(getNextData()) }}

        />

      </Box>
    </Box>
  );
};

export default Users;
