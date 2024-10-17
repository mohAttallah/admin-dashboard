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
import { getCollageForEachUniversity, getDepartmentForEachCollage, getMaterialsForEachDepartment } from "../../redux/universityslice";
import AddNewMaterials from "../../components/materials/AddNewMaterials";
import EditMaterials from "../../components/materials/EditMaterials";
import DeleteMaterials from "../../components/materials/DeleteNewMaterials";

const Materials = () => {


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const { universityListData, collageListDataErorr, loading, addMaterialSuccessfully, collageListData, dapartmentList, dapartmentListError, materilsList, editMaterialSuccessfully, deleteMaterialSuccessfully
    } = useSelector((state) => state.university);
    const [selectedUniversity, setSelectedUniversity] = useState(null)

    const [selectedMaterial, setSelectedMaterial] = useState(null)
    const [selectedCollage, setSelectedCollage] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [openNewMaterials, setOpenNewMaterials] = useState(false);
    const [openEditMaterial, setOpenEditMaterial] = useState(false);
    const [openDeleteMaterial, setOpenDeleteMaterial] = useState(false);

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


    const handleDepartmentChange = (event) => {
        const selectedUniId = event.target.value;
        setSelectedDepartment(selectedUniId);
        dispatch(getMaterialsForEachDepartment({ "departmentId": selectedUniId }));
    };

    useEffect(() => {

        if ((editMaterialSuccessfully === true || deleteMaterialSuccessfully===true ||  addMaterialSuccessfully===true )&& selectedDepartment) {
            dispatch(getMaterialsForEachDepartment({ "departmentId": selectedDepartment }));
        }

    }, [editMaterialSuccessfully,  deleteMaterialSuccessfully,  addMaterialSuccessfully])



    const handleMenuClick = (event, material) => {
        setSelectedMaterial(null);
        setAnchorEl(event.currentTarget);
        setSelectedMaterial(material);
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

    const dapartmentListOptions = (dapartmentList || []).map((depertment) => ({
        value: depertment?._id,
        label: depertment?.name,
    }));


    useEffect(() => {
        dispatch(universityList());
    }, []);


    const handleCloseModalNewMaterials = () => {
        setOpenNewMaterials(false);
    }


    const handleOpenModalNewMaterialse = () => {
        setOpenNewMaterials(true);
    }


    const handleCloseModalEditMaterials = () => {
        setOpenEditMaterial(false);
    }

    const handleOpenModalEditMaterials = () => {
        setOpenEditMaterial(true);
        handleMenuClose();
    }

    const handleCloseModalDeleteMaterials = () => {
        setOpenDeleteMaterial(false);
    }

    const handleOpenModalDeleteMaterials = () => {
        setOpenDeleteMaterial(true);
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
            field: "groupsId",
            headerName: "Number of Groups",
            flex: 1,
            valueGetter: (params) => {
                return params?.length || 0;
            },
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
                        <MenuItem onClick={() => handleOpenModalEditMaterials()}       >Edit</MenuItem>
                        <MenuItem onClick={() => handleOpenModalDeleteMaterials()} >Delete</MenuItem>
                    </Menu>
                </>
            ),
        },
    ];



    return (
        <Box m="20px">
            <Header title="Materials" subtitle="Manage  Materials For Each  Collage" />
            <Box display="flex" flexDirection="row" gap={2} sx={{ width: '100%' }} >

                <AddNewMaterials universityOptions={universityOptions} open={openNewMaterials} handleClose={handleCloseModalNewMaterials} />
                <EditMaterials selectedMaterials={selectedMaterial} universityOptions={universityOptions} open={openEditMaterial} handleClose={handleCloseModalEditMaterials} />
                <DeleteMaterials selectedMaterial={selectedMaterial} open={openDeleteMaterial} handleClose={handleCloseModalDeleteMaterials} />

                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#0093e6', color: '#fff' }}
                    onClick={() => { handleOpenModalNewMaterialse() }}
                >
                    Add New Materials
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

                <SelectComponent
                    label="Select a Department"
                    width="25%"
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    options={dapartmentListOptions}
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
                    rows={materilsList || []}
                    getRowId={(row) => row._id}
                />

            </Box>
        </Box>
    );
};

export default Materials;
