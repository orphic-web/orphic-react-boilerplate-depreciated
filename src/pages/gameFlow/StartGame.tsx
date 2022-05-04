import {
  IonButton,
  IonContent, IonPage,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import './StartGame.css';

const StartGame: React.FC<RouteComponentProps> = ({ history }) => (
  <IonPage>
    <IonContent >
      <div className="not-found__wrapper">
        <h1>Page not found</h1>
        <p>Uh oh, we could not found the page you are looking for. Try going back to the dashboard</p>
        <IonButton fill="solid" color='primary'>Go to dashboard</IonButton>
      </div>
    </IonContent>
  </IonPage>
);

export default StartGame;
