import {
  Box, Button, Card, CardContent, CardHeader, Container, Divider,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { TextField } from 'formik-mui';
import { useState } from 'react';
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

const Settings: React.FC = () => {
  const user = useAppSelector((state) => state.user.user) as User;
  const language = useAppSelector((state) => state.user.language) as SupportedLanguages;

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

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
      await AlertUtils.createSuccessAlert(Utils.getTranslation(language, translator.successMessages.updateCompleted), dispatch);
    } catch (e: any) {
      ErrorService.handleError(e, dispatch);
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
      await AlertUtils.createSuccessAlert(Utils.getTranslation(language, translator.successMessages.updateCompleted), dispatch);
    } catch (e: any) {
      ErrorService.handleError(e, dispatch);
      setLoading(false);
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
      await AlertUtils.createSuccessAlert(Utils.getTranslation(language, translator.successMessages.updateCompleted), dispatch);
    } catch (e: any) {
      ErrorService.handleError(e, dispatch);
      setLoading(false);
    }
  };

  return (
    <>
      <Layout title={Utils.getTranslation(language, translator.pages.settings.title)}>
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
              name: yup.string().required(Utils.getTranslation(language, translator.formMessages.requiredField)),
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
                    title={Utils.getTranslation(language, translator.pages.settings.information.title)}
                    subheader={Utils.getTranslation(language, translator.pages.settings.information.subheader)}
                  />
                  <Divider />
                  <CardContent>
                    <Field
                      component={TextField}
                      name="name"
                      type="text"
                      label={Utils.getTranslation(language, translator.pages.settings.information.inputs.nameLabel)}
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
                      {Utils.getTranslation(language, translator.pages.settings.information.submit)}
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
              newEmail: yup.string().required(Utils.getTranslation(language, translator.formMessages.requiredField)),
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
                    title={Utils.getTranslation(language, translator.pages.settings.changeEmail.title)}
                    subheader={user?.email}
                  />
                  <Divider />
                  <CardContent>
                    <Field
                      component={TextField}
                      name="newEmail"
                      type="text"
                      label={Utils.getTranslation(language, translator.pages.settings.changeEmail.inputs.email)}
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
                      {Utils.getTranslation(language, translator.pages.settings.changeEmail.submit)}
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
              password: yup.string().min(6).required(Utils.getTranslation(language, translator.formMessages.requiredField)),
              passwordConfirmation: yup.string()
                .required(Utils.getTranslation(language, translator.formMessages.requiredField))
                .oneOf([yup.ref('password'), null], Utils.getTranslation(language, translator.formMessages.passwordsMustMatch)),
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
                    title={Utils.getTranslation(language, translator.pages.settings.changePassword.title)}
                  />
                  <Divider />
                  <CardContent>
                    <Field
                      component={TextField}
                      name="password"
                      type="password"
                      label={Utils.getTranslation(language, translator.pages.settings.changePassword.inputs.password)}
                      margin='normal'
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      name="passwordConfirmation"
                      type="password"
                      label={Utils.getTranslation(language, translator.pages.settings.changePassword.inputs.passwordConfirmation)}
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
                      {Utils.getTranslation(language, translator.pages.settings.changePassword.submit)}
                    </Button>
                  </Box>
                </Card>
              </Form>
            )}
          </Formik>
        </Container>
      </Layout>
      <Spinner show={loading}/>
    </>

  );
};

export default Settings;
