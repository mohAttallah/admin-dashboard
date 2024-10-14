import { Box, IconButton, Button } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { universityListPginations, getNextUniversityData } from "../../redux/universityslice"
import { useState, useEffect } from "react"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import AddNewUnivesity from "../../components/university/AddNewUniversity"
import EditUniversity from "../../components/university/EditUniversity";
import DeleteUniversity from "../../components/university/DeleteUniversity";
import { coursesList, categoryList } from "../../redux/icourseslice";
import SelectComponent from "../../components/Select"

const IcourseCourses = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });

  const [anchorEl, setAnchorEl] = useState(null);
  const { loading, categories, totalRecords, courses } = useSelector((state) => state.icourse);

  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [openNewUnivesity, setOpenNewUnivesity] = useState(false);
  const [openEditUnivesity, setOpenEditUnivesity] = useState(false);
  const [openDeleteUnivesity, setOpenDeleteUnivesity] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    document.title = "I Course | Admin Panel";

    dispatch(categoryList());

    console.log("courses", courses)
    setPaginationModel({
      pageSize: courses?.length || 10,
      page: 0,
    });

  }, [])



  const handleCategoryChange = (event) => {
    const selectedUniId = event.target.value;
    setSelectedCategory(selectedUniId);
    console.log("selectedUniId", selectedUniId)
    dispatch(coursesList({selectedCategory}));
  };

  const categoriesOptions = (categories || []).map((category) => ({
    value: category?._id,
    label: category?.title,
}));




  // useEffect(() => {
  //   if (addNewUniversitySuccessfully === true || editUniversitySuccessfully===true || deleteUniversitySuccessfully===true) {
  //     dispatch(universityListPginations())
  //     setPaginationModel({
  //       pageSize: universityPginationsData.length|| 10, 
  //       page: 0,
  //     });
  //     window.location.reload();

  //   }

  // }, [addNewUniversitySuccessfully,  editUniversitySuccessfully, deleteUniversitySuccessfully])

  const handleMenuClick = (event, university) => {
    setSelectedUniversity(null);
    setAnchorEl(event.currentTarget);
    setSelectedUniversity(university);
  };

  const handlePaginations = (model) => {
    setSearchValue(null);
    const offset = model.page * model.pageSize;
    dispatch(getNextUniversityData({ limit: model.pageSize, offset }));
    setPaginationModel(model);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };



  const handleCloseModalNewUnivesity = () => {
    setOpenNewUnivesity(false);
  }

  const handleOpenModalNewUnivesity = () => {
    setOpenNewUnivesity(true);
  }

  const handleOpenModalEditUnivesity = () => {
    setOpenEditUnivesity(true);
    handleMenuClose()
  }

  const handleCloseModalEditUnivesity = () => {
    setOpenEditUnivesity(false);
  }



  const handleCloseModalDeleteUnivesity = () => {
    setOpenDeleteUnivesity(false);

  }

  const handleOpenModalDeleteUnivesity = () => {
    setOpenDeleteUnivesity(true);
    handleMenuClose()
  }

  const handleSearch = () => {

  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "type",
      headerName: "Type",
      type: "string",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "status",
      headerName: "status",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "coverUrl",
      headerName: "cover",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Photo"
          style={{ width: '20%', height: 'auto', objectFit: 'cover' }}
        />
      ),
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
            <MenuItem onClick={() => { handleOpenModalEditUnivesity() }} >Edit</MenuItem>
            <MenuItem onClick={() => handleOpenModalDeleteUnivesity()} >Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="I-Course - Courses"
        subtitle="Managing the Courses"
      />
      {/* Modal */}
      <AddNewUnivesity open={openNewUnivesity} handleClose={handleCloseModalNewUnivesity} />
      <EditUniversity selectedUniversity={selectedUniversity} open={openEditUnivesity} handleClose={handleCloseModalEditUnivesity} />
      <DeleteUniversity selectedUniversity={selectedUniversity} open={openDeleteUnivesity} handleClose={handleCloseModalDeleteUnivesity} />
      {/* open, handleClose, universityId */}

      <Box display="flex" flexDirection="row" gap={2} sx={{ width: '100%' }}>


        <Button
          variant="contained"
          sx={{ backgroundColor: '#0093e6', color: '#fff' }}
          onClick={() => handleOpenModalNewUnivesity()}
        >
          Add New Course
        </Button>

        <SelectComponent
                    label="Select a Category"
                    width="25%"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    options={categoriesOptions}
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >

        <DataGrid
          checkboxSelection
          rows={courses || []}
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

export default IcourseCourses;