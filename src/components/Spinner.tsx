import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import ErrorService from '../services/ErrorService';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import './Spinner.css';

const Spinner: React.FC = () => {
  const language = useAppSelector((state) => state.user.language);
  const showSpinner = useAppSelector((state) => state.spinner.show);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      if (showSpinner !== open) {
        const timer1 = setTimeout(() => {
          setOpen(showSpinner);
        }, 500);

        return () => {
          clearTimeout(timer1);
        };
      }
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  }, [showSpinner]);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Spinner;
