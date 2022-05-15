import {
  IonButton, IonContent, IonPage, IonInput, IonText,
  IonItem, IonLabel, IonCard, IonCardContent,
  IonCardHeader, IonImg, useIonRouter,
} from '@ionic/react';

import './Signup.css';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import { toggleSpinnerState } from '../store/slices/SpinnerSlice';
import logo from '../theme/assets/logo.png';
import userService from '../services/UserService';

const Signup: React.FC = () => {
  const [globalMsg, setGlobalMsg] = useState('');
  const dispatch = useAppDispatch();
  const router = useIonRouter();
  const user = useAppSelector((state) => state.user.user) as any;

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  const createAccount = async (values: any) => {
    try {
      const firebaseUser: any = await userService.createFirebaseUser(values.email, values.name, values.password, values.passwordConfirmation);
      await userService.createFirestoreUser(firebaseUser.user.uid, values.email, values.name);
      setGlobalMsg('');
      router.push('/');
    } catch (e: any) {
      // TODO Should delete Firebase user if fails
      if (e) {
        setGlobalMsg(e);
      } else {
        setGlobalMsg('We could not create your account at the moment, try again later.');
      }
    }
  };

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
            .required('The password field is required').min(6, 'Your password need at leaste 6 characters.'),
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
                        className={formikProps.errors.name && formikProps.touched.name
                          ? 'ion-color-danger' : 'ion-color-light'}
                      >
                        <IonLabel color={formikProps.errors.name && formikProps.touched.name
                          ? 'danger' : ''}
                        position="floating">
                          Name
                        </IonLabel>
                        <IonInput
                          name="name"
                          autofocus={true}
                          color={formikProps.errors.name && formikProps.touched.name
                            ? 'danger' : 'light'}
                          autocomplete='on'
                          required={true}
                          value={formikProps.values.name}
                          onIonChange={formikProps.handleChange}
                          onIonBlur={formikProps.handleBlur}
                        >
                        </IonInput>
                      </IonItem>
                    </div>
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
                    <div className='register__item'>
                      <IonItem className={formikProps.errors.passwordConfirmation && formikProps.touched.passwordConfirmation
                        ? 'ion-color-danger' : 'ion-color-light'}>
                        <IonLabel color={formikProps.errors.passwordConfirmation && formikProps.touched.passwordConfirmation
                          ? 'danger' : ''}
                        position="floating">
                          Confirmation password
                        </IonLabel>
                        <IonInput
                          name="passwordConfirmation"
                          type='password'
                          color={formikProps.errors.passwordConfirmation && formikProps.touched.passwordConfirmation
                            ? 'danger' : 'light'}
                          required={true}
                          autocomplete='current-password'
                          value={formikProps.values.passwordConfirmation}
                          onIonChange={formikProps.handleChange}
                          onIonBlur={formikProps.handleBlur}
                        >
                        </IonInput>
                      </IonItem>
                      {formikProps.errors.passwordConfirmation && formikProps.touched.passwordConfirmation && (
                        <IonText color='danger'>{formikProps.errors.passwordConfirmation}</IonText>
                      )}
                    </div>
                    <IonText color='danger' className="mtp-form-msg">{globalMsg}</IonText>
                    <div className="register__buttons">
                      <a href='/auth/login'>
                        I already have an account
                      </a>
                      <IonButton type='submit' fill="solid" color='primary'>register</IonButton>
                      <button className="hack__submit-btn" type="submit"></button>
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

export default Signup;
