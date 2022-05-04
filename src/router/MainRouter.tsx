import {
  IonRouterOutlet,
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';
import AppCore from '../pages/appCore/AppCore';
import NotFound from '../pages/NotFound';
import SessionInformation from '../pages/SessionInformation';

const MainRouter: React.FC = () => (
  <IonReactRouter>
    <IonRouterOutlet>
      <Route path="/home" render={(props) => <AppCore {...props} />} />
      <Route path='/game/session-information' render={(props) => <SessionInformation {...props} />} />
      <Route exact path={'/'} render={() => <Redirect to="/home" />} />
      <Route component={NotFound} />
    </IonRouterOutlet>
  </IonReactRouter>
);

export default MainRouter;
