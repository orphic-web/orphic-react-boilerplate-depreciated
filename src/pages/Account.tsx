import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import './Account.css';

const Account: React.FC<RouteComponentProps> = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>Account page</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent >
    </IonContent>
  </IonPage>
);

export default Account;
