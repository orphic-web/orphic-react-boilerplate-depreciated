import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { removeAlert } from '@/store/slices/AlertsSlice';
import CustomAlertType from '@/models/AppAlertType';
import { useAppDispatch } from '@/store/Hooks';

interface ContainerProps {
    alert: CustomAlertType,
}
const AppAlert: React.FC<ContainerProps> = ({
    alert,
}) => {
    const [show, setShow] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (alert.dismiss) setShow(false);
    }, [alert]);

    const toggleAlert = () => {
        setShow(!show);
        dispatch(removeAlert(alert.id));
    };

    return (
        <Collapse
            in={show}>
            <Alert
                severity={alert.severity}
                sx={{
                    width: '100%',
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

export default AppAlert;
