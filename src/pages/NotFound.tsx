import {
  IonButton,
  IonContent, IonPage,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import './NotFound.css';

const NotFound: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    show
      ? <IonPage>
        <IonContent >
          <div className="not-found__wrapper">
            <h1>Page not found</h1>
            <p>Uh oh, we could not found the page you are looking for. Try going back to the dashboard</p>
            <IonButton fill="solid" color='primary' href="/home">Go to dashboard</IonButton>
          </div>
        </IonContent>
      </IonPage>
      : <></>
  );
};

export default NotFound;
