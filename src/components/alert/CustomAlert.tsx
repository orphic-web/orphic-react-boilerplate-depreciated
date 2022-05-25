import { Collapse, Container, IconButton } from '@mui/material';
import Alert, { AlertColor } from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import './CustomAlert.css';
import { useEffect, useState } from 'react';

interface ContainerProps {
  severity: AlertColor,
  message: string,
  open: boolean,
  setOpen: any
  delay?: number,
}
const CustomAlert: React.FC<ContainerProps> = ({
  open, severity, message, setOpen, delay,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(open);
    if (open) {
      const timer = setTimeout(() => {
        setShow(false);
        setOpen(false);
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }
    setShow(false);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [open]);

  const toggleAlert = () => {
    try {
      setOpen(!open);
      setShow(!show);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Container
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      <Collapse in={show}>
        <Alert
          severity={severity}
          sx={{
            width: '100%',
            maxWidth: '800px',
          }}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                toggleAlert();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>

    </Container>
  );
};

CustomAlert.defaultProps = {
  severity: 'success',
  open: false,
  message: 'Something is wrong, try again later.',
  delay: 4000,
};

export default CustomAlert;
