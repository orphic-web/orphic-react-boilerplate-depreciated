import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import * as yup from 'yup';

import {
  Box,
} from '@mui/material';
import { TextField } from 'formik-mui';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/Hooks';
import EmailService from '../../services/EmailService';

import AlertUtil from '../../utils/AlertUtil';
import ErrorService from '../../services/ErrorService';
import Spinner from '../../components/Spinner';
import translator from '../../theme/translator.json';
import Utils from '../../utils/Utils';

const ForgotPassword: React.FC = () => {
  const language = useAppSelector((state) => state.user.language);

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const sendResetPasswordLink = async (values: any) => {
    try {
      setLoading(true);
      await EmailService.sendResetPasswordLink(values.email);
      setLoading(false);

      AlertUtil.createSuccessAlert(Utils.getTranslation(language, translator.pages.forgotPassword.emailSent), dispatch);
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
              .email(Utils.getTranslation(language, translator.formMessages.invalidEmail))
              .required(Utils.getTranslation(language, translator.formMessages.requiredField)),
          })}
          onSubmit={(values, { setSubmitting }) => {
            sendResetPasswordLink(values);
            setSubmitting(false);
          }}
        >
          {(formikProps) => (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '500px',
              }}
            >
              <Avatar sx={{ m: '0 auto 15px auto', bgcolor: 'secondary.dark' }}>
                <LockOutlinedIcon style={{ color: '#fdfdfd' }} />
              </Avatar>
              <Typography variant="h5">
                {Utils.getTranslation(language, translator.pages.forgotPassword.title)}
              </Typography>
              <Form>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label={Utils.getTranslation(language, translator.pages.forgotPassword.email)}
                  margin='normal'
                  fullWidth
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {Utils.getTranslation(language, translator.pages.forgotPassword.submit)}
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
                  {Utils.getTranslation(language, translator.pages.forgotPassword.toLogin)}
                </Link>
              </Box>
            </Box>
          )}
        </Formik>
        <Spinner show={loading}/>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
