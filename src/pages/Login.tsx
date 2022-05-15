import {
  IonButton, IonContent, IonPage, IonInput, IonText,
  IonItem, IonLabel, IonCard, IonCardContent,
  IonCardHeader, IonImg, useIonRouter,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';

import './Login.css';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import { toggleSpinnerState } from '../store/slices/SpinnerSlice';
import logo from '../theme/assets/logo.png';
import userService from '../services/UserService';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [globalMsg, setGlobalMsg] = useState('');
  const user = useAppSelector((state) => state.user.user) as any;

  const dispatch = useAppDispatch();
  const router = useIonRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  const login = async (values: any) => {
    try {
      await userService.login(values?.email, values?.password);
      router.push('/');
      setGlobalMsg('');
    } catch (e: any) {
      setGlobalMsg('We could not find a user with those credentials.');
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validateOnChange
      validationSchema={
        Yup.object().shape({
          email: Yup.string()
            .email('Wrong email format')
            .required('The email field is required'),
          password: Yup.string()
            .required('The password field is required'),
        })
      }
      onSubmit={(values, { setSubmitting }) => {
        console.log('asdasd');
        setSubmitting(false);
        login(values);
        setSubmitting(true);
      }}
    >
      {(formikProps) => (
        <IonPage>
          <IonContent >
            <div className='login__wrapper'>
              <div className='login__logo'>
                <IonImg src={logo} />
              </div>
              <IonCard className="login__card">
                <IonCardHeader>
                  <h1 className='login__title'>Login</h1>
                </IonCardHeader>
                <IonCardContent>
                  <form onSubmit={formikProps.handleSubmit}>
                    <div className='login__item'>
                      <IonItem
                        className={formikProps.errors.email && formikProps.touched.email
                          ? 'ion-color-danger' : 'ion-color-light'}
                      >
                        <IonLabel color={formikProps.errors.email && formikProps.touched.email
                          ? 'danger' : ''}
                        position="floating">
                          Email
                        </IonLabel>
                        <IonInput
                          name="email"
                          autofocus={true}
                          autocomplete='on'
                          color={formikProps.errors.email && formikProps.touched.email
                            ? 'danger' : 'light'}
                          required={true}
                          value={formikProps.values.email}
                          onIonChange={formikProps.handleChange}
                          onIonBlur={formikProps.handleBlur}
                        >
                        </IonInput>
                      </IonItem>
                      <IonText color='danger'>
                        {formikProps.errors.email && formikProps.touched.email && (
                          formikProps.errors.email
                        ) }
                      </IonText>
                    </div>
                    <div className='login__item'>
                      <IonItem className={formikProps.errors.password && formikProps.touched.password
                        ? 'ion-color-danger' : 'ion-color-light'}>
                        <IonLabel color={formikProps.errors.password && formikProps.touched.password
                          ? 'danger' : ''}
                        position="floating">
                          Password
                        </IonLabel>
                        <IonInput
                          name="password"
                          type='password'
                          color={formikProps.errors.password && formikProps.touched.password
                            ? 'danger' : 'light'}
                          required={true}
                          value={formikProps.values.password}
                          onIonChange={formikProps.handleChange}
                          onIonBlur={formikProps.handleBlur}
                        >
                        </IonInput>
                      </IonItem>
                      {formikProps.errors.password && formikProps.touched.password && (
                        <IonText color='danger'>{formikProps.errors.password}</IonText>
                      )}

                    </div>
                    <IonText color='danger' className="mtp-form-msg">{globalMsg}</IonText>
                    <div className="login__buttons">
                      <a href='/auth/register'>
                        I don't have an account
                      </a>
                      <IonButton type='submit' fill="solid" color='primary'>Login</IonButton>
                    </div>
                    <button className="hack__submit-btn" type="submit"></button>
                  </form>
                </IonCardContent>
              </IonCard>
            </div>
          </IonContent>
        </IonPage>
      )}
    </Formik>

  );
};

export default Login;
