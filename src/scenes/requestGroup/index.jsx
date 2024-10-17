import { Box, IconButton, Button } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { universityListPginations, requestGroup } from "../../redux/universityslice"
import { useState, useEffect } from "react"
import { formatDistanceToNow } from 'date-fns';


const RequestGroup = () => {

    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { loading, requestGroups } = useSelector((state) => state.university);

    useEffect(() => {
        document.title = "University | Admin Panel";
        dispatch(requestGroup())

        console.log("requestGroups", requestGroups)

    }, [])



    const columns = [
        {
            field: "_id",
            headerName: "ID",
        },
        {
            field: "createdAt",
            headerName: "Date",
            flex: 1,
            cellClassName: "date-column--cell",
            renderCell: (params) => {
                const createdAt = new Date(params.row.requestGroup.createdAt);
                const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });
                return (
                    <div>
                        <div>{formattedDate}</div>
                    </div>
                );
            }
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
            headerAlign: "left",
            align: "left",
            renderCell: (params) => {
                return params.row.requestGroup.description
            }
        },
        {
            field: "language",
            headerName: "Language",
            flex: 1,
            headerAlign: "left",
            align: "left",
            renderCell: (params) => {
                return params.row.requestGroup.language
            }
        },
        {
            field: "type",
            headerName: "Type (group / individual )",
            flex: 1,
            headerAlign: "left",
            align: "left",
            renderCell: (params) => {
                return params.row.requestGroup.type
            }
        },
        {
            field: "universityData.name",
            headerName: "University Name",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return params.row.universityData ? params.row.universityData.name : "N/A";
            }
        },
        {
            field: "University Name",
            headerName: "other University (that's  not exist in 4gpa)",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return params.row.requestGroup.otherUniversity ? params.row.requestGroup.otherUniversity : "N/A";
            }
        },
        {
            field: "Teacher in 4gpa",
            headerName: "Teacher in 4gpa",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return params?.row?.teacher?.teacherName ? params?.row?.teacher?.teacherName : "N/A";
            }
        },
        {
            field: "Attachment",
            headerName: "Attachment",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                console.log("params", params?.row.requestGroup.files);

                const openFilesInNewTab = (files) => {
                    files.forEach(file => {
                        const link = document.createElement('a');
                        link.href = file;
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    });
                };

                const files = params?.row?.requestGroup?.files || [];

                return (
                    <div>
                        {files.length > 0 && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => openFilesInNewTab(files)}
                            >
                                Open All
                            </Button>
                        )}
                    </div>
                );
            }
        },

        {
            field: "createdAt",
            headerName: "Date",
            flex: 1,
            cellClassName: "date-column--cell",
            renderCell: (params) => {
                const createdAt = new Date(params.row.requestGroup.createdAt);
                const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });
                return (
                    <div>
                        <div>{formattedDate}</div>
                    </div>
                );
            }
        },

    ];
    return (
        <Box m="20px">
            <Header
                title="Request Groups"
                subtitle="Review Requests from Student"
            />

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
                    rows={requestGroups || []}
                    getRowId={(row) => row.requestGroup._id}
                />

            </Box>
        </Box>
    );
};

export default RequestGroup;


