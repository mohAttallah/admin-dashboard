import { Box, IconButton, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import SelectComponent from "../../components/Select"
import { useEffect, useState } from 'react';
import { universityList } from "../../redux/universityslice";
import { useSelector, useDispatch } from 'react-redux';
import { getCollageForEachUniversity } from "../../redux/universityslice";
import AddNewCollage from "../../components/collage/AddNewCollage";
import EditCollage from "../../components/collage/EditCollage";
import DeleteCollage from "../../components/collage/DeleteCollage";

const Collage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { universityListData, collageListDataErorr, loading, collageListData, editCollageSuccessfully, deleteCollageSuccessfully } = useSelector((state) => state.university);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCollage, setSelectedCollage] = useState(null);
  const [openNewCollage, setOpenNewCollage] = useState(false);
  const [openEditCollage, setOpenEditCollage] = useState(false);
  const [openDeleteCollage, setOpenDeleteCollage] = useState(false);


  const handleUniversityChange = (event) => {
    const selectedUniId = event.target.value;
    setSelectedUniversity(selectedUniId);
    dispatch(getCollageForEachUniversity({ "universityId": selectedUniId }));

  };
  
  useEffect(() => {
    if(editCollageSuccessfully || deleteCollageSuccessfully){
      dispatch(getCollageForEachUniversity({ "universityId": selectedUniversity }));
    }
  },[editCollageSuccessfully, deleteCollageSuccessfully])

  const handleMenuClick = (event, collage) => {
    setSelectedCollage(null);
    setAnchorEl(event.currentTarget);
    setSelectedCollage(collage);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const universityOptions = (universityListData || []).map((university) => ({
    value: university._id,
    label: university.name,
}));

  useEffect(() => {
    dispatch(universityList());
  }, []);

  
  const handleCloseModalNewCollage = () => {
    setOpenNewCollage(false);
  }

  
  const handleOpenModalNewCollage = () => {
    setOpenNewCollage(true);
    handleMenuClose();
  }

  const handleCloseModalEditCollage = () => {
    setOpenEditCollage(false);
  }

  const handleOpenModalEditCollage = () => {
    setOpenEditCollage(true);
    handleMenuClose();

  }


  const handleOpenModalDeleteCollage = () => {
    setOpenDeleteCollage(true);
    handleMenuClose();
  }

  const handleCloseModalDeleteCollage = () => {
    setOpenDeleteCollage(false);
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
      field: "nameInArabic",
      headerName: "Name In Arabic",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleMenuClick(event, params.row)}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={()=>{handleOpenModalEditCollage()}} >Edit</MenuItem>
            <MenuItem  onClick={()=>{handleOpenModalDeleteCollage()}}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];



  return (
    <Box m="20px">
      <Header title="Collage" subtitle="Collage List for Each Univeristy" />
      <Box display="flex" flexDirection="row" gap={2} sx={{ width: '100%' }} >

      <AddNewCollage universityOptions={universityOptions} open={openNewCollage}   handleClose={handleCloseModalNewCollage}/>
      <EditCollage open={openEditCollage} handleClose={handleCloseModalEditCollage} selectedCollage={selectedCollage} universityOptions={universityOptions} />
      <DeleteCollage open={openDeleteCollage} handleClose={handleCloseModalDeleteCollage} selectedCollage={selectedCollage}  />

        <Button
          variant="contained"
          sx={{ backgroundColor: '#0093e6', color: '#fff' }}
          onClick={()=>{handleOpenModalNewCollage()}}
        >
          Add New Collage
        </Button>
        <SelectComponent
          label="Select a University"
          width="40%"
          value={selectedUniversity}
          onChange={handleUniversityChange}
          options={universityOptions}
        />


      </Box>


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
          loading={loading}
          checkboxSelection
          columns={columns}
          rows={collageListData || []}
          getRowId={(row) => row._id}
        />

      </Box>
    </Box>
  );
};

export default Collage;
