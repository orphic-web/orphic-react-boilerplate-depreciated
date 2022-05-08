import {
  IonRouterOutlet, IonIcon, IonTabBar, IonTabButton, IonTabs, IonLabel,
} from '@ionic/react';
import { ellipse, triangle } from 'ionicons/icons';

import { Redirect, Route, RouteComponentProps } from 'react-router';
import NotFound from '../NotFound';
import Login from './Login';
import Register from './Register';

const AuthCore: React.FC<RouteComponentProps> = ({ history }) => (
  <IonRouterOutlet>
    <Route exact path={'/auth/login'} render={(props) => <Login {...props} />} />
    <Route exact path={'/auth/register'} render={(props) => <Register {...props} />} />
    <Route exact path={'/auth'} render={() => <Redirect to="/auth/login" />} />
    <Route component={NotFound} />
  </IonRouterOutlet>

);

export default AuthCore;
