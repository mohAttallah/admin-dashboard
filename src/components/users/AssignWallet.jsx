import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { assignToWallet } from '../../redux/userslice';
import SnackbarMsg, { Severity, AnchorOrigin } from '../SnackbarMsg';
import Button from '@mui/material/Button';

export default function AssignTeacher({ selectedUser, open, handleClose }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = React.useState('');
  const { walletLoading, walletError, walletSuccessfully } = useSelector((state) => state.users);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(assignToWallet({ userId: selectedUser?._id, amount }));
    handleClose();
  };

  return (
    <div>
      {walletError && <SnackbarMsg text={"Faild"} severity={Severity.ERROR} anchorOrigin={AnchorOrigin.BOTTOM_LEFT} />}
      {walletSuccessfully && <SnackbarMsg text={"Assign to Wallet Successfully"} severity={Severity.SUCCESS} anchorOrigin={AnchorOrigin.BOTTOM_LEFT} />}
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }}>
          <h2 id="unstyled-modal-title" className="modal-title">
            Assign Money to  {selectedUser?.name}
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              required
            />
            <Button type="submit" variant="contained"
              sx={{ backgroundColor: '#0093e6' }}
            >
              Submit
            </Button>

          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

AssignTeacher.propTypes = {
  selectedUser: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
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
  900: '#1C2025',
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
