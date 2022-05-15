import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import './SessionSettings.css';

const SessionSettings: React.FC<RouteComponentProps> = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>Session Settings</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent >
      <p>asdlkjaslkdjalskdjalskjdlakjsdl</p>
    </IonContent>
  </IonPage>
);

export default SessionSettings;
