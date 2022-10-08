import {
  Box, Button, Card, CardContent, CardHeader, Container, Divider, Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { TextField } from 'formik-mui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import SupportedLanguages from '../models/enums/SupportedLanguages';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import translator from '../theme/translator.json';
import Utils from '../utils/Utils';
import User from '../models/User';
import UserService from '../services/UserService';
import ErrorService from '../services/ErrorService';
import AlertUtils from '../utils/AlertUtil';
import { auth } from '../FirebaseConfig';
import PromptForCredentials from '../components/PromptForCredentials';

const Settings: React.FC = () => {
  const user = useAppSelector((state) => state.user.user) as User;
  const language = useAppSelector((state) => state.user.language) as SupportedLanguages;
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPromptCredential, setShowPromptCredential] = useState(false);

  const handlePromptCredentialAlert = (show: boolean) => {
    if (show) setShowPromptCredential(true);
    else setShowPromptCredential(false);
  };

  const updateUser = async (values: any) => {
    try {
      setLoading(true);
      const newName = values.name;
      const newUser = {
        ...user,
      } as User;
      newUser.name = newName;

      await UserService.update(newUser);
      setLoading(false);
      await AlertUtils.createSuccessAlert(Utils.getTranslation(translator.successMessages.updateCompleted, language), dispatch);
    } catch (e: any) {
      ErrorService.handleError(e, dispatch, language);
      setLoading(false);
    }
  };

  const changeEmail = async (values: any) => {
    try {
      setLoading(true);
      const { newEmail } = values;
      const newUser = {
        ...user,
      } as User;
      newUser.email = newEmail;

      if (auth.currentUser) {
        await UserService.updateEmail(auth.currentUser, newEmail);
        await UserService.update(newUser);
      }

      setLoading(false);
      await AlertUtils.createSuccessAlert(Utils.getTranslation(translator.successMessages.updateCompleted, language), dispatch);
    } catch (e: any) {
      // Change email needs reauthantification if credentials have timed out
      if (e.code === 'auth/requires-recent-login') {
        setLoading(false);
        setShowPromptCredential(true);
      } else {
        setLoading(false);
        ErrorService.handleError(e, dispatch, language);
      }
    }
  };

  const changePassword = async (values: any) => {
    try {
      setLoading(true);
      const { password } = values;
      if (auth.currentUser) {
        await UserService.updatePassword(auth.currentUser, password);
      }

      setLoading(false);
      await AlertUtils.createSuccessAlert(Utils.getTranslation(translator.successMessages.updateCompleted, language), dispatch);
    } catch (e: any) {
      // Change password needs reauthantification if credentials have timed out
      if (e.code === 'auth/requires-recent-login') {
        setLoading(false);
        setShowPromptCredential(true);
      } else {
        setLoading(false);
        ErrorService.handleError(e, dispatch, language);
      }
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      if (auth.currentUser) {
        UserService.delete(auth.currentUser.uid);
        UserService.deleteAccount(auth.currentUser);
      } else {
        throw Error('Delete account - Firebase user undefined');
      }

      navigate('/signup');
      setLoading(false);
      await AlertUtils.createSuccessAlert(Utils.getTranslation(translator.successMessages.updateCompleted, language), dispatch);
    } catch (e: any) {
      // Delete account needs reauthantification if credentials have timed out
      if (e.code === 'auth/requires-recent-login') {
        setLoading(false);
        setShowPromptCredential(true);
      } else {
        setLoading(false);
        ErrorService.handleError(e, dispatch, language);
      }
    }
  };

  return (
    <>
      <Layout title={Utils.getTranslation(translator.pages.settings.title, language)}>
        <Container
          maxWidth="lg"
          sx={{
            marginTop: '20px',
          }}
        >
          {/**
           *  Personal information form
           */}
          <Formik
            initialValues={{
              name: user?.name,
            }}
            validationSchema={yup.object({
              name: yup.string().required(Utils.getTranslation(translator.formMessages.requiredField, language)),
            })}
            onSubmit={(values, { setSubmitting }) => {
              updateUser(values);
              setSubmitting(false);
            }}
          >
            {(formikProps) => (
              <Form>
                <Card>
                  <CardHeader
                    title={Utils.getTranslation(translator.pages.settings.information.title, language)}
                    subheader={Utils.getTranslation(translator.pages.settings.information.subheader, language)}
                  />
                  <Divider />
                  <CardContent>
                    <Field
                      component={TextField}
                      name="name"
                      type="text"
                      label={Utils.getTranslation(translator.pages.settings.information.inputs.nameLabel, language)}
                      margin='normal'
                      fullWidth
                    />
                  </CardContent>
                  <Divider />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      p: 2,
                    }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {Utils.getTranslation(translator.pages.settings.information.submit, language)}
                    </Button>
                  </Box>
                </Card>
              </Form>
            )}
          </Formik>
        </Container>

        {/**
           *  Personal information form
           */}
        <Container
          maxWidth="lg"
          sx={{
            marginTop: '20px',
          }}
        >
          <Formik
            initialValues={{
              newEmail: '',
            }}
            validationSchema={yup.object({
              newEmail: yup.string().required(Utils.getTranslation(translator.formMessages.requiredField, language)),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              changeEmail(values);
              setSubmitting(false);
              resetForm();
            }}
          >
            {(formikProps) => (
              <Form>
                <Card>
                  <CardHeader
                    title={Utils.getTranslation(translator.pages.settings.changeEmail.title, language)}
                    subheader={user?.email}
                  />
                  <Divider />
                  <CardContent>
                    <Field
                      component={TextField}
                      name="newEmail"
                      type="text"
                      label={Utils.getTranslation(translator.pages.settings.changeEmail.inputs.email, language)}
                      margin='normal'
                      fullWidth
                    />
                  </CardContent>
                  <Divider />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      p: 2,
                    }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {Utils.getTranslation(translator.pages.settings.changeEmail.submit, language)}
                    </Button>
                  </Box>
                </Card>
              </Form>
            )}
          </Formik>
        </Container>

        {/**
           *  Password form
           */}
        <Container
          maxWidth="lg"
          sx={{
            marginTop: '20px',
          }}
        >
          <Formik
            initialValues={{
              password: '',
              passwordConfirmation: '',
            }}
            validationSchema={yup.object({
              password: yup.string().min(6).required(Utils.getTranslation(translator.formMessages.requiredField, language)),
              passwordConfirmation: yup.string()
                .required(Utils.getTranslation(translator.formMessages.requiredField, language))
                .oneOf([yup.ref('password'), null], Utils.getTranslation(translator.formMessages.passwordsMustMatch, language)),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              changePassword(values);
              setSubmitting(false);
              resetForm();
            }}
          >
            {(formikProps) => (
              <Form>
                <Card>
                  <CardHeader
                    title={Utils.getTranslation(translator.pages.settings.changePassword.title, language)}
                  />
                  <Divider />
                  <CardContent>
                    <Field
                      component={TextField}
                      name="password"
                      type="password"
                      label={Utils.getTranslation(translator.pages.settings.changePassword.inputs.password, language)}
                      margin='normal'
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      name="passwordConfirmation"
                      type="password"
                      label={Utils.getTranslation(translator.pages.settings.changePassword.inputs.passwordConfirmation, language)}
                      margin='normal'
                      fullWidth
                    />
                  </CardContent>
                  <Divider />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      p: 2,
                    }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {Utils.getTranslation(translator.pages.settings.changePassword.submit, language)}
                    </Button>
                  </Box>
                </Card>
              </Form>
            )}
          </Formik>
        </Container>
        {/**
           *  Deleting account form
           */}
        <Container
          maxWidth="lg"
          sx={{
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <Card sx={{
            backgroundColor: '#331f1e',
          }}>
            <CardHeader
              title={
                <Typography variant='h5' sx={{ color: 'error.main' }}>
                  {Utils.getTranslation(translator.pages.settings.deleteAccount.title, language)}
                </Typography>
              }
              subheader={
                <Typography sx={{ color: 'error.main', fontWeight: 'bold' }}>
                  {Utils.getTranslation(translator.pages.settings.deleteAccount.subheader, language)}
                </Typography>
              }
            />
            <CardContent>
              <Button
                sx={{ color: 'info.main' }}
                variant='contained'
                color="error"
                onClick={() => deleteAccount()}
              >
                {Utils.getTranslation(translator.pages.settings.deleteAccount.submit, language)}
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Layout>
      <Spinner show={loading}/>
      <PromptForCredentials show={showPromptCredential} setShow={handlePromptCredentialAlert} />
    </>

  );
};

export default Settings;
