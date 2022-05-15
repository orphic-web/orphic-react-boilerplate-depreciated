import {
  IonButton,
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter,
} from '@ionic/react';
import './Dashboard.css';
import { RouteComponentProps } from 'react-router';
import { useEffect, useState } from 'react';
import gameSessionService from '../services/GameSessionService';
import { toggleSpinnerState } from '../store/slices/SpinnerSlice';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import userService from '../services/UserService';

const Dashboard: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useAppDispatch();
  const [globalMsg, setGlobalMsg] = useState('');
  const router = useIonRouter();
  const user = useAppSelector((state) => state.user.user) as any;

  useEffect(() => {
    console.log('dashboard');
  }, [user]);

  const logout = async () => {
    try {
      dispatch(toggleSpinnerState(true));
      await userService.logout(dispatch);
      router.push('/login');
      dispatch(toggleSpinnerState(false));
      setGlobalMsg('');
    } catch (e: any) {
      setGlobalMsg('We could logout, try again later.');
      dispatch(toggleSpinnerState(false));
    }
  };

  // eslint-disable-next-line consistent-return
  const startGameSession = async () => {
    try {
      dispatch(toggleSpinnerState(true));
      await gameSessionService.startGameSession();
      history.replace('/game/session-information');
    } catch (e: any) {
      console.log(e);
      const timer = setTimeout(() => {
        dispatch(toggleSpinnerState(false));
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonButton onClick={() => startGameSession()}>Start a game</IonButton>
          <IonButton color='danger' fill='outline' onClick={() => logout()}>Logout</IonButton>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
