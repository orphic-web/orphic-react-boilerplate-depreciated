import {
  IonApp,
  IonRouterOutlet,
  isPlatform,
  setupIonicReact,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router';
import { auth, db } from './FirebaseConfig';
import { useAppDispatch, useAppSelector } from './store/Hooks';
import { updatePlatform, updateUser, updateFirebaseUser } from './store/slices/UserSlice';
import Dashboard from './pages/Dashboard';
import Session from './pages/Session';
import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const firebaseUser = useAppSelector((slice) => slice.user.firebaseUser) as any;
  const user = useAppSelector((slice) => slice.user.user) as any;

  useEffect(() => {
    try {
      if (isPlatform('ios')) dispatch(updatePlatform('ios'));
      else dispatch(updatePlatform('md'));

      const unsubscribe = auth.onAuthStateChanged(async (doc: any) => {
        if (doc) dispatch(updateFirebaseUser(doc));
        else dispatch(updateFirebaseUser(null));
      });

      // remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
      return () => unsubscribe();
    } catch (e: any) {
      console.error(e);
      return e;
    }
  }, []);

  useEffect(() => {
    try {
      if (!firebaseUser) {
        dispatch(updateUser(null));
        return {};
      }

      const unsubscribe = db.collection('Users').doc(firebaseUser.uid).onSnapshot((snap) => {
        const userData = snap.data();
        dispatch(updateUser(userData));
      });

      // remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
      return () => unsubscribe();
    } catch (e: any) {
      console.error(e);
      return e;
    }
  }, [firebaseUser]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/account" component={Account} />
          <Route exact path='/session/:id' render={(props) => <Session {...props} />} />
          <Route exact path='/login' render={(props) => <Login {...props}/>} />
          <Route exact path='/signup' render={() => <Signup />} />
          <Route component={NotFound} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
