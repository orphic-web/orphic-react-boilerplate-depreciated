import {
  IonRouterOutlet, IonIcon, IonTabBar, IonTabButton, IonTabs, IonLabel,
} from '@ionic/react';
import { ellipse, triangle } from 'ionicons/icons';

import { Route, RouteComponentProps } from 'react-router';
import Dashboard from './Dashboard';
import History from './History';

const AppCore: React.FC<RouteComponentProps> = ({ history }) => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path={'/home/history'} render={(props) => <History {...props} />} />
      <Route exact path={'/home'} render={(props) => <Dashboard {...props} />} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home">
        <IonIcon icon={ellipse} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="history" href="/home/history">
        <IonIcon icon={triangle} />
        <IonLabel>History</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default AppCore;
