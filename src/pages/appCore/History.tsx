import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import './History.css';

const History: React.FC<RouteComponentProps> = ({ history }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>History</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <ExploreContainer name="History" />
    </IonContent>
  </IonPage>
);

export default History;
