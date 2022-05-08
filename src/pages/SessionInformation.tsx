import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import './SessionInformation.css';

const SessionInformation: React.FC<RouteComponentProps> = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home" />
        </IonButtons>
        <IonTitle>Session Info</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent >
      <p>asdlkjaslkdjalskdjalskjdlakjsdl</p>
    </IonContent>
  </IonPage>
);

export default SessionInformation;
