import {
  IonButton,
  IonContent, IonPage,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import './Register.css';

const Register: React.FC<RouteComponentProps> = () => (
  <IonPage>
    <IonContent >
      <div className="not-found__wrapper">
        <h1>Register page</h1>
        <IonButton fill="solid" color='primary' href="/home">Go to dashboard</IonButton>
      </div>
    </IonContent>
  </IonPage>
);

export default Register;
