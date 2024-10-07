import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, InputBase, InputLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { addNewDepartment } from "../../redux/universityslice";

import SnackbarMsg, { Severity, AnchorOrigin } from '../SnackbarMsg';
import SelectComponent from "../../components/Select";
import { getCollageForEachUniversity, getDepartmentForEachCollage } from "../../redux/universityslice";

export default function AddNewDepartment({ universityOptions, open, handleClose }) {

    const dispatch = useDispatch();
    const [slectedUniversity, setSelectedUniversity] = useState(null)
    const [collageId, setCollageId] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [name, setName] = useState(null);
    const [nameInArabic, setNameInArabic] = useState(null);
    const [universityId, setUniversityId] = useState(null);

    const {  collageListData, AddDepartmentError, AddDepartmentSuccessfully } = useSelector((state) => state.university);

    const handleUniversityChange = (event) => {
        const selectedUniId = event.target.value;
        setSelectedUniversity(selectedUniId);
        dispatch(getCollageForEachUniversity({ "universityId": selectedUniId }));

        setUniversityId(selectedUniId);
    };


    const handleCollageChange = (event) => {
        const selectedUniId = event.target.value;
        setCollageId(selectedUniId);
    };



    const collageOptions = (collageListData || []).map((collage) => ({
        value: collage?._id,
        label: collage?.name,
    }));



    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || !nameInArabic || !universityId || !collageId) {
            console.log("name", name)
            console.log("nameInArabic", nameInArabic)
            console.log("universityId", universityId)

            setErrorMsg('All Fields Are  Requierd !');
            return
        } else {

            dispatch(addNewDepartment({ name ,nameInArabic, collageId}))
            setName(null)
            setUniversityId(null)
            setNameInArabic(null)
            setErrorMsg(null);
            setCollageId(null);
            handleClose();
        }

    };



    return (
        <div>


            {AddDepartmentError && <SnackbarMsg text={"Failed"} severity={Severity.ERROR} anchorOrigin={AnchorOrigin.BOTTOM_LEFT} />}
            {AddDepartmentSuccessfully && <SnackbarMsg text={"Create Department Successfully"} severity={Severity.SUCCESS} anchorOrigin={AnchorOrigin.BOTTOM_LEFT} />}

            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
            >


                <ModalContent sx={{ width: 500 }}>

                    <Typography variant="h6" sx={{ mb: 1, color: '#fff' }}>
                        Add New Material
                    </Typography>
                    <form onSubmit={handleSubmit}>

                        <Box mt={1} mb={1}>

                            <InputLabel id={`select-label`} sx={{ color: "#fff" }}>
                                University Name
                            </InputLabel>
                            <SelectComponent
                                label="Select a University"
                                width="100%"
                                value={universityId}
                                onChange={handleUniversityChange}
                                options={universityOptions}
                            />
                            <SelectComponent
                                label="Select a Collage"
                                width="100%"
                                value={collageId}
                                onChange={handleCollageChange}
                                options={collageOptions}
                            />
                            <Box mt={1} mb={1}>
                                <InputLabel id={`select-label`} sx={{ color: "#fff" }}>
                                    Department Name
                                </InputLabel>

                                <InputBase
                                    id="outlined-basic"
                                    label="Collage Name"
                                    value={name || ''}
                                    onChange={(event) => setName(event.target.value)}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                        </Box>

                        <Box mt={1} mb={1}>
                            <InputLabel id={`select-label`} sx={{ color: "#fff" }}>
                            Department Name in Arabic
                            </InputLabel>
                            <InputBase
                                id="outlined-basic"
                                label="Name in Arabic"
                                value={nameInArabic || ''}
                                onChange={(event) => setNameInArabic(event.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Box>

                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#0093e6' }}>
                            Submit
                        </Button>


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

AddNewDepartment.propTypes = {
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
