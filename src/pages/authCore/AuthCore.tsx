import {
  IonPage,
  IonRouterOutlet,
  useIonRouter,
} from '@ionic/react';
import { useEffect } from 'react';

import { Redirect, Route } from 'react-router';
import { useAppSelector } from '../../store/Hooks';
import NotFound from '../NotFound';
import Login from './Login';
import Register from './Register';

const AuthCore: React.FC = () => {
  const user = useAppSelector((state) => state.user.user) as any;
  const router = useIonRouter();

  useEffect(() => {
    if (user) {
      router.push('/home/dashboard');
    }
  }, [user]);

  return (
    <IonPage>
      <IonRouterOutlet>
        <Route exact path={'/auth'} render={() => <Redirect to="/auth/login" />} />
        <Route exact path={'/auth/login'} render={(props) => <Login {...props}/>} />
        <Route exact path={'/auth/register'} render={() => <Register />} />
        <Route component={NotFound} />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default AuthCore;
