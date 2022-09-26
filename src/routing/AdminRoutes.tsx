import { useMemo, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Permissions from '../models/enums/Permissions';
import User from '../models/User';
import { useAppSelector } from '../store/Hooks';

const AdminRoutes: React.FC = () => {
  const user = useAppSelector((state) => state.user.user) as User;

  const [permissions, setPermissions] = useState(Permissions.USER);

  useMemo(() => {
    if (user) {
      setPermissions(user.permission);
    } else {
      setPermissions(Permissions.USER);
    }
  }, [user]);
  return (
    permissions === Permissions.ADMIN ? <Outlet/> : <Navigate to='/'/>
  );
};

export default AdminRoutes;
