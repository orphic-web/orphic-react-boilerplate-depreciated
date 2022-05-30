import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './CustomAlert.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeAlert } from '../store/slices/AlertSlice';
import AlertSeverity from '../models/enums/AlertSeverity';

interface ContainerProps {
  severity: AlertSeverity,
  message: string,
  id?: string,
  alert: any,
}
const CustomAlert: React.FC<ContainerProps> = ({
  severity, message, alert,
}) => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

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
        severity={severity}
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
        {message}
      </Alert>
    </Collapse>
  );
};

export default CustomAlert;
