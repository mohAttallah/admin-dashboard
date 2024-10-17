import { Box, IconButton, Button } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddNewCategory from "../../components/i-course/category/AddNewCategory"
import EditCategory from "../../components/i-course/category/EditCategory";
import DeleteCategory from "../../components/i-course/category/DeleteCategory";
import { categoryList } from "../../redux/icourseslice";

const IcourseCategory = () => {

    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [anchorEl, setAnchorEl] = useState(null);
    const { loading,  categories, addNewCategorySuccessfully, editCategorySuccessfully, deleteCategorySuccessfully } = useSelector((state) => state.icourse);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [openNewCategory, setOpenNewCategory] = useState(false);
    const [openEditCategory, setOpenEditCategory] = useState(false);
    const [openDeleteCatagory, setOpenDeleteCategory] = useState(false);


    useEffect(() => {
        document.title = "I Course - Category | Admin Panel";
        dispatch(categoryList())
    }, [])


    useEffect(() => {

        if (addNewCategorySuccessfully === true || editCategorySuccessfully === true || deleteCategorySuccessfully === true) {
            dispatch(categoryList())
        }

    }, [addNewCategorySuccessfully,  editCategorySuccessfully,  deleteCategorySuccessfully])

    const handleMenuClick = (event, category) => {
        setSelectedCategory(null);
        setAnchorEl(event.currentTarget);
        console.log("category  slected ", category)
        setSelectedCategory(category);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleCloseModalNewCategory = () => {
        setOpenNewCategory(false);
    }

    const handleOpenModalNewCategory = () => {
        setOpenNewCategory(true);
    }

    const handleOpenModalEditCategory = () => {
        setOpenEditCategory(true);
        handleMenuClose()
    }

    const handleCloseModalEditCategory = () => {
        setOpenEditCategory(false);
    }



    const handleCloseModalDeleteCatagory = () => {
        setOpenDeleteCategory(false);

    }

    const handleOpenModalDeleteCategory = () => {
        setOpenDeleteCategory(true);
        handleMenuClose()
    }


    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "title",
            headerName: "Title",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "titleInArabic",
            headerName: "Title In Arabic",
            type: "string",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "icon",
            headerName: "Icon",
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
                        <MenuItem onClick={() => { handleOpenModalEditCategory() }} >Edit</MenuItem>
                        <MenuItem onClick={() => handleOpenModalDeleteCategory()} >Delete</MenuItem>
                    </Menu>
                </>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header
                title="I-Course - Category"
                subtitle="Managing the Category of I-Course"
            />
            {/* Modal */}

            <AddNewCategory open={openNewCategory} handleClose={handleCloseModalNewCategory} />
            <EditCategory selectedCategory={selectedCategory} open={openEditCategory} handleClose={handleCloseModalEditCategory}/>
            <DeleteCategory selectedCategory={selectedCategory} open={openDeleteCatagory} handleClose={handleCloseModalDeleteCatagory}/>

            {/* open, handleClose, universityId */}

            <Box display="flex" flexDirection="row" gap={2} sx={{ width: '100%' }}>
                <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">

                </Box>

                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#0093e6', color: '#fff' }}
                    onClick={() => handleOpenModalNewCategory()}
                >
                    Add New Category
                </Button>

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
                    rows={categories || []}
                    getRowId={(row) => row._id}
                />
            </Box>
        </Box>
    );
};

export default IcourseCategory;