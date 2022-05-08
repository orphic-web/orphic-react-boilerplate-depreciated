import { isPlatform } from '@ionic/core';
import {
  IonRouterOutlet,
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import Spinner from '../components/Spinner';
import { auth, db } from '../FirebaseConfig';
import AppCore from '../pages/appCore/AppCore';
import AuthCore from '../pages/authCore/AuthCore';
import NotFound from '../pages/NotFound';
import SessionInformation from '../pages/SessionInformation';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import { toggleSpinnerState } from '../store/slices/SpinnerSlice';
import { updateFirebaseUser, updatePlatform, updateUser } from '../store/slices/UserSlice';

const MainRouter: React.FC = () => {
  const show = useAppSelector((state) => state.loader.state) as any;
  const platform = useAppSelector((state) => state.user.platform) as any;
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      if (isPlatform('ios')) dispatch(updatePlatform('ios'));
      else dispatch(updatePlatform('md'));

      dispatch(toggleSpinnerState(true));
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      let unsubscribe = () => { };

      // eslint-disable-next-line consistent-return
      auth.onAuthStateChanged(async (firebaseUser: any) => {
        if (firebaseUser) {
          unsubscribe = await db.collection('Users').doc(firebaseUser.uid)
            .onSnapshot((doc: any) => {
              const userData = doc.data();
              if (userData?.birthDate) userData.birthDate = userData.birthDate.toDate();
              dispatch(updateUser(userData));
              dispatch(updateFirebaseUser(firebaseUser));
              dispatch(toggleSpinnerState(false));
            });
          return unsubscribe;
        }
        dispatch(updateUser(null));
        dispatch(updateFirebaseUser(null));
        dispatch(toggleSpinnerState(false));
      });

      return unsubscribe;
    } catch (e: any) {
      console.error(e);
      return e;
    }
  }, []);

  return (
    <IonReactRouter>
      <Spinner show={show}></Spinner>
      <IonRouterOutlet>
        <Route path="/auth" render={(props) => <AuthCore {...props} />} />
        <Route path="/home" render={(props) => <AppCore {...props} />} />
        <Route path='/game/session-information' render={(props) => <SessionInformation {...props} />} />
        <Route exact path={'/'} render={() => <Redirect to="/home" />} />
        <Route component={NotFound} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default MainRouter;
