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
import { getCollageForEachUniversity, getDepartmentForEachCollage, getMaterialsForEachDepartment, getGroupsList } from "../../redux/universityslice";
import AddNewMaterials from "../../components/materials/AddNewMaterials";
import EditGroup from "../../components/groups/EditGroup";
import DeleteMaterials from "../../components/materials/DeleteNewMaterials";
import AddNewGroup from "../../components/groups/AddNewGroup";
const Groups = () => {


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const { universityListData, materilsList, collageListData, dapartmentList, dapartmentListError,
        groupsListData,
        groupsPginationsData,
        groupsPginationsErorr,
        groupsLoading,
        groupsTotalRecords,
        createGroupSuccessfully,
        editGroupSuccessfully

    } = useSelector((state) => state.university);
    const [selectedUniversity, setSelectedUniversity] = useState(null)

    const [selectedGroup, setSelectedGroup] = useState(null)
    const [selectedCollage, setSelectedCollage] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const [openNewGroup, setOpenNewGroup] = useState(false);
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

    const handleMaterialChange = (event) => {
        const selectedUniId = event.target.value;
        setSelectedMaterial(selectedUniId);
        dispatch(getGroupsList({ "materialId": selectedMaterial }));
    }


    useEffect(() => {

        if (selectedMaterial) {
            dispatch(getGroupsList({ "materialId": selectedMaterial }));
        }
        
    }, [createGroupSuccessfully, editGroupSuccessfully])



    // useEffect(() => {

    //     if ((editMaterialSuccessfully === true || deleteMaterialSuccessfully===true ||  addMaterialSuccessfully===true )&& selectedDepartment) {
    //         dispatch(getMaterialsForEachDepartment({ "departmentId": selectedDepartment }));
    //     }

    // }, [editMaterialSuccessfully,  deleteMaterialSuccessfully,  addMaterialSuccessfully])



    const handleMenuClick = (event, group) => {
        setSelectedGroup(null);
        setAnchorEl(event.currentTarget);
        setSelectedGroup(group);
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

    const materialListOptions = (materilsList || []).map((material) => ({
        value: material?._id,
        label: material?.name,
    }));

    useEffect(() => {
        dispatch(universityList());
    }, []);


    const handleCloseModalGroup = () => {
        setOpenNewGroup(false);
    }


    const handleOpenModalGroup = () => {
        setOpenNewGroup(true);
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
            field: "chaptersId",
            headerName: "Chapter Count",
            flex: 1,
            valueGetter: (params) => {
                return params?.length || 0;
            },
        },
        {
            field: "usersId",
            headerName: "Member Count",
            flex: 1,
            valueGetter: (params) => {
                return params?.length || 0;
            },
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "teacherId",
            headerName: "Teacher",
            flex: 1,
            valueGetter: (params) => {
                return params?.teacherName || "N/A";
            },
        },
        {
            field: "tutorialType",
            headerName: "Tutorial Type",
            flex: 1,
            cellClassName: "name-column--cell",

        },
        {
            field: "tutorialType",
            headerName: "Tutorial Type",
            flex: 1,
            cellClassName: "name-column--cell",

        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            cellClassName: "name-column--cell",

        },
        {
            field: "coverUrl",
            headerName: "Cover",
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
            <Header title="Groups" subtitle="Manage Groups For Each Material" />
            <Box display="flex" flexDirection="row" gap={2} sx={{ width: '100%' }} >
                <AddNewGroup universityOptions={universityOptions} open={openNewGroup} handleClose={handleCloseModalGroup} />
                <EditGroup selectedGroup={selectedGroup} open={openEditMaterial} handleClose={handleCloseModalEditMaterials} />
                {/* <DeleteMaterials selectedMaterial={selectedGroup} open={openDeleteMaterial} handleClose={handleCloseModalDeleteMaterials} /> */}

                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#0093e6', color: '#fff' }}
                    onClick={() => { handleOpenModalGroup() }}
                >
                    Add New Group
                </Button>
                <SelectComponent
                    label="Select  University"
                    width="25%"
                    value={selectedUniversity}
                    onChange={handleUniversityChange}
                    options={universityOptions}
                />
                <SelectComponent
                    label="Select  Collage"
                    width="25%"
                    value={selectedCollage}
                    onChange={handleCollageChange}
                    options={collageOptions}
                />

                <SelectComponent
                    label="Select Department"
                    width="25%"
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    options={dapartmentListOptions}
                />

                <SelectComponent
                    label="Select Material"
                    width="25%"
                    value={selectedMaterial}
                    onChange={handleMaterialChange}
                    options={materialListOptions}
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
                    loading={groupsLoading}
                    checkboxSelection
                    columns={columns}
                    rows={groupsListData || []}
                    getRowId={(row) => row._id}
                />

            </Box>
        </Box>
    );
};

export default Groups;