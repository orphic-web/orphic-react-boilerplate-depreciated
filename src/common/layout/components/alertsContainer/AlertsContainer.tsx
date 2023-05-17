import { Container } from '@mui/material';
import { useAppSelector } from '@/store/Hooks';
import AppAlert from '@/common/layout/components/alertsContainer/components/AppAlert';

const AlertsContainer: React.FC = () => {
    const alertQueue = useAppSelector((state) => state.alerts.queue) as any[];

    return <Container
        sx={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '10px',
        }}
    >
        {
            alertQueue?.map((alert, key) => <div
                key={key}
                style={{
                    minWidth: '325px',
                }}
            >
                <AppAlert alert={alert} />
            </div>)
        }
    </Container>;
};

export default AlertsContainer;