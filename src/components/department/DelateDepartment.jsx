import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Button, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDepartment } from '../../redux/universityslice';
import SnackbarMsg, { Severity, AnchorOrigin } from '../SnackbarMsg';
import { useEffect, useState } from 'react';

export default function DeleteCollageModal({ selectedDepartment, open, handleClose }) {
    const dispatch = useDispatch();
    const {deleteDepartmentSuccessfully, deleteDepartmentError } = useSelector((state) => state.university);

    const [departmentId, setDepartmentId] = useState(null)

    useEffect(() => {
        setDepartmentId(selectedDepartment?._id)

    }, [selectedDepartment])

    const handleDelete = () => {

        dispatch(deleteDepartment({ departmentId }));
        handleClose();
    };

    return (
        <div>
            {deleteDepartmentError && <SnackbarMsg text={"Failed"} severity={Severity.ERROR} anchorOrigin={AnchorOrigin.BOTTOM_LEFT} />}
            {deleteDepartmentSuccessfully && <SnackbarMsg text={"Delete Department Successfully"} severity={Severity.SUCCESS} anchorOrigin={AnchorOrigin.BOTTOM_LEFT} />}

            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
            >

                <ModalContent sx={{ width: 400 }}>

                    <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>
                        Are you sure you want to delete the Department {selectedDepartment?.name}?
                    </Typography>

                    <Box display="flex" justifyContent="space-between">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>

                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#0093e6' }}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </Box>
                </ModalContent>
            </Modal>
        </div>
    );
}

DeleteCollageModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    universityId: PropTypes.string.isRequired,
};

const grey = {
    50: '#F3F6F9',
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
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
  `
);