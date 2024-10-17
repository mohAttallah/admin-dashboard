import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector, useDispatch } from 'react-redux';
import Header from "../../components/Header";
import { getUsers, getNextData, usersSearch } from '../../redux/userslice';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import AssignWalletModal from  "../../components/users/AssignWallet";
import AssignTeacherModal from  "../../components/users/AssignTeacher";

const Users = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { loading, data, totalRecords, walletSuccessfully, assignTeacherSuccessfully } = useSelector((state) => state.users);
  const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [openAssignToWallet,  setOpenAssignToWallet] = useState(false); 
  const [openAssignTeacher,  setOpenAssignTeacher] = useState(false); 


  const handlePaginations = (model) => {
    setSearchValue(null);
    const offset = model.page * model.pageSize;
    dispatch(getNextData({ limit: model.pageSize, offset }));
    setPaginationModel(model);
  };

  const handleMenuClick = (event, user) => {
    setSelectedUser(null);
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event) => {
    const keyword = event.target.value;
    if (keyword) {
      setSearchValue(keyword);
      dispatch(usersSearch(keyword));
      setPaginationModel({
        ...paginationModel,
        page: 0,
      });
    }
  };
  
  useEffect(() => {
    document.title = "Users | Admin Panel";
    dispatch(getUsers());
    window.scrollTo(0, 0);
    setPaginationModel({
      pageSize: data.length || 10,
      page: 0,
    });
  }, [dispatch]);

  useEffect(() => {
    if(walletSuccessfully===true || assignTeacherSuccessfully===true){
      dispatch(getUsers());
      setPaginationModel({
        pageSize: data.length,
        page: 0,
      });
    }
  }, [walletSuccessfully, assignTeacherSuccessfully]);

  const handleAssignWalletOpen = () => {
    setOpenAssignToWallet(true); 
    handleMenuClose(); 
  };
  const handleAssignWalletClose = () => {
    setOpenAssignToWallet(false); 
  };

  const handleAssignTeacherOpen = () => {
    setOpenAssignTeacher(true); 
    handleMenuClose(); 
  }
  const handleAssignTeacherClose = () => {
    setOpenAssignTeacher(false);
  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
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
      field: "isDeleted",
      headerName: "is Deleted",
      type: "boolean",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "wallet",
      headerName: "Wallet",
      flex: 1,
      valueGetter: (params) => {
        return params?.$numberDecimal ? parseFloat(params.$numberDecimal) : 0;
      },
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row }) => {
        const { isAdmin, isTeacher } = row;
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
            {isAdmin && <SecurityOutlinedIcon />}
            {isTeacher && <AdminPanelSettingsIcon />}
            {!isAdmin && !isTeacher && <PersonIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {isAdmin && isTeacher ? "Admin & Teacher" : isAdmin ? "Admin" : isTeacher ? "Teacher" : "User"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleMenuClick(event, params.row)}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleAssignTeacherOpen}>Make it a Teacher</MenuItem>
            <MenuItem onClick={handleAssignWalletOpen}>Assign wallet</MenuItem> 
            <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box m="15px">
      <Header title="Users" subtitle="Managing the Users Members" />
      <AssignWalletModal selectedUser={selectedUser} open={openAssignToWallet} handleClose={handleAssignWalletClose} /> 
      <AssignTeacherModal selectedUser={selectedUser} open={openAssignTeacher } handleClose={handleAssignTeacherClose} />
      
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px" sx={{ width: '20%' }}>
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" value={searchValue} onChange={handleSearch} />
        <IconButton type="button">
          <SearchIcon />
        </IconButton>
      </Box>

      <Box
        m="10px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
        }}
      >

        <DataGrid
          checkboxSelection
          rows={data || []}
          columns={columns}
          pageSize={10}
          rowCount={totalRecords}
          getRowId={(row) => row._id}
          paginationMode="server"
          loading={loading}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => {
            handlePaginations(model);
          }}
        />

      </Box>
    </Box>
  );
};

export default Users;
