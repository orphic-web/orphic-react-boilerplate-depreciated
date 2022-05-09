import {
  IonPage,
  IonRouterOutlet,
} from '@ionic/react';

import { Redirect, Route, RouteComponentProps } from 'react-router';
import NotFound from '../NotFound';
import Login from './Login';
import Register from './Register';

const AuthCore: React.FC<RouteComponentProps> = ({ history, match }) => (
  <IonPage>
    <IonRouterOutlet>
      <Route exact path={'/auth'} render={() => <Redirect to="/auth/login" />} />
      <Route exact path={'/auth/login'} render={(props) => <Login {...props}/>} />
      <Route exact path={'/auth/register'} render={(props) => <Register {...props} />} />
    </IonRouterOutlet>
  </IonPage>

);

export default AuthCore;
