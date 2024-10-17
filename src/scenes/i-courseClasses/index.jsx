import { Box, IconButton, Button } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';

import { useState, useEffect } from "react"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import AddNewUnivesity from "../../components/university/AddNewUniversity"
import EditUniversity from "../../components/university/EditUniversity";
import DeleteUniversity from "../../components/university/DeleteUniversity";
import { coursesList, categoryList, chaptersList,  classesList } from "../../redux/icourseslice";
import SelectComponent from "../../components/Select"

const IcourseClasses = () => {

  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });

  const [anchorEl, setAnchorEl] = useState(null);
  const { loading, categories, totalRecords, courses, chapters,  classes } = useSelector((state) => state.icourse);
  
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [openNewUnivesity, setOpenNewUnivesity] = useState(false);
  const [openEditUnivesity, setOpenEditUnivesity] = useState(false);
  const [openDeleteUnivesity, setOpenDeleteUnivesity] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  useEffect(() => {
    document.title = "I Course - Chapters | Admin Panel";
    dispatch(categoryList());
    setPaginationModel({
      pageSize: courses?.length || 10,
      page: 0,
    });

  }, [])



  const handleCategoryChange = (event) => {
    const selectedUniId = event.target.value;
    setSelectedCategory(selectedUniId);
    dispatch(coursesList({ selectedCategory }));
  };

  const handleCourseChange = (event) => {
    const selectedCourseId = event.target.value;
    setSelectedCourse(selectedCourseId);
    dispatch(chaptersList({ selectedCourseId }));
  }


  const handleChaptersChange = (event) => {
    const selectedChapterId = event.target.value;
    setSelectedChapter(selectedChapterId);
    dispatch(classesList({ selectedChapterId }));
    console.log("classes",  classes)
  }

  const categoriesOptions = (categories || []).map((category) => ({
    value: category?._id,
    label: category?.title,
  }));


  const categoriesCourses = (courses || []).map((course) => ({
    value: course?._id,
    label: course?.title,
  }));


  const coursesOptions = (chapters || []).map((chapter) => ({
    value: chapter?._id,
    label: chapter?.title,
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


  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "files",
        headerName: "Download",
        flex: 1,
        renderCell: (params) => (
            <div>
                {params.row.files.map((file) => (
                    <a key={file._id} href={file.url} download={file.title} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                        <Button variant="contained" color="primary">
                            {file.title}
                        </Button>
                    </a>
                ))}
            </div>
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
        title="I-Course - Classes"
        subtitle="Managing the Classes of I-Course"
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

        <SelectComponent
          label="Select a Course"
          width="25%"
          value={selectedCourse}
          onChange={handleCourseChange}
          options={categoriesCourses}
        />

        <SelectComponent
          label="Select a Chapters"
          width="25%"
          value={selectedChapter}
          onChange={handleChaptersChange}
          options={coursesOptions}
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
          loading={loading}
          checkboxSelection
          columns={columns}
          rows={classes || []}
          getRowId={(row) => row._id}
        />




      </Box>
    </Box>
  );
};

export default IcourseClasses;