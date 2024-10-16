import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, InputBase, InputLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { addNewGroup } from "../../redux/universityslice";
import SnackbarMsg, { Severity, AnchorOrigin } from '../SnackbarMsg';
import SelectComponent from "../../components/Select";
import { getCollageForEachUniversity, getDepartmentForEachCollage, getMaterialsForEachDepartment } from "../../redux/universityslice";

export default function AddNewGroup({ universityOptions, open, handleClose }) {

    const dispatch = useDispatch();
    const [slectedUniversity, setSelectedUniversity] = useState(null)
    const [collageId, setCollageId] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [universityId, setUniversityId] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [pricePerHour, setPricePerHour] = useState(null);
    const [language, setLanguage] = useState(null)
    const [status, setStatus] = useState(null);
    const [type, setType] = useState(null);
    const [icon, setIcon] = useState(null);
    const [photoError, setPhotoError] = useState('');
    const [tutorialType,  setTutorialType] =  useState(null)
    const [imageUrl, setImageUrl] = useState(null);
    const { collageListData, dapartmentList,
        createGroupSuccessfully, createGroupError, materilsList,
         } = useSelector((state) => state.university);
    const [departmentId, setDepartmentId] = useState(null);

    const languageListOptions = [
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'Arabic' },
    ];

    const StatusListOptions = [
        { value: 'active', label: 'Active' },
        { value: 'notActive', label: 'Disable' },
    ];


    const groupTypeOptions = [
        { value: 'group', label: 'Group' },
        { value: 'individualized', label: 'Individualized' },
    ];


    const tutorialTypeOptions = [
        { value: 'liveTutorialCourses', label: 'Live Tutorial Courses' },
        { value: 'recordedTutorialCourses', label: 'Recorded Tutorial Courses' },
    ];



    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png'];
            if (!validImageTypes.includes(file.type)) {
                setIcon('Invalid file type. Please upload an image (jpeg, png).');
                return;
            }
            setIcon(file);
            setImageUrl(URL.createObjectURL(file))
            setPhotoError('');
        }
    };



    const handlePriceChange = (event) => {
        const value = event.target.value;
        if (value === '' || (!isNaN(value) && value.trim() !== '')) {
            setPricePerHour(value); 
            setErrorMsg('');
        } else {
            setErrorMsg('Please enter a valid number');
        }
    };

    const handleUniversityChange = (event) => {
        const selectedUniId = event.target.value;
        setSelectedUniversity(selectedUniId);
        dispatch(getCollageForEachUniversity({ "universityId": selectedUniId }));

        setUniversityId(selectedUniId);
    };


    const handleCollageChange = (event) => {
        const selectedUniId = event.target.value;
        setCollageId(selectedUniId);
        dispatch(getDepartmentForEachCollage({ "collageId": selectedUniId }));

    };

    const handleDepartmentChange = (event) => {
        const selectedUniId = event.target.value;
        setSelectedDepartment(selectedUniId);
        setDepartmentId(selectedUniId);
        dispatch(getMaterialsForEachDepartment({ "departmentId": selectedUniId }));

    };


    const materialListOptions = (materilsList || []).map((material) => ({
        value: material?._id,
        label: material?.name,
    }));


    const handleMaterialChange = (event) => {
        const selectedUniId = event.target.value;
        setSelectedMaterial(selectedUniId);
        console.log("selectedMaterial",  selectedMaterial)
    }





    const collageOptions = (collageListData || []).map((collage) => ({
        value: collage?._id,
        label: collage?.name,
    }));

    const dapartmentListOptions = (dapartmentList || []).map((depertment) => ({
        value: depertment?._id,
        label: depertment?.name,
    }));


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !icon || !description || !selectedMaterial || !pricePerHour || !language || !tutorialType  || !status || !type) {
            setErrorMsg('All Fields Are  Requierd !');
            return
        } else {
            dispatch(addNewGroup({ name, selectedMaterial, description, language, icon, status, type, pricePerHour,  tutorialType }));

            setName(null);
            setDescription(null);
            setIcon(null);
            setLanguage(null);
            setStatus(null);
            setType(null);
            setPricePerHour(null);
            setSelectedMaterial(null);
            setImageUrl(null);
            setTutorialType(null);
            setPhotoError('');
            setErrorMsg('');

            handleClose();

        }

    };



    return (
        <div>


            {createGroupError && <SnackbarMsg text={"Failed"} severity={Severity.ERROR} anchorOrigin={AnchorOrigin.BOTTOM_LEFT} />}
            {createGroupSuccessfully && <SnackbarMsg text={"Create Group Successfully"} severity={Severity.SUCCESS} anchorOrigin={AnchorOrigin.BOTTOM_LEFT} />}

            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
            >


                <ModalContent sx={{ width: 500 }}>

                    <Typography variant="h6" sx={{ mb: 1, color: '#fff' }}>
                        Add New Group
                    </Typography>
                    <form onSubmit={handleSubmit}>

                        <Box mt={1} mb={1}>


                            <Box mt={1} mb={1}>

                                <SelectComponent
                                    label="Select a University"
                                    width="100%"
                                    value={universityId}
                                    onChange={handleUniversityChange}
                                    options={universityOptions}
                                />

                            </Box>

                            <Box mt={2} mb={2}>

                                <SelectComponent
                                    label="Select a Collage"
                                    width="100%"
                                    value={collageId}
                                    onChange={handleCollageChange}
                                    options={collageOptions}
                                />

                            </Box>
                            <Box mt={2} mb={2}>
                                <SelectComponent
                                    label="Select a Department"
                                    width="100%"
                                    value={selectedDepartment}
                                    onChange={handleDepartmentChange}
                                    options={dapartmentListOptions}
                                />
                            </Box>
                            <Box mt={2} mb={2}>
                                <SelectComponent
                                    label="Select Material"
                                    width="100%"
                                    value={selectedMaterial}
                                    onChange={handleMaterialChange}
                                    options={materialListOptions}
                                />
                            </Box>


                            <Box mt={1} mb={1}>
                                <InputLabel id={`select-label`} sx={{ color: "#fff" }}>
                                    Group Name
                                </InputLabel>
                                <InputBase
                                    id="outlined-basic"
                                    label="Group Name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>

                            <Box mt={1} mb={1}>
                                <InputLabel id={`select-label`} sx={{ color: "#fff" }}>
                                    Description
                                </InputLabel>
                                <InputBase
                                    id="outlined-basic"
                                    label="Description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>


                            <Box mt={2} mb={2}>
                                <SelectComponent
                                    label="Select a language of Group"
                                    width="100%"
                                    value={language}
                                    onChange={(event) => setLanguage(event.target.value)}
                                    options={languageListOptions}
                                />
                            </Box>


                            <Box mt={2} mb={2}>
                                <SelectComponent
                                    label="Group Status"
                                    width="100%"
                                    value={status}
                                    onChange={(event) => setStatus(event.target.value)}
                                    options={StatusListOptions}
                                />
                            </Box>



                            <Box mt={2} mb={2}>
                                <SelectComponent
                                    label="Type of Group"
                                    width="100%"
                                    value={type}
                                    onChange={(event) => setType(event.target.value)}
                                    options={groupTypeOptions}
                                />
                            </Box>


                            <Box mt={2} mb={2}>
                                <SelectComponent
                                    label="Tutorial Type"
                                    width="100%"
                                    value={tutorialType}
                                    onChange={(event) => setTutorialType(event.target.value)}
                                    options={tutorialTypeOptions}
                                />
                            </Box>


                            <Box mt={1} mb={1}>
                                <InputLabel id={`select-label`} sx={{ color: "#fff" }}>
                                    Price Per Hour
                                </InputLabel>
                                <InputBase
                                    id="outlined-basic"
                                    label="Price Per Hour"
                                    value={pricePerHour}
                                    onChange={(event) => handlePriceChange(event)}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                        </Box>

                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Image
                            <VisuallyHiddenInput
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                        </Button>

                        <Box mt={1} mb={1} display="flex" justifyContent="center">
                            {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ marginTop: '20px', maxWidth: '35%', height: '40%' }} />}
                        </Box>

                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#0093e6' }}>
                            Submit
                        </Button>

                        {photoError && <p style={{ color: 'red' }}>{photoError}</p>}

                        <Box mt={1} mb={1}>
                            {errorMsg && (
                                <InputLabel id={`select-label`} sx={{ color: "red" }}>
                                    {errorMsg}
                                </InputLabel>
                            )}
                        </Box>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    );
}

AddNewGroup.propTypes = {
    selectedUser: PropTypes.object,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#191E23',
};

const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'base-Backdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
    ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
    max-height: 80vh; /* Set max height */
    overflow-y: auto; /* Enable vertical scrolling */
    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }
    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
    & input {
      padding: 8px;
      width: 100%;
      margin-bottom: 8px;
      border: 1px solid ${grey[300]};
      border-radius: 4px;
    }
    & button {
      padding: 8px 16px;
      background-color: ${blue[500]};
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    & button:hover {
      background-color: ${blue[700]};
    }
  `,
);
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
