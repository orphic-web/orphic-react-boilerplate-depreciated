import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Layout from '@/common/layout/Layout';
import Spinner from '@/common/spinner/Spinner';
import { useAppDispatch } from '@/store/Hooks';
import AlertUtils from '@/utils/AlertUtils';

const Dashboard: React.FC = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();


    useEffect(() => {
        const fromParam = searchParams.get('from');
        switch (fromParam) {
            case 'accountCreated':
                AlertUtils.createSuccessAlert("Your account has been successfully created!", dispatch);
                break;
            default:
                break;
        }
    }, []);

    const throwError = () => {
        try {
            throw Error('Test your Sentry connection');
        } catch (e: any) {
            AlertUtils.createErrorAlert("Dummy error throw for testing purposes.", dispatch);
            console.error(e);
        }
    };

    return (
        <Layout title="Dashboard">
            <Button onClick={() => throwError()}>Test your Sentry connection</Button>
            <Spinner show={false} />
        </Layout>
    );
};

export default Dashboard;
