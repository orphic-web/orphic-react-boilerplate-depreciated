import {
  IonButton,
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import './Dashboard.css';
import { RouteComponentProps } from 'react-router';
import { useEffect, useState } from 'react';
import gameSessionService from '../../services/GameSessionService';
import { toggleSpinnerState } from '../../store/slices/SpinnerSlice';
import { useAppDispatch } from '../../store/Hooks';

const Dashboard: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('dashboard');
  }, []);

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
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
