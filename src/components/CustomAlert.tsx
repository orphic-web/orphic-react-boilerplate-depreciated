import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './CustomAlert.css';
import { useEffect, useState } from 'react';
import { removeAlert } from '../store/slices/AlertSlice';
import CustomAlertType from '../models/CustomAlert';
import { useAppDispatch } from '../store/Hooks';

interface ContainerProps {
  alert: CustomAlertType,
}
const CustomAlert: React.FC<ContainerProps> = ({
  alert,
}) => {
  const [show, setShow] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      if (alert.dismiss) setShow(false);
    } catch (e: any) {
      console.log(e);
    }
  }, [alert]);

  const toggleAlert = () => {
    try {
      setShow(!show);
      dispatch(removeAlert(alert.id));
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Collapse
      sx={{
        maxWidth: '800px',
      }}
      in={show}>
      <Alert
        severity={alert.severity}
        sx={{
          width: '100%',
          maxWidth: '800px',
        }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              toggleAlert();
            }}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
        {alert.message}
      </Alert>
    </Collapse>
  );
};

export default CustomAlert;
