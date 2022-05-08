import {
  IonRouterOutlet,
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import Spinner from '../components/Spinner';
import AppCore from '../pages/appCore/AppCore';
import NotFound from '../pages/NotFound';
import SessionInformation from '../pages/SessionInformation';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import { updateShow } from '../store/slices/LoaderSlicer';

const MainRouter: React.FC = () => {
  const show = useAppSelector((state) => state.loader.show) as any;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateShow(false));
  }, []);

  return (
    <IonReactRouter>
      <Spinner show={show}></Spinner>
      <IonRouterOutlet>
        <Route path="/home" render={(props) => <AppCore {...props} />} />
        <Route path='/game/session-information' render={(props) => <SessionInformation {...props} />} />
        <Route exact path={'/'} render={() => <Redirect to="/home" />} />
        <Route component={NotFound} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default MainRouter;
