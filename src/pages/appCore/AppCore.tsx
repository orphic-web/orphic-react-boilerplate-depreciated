import {
  IonRouterOutlet, IonIcon, IonTabBar, IonTabButton, IonTabs, IonLabel,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, triangle } from 'ionicons/icons';

import { Redirect, Route, RouteComponentProps } from 'react-router';
import NotFound from '../NotFound';
import Dashboard from './Dashboard';
import History from './History';

const AppCore: React.FC<RouteComponentProps> = ({ history }) => (
  <>
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path={'/home'} render={() => <Redirect to="/home/dashboard" />} />
        <Route exact path={'/home/history'} render={(props) => <History {...props} />} />
        <Route exact path={'/home/dashboard'} render={(props) => <Dashboard {...props} />} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home/dashboard">
          <IonIcon icon={ellipse} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="history" href="/home/history">
          <IonIcon icon={triangle} />
          <IonLabel>History</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>

  </>

);

export default AppCore;
