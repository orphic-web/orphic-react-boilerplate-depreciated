import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as yup from 'yup';

import {
  Box, Paper, Container, Typography, Link, Button, Avatar,
} from '@mui/material';
import { TextField } from 'formik-mui';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useAppDispatch } from '../../store/Hooks';
import EmailService from '../../services/EmailService';

import AlertUtil from '../../utils/AlertUtil';
import ErrorService from '../../services/ErrorService';
import Spinner from '../../components/Spinner';
import translator from '../../theme/translator.json';
import Utils from '../../utils/Utils';
import logo from '../../theme/assets/logo.png';
import AlertsContainer from '../../components/AlertsContainer';

const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const sendResetPasswordLink = async (values: any) => {
    try {
      setLoading(true);
      await EmailService.sendResetPasswordLink(values.email);
      setLoading(false);

      AlertUtil.createSuccessAlert(Utils.getTranslation(translator.pages.forgotPassword.emailSent), dispatch);
    } catch (e: any) {
      setLoading(false);
      ErrorService.handleError(e, dispatch);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={yup.object({
            email: yup.string()
              .email(Utils.getTranslation(translator.formMessages.invalidEmail))
              .required(Utils.getTranslation(translator.formMessages.requiredField)),
          })}
          onSubmit={(values, { setSubmitting }) => {
            sendResetPasswordLink(values);
            setSubmitting(false);
          }}
        >
          {(formikProps) => (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '600px',
            }}>
              <Box sx={{
                maxWidth: '250px',
              }}>
                <img src={logo}/>
              </Box>
              <Paper sx={{
                margin: '15px',
              }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                  }}
                >
                  <Avatar sx={{ m: '0 auto 15px auto', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography align="center" variant="h5">
                    {Utils.getTranslation(translator.pages.forgotPassword.title)}
                  </Typography>
                  <Form>
                    <Field
                      component={TextField}
                      name="email"
                      type="email"
                      label={Utils.getTranslation(translator.pages.forgotPassword.email)}
                      margin='normal'
                      fullWidth
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {Utils.getTranslation(translator.pages.forgotPassword.submit)}
                    </Button>
                  </Form>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'left',
                      width: '100%',
                    }}
                  >
                    <Link href="/login" variant="body2">
                      {Utils.getTranslation(translator.pages.forgotPassword.toLogin)}
                    </Link>
                  </Box>
                </Box>
              </Paper>
            </Box>
          )}
        </Formik>
        <Spinner show={loading}/>
      </Box>
      <AlertsContainer/>
    </Container>
  );
};

export default ForgotPassword;
