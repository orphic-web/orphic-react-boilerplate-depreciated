import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

interface ContainerProps {
    show: boolean,
}

const Spinner: React.FC<ContainerProps> = ({
    show,
}) => {
    const [open, setOpen] = useState(false);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        const timer1 = setTimeout(() => {
            setOpen(show);
        }, 500);

        return () => {
            clearTimeout(timer1);
        };
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