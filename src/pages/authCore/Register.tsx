import {
  IonButton, IonContent, IonPage, IonInput, IonText,
  IonItem, IonLabel, IonCard, IonCardContent,
  IonCardHeader, IonImg,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';

import './Register.css';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useAppDispatch } from '../../store/Hooks';
import { toggleSpinnerState } from '../../store/slices/SpinnerSlice';
import logo from '../../theme/assets/logo.png';
import userService from '../../services/UserService';

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [globalMsg, setGlobalMsg] = useState('');
  const dispatch = useAppDispatch();

  const createAccount = async (values: any) => {
    try {
      dispatch(toggleSpinnerState(true));
      await userService.register(dispatch, values.name, values?.email, values?.password, values.passwordConfirmation);
      setGlobalMsg('');
      dispatch(toggleSpinnerState(false));
      history.push('/home/dashboard');
    } catch (e: any) {
      setGlobalMsg('We could not find a user with those credentials.');
      dispatch(toggleSpinnerState(false));
    }
  };

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        console.log('Enter key was pressed. Run your function.');
        // callMyFunction();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }}
      validateOnChange
      validationSchema={
        Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string()
            .email('Wrong email format')
            .required('The email field is required'),
          password: Yup.string()
            .required('The password field is required'),
          passwordConfirmation: Yup.string()
            .required('Requis')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        })
      }
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        createAccount(values);
        setSubmitting(true);
      }}
    >
      {(formikProps) => (
        <IonPage>
          <IonContent >
            <div className='register__wrapper'>
              <div className='register__logo'>
                <IonImg src={logo} />
              </div>
              <IonCard className="register__card">
                <IonCardHeader>
                  <h1 className='register__title'>Create an Account</h1>
                </IonCardHeader>
                <IonCardContent>
                  <Form onSubmit={formikProps.handleSubmit}>
                    <div className='register__item'>
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
                          color={formikProps.errors.email && formikProps.touched.email
                            ? 'danger' : 'light'}
                          autocomplete='on'
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
                    <div className='register__item'>
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
                          autocomplete='current-password'
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
                    <div className="register__buttons">
                      <a href='/auth/register'>
                        I don't have an account
                      </a>
                      <IonButton type='submit' fill="solid" color='primary'>register</IonButton>
                    </div>
                  </Form>
                </IonCardContent>
              </IonCard>
            </div>
          </IonContent>
        </IonPage>
      )}
    </Formik>

  );
};

export default Register;
