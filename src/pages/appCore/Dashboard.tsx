import {
  IonButton,
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import './Dashboard.css';
import { RouteComponentProps } from 'react-router';
import { useEffect, useState } from 'react';
import gameSessionService from '../../services/GameSessionService';

const Dashboard: React.FC<RouteComponentProps> = ({ history }) => {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    console.log('here');
  }, []);

  const startGameSession = async () => {
    try {
      await gameSessionService.startGameSession();
      history.replace('/game/session-information');
    } catch (e: any) {
      console.log(e);
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
