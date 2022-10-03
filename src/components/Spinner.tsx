import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import SupportedLanguages from '../models/enums/SupportedLanguages';
import ErrorService from '../services/ErrorService';
import { useAppDispatch, useAppSelector } from '../store/Hooks';

interface ContainerProps {
  show: boolean,
}

const Spinner: React.FC<ContainerProps> = ({
  show,
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.user.language) as SupportedLanguages;

  const [open, setOpen] = useState(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      const timer1 = setTimeout(() => {
        setOpen(show);
      }, 500);

      return () => {
        clearTimeout(timer1);
      };
    } catch (e: any) {
      ErrorService.handleError(e, dispatch, language);
    }
  }, [show]);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Spinner;
