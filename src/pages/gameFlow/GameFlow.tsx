import {
  IonRouterOutlet, IonIcon, IonTabBar, IonTabButton, IonTabs, IonLabel,
} from '@ionic/react';
import { ellipse } from 'ionicons/icons';

import { Route, RouteComponentProps } from 'react-router';
import StartGame from './StartGame';

const AppCore: React.FC<RouteComponentProps> = ({ history }) => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path={'/game'} render={(props) => <StartGame {...props} />} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/game">
        <IonIcon icon={ellipse} />
        <IonLabel>GAMINGG</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default AppCore;
