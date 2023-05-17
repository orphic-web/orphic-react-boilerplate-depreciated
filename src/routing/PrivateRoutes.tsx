import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '@/FirebaseConfig';

const PrivateRoutes: React.FC = () => (
    auth.currentUser ? <Outlet /> : <Navigate to='/login' />
);

export default PrivateRoutes;
