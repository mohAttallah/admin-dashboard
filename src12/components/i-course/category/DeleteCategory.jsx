import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Button, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {DeleteCategory  } from '../../../redux/icourseslice';
import SnackbarMsg, { Severity, AnchorOrigin } from '../../SnackbarMsg';
import { useEffect, useState } from 'react';

export default function DeleteCategoryModal({ selectedCategory, open, handleClose }) {
    const dispatch = useDispatch();
    const {deleteCategorySuccessfully, deleteCategoryError } = useSelector((state) => state.icourse);

    const [categoryId, setCategoryId] = useState(null)

    useEffect(() => {
        setCategoryId(selectedCategory?._id)

    }, [selectedCategory])

    const handleDelete = () => {
        console.log("categoryId1212", categoryId)
        dispatch(DeleteCategory({ categoryId }));
        handleClose();
    };

    return (
        <div>
            {deleteCategoryError && <SnackbarMsg text={"Failed"} severity={Severity.ERROR} anchorOrigin={AnchorOrigin.BOTTOM_LEFT} />}
            {deleteCategorySuccessfully && <SnackbarMsg text={"Delete Category Successfully"} severity={Severity.SUCCESS} anchorOrigin={AnchorOrigin.BOTTOM_LEFT} />}

            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
            >

                <ModalContent sx={{ width: 400 }}>

                    <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>
                        Are you sure you want to delete this Category {selectedCategory?.title}?
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

DeleteCategoryModal.propTypes = {
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