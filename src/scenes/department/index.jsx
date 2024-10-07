import { Box, IconButton, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { tokens } from "../../theme";
import Header from "../../components/Header";
import SelectComponent from "../../components/Select"
import { useEffect, useState } from 'react';
import { universityList } from "../../redux/universityslice";
import { useSelector, useDispatch } from 'react-redux';
import { getCollageForEachUniversity, getDepartmentForEachCollage } from "../../redux/universityslice";
import AddNewDepartment from "../../components/department/AddNewDepartment";
import  EditDepartment from  "../../components/department/EditDepartment";
import  DeleteDepartment from  "../../components/department/DelateDepartment";

const Department = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const { universityListData, collageListDataErorr, loading, collageListData, dapartmentList, dapartmentListError, AddDepartmentSuccessfully, editDepartmentSuccessfully,  deleteDepartmentSuccessfully
    } = useSelector((state) => state.university);
    const [selectedUniversity, setSelectedUniversity] = useState('')
    const [selectedCollage, setSelectedCollage] = useState(null);
    const [openNewDepartment, setOpenNewDepartment] = useState(false);
    const [openEditDepartment, setOpenEditDepartment] = useState(false);
    const [openDeleteDepartment, setOpenDeleteDepartment] = useState(false);
    const [selectedDepartment,  setSelectedDepertment] = useState(null);

    const handleUniversityChange = (event) => {
        const selectedUniId = event.target.value;
        setSelectedUniversity(selectedUniId);
        dispatch(getCollageForEachUniversity({ "universityId": selectedUniId }));
    };

    const handleCollageChange = (event) => {
        const selectedUniId = event.target.value;
        setSelectedCollage(selectedUniId);
        dispatch(getDepartmentForEachCollage({ "collageId": selectedUniId }));
    };


    useEffect(() => {
        console.log("selectedCollage", selectedCollage)
        if ((editDepartmentSuccessfully===true || deleteDepartmentSuccessfully===true ||  AddDepartmentSuccessfully===true) && selectedCollage)  {
            dispatch(getDepartmentForEachCollage({ "collageId": selectedCollage }));
        }

    }, [editDepartmentSuccessfully,  deleteDepartmentSuccessfully, AddDepartmentSuccessfully])


    const handleMenuClick = (event, department) => {
        setSelectedUniversity(null);
        setAnchorEl(event.currentTarget);
        setSelectedDepertment(department);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const universityOptions = (universityListData || []).map((university) => ({
        value: university?._id,
        label: university?.name,
    }));
    
    const collageOptions = (collageListData || []).map((collage) => ({
        value: collage?._id,
        label: collage?.name,
    }));

    useEffect(() => {
        dispatch(universityList());
    }, []);


    const handleCloseModalNewDpartment = () => {
        setOpenNewDepartment(false);
    }


    const handleOpenModalNewDepartment = () => {
        console.log("here new department")
        setOpenNewDepartment(true);

    }

    const handleCloseModalEditDpartment = () => {
        setOpenEditDepartment(false);
    }

    const handleOpenModalEditDepartment = () => {
        setOpenEditDepartment(true);
        handleMenuClose();

    }
    const handleCloseModalDelateDpartment =()=>{
        setOpenDeleteDepartment(false);
        handleMenuClose();
    }

    const handleOpenModalDelateDpartment =()=>{
        setOpenDeleteDepartment(true);
        handleMenuClose();
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
            field: "materialOfGroupsId",
            headerName: "Number of Materials",
            flex: 1,
            valueGetter: (params) => {
                console.log("materialOfGroupsId:", params);
                return params?.length || 0;
            },
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
                        <MenuItem onClick={()=>handleOpenModalEditDepartment()} >Edit</MenuItem>
                        <MenuItem onClick={()=>handleOpenModalDelateDpartment()} >Delete</MenuItem>
                    </Menu>
                </>
            ),
        },
    ];



    return (
        <Box m="20px">
            <Header title="Department" subtitle="Manage  Department For Each  Collage" />
            <Box display="flex" flexDirection="row" gap={2} sx={{ width: '100%' }} >

                <AddNewDepartment universityOptions={universityOptions} open={openNewDepartment} handleClose={handleCloseModalNewDpartment} />
                <EditDepartment selectedDepartment={selectedDepartment} open={openEditDepartment} handleClose={handleCloseModalEditDpartment} />
                <DeleteDepartment selectedDepartment={selectedDepartment} open={openDeleteDepartment} handleClose={handleCloseModalDelateDpartment} />
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#0093e6', color: '#fff' }}
                    onClick={() => handleOpenModalNewDepartment()}>
                    Add New Department
                </Button>
                <SelectComponent
                    label="Select a University"
                    width="25%"
                    value={selectedUniversity}
                    onChange={handleUniversityChange}
                    options={universityOptions}
                />
                <SelectComponent
                    label="Select a Collage"
                    width="25%"
                    value={selectedCollage}
                    onChange={handleCollageChange}
                    options={collageOptions}
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
                    rows={dapartmentList || []}
                    getRowId={(row) => row._id}
                />

            </Box>
        </Box>
    );
};

export default Department;
