import {
  IonButton,
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import './Dashboard.css';
import { RouteComponentProps } from 'react-router';

const Dashboard: React.FC<RouteComponentProps> = ({ history }) => {
  console.log('asdas');
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
          <p>asdlkjalskdj</p>
          <IonButton href='/game'>Start a game</IonButton>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
